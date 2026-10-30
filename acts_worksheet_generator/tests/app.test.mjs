import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import vm from "node:vm";

async function app(history) {
  const dom = new JSDOM(readFileSync("index.html", "utf8"), {
    url: "https://worksheets.test",
    runScripts: "outside-only",
  });
  const w = dom.window;
  w.alert = () => {};
  w.confirm = () => true;
  w.HTMLElement.prototype.scrollIntoView = () => {};
  if (history !== undefined) w.localStorage.setItem("actsHistory", history);
  for (const f of [
    "acts_data.js",
    "acts_data_rkv.js",
    "spelling_100_data.js",
    "worksheet-core.js",
    "script.js",
  ])
    vm.runInContext(readFileSync(f, "utf8"), dom.getInternalVMContext());
  await new Promise((resolve) =>
    w.addEventListener("load", resolve, { once: true }),
  );
  return {
    dom,
    w,
    run: (code) => vm.runInContext(code, dom.getInternalVMContext()),
    close: () => w.close(),
  };
}
function generate(a, grade = "34", type = "sein_essay", end = 3) {
  const d = a.w.document;
  d.getElementById("grade").value = grade;
  d.getElementById("templateType").value = type;
  a.w.updateGrammarTypeSelect();
  d.getElementById("endVerse").value = String(end);
  a.w.generateWorksheet();
}
function answer(a) {
  return a.run(
    `({characters:'베드로',divisions:[{range:'1~3절',title:'약속'}],oneSentenceSummary:'요약',verseSummaries:currentWorksheetState.allVersesRKV.map(v=>({verse:v.num,summary:'요약',keyword:'말씀'})),keyWords:Array.from({length:gradeProfiles[currentWorksheetState.grade].keywords},()=>({word:'말씀',verse:'1절',reason:'중요'})),keySentence:{verse:'1절',sentence:'본문',reason:'이유'},sixW:{who:'사람',when:'본문에 나오지 않음',where:'장소',what:'사건',how:'방법',why:'이유'},sixWSummary:'정리',myThought:'생각'})`,
  );
}
test("all grades and both templates render; no duplicated short-range questions", async () => {
  const a = await app();
  for (const grade of ["12", "34", "56"])
    for (const type of ["sein_essay", "basic_grammar"]) {
      generate(a, grade, type, 2);
      assert.equal(
        a.w.document.getElementById("worksheetArea").style.display,
        "block",
      );
      if (type === "sein_essay") {
        assert.ok(a.w.document.querySelector(".grade-" + grade));
        assert.equal(
          a.w.document.querySelectorAll(".summary-table tbody tr").length,
          2,
        );
      } else
        assert.equal(a.run("currentWorksheetState.grammarVerses.length"), 2);
    }
  a.close();
});
test("saving quota error does not prevent worksheet rendering", async () => {
  const a = await app();
  a.w.Storage.prototype.setItem = () => {
    throw new Error("QuotaExceededError");
  };
  generate(a);
  assert.ok(a.w.document.querySelector(".workbook"));
  assert.match(
    a.w.document.getElementById("statusMessage").textContent,
    /저장하지 못/,
  );
  a.close();
});
test("corrupt history is preserved; generation still works", async () => {
  const a = await app("{bad");
  generate(a);
  assert.ok(a.w.document.querySelector(".workbook"));
  assert.equal(a.w.localStorage.getItem("actsHistory"), "{bad");
  a.close();
});
test("history rejects injected attributes and restores canonical Bible text", async () => {
  const a = await app();
  generate(a, "34", "basic_grammar");
  const state = JSON.parse(a.run("JSON.stringify(currentWorksheetState)"));
  state.grammarVerses[0].text = "<img src=x onerror=alert(1)>";
  a.w.localStorage.setItem("actsHistory", JSON.stringify([state]));
  a.w.loadState(state.id);
  assert.equal(a.w.document.querySelector("#worksheetContent img"), null);
  state.date = '2026" onmouseover="alert(1)';
  a.w.localStorage.setItem("actsHistory", JSON.stringify([state]));
  assert.equal(a.w.readHistory().length, 0);
  a.close();
});
test("basic AI answers survive history reload", async () => {
  const a = await app();
  generate(a, "34", "basic_grammar", 2);
  a.w.fetch = async () =>
    Response.json({
      result: [
        { guide: "주어 예시 1", inlineAnswers: ["베드로"] },
        { guide: "주어 예시 2", inlineAnswers: ["바울"] },
      ],
    });
  await a.w.generateAIAnswers();
  const id = a.run("currentWorksheetState.id");
  a.w.loadState(id);
  assert.match(
    a.w.document.querySelector(".grammar-answer").textContent,
    /주어 예시 1/,
  );
  a.close();
});
test("late AI response cannot replace a newer worksheet", async () => {
  const a = await app();
  generate(a);
  const result = answer(a);
  let resolve;
  a.w.fetch = () => new Promise((r) => (resolve = r));
  const pending = a.w.generateAIAnswers();
  generate(a, "12", "sein_essay", 2);
  const id = a.run("currentWorksheetState.id");
  resolve(Response.json({ result }));
  await pending;
  assert.equal(a.run("currentWorksheetState.id"), id);
  assert.equal(a.run("currentWorksheetState.aiAnswers"), null);
  a.close();
});
test("AI output is escaped and edited answers are saved", async () => {
  const a = await app();
  generate(a);
  const result = answer(a);
  result.characters = "<img src=x onerror=alert(1)>";
  a.w.fetch = async () => Response.json({ result });
  await a.w.generateAIAnswers();
  assert.equal(a.w.document.querySelector("#worksheetContent img"), null);
  const field = a.w.document.querySelector('[data-answer-path="characters"]');
  field.textContent = "수정한 답";
  field.dispatchEvent(new a.w.Event("blur"));
  a.w.loadState(a.run("currentWorksheetState.id"));
  assert.equal(
    a.w.document.querySelector('[data-answer-path="characters"]').textContent,
    "수정한 답",
  );
  a.close();
});
test("missing verse placeholder is not a grammar question", async () => {
  const a = await app();
  a.w.document.getElementById("chapter").value = "8";
  a.w.updateVerseSelects();
  a.w.document.getElementById("startVerse").value = "37";
  a.w.document.getElementById("endVerse").value = "37";
  a.w.generateWorksheet();
  assert.equal(a.run("currentWorksheetState"), null);
  a.close();
});
test("fixed spelling set stays fixed; random sets have 7 valid items", async () => {
  const a = await app();
  a.w.document.getElementById("spellingSetType").value = "standard";
  generate(a);
  const before = a.run("JSON.stringify(currentWorksheetState.spellingData)");
  a.w.reshuffleSpellingQuestions();
  assert.equal(
    a.run("JSON.stringify(currentWorksheetState.spellingData)"),
    before,
  );
  for (let i = 0; i < 30; i++) {
    const set = a.w.getRandomBareunSpellingSet();
    assert.equal(set.questions.length, 7);
    assert.equal(set.questions.filter((q) => q.isSpacing).length, 1);
  }
  a.close();
});
test("student print hides answers and restores teacher preview after print", async () => {
  const a = await app();
  generate(a);
  a.w.setAnswerPreview(true);
  let during;
  a.w.print = () => {
    during = a.w.document
      .getElementById("worksheetArea")
      .classList.contains("show-answers");
  };
  a.w.printWorksheet(false);
  assert.equal(during, false);
  a.w.dispatchEvent(new a.w.Event("afterprint"));
  assert.equal(
    a.w.document
      .getElementById("worksheetArea")
      .classList.contains("show-answers"),
    true,
  );
  a.close();
});
test("restore backup merges records without overwriting an ID collision", async () => {
  const a = await app();
  generate(a);
  const state = JSON.parse(a.run("JSON.stringify(currentWorksheetState)"));
  state.date = "2026-10-29";
  const input = {
    files: [{ size: 1000, text: async () => JSON.stringify([state]) }],
    value: "backup",
  };
  await a.w.importHistoryFile(input);
  assert.equal(a.w.readHistory().length, 2);
  assert.equal(new Set(a.w.readHistory().map((x) => x.id)).size, 2);
  a.close();
});
