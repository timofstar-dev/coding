/* Shared presentation and persistence helpers. No API credentials belong in this file. */
const gradeProfiles = {
  12: {
    keywords: 2,
    lines: 2,
    summary: "누가 무엇을 했는지 짧은 한 문장으로 써요.",
    paragraph: "위의 답을 이어서 1~2문장으로 써요.",
    thought: "나는 ________을 느꼈어요. 나도 ________을 해 보고 싶어요.",
    ai: "초등 1~2학년 수준. 쉬운 낱말, 짧은 문장, 요약문 1~2문장.",
  },
  34: {
    keywords: 3,
    lines: 3,
    summary: "중요한 내용을 내 말로 한 문장으로 줄여 써요.",
    paragraph: "위의 답을 이어서 2~3문장으로 정리해요.",
    thought: "나는 ________라고 생각해요. 왜냐하면 ________이기 때문이에요.",
    ai: "초등 3~4학년 수준. 핵심 사건과 이유를 구분하고 요약문 2~3문장.",
  },
  56: {
    keywords: 4,
    lines: 4,
    summary: "핵심 사건을 20자 안팎으로 요약하고 중심 낱말을 찾아요.",
    paragraph:
      "위의 답을 이어서 3~4문장으로 정리하고, 사건 사이의 관계를 드러내요.",
    thought:
      "나의 주장과 본문에서 찾은 근거를 쓰고, 생활 속 실천 방법을 제안해요.",
    ai: "초등 5~6학년 수준. 주장과 본문 근거를 구분하고 적용 방법 제시. 요약문 3~4문장.",
  },
};
function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function notifyStatus(message, isError = false) {
  const el = document.getElementById("statusMessage");
  if (el) {
    el.textContent = message;
    el.hidden = !message;
    el.classList.toggle("is-error", isError);
  }
}
let historyReadFailed = false;
function readHistory() {
  try {
    const data = JSON.parse(localStorage.getItem("actsHistory") || "[]");
    if (!Array.isArray(data)) throw new Error("Invalid history");
    historyReadFailed = false;
    return data.map(normalizeHistoryState);
  } catch {
    historyReadFailed = true;
    notifyStatus(
      "출제 기록을 읽지 못했습니다. 기존 기록은 덮어쓰지 않습니다. 기록을 백업한 뒤 복원해 주세요.",
      true,
    );
    return [];
  }
}
function writeHistory(data) {
  if (historyReadFailed) return false;
  try {
    localStorage.setItem("actsHistory", JSON.stringify(data));
    return true;
  } catch {
    notifyStatus(
      "활동지는 만들었지만 기록을 저장하지 못했습니다. 현재 활동지를 백업한 뒤 오래된 기록을 정리해 주세요.",
      true,
    );
    return false;
  }
}
function downloadJSON(name, value) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(
    new Blob([value], { type: "application/json" }),
  );
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function exportHistory() {
  try {
    downloadJSON(
      "출제기록-백업.json",
      localStorage.getItem("actsHistory") || "[]",
    );
  } catch {
    notifyStatus("브라우저가 기록 읽기를 차단했습니다.", true);
  }
}
function exportCurrentWorksheet() {
  if (currentWorksheetState)
    downloadJSON(
      "현재활동지-백업.json",
      JSON.stringify([currentWorksheetState], null, 2),
    );
}
function normalizeHistoryState(input) {
  if (
    !input ||
    !Number.isSafeInteger(input.id) ||
    input.id < 0 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(input.date) ||
    !["12", "34", "56"].includes(input.grade)
  )
    throw new Error("기록의 날짜·학년이 올바르지 않습니다.");
  const chapter = String(input.chapter);
  const { startVerse, endVerse } = input;
  if (
    !actsDataRkv[chapter] ||
    !Number.isInteger(startVerse) ||
    !Number.isInteger(endVerse) ||
    startVerse < 1 ||
    endVerse < startVerse ||
    endVerse > actsDataRkv[chapter].length
  )
    throw new Error("기록의 본문 범위가 올바르지 않습니다.");
  const templateType = input.templateType || "basic_grammar";
  if (!["sein_essay", "basic_grammar"].includes(templateType))
    throw new Error("지원하지 않는 활동지 양식입니다.");
  const verses = Array.from(
    { length: endVerse - startVerse + 1 },
    (_, i) => startVerse + i,
  );
  const state = {
    id: input.id,
    schemaVersion: 2,
    date: input.date,
    grade: input.grade,
    chapter,
    startVerse,
    endVerse,
    templateType,
    allVersesRKV: verses.map((num) => ({
      num,
      text: actsDataRkv[chapter][num - 1],
    })),
    allVersesERV: verses.map((num) => ({
      num,
      text: actsData[chapter][num - 1],
    })),
  };
  if (input.aiAnswers != null) {
    if (JSON.stringify(input.aiAnswers).length > 100000)
      throw new Error("답안 데이터가 너무 큽니다.");
    // Retain older answers even when the new grade profile has a different keyword count.
    const a = input.aiAnswers;
    if (templateType === "basic_grammar") {
      if (
        !Array.isArray(a) ||
        a.some(
          (x) =>
            !x ||
            typeof x.guide !== "string" ||
            !Array.isArray(x.inlineAnswers) ||
            x.inlineAnswers.some((y) => typeof y !== "string"),
        )
      )
        throw new Error("답안 데이터가 올바르지 않습니다.");
    } else if (
      typeof a !== "object" ||
      Array.isArray(a) ||
      ["verseSummaries", "keyWords", "divisions"].some(
        (k) =>
          a[k] != null &&
          (!Array.isArray(a[k]) ||
            a[k].some((x) => !x || typeof x !== "object")),
      )
    )
      throw new Error("답안 데이터가 올바르지 않습니다.");
    state.aiAnswers = a;
  }
  if (templateType === "sein_essay") {
    state.includeSpelling = input.includeSpelling !== false;
    state.includePassage = !!input.includePassage;
    state.spellingSetType = [
      "standard",
      "random100",
      ...Object.keys(bareunCuratedSets),
    ].includes(input.spellingSetType)
      ? input.spellingSetType
      : "standard";
    if (input.spellingData) {
      const sp = input.spellingData;
      if (
        !Array.isArray(sp.questions) ||
        sp.questions.length > 20 ||
        sp.questions.some(
          (q) =>
            !q || typeof q.text !== "string" || typeof q.answer !== "string",
        )
      )
        throw new Error("맞춤법 문항 데이터가 올바르지 않습니다.");
      state.spellingData = {
        questions: sp.questions.map((q, i) => ({
          num: i + 1,
          text: q.text,
          answer: q.answer,
          options: Array.isArray(q.options)
            ? q.options.filter((x) => typeof x === "string")
            : [],
          isSpacing: !!q.isSpacing,
        })),
        answerGuide: sp.questions
          .map((q, i) => `${i + 1}) ${q.answer}`)
          .join(" "),
      };
    } else state.spellingData = seinStandardSpelling;
  } else {
    if (
      !Array.isArray(input.confusingWordIndices) ||
      input.confusingWordIndices.length !== 3 ||
      input.confusingWordIndices.some(
        (i) => !Number.isInteger(i) || !confusingWordsPool[i],
      )
    )
      throw new Error("문법 문항이 올바르지 않습니다.");
    state.confusingWordIndices = input.confusingWordIndices;
    state.qTypeIndex =
      Number.isInteger(input.qTypeIndex) &&
      grammarPools[input.grade][input.qTypeIndex]
        ? input.qTypeIndex
        : 0;
    for (const key of ["spacingVerses", "grammarVerses"]) {
      if (
        !Array.isArray(input[key]) ||
        input[key].length > 10 ||
        input[key].some((v) => !v || !verses.includes(v.num))
      )
        throw new Error("문항의 절 번호가 올바르지 않습니다.");
      state[key] = input[key]
        .filter((v) => actsDataRkv[chapter][v.num - 1] !== "(없음)")
        .map((v) => ({ num: v.num, text: actsDataRkv[chapter][v.num - 1] }));
    }
  }
  return state;
}
async function importHistoryFile(input) {
  const file = input.files?.[0];
  if (!file) return;
  try {
    if (file.size > 10_000_000)
      throw new Error("10MB 이하의 기록 파일을 선택해 주세요.");
    const parsed = JSON.parse(await file.text());
    if (!Array.isArray(parsed) || parsed.length > 200)
      throw new Error("최대 200개의 기록을 복원할 수 있습니다.");
    const imported = parsed.map(normalizeHistoryState);
    const previous = readHistory();
    if (historyReadFailed)
      throw new Error(
        "기존 기록이 손상되었습니다. 먼저 백업한 뒤 전체 초기화 후 복원해 주세요.",
      );
    const merged = new Map(previous.map((state) => [state.id, state]));
    let id = Date.now();
    for (const state of imported) {
      if (
        merged.has(state.id) &&
        JSON.stringify(merged.get(state.id)) !== JSON.stringify(state)
      ) {
        while (merged.has(id)) id++;
        state.id = id++;
      }
      merged.set(state.id, state);
    }
    if (merged.size > 200)
      throw new Error(
        "합친 기록이 200개를 넘습니다. 기존 기록을 백업하고 정리한 뒤 복원해 주세요.",
      );
    if (!writeHistory([...merged.values()].sort((a, b) => b.id - a.id))) return;
    updateFilterDateDropdown();
    renderHistory();
    notifyStatus(`${imported.length}개의 기록을 복원했습니다.`);
  } catch (error) {
    notifyStatus(error.message || "기록 파일을 읽지 못했습니다.", true);
  } finally {
    input.value = "";
  }
}
function validateAnswers(result, state) {
  const string = (v) => typeof v === "string" && v.length <= 5000;
  if (state.templateType !== "sein_essay") {
    if (
      !Array.isArray(result) ||
      result.length !== state.grammarVerses.length ||
      !result.every(
        (a) =>
          a &&
          string(a.guide) &&
          Array.isArray(a.inlineAnswers) &&
          a.inlineAnswers.every(string),
      )
    )
      throw new Error("답안 형식 또는 문항 수가 올바르지 않습니다.");
    return result;
  }
  const verses = state.allVersesRKV
    .filter((v) => v.text !== "(없음)")
    .map((v) => v.num);
  if (
    !result ||
    !["characters", "oneSentenceSummary", "sixWSummary", "myThought"].every(
      (k) => string(result[k]),
    ) ||
    !Array.isArray(result.verseSummaries) ||
    result.verseSummaries.length !== verses.length ||
    new Set(result.verseSummaries.map((v) => v.verse)).size !== verses.length ||
    !result.verseSummaries.every(
      (v) => verses.includes(v.verse) && string(v.summary) && string(v.keyword),
    ) ||
    !Array.isArray(result.divisions) ||
    result.divisions.length < 1 ||
    result.divisions.length > Math.min(3, verses.length) ||
    !result.divisions.every((v) => string(v.range) && string(v.title)) ||
    !Array.isArray(result.keyWords) ||
    result.keyWords.length !== gradeProfiles[state.grade].keywords ||
    !result.keyWords.every((v) =>
      ["word", "verse", "reason"].every((k) => string(v[k])),
    ) ||
    !result.keySentence ||
    !["verse", "sentence", "reason"].every((k) =>
      string(result.keySentence[k]),
    ) ||
    !result.sixW ||
    !["who", "when", "where", "what", "how", "why"].every((k) =>
      string(result.sixW[k]),
    )
  )
    throw new Error(
      "답안의 절 번호나 필수 항목이 맞지 않습니다. 다시 생성해 주세요.",
    );
  return result;
}
function renderSavedBasicAnswers(state) {
  if (!Array.isArray(state.aiAnswers)) return;
  document.querySelectorAll(".grammar-q").forEach((question, i) => {
    const answer = state.aiAnswers[i];
    if (!answer) return;
    const box = question.querySelector(".grammar-answer");
    if (box) box.textContent = "[예시 답안] " + answer.guide;
    question.querySelectorAll(".answer-text").forEach((blank, j) => {
      if (answer.inlineAnswers[j]) blank.textContent = answer.inlineAnswers[j];
    });
  });
}
function renderSeinWorksheetHtml(state) {
  const e = escapeHtml;
  const profile = gradeProfiles[state.grade] || gradeProfiles["34"];
  const ai = state.aiAnswers || {};
  const verses = state.allVersesRKV.filter((v) => v.text !== "(없음)");
  const answer = (value, path) =>
    `<span class="sein-answer" ${path ? `data-answer-path="${e(path)}" contenteditable="true" role="textbox" aria-label="예시 답안 수정"` : ""}>${e(value || "")}</span>`;
  const space = (value, path, lines = profile.lines) =>
    `<div class="writing-space" style="--lines:${lines}">${answer(value, path)}</div>`;
  const header = (n, title, desc) =>
    `<header class="activity-heading"><span class="activity-number">${n}</span><div><h3>${title}</h3><p>${desc}</p></div></header>`;
  const keywords = Array.from({ length: profile.keywords }, (_, i) => {
    const item = ai.keyWords?.[i] || {};
    return `<tr><td>${answer(item.word, `keyWords.${i}.word`)}</td><td>${answer(item.verse, `keyWords.${i}.verse`)}</td><td>${answer(item.reason, `keyWords.${i}.reason`)}</td></tr>`;
  }).join("");
  const divisions = Array.from(
    { length: Math.min(3, verses.length) },
    (_, i) =>
      `<tr><td>${i + 1}</td><td>${answer(ai.divisions?.[i]?.range, `divisions.${i}.range`)}</td><td>${answer(ai.divisions?.[i]?.title, `divisions.${i}.title`)}</td></tr>`,
  ).join("");
  const summaries = verses
    .map((v) => {
      const i = ai.verseSummaries?.findIndex((a) => a.verse === v.num) ?? -1;
      const item = ai.verseSummaries?.[i] || {};
      return `<tr><td class="verse-number">${v.num}</td><td>${answer(item.summary, i >= 0 ? `verseSummaries.${i}.summary` : null)}</td><td>${answer(item.keyword, i >= 0 ? `verseSummaries.${i}.keyword` : null)}</td></tr>`;
    })
    .join("");
  let spelling = "";
  if (state.includeSpelling !== false) {
    const sp = state.spellingData || seinStandardSpelling;
    spelling = `<section class="workbook-section spelling-section">${header("04", "바르게 쓰기", "알맞은 말을 고르고, 띄어 써야 할 곳을 표시해요.")}
      <ol class="spelling-list">${sp.questions.map((q) => `<li><div>${e(q.text)}</div>${answer(q.answer)}</li>`).join("")}</ol>
      <div class="sein-teacher-key">예시 정답 · ${e(sp.answerGuide)}</div>
      <button type="button" class="text-button no-print" onclick="reshuffleSpellingQuestions()">문제 다시 섞기</button></section>`;
  }
  const sixLabels = [
    ["who", "누가", "중심 인물은 누구인가요?"],
    ["when", "언제", "언제 일어났나요?"],
    ["where", "어디서", "어디에서 일어났나요?"],
    ["what", "무엇을", "무슨 일이 있었나요?"],
    ["how", "어떻게", "어떤 방법으로 했나요?"],
    ["why", "왜", "그 까닭은 무엇인가요?"],
  ];
  return `<article class="workbook grade-${e(state.grade)}">
    <header class="workbook-header"><div class="eyebrow">SEIN SCHOOL · READ / THINK / WRITE</div><h2 id="ws-main-title">말씀을 읽고, 생각을 쓰다</h2><p class="workbook-subtitle">사도행전 ${e(state.chapter)}장 ${state.startVerse}–${state.endVerse}절 <span>초등 ${getGradeName(state.grade)}</span></p><div class="student-meta"><span>이름 <b></b></span><span>학년·반 <b></b></span><span>날짜 ${e(state.date)}</span></div></header>
    <p class="teacher-notice sein-answer">교사용 예시 답안 · 본문과 대조해 검토한 뒤 사용하세요. 타당한 다른 답변도 인정합니다.</p>
    ${state.includePassage ? `<section class="reading-passage"><div class="eyebrow">오늘의 본문 · 개역개정</div>${verses.map((v) => `<p><sup>${v.num}</sup>${e(v.text)}</p>`).join("")}</section>` : ""}
    <section class="workbook-section">${header("01", "글의 흐름 살피기", "본문을 두 번 읽고, 이야기의 큰 흐름을 찾아요.")}
      <div class="reading-check">읽은 횟수 &nbsp; □ 한 번 &nbsp; □ 두 번</div>
      <h4>모르는 낱말을 찾아보세요.</h4><table class="workbook-table"><thead><tr><th>낱말</th><th>짐작한 뜻</th><th>찾아본 뜻</th></tr></thead><tbody>${Array.from({ length: state.grade === "12" ? 2 : 3 }, () => "<tr><td></td><td></td><td></td></tr>").join("")}</tbody></table>
      <h4>누가 나오나요?</h4>${space(ai.characters, "characters", 1)}
      <h4>내용을 나누고 소제목을 붙여 보세요.</h4><table class="workbook-table"><thead><tr><th class="narrow">부분</th><th>절 범위</th><th>소제목</th></tr></thead><tbody>${divisions}</tbody></table>
      <h4>이 글을 한 문장으로 소개한다면?</h4>${space(ai.oneSentenceSummary, "oneSentenceSummary", 2)}
    </section>
    <section class="workbook-section">${header("02", "내 말로 요약하기", profile.summary)}<table class="workbook-table summary-table"><thead><tr><th class="narrow">절</th><th>한 줄 요약</th><th class="keyword-column">중심 낱말</th></tr></thead><tbody>${summaries}</tbody></table><p class="quiet-tip">누가 → 무엇을 했나요? → 꼭 필요한 말만 남겨요.</p></section>
    <section class="workbook-section">${header("03", "핵심과 근거 찾기", `중요한 낱말 ${profile.keywords}개와 글 전체를 대표하는 문장을 찾아요.`)}<table class="workbook-table"><thead><tr><th>핵심 낱말</th><th class="narrow">절</th><th>중요한 까닭</th></tr></thead><tbody>${keywords}</tbody></table>
      <h4>핵심 문장과 절 번호</h4>${space(ai.keySentence?.sentence, "keySentence.sentence", 2)}${answer(ai.keySentence?.verse, "keySentence.verse")}
      <h4>이 문장을 고른 까닭</h4>${space(ai.keySentence?.reason, "keySentence.reason", 2)}
    </section>
    ${spelling}
    <section class="workbook-section">${header(state.includeSpelling !== false ? "05" : "04", "생각을 한 편의 글로", "본문에 없는 정보는 “본문에 나오지 않음”이라고 써도 좋아요.")}
      <table class="workbook-table sixw-table"><thead><tr><th class="narrow">질문</th><th>생각할 것</th><th>내 답</th></tr></thead><tbody>${sixLabels.map(([key, label, question]) => `<tr><th>${label}</th><td>${question}</td><td>${answer(ai.sixW?.[key], `sixW.${key}`)}</td></tr>`).join("")}</tbody></table>
      <h4>한 문단으로 정리하기</h4><p class="question-hint">${profile.paragraph}</p>${space(ai.sixWSummary, "sixWSummary")}
      <h4>나의 생각과 실천</h4><p class="question-hint">${profile.thought}</p>${space(ai.myThought, "myThought")}
      <div class="reflection"><h4>오늘의 배움 돌아보기</h4><p>□ 흐름을 이해했어요 &nbsp; □ 내 말로 요약했어요 &nbsp; □ 근거를 찾았어요</p><p class="question-hint">더 알고 싶은 점이나 어려웠던 부분을 적어 보세요.</p>${space("", null, 2)}</div>
    </section><footer class="workbook-footer">SEIN SCHOOL <span>사도행전 · 읽기와 생각 쓰기</span></footer>
  </article>`;
}
