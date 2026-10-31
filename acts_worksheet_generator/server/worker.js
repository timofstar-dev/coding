import { createRemoteJWKSet, jwtVerify } from "jose";

const MAX_REQUEST_BYTES = 48_000;
const MAX_RESPONSE_BYTES = 300_000;
const reply = (status, message) =>
  Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );

export async function readLimitedJSON(body, maxBytes) {
  if (!body) throw new Error("EMPTY");
  const reader = body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error("TOO_LARGE");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function authorize(request, env, keySet) {
  const issuer = env.ACCESS_TEAM_DOMAIN;
  if (
    !/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer || "") ||
    !env.ACCESS_AUD ||
    !env.ALLOWED_EMAILS
  ) {
    return false;
  }
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) return false;
  try {
    const keys =
      keySet ||
      createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`), {
        timeoutDuration: 5000,
      });
    const { payload } = await jwtVerify(token, keys, {
      issuer,
      audience: env.ACCESS_AUD,
      algorithms: ["RS256"],
      requiredClaims: ["exp", "iat", "sub", "email"],
    });
    const allowed = env.ALLOWED_EMAILS.split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
    return (
      typeof payload.email === "string" &&
      allowed.includes(payload.email.toLowerCase())
    );
  } catch {
    return false;
  }
}

export async function handleAI(request, env, dependencies = {}) {
  if (request.method !== "POST") return reply(405, "POST 요청만 지원합니다.");
  if (request.headers.get("Origin") !== new URL(request.url).origin)
    return reply(403, "허용되지 않은 요청입니다.");
  if (!(await authorize(request, env, dependencies.keySet)))
    return reply(403, "허용된 이메일로 다시 로그인해 주세요.");
  if (!env.GEMINI_API_KEY)
    return reply(
      503,
      "AI 서버 설정을 마무리하고 있습니다. 활동지 생성과 인쇄는 사용할 수 있습니다.",
    );
  if (!request.headers.get("Content-Type")?.includes("application/json"))
    return reply(415, "JSON 요청이 필요합니다.");
  let input;
  try {
    input = await readLimitedJSON(request.body, MAX_REQUEST_BYTES);
  } catch {
    return reply(
      400,
      "요청이 너무 크거나 올바르지 않습니다. 본문 범위를 줄여 주세요.",
    );
  }
  if (
    typeof input.prompt !== "string" ||
    input.prompt.length < 10 ||
    input.prompt.length > 16000
  )
    return reply(400, "본문 범위를 확인해 주세요.");
  const model = env.GEMINI_MODEL || "gemini-3.5-flash";
  if (!/^gemini-[a-z0-9.-]+$/.test(model))
    return reply(503, "AI 모델 설정을 확인해 주세요.");
  try {
    const upstream = await (dependencies.fetch || fetch)(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: '초등 국어·성경 학습지의 교사용 예시 답안을 작성한다. 요청된 JSON만 반환한다. 제공된 본문에 없는 사실은 추측하지 않고 "본문에 나오지 않음"으로 표시한다. HTML 태그를 출력하지 않는다. 다양한 타당한 학생 답변을 인정한다.',
              },
            ],
          },
          contents: [{ parts: [{ text: input.prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            maxOutputTokens: 12000,
          },
        }),
        signal: AbortSignal.timeout(55_000),
      },
    );
    if (!upstream.ok) {
      let reasons = [];
      try {
        const failure = await readLimitedJSON(upstream.body, MAX_RESPONSE_BYTES);
        reasons = (failure.error?.details || []).map((detail) => detail.reason);
      } catch {
        // Never expose upstream messages, which may contain request details.
      }
      if (reasons.includes("API_KEY_INVALID"))
        return reply(503, "AI 키가 유효하지 않습니다. 서버의 GEMINI_API_KEY에 새 키를 등록해 주세요. (AI_KEY_INVALID)");
      if (upstream.status === 404)
        return reply(502, "설정된 AI 모델을 찾을 수 없습니다. 서버의 GEMINI_MODEL 설정을 확인해 주세요. (AI_HTTP_404)");
      if (upstream.status === 400)
        return reply(502, "Google AI가 요청을 거절했습니다. 키 또는 요청 설정 확인이 필요합니다. (AI_HTTP_400)");
      if (upstream.status === 429)
        return reply(
          429,
          "무료 AI 사용량 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.",
        );
      if ([401, 403].includes(upstream.status))
        return reply(503, "서버의 AI 키 설정을 확인해 주세요.");
      return reply(
        502,
        `AI 서비스가 응답하지 않습니다. 잠시 후 다시 시도해 주세요. (AI_HTTP_${upstream.status})`,
      );
    }
    const data = await readLimitedJSON(upstream.body, MAX_RESPONSE_BYTES);
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts
      ?.map((part) => part.text || "")
      .join("");
    if (!text || candidate.finishReason !== "STOP")
      return reply(
        502,
        "답안이 완성되지 않았습니다. 본문 범위를 줄여 다시 시도해 주세요.",
      );
    const result = JSON.parse(text);
    return Response.json(
      { result },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return reply(
      error.name === "TimeoutError" ? 504 : 502,
      "AI 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
  }
}

export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/api/answers") return handleAI(request, env);
    if (pathname.startsWith("/api/"))
      return reply(404, "요청한 기능이 없습니다.");
    return env.ASSETS.fetch(request);
  },
};
