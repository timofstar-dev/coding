import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPair, SignJWT, createLocalJWKSet, exportJWK } from "jose";
import worker, {
  authorize,
  handleAI,
  readLimitedJSON,
} from "../server/worker.js";

const { publicKey, privateKey } = await generateKeyPair("RS256");
const keySet = createLocalJWKSet({
  keys: [{ ...(await exportJWK(publicKey)), kid: "test" }],
});
const env = {
  ACCESS_TEAM_DOMAIN: "https://example.cloudflareaccess.com",
  ACCESS_AUD: "test-audience",
  ALLOWED_EMAILS: "teacher@example.com, colleague@example.com",
  GEMINI_API_KEY: "unit-test-secret",
};
async function token(overrides = {}) {
  return new SignJWT({ email: "teacher@example.com", ...overrides })
    .setProtectedHeader({ alg: "RS256", kid: "test" })
    .setIssuer(env.ACCESS_TEAM_DOMAIN)
    .setAudience(env.ACCESS_AUD)
    .setSubject("teacher")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);
}
async function request(options = {}) {
  return new Request("https://worksheets.test/api/answers", {
    method: "POST",
    headers: {
      Origin: "https://worksheets.test",
      "Content-Type": "application/json",
      "Cf-Access-Jwt-Assertion": await token(),
      ...options.headers,
    },
    body:
      options.body ||
      JSON.stringify({
        prompt: "교사용 활동지 예시 답안을 JSON으로 만들어 주세요.",
      }),
  });
}
test("missing configuration and missing token fail closed", async () => {
  assert.equal(await authorize(await request(), {}, keySet), false);
  assert.equal(
    await authorize(new Request("https://worksheets.test"), env, keySet),
    false,
  );
});
test("valid signed allowed email accepted; other email rejected", async () => {
  assert.equal(await authorize(await request(), env, keySet), true);
  assert.equal(
    await authorize(
      await request({
        headers: {
          "Cf-Access-Jwt-Assertion": await token({
            email: "outsider@example.com",
          }),
        },
      }),
      env,
      keySet,
    ),
    false,
  );
});
test("forged or wrong-audience tokens rejected", async () => {
  const jwt = await token();
  const parts = jwt.split(".");
  parts[1] = Buffer.from(
    JSON.stringify({ email: "teacher@example.com" }),
  ).toString("base64url");
  assert.equal(
    await authorize(
      await request({
        headers: { "Cf-Access-Jwt-Assertion": parts.join(".") },
      }),
      env,
      keySet,
    ),
    false,
  );
  assert.equal(
    await authorize(await request(), { ...env, ACCESS_AUD: "other" }, keySet),
    false,
  );
});
test("unauthorized and cross-origin requests never reach Gemini", async () => {
  const deps = {
    keySet,
    fetch: () => {
      throw new Error("must not call");
    },
  };
  assert.equal(
    (
      await handleAI(
        await request({ headers: { Origin: "https://other.test" } }),
        env,
        deps,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await handleAI(
        await request({ headers: { "Cf-Access-Jwt-Assertion": "forged" } }),
        env,
        deps,
      )
    ).status,
    403,
  );
});
test("server key is only in upstream header; response is normalized", async () => {
  let checked = false;
  const response = await handleAI(await request(), env, {
    keySet,
    fetch: async (url, init) => {
      assert.ok(!url.includes(env.GEMINI_API_KEY));
      assert.equal(init.headers["x-goog-api-key"], env.GEMINI_API_KEY);
      checked = true;
      return Response.json({
        candidates: [
          {
            finishReason: "STOP",
            content: { parts: [{ text: '{"characters":"베드로"}' }] },
          },
        ],
      });
    },
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { result: { characters: "베드로" } });
  assert.ok(checked);
});
test("quota errors never return upstream details or keys", async () => {
  const response = await handleAI(await request(), env, {
    keySet,
    fetch: async () => new Response("sensitive upstream data", { status: 429 }),
  });
  assert.equal(response.status, 429);
  assert.ok(!(await response.text()).includes("sensitive"));
});
test("missing secret returns setup message without upstream call", async () => {
  const response = await handleAI(
    await request(),
    { ...env, GEMINI_API_KEY: "" },
    {
      keySet,
      fetch: () => {
        throw new Error("must not call");
      },
    },
  );
  assert.equal(response.status, 503);
});
test("oversized input and truncated model response are rejected", async () => {
  const oversized = await handleAI(
    await request({ body: JSON.stringify({ prompt: "x".repeat(50000) }) }),
    env,
    { keySet },
  );
  assert.equal(oversized.status, 400);
  const truncated = await handleAI(await request(), env, {
    keySet,
    fetch: async () =>
      Response.json({
        candidates: [
          { finishReason: "MAX_TOKENS", content: { parts: [{ text: "{}" }] } },
        ],
      }),
  });
  assert.equal(truncated.status, 502);
  await assert.rejects(() => readLimitedJSON(new Response("123456").body, 3));
});
test("static assets remain usable; unknown API routes are not static fallbacks", async () => {
  const assets = { ASSETS: { fetch: () => new Response("worksheet") } };
  assert.equal(
    await (
      await worker.fetch(new Request("https://worksheets.test/"), assets)
    ).text(),
    "worksheet",
  );
  assert.equal(
    (
      await worker.fetch(
        new Request("https://worksheets.test/api/unknown"),
        assets,
      )
    ).status,
    404,
  );
});
