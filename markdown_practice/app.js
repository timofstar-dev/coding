/**
 * Markdown Craft - 메인 애플리케이션 스크립트
 * 4대 모드(퀘스트, 스피드 타자, 퀴즈, 샌드박스), 렌더러, 오디오 신시사이저, 캔버스 컨페티
 */

// ==========================================================================
// 1. 상태 관리 (State Management)
// ==========================================================================
const AppState = {
  currentTab: "tab-quest",
  currentLessonIndex: 0,
  completedLessons: new Set(),
  questViewMode: "live", // 'live' | 'target'
  soundEnabled: true,
  theme: "dark",

  // Typing state
  typingIndex: 0,
  typingText: "",
  typingInput: "",
  typingStartTime: null,
  typingTimerInterval: null,
  typingErrors: 0,
  typingLevelIndex: 0,

  // Quiz state
  quizCurrentIndex: 0,
  quizScore: 0,
  quizAnswered: false,

  // Playground state
  playgroundDraft: ""
};

// ==========================================================================
// 2. 오디오 신시사이저 (Web Audio API - 무외부 의존성)
// ==========================================================================
class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(freq, type = "sine", duration = 0.15, gainVal = 0.08) {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  playSuccessChime() {
    if (!AppState.soundEnabled) return;
    this.init();
    // E5 -> G#5 -> B5 -> E6 arpeggio
    const notes = [659.25, 830.61, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.35, 0.09);
      }, idx * 75);
    });
  }

  playKeyClick() {
    this.playTone(720, "sine", 0.04, 0.02);
  }

  playErrorBuzz() {
    this.playTone(180, "sawtooth", 0.22, 0.06);
  }
}

const AudioPlayer = new SoundSynth();

// ==========================================================================
// 3. 캔버스 컨페티 (Canvas Confetti - 자체 내장 엔진)
// ==========================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  trigger(count = 70) {
    if (!this.ctx) return;
    this.resize();
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#38bdf8", "#a855f7"];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1.2) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.alpha -= 0.012;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

let Confetti;

// ==========================================================================
// 4. 강력한 마크다운 렌더러 (Marked.js 연동 + 폴백 파서)
// ==========================================================================
function renderMarkdown(mdText) {
  if (!mdText) return "";

  // 1순위: Marked.js 라이브러리 사용
  if (typeof marked !== "undefined" && typeof marked.parse === "function") {
    try {
      marked.setOptions({
        gfm: true,
        breaks: true
      });
      let html = marked.parse(mdText);
      // GitHub Callouts 확장 지원 (> [!NOTE], > [!TIP], > [!WARNING], > [!CAUTION])
      html = html.replace(
        /<blockquote>\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:<br>)?([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
        (match, type, content) => {
          const typeLower = type.toLowerCase();
          const icons = {
            note: "ℹ️ NOTE",
            tip: "💡 TIP",
            important: "📌 IMPORTANT",
            warning: "⚠️ WARNING",
            caution: "🛑 CAUTION"
          };
          return `<div class="callout-box callout-${typeLower}">
            <div class="callout-title">${icons[typeLower] || type}</div>
            <div class="callout-body">${content}</div>
          </div>`;
        }
      );
      return html;
    } catch (e) {
      console.warn("Marked parse error, fallback to built-in parser", e);
    }
  }

  // 2순위: 내장 순수 JS 폴백 파서
  return parseMarkdownFallback(mdText);
}

function parseMarkdownFallback(md) {
  let html = md;
  // HTML Escape for safety
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Restore details / summary tags if present
  html = html
    .replace(/&lt;details&gt;/gi, "<details>")
    .replace(/&lt;\/details&gt;/gi, "</details>")
    .replace(/&lt;summary&gt;/gi, "<summary>")
    .replace(/&lt;\/summary&gt;/gi, "</summary>")
    .replace(/&lt;u&gt;/gi, "<u>")
    .replace(/&lt;\/u&gt;/gi, "</u>");

  // Fenced Code Blocks
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)\n```/g, (m, lang, code) => {
    return `<pre><code class="language-${lang}">${code}</code></pre>`;
  });

  // Inline Code
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");

  // Headings
  html = html.replace(/^######[ \t]+(.*)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####[ \t]+(.*)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####[ \t]+(.*)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###[ \t]+(.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##[ \t]+(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#[ \t]+(.*)$/gm, "<h1>$1</h1>");

  // Horizontal Rule
  html = html.replace(/^(?:---|\*\*\*|___)[ \t]*$/gm, "<hr />");

  // Bold & Italic
  html = html.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Task Lists
  html = html.replace(/^[ \t]*[-*+][ \t]+\[ \][ \t]+(.*)$/gm, '<li class="task-list-item"><input type="checkbox" disabled /> $1</li>');
  html = html.replace(/^[ \t]*[-*+][ \t]+\[[xX]\][ \t]+(.*)$/gm, '<li class="task-list-item"><input type="checkbox" checked disabled /> $1</li>');

  // Unordered Lists
  html = html.replace(/^[ \t]*[-*+][ \t]+(.*)$/gm, "<li>$1</li>");

  // Blockquotes
  html = html.replace(/^&gt;[ \t]+(.*)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Paragraphs & Line Breaks
  html = html.replace(/\n\n+/g, "</p><p>");
  html = `<p>${html}</p>`;
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
}

// ==========================================================================
// 5. 로컬스토리지 영속화 (Storage Helper)
// ==========================================================================
function loadStorage() {
  try {
    const savedCompleted = localStorage.getItem("mdcraft_completed");
    if (savedCompleted) {
      AppState.completedLessons = new Set(JSON.parse(savedCompleted));
    }
    const savedTheme = localStorage.getItem("mdcraft_theme");
    if (savedTheme) {
      AppState.theme = savedTheme;
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    const savedSound = localStorage.getItem("mdcraft_sound");
    if (savedSound !== null) {
      AppState.soundEnabled = savedSound === "true";
      updateSoundButtonUI();
    }
    const savedDraft = localStorage.getItem("mdcraft_draft");
    if (savedDraft) {
      AppState.playgroundDraft = savedDraft;
    }
  } catch (e) {
    console.error("Failed to load local storage", e);
  }
}

function saveCompletedLessons() {
  try {
    localStorage.setItem(
      "mdcraft_completed",
      JSON.stringify(Array.from(AppState.completedLessons))
    );
  } catch (e) {
    console.error("Save completed lessons error", e);
  }
}

function updateSoundButtonUI() {
  const btn = document.getElementById("toggle-sound-btn");
  if (btn) {
    btn.innerHTML = AppState.soundEnabled ? "🔊" : "🔇";
    btn.title = AppState.soundEnabled ? "효과음 끄기" : "효과음 켜기";
  }
}

// ==========================================================================
// 6. 퀘스트 학습 모드 로직 (Quest Mode)
// ==========================================================================
function initQuestMode() {
  renderCurriculumSidebar();
  loadLesson(AppState.currentLessonIndex);
  updateHeaderProgress();

  const codeInput = document.getElementById("quest-code-input");
  codeInput.addEventListener("input", () => {
    handleQuestInput();
  });

  // Tab key indentation support in textarea
  enableTabIndent(codeInput);

  // Nav buttons
  document.getElementById("quest-prev-btn").addEventListener("click", () => {
    if (AppState.currentLessonIndex > 0) {
      loadLesson(AppState.currentLessonIndex - 1);
    }
  });

  document.getElementById("quest-next-btn").addEventListener("click", () => {
    if (AppState.currentLessonIndex < LESSONS_DATA.length - 1) {
      loadLesson(AppState.currentLessonIndex + 1);
    }
  });

  // Hint button
  const hintBtn = document.getElementById("quest-hint-btn");
  const hintDrawer = document.getElementById("quest-hint-drawer");
  hintBtn.addEventListener("click", () => {
    hintDrawer.classList.toggle("open");
  });

  // Answer button
  document.getElementById("quest-answer-btn").addEventListener("click", () => {
    const curLesson = LESSONS_DATA[AppState.currentLessonIndex];
    if (curLesson) {
      if (confirm("정답 예시 코드를 에디터에 자동으로 불러올까요?")) {
        codeInput.value = curLesson.targetCode;
        handleQuestInput();
      }
    }
  });

  // Reset button
  document.getElementById("quest-reset-code-btn").addEventListener("click", () => {
    const curLesson = LESSONS_DATA[AppState.currentLessonIndex];
    if (curLesson) {
      codeInput.value = curLesson.starterCode;
      handleQuestInput();
    }
  });

  // Live vs Target Preview Switcher
  const liveBtn = document.getElementById("quest-view-live-btn");
  const targetBtn = document.getElementById("quest-view-target-btn");

  liveBtn.addEventListener("click", () => {
    AppState.questViewMode = "live";
    liveBtn.classList.add("active");
    targetBtn.classList.remove("active");
    updateQuestPreview();
  });

  targetBtn.addEventListener("click", () => {
    AppState.questViewMode = "target";
    targetBtn.classList.add("active");
    liveBtn.classList.remove("active");
    updateQuestPreview();
  });
}

function renderCurriculumSidebar() {
  const container = document.getElementById("curriculum-container");
  container.innerHTML = "";

  // Group by chapter
  const chapters = {};
  LESSONS_DATA.forEach((lesson, index) => {
    const chap = lesson.chapter;
    if (!chapters[chap]) {
      chapters[chap] = {
        title: lesson.chapterTitle,
        lessons: []
      };
    }
    chapters[chap].lessons.push({ lesson, index });
  });

  Object.keys(chapters).forEach((chapNum) => {
    const chapData = chapters[chapNum];
    const groupDiv = document.createElement("div");
    groupDiv.className = "chapter-group";

    const headerDiv = document.createElement("div");
    headerDiv.className = "chapter-title";
    headerDiv.textContent = `Ch.${chapNum}. ${chapData.title}`;
    groupDiv.appendChild(headerDiv);

    chapData.lessons.forEach(({ lesson, index }) => {
      const isCompleted = AppState.completedLessons.has(lesson.id);
      const isActive = index === AppState.currentLessonIndex;

      const itemBtn = document.createElement("button");
      itemBtn.className = `lesson-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`;
      itemBtn.dataset.index = index;

      itemBtn.innerHTML = `
        <div class="lesson-left">
          <span class="lesson-check">${isCompleted ? "✓" : "○"}</span>
          <span class="lesson-name">${lesson.title}</span>
        </div>
        <span class="lesson-badge">${lesson.badge}</span>
      `;

      itemBtn.addEventListener("click", () => {
        loadLesson(index);
      });

      groupDiv.appendChild(itemBtn);
    });

    container.appendChild(groupDiv);
  });
}

function loadLesson(index) {
  if (index < 0 || index >= LESSONS_DATA.length) return;
  AppState.currentLessonIndex = index;
  const lesson = LESSONS_DATA[index];

  // Update Topbar
  document.getElementById("quest-title").textContent = lesson.title;
  document.getElementById("quest-difficulty").textContent = lesson.difficulty;
  document.getElementById("quest-prev-btn").disabled = index === 0;
  document.getElementById("quest-next-btn").disabled = index === LESSONS_DATA.length - 1;

  // Description & syntax chips
  document.getElementById("quest-description").innerHTML = lesson.description;
  const chipContainer = document.getElementById("quest-syntax-chips");
  chipContainer.innerHTML = "";
  if (lesson.guide && lesson.guide.length > 0) {
    lesson.guide.forEach((g) => {
      const chip = document.createElement("div");
      chip.className = "guide-code-chip";
      chip.innerHTML = g;
      chipContainer.appendChild(chip);
    });
  }

  // Hint
  const hintDrawer = document.getElementById("quest-hint-drawer");
  hintDrawer.classList.remove("open");
  hintDrawer.innerHTML = `<strong>💡 힌트:</strong> ${lesson.hint}`;

  // Code input
  const codeInput = document.getElementById("quest-code-input");
  codeInput.value = lesson.starterCode;

  // Reset Preview Tab to Live
  AppState.questViewMode = "live";
  document.getElementById("quest-view-live-btn").classList.add("active");
  document.getElementById("quest-view-target-btn").classList.remove("active");

  renderCurriculumSidebar();
  handleQuestInput();
}

function handleQuestInput() {
  const lesson = LESSONS_DATA[AppState.currentLessonIndex];
  if (!lesson) return;

  const currentCode = document.getElementById("quest-code-input").value;
  updateQuestPreview();

  // Validate criteria
  const checklistContainer = document.getElementById("criteria-checklist");
  checklistContainer.innerHTML = "";
  let passCount = 0;

  lesson.requirements.forEach((req) => {
    const passed = req.check(currentCode);
    if (passed) passCount++;

    const li = document.createElement("li");
    li.className = `criteria-item ${passed ? "checked" : ""}`;
    li.innerHTML = `
      <span class="criteria-icon">${passed ? "✓" : ""}</span>
      <span>${req.text}</span>
    `;
    checklistContainer.appendChild(li);
  });

  const countText = document.getElementById("criteria-count-text");
  countText.textContent = `${passCount} / ${lesson.requirements.length} 통과`;
  if (passCount === lesson.requirements.length) {
    countText.style.color = "var(--accent-success)";
  } else {
    countText.style.color = "var(--text-muted)";
  }

  // Check if fully solved
  const isAllPassed = passCount === lesson.requirements.length;
  if (isAllPassed && !AppState.completedLessons.has(lesson.id)) {
    AppState.completedLessons.add(lesson.id);
    saveCompletedLessons();
    AudioPlayer.playSuccessChime();
    Confetti.trigger(80);
    showCelebrationToast(`🎉 ${lesson.title} 완벽 통과!`, "조건을 모두 달성했습니다. 다음 레벨로 도전하세요!");
    renderCurriculumSidebar();
    updateHeaderProgress();
  }
}

function updateQuestPreview() {
  const lesson = LESSONS_DATA[AppState.currentLessonIndex];
  const previewArea = document.getElementById("quest-preview-area");
  if (!lesson || !previewArea) return;

  if (AppState.questViewMode === "live") {
    const code = document.getElementById("quest-code-input").value;
    previewArea.innerHTML = renderMarkdown(code);
  } else {
    previewArea.innerHTML = renderMarkdown(lesson.targetCode);
  }
}

function updateHeaderProgress() {
  const total = LESSONS_DATA.length;
  const count = AppState.completedLessons.size;
  const percent = Math.round((count / total) * 100);

  const headerBadge = document.getElementById("header-completed-count");
  if (headerBadge) headerBadge.textContent = count;

  const sidebarPercent = document.getElementById("sidebar-progress-percent");
  if (sidebarPercent) sidebarPercent.textContent = `${percent}%`;
}

function showCelebrationToast(title, subtitle) {
  const toast = document.getElementById("celebration-toast");
  const titleEl = document.getElementById("toast-title");
  const subEl = document.getElementById("toast-subtitle");

  titleEl.textContent = title;
  subEl.textContent = subtitle;

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// ==========================================================================
// 7. 마크다운 스피드 타자 연습 (Speed Typing Mode)
// ==========================================================================
function initTypingMode() {
  renderTypingLevels();
  loadTypingLevel(0);

  const stageBox = document.getElementById("typing-stage-box");
  const hiddenInput = document.getElementById("typing-hidden-input");

  stageBox.addEventListener("click", () => {
    hiddenInput.focus();
  });

  hiddenInput.addEventListener("input", (e) => {
    handleTypingInput(e.target.value);
  });

  document.getElementById("typing-restart-btn").addEventListener("click", () => {
    loadTypingLevel(AppState.typingLevelIndex);
  });
}

function renderTypingLevels() {
  const container = document.getElementById("typing-level-buttons");
  container.innerHTML = "";

  TYPING_DATA.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.className = `level-btn ${idx === AppState.typingLevelIndex ? "active" : ""}`;
    btn.textContent = `${item.title} (${item.category})`;
    btn.addEventListener("click", () => {
      loadTypingLevel(idx);
    });
    container.appendChild(btn);
  });
}

function loadTypingLevel(index) {
  clearInterval(AppState.typingTimerInterval);
  AppState.typingLevelIndex = index;
  const data = TYPING_DATA[index];
  AppState.typingText = data.text;
  AppState.typingInput = "";
  AppState.typingStartTime = null;
  AppState.typingErrors = 0;

  renderTypingLevels();

  const hiddenInput = document.getElementById("typing-hidden-input");
  hiddenInput.value = "";
  hiddenInput.focus();

  document.getElementById("typing-cpm").textContent = "0";
  document.getElementById("typing-wpm").textContent = "0";
  document.getElementById("typing-acc").textContent = "100%";
  document.getElementById("typing-timer").textContent = "00:00";

  renderTypingChars();
  updateTypingLiveRender("");
}

function renderTypingChars() {
  const container = document.getElementById("typing-char-container");
  container.innerHTML = "";

  const text = AppState.typingText;
  const input = AppState.typingInput;

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = text[i];

    if (i < input.length) {
      if (input[i] === text[i]) {
        span.classList.add("correct");
      } else {
        span.classList.add("incorrect");
      }
    } else if (i === input.length) {
      span.classList.add("current");
    }

    container.appendChild(span);
  }
}

function handleTypingInput(value) {
  if (!AppState.typingStartTime && value.length > 0) {
    AppState.typingStartTime = Date.now();
    startTypingTimer();
  }

  AudioPlayer.playKeyClick();
  AppState.typingInput = value;

  // Calculate errors
  let errors = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== AppState.typingText[i]) {
      errors++;
    }
  }
  AppState.typingErrors = errors;

  renderTypingChars();
  updateTypingStats();
  updateTypingLiveRender(value);

  // Check if finished
  if (value.length >= AppState.typingText.length) {
    finishTypingLevel();
  }
}

function startTypingTimer() {
  AppState.typingTimerInterval = setInterval(() => {
    if (!AppState.typingStartTime) return;
    const elapsedSec = Math.floor((Date.now() - AppState.typingStartTime) / 1000);
    const m = String(Math.floor(elapsedSec / 60)).padStart(2, "0");
    const s = String(elapsedSec % 60).padStart(2, "0");
    document.getElementById("typing-timer").textContent = `${m}:${s}`;
    updateTypingStats();
  }, 500);
}

function updateTypingStats() {
  if (!AppState.typingStartTime) return;
  const elapsedMinutes = (Date.now() - AppState.typingStartTime) / 1000 / 60;
  if (elapsedMinutes <= 0) return;

  const totalTyped = AppState.typingInput.length;
  const correctTyped = Math.max(0, totalTyped - AppState.typingErrors);

  const cpm = Math.round(correctTyped / elapsedMinutes);
  const wpm = Math.round(cpm / 5);
  const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;

  document.getElementById("typing-cpm").textContent = cpm;
  document.getElementById("typing-wpm").textContent = wpm;
  document.getElementById("typing-acc").textContent = `${accuracy}%`;
}

function updateTypingLiveRender(text) {
  const container = document.getElementById("typing-live-render");
  container.innerHTML = renderMarkdown(text);
}

function finishTypingLevel() {
  clearInterval(AppState.typingTimerInterval);
  AudioPlayer.playSuccessChime();
  Confetti.trigger(100);
  const cpm = document.getElementById("typing-cpm").textContent;
  const acc = document.getElementById("typing-acc").textContent;

  showCelebrationToast("⚡ 타자 연습 완료!", `속도: ${cpm} CPM | 정확도: ${acc}`);
}

// ==========================================================================
// 8. 마크다운 문법 퀴즈 (Quiz Mode)
// ==========================================================================
function initQuizMode() {
  AppState.quizCurrentIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswered = false;

  loadQuizQuestion(0);

  document.getElementById("quiz-next-btn").addEventListener("click", () => {
    if (AppState.quizCurrentIndex < QUIZ_DATA.length - 1) {
      loadQuizQuestion(AppState.quizCurrentIndex + 1);
    } else {
      finishQuiz();
    }
  });
}

function loadQuizQuestion(index) {
  AppState.quizCurrentIndex = index;
  AppState.quizAnswered = false;
  const item = QUIZ_DATA[index];

  // Progress UI
  document.getElementById("quiz-question-number").textContent = `문제 ${index + 1} / ${QUIZ_DATA.length}`;
  const fillPercent = ((index + 1) / QUIZ_DATA.length) * 100;
  document.getElementById("quiz-progress-fill").style.width = `${fillPercent}%`;
  document.getElementById("quiz-current-score").textContent = `현재 점수: ${AppState.quizScore}점`;

  // Question & Options
  document.getElementById("quiz-question-title").textContent = item.question;
  const optionsContainer = document.getElementById("quiz-options-container");
  optionsContainer.innerHTML = "";

  const letters = ["A", "B", "C", "D"];
  item.options.forEach((optText, optIdx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.innerHTML = `
      <span class="option-letter">${letters[optIdx]}</span>
      <span>${escapeHtml(optText)}</span>
    `;

    btn.addEventListener("click", () => {
      if (!AppState.quizAnswered) {
        handleQuizAnswer(optIdx, item.answer, item.explanation, btn);
      }
    });

    optionsContainer.appendChild(btn);
  });

  // Hide explanation & next button
  const expBox = document.getElementById("quiz-explanation-box");
  expBox.classList.remove("show");
  expBox.innerHTML = "";
  document.getElementById("quiz-next-btn").style.display = "none";
}

function handleQuizAnswer(selectedIdx, correctIdx, explanation, clickedBtn) {
  AppState.quizAnswered = true;
  const isCorrect = selectedIdx === correctIdx;

  const allOptionBtns = document.querySelectorAll(".quiz-option-btn");
  allOptionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.classList.add("correct");
    }
  });

  if (isCorrect) {
    clickedBtn.classList.add("correct");
    AppState.quizScore += 10;
    AudioPlayer.playSuccessChime();
    document.getElementById("quiz-current-score").textContent = `현재 점수: ${AppState.quizScore}점`;
  } else {
    clickedBtn.classList.add("wrong");
    AudioPlayer.playErrorBuzz();
  }

  // Show explanation
  const expBox = document.getElementById("quiz-explanation-box");
  expBox.innerHTML = `<strong>${isCorrect ? "✅ 정답입니다!" : "❌ 아쉽네요!"}</strong><br>${explanation}`;
  expBox.classList.add("show");

  // Show next button
  const nextBtn = document.getElementById("quiz-next-btn");
  nextBtn.style.display = "inline-flex";
  nextBtn.textContent = AppState.quizCurrentIndex === QUIZ_DATA.length - 1 ? "최종 결과 보기 🏆" : "다음 문제 →";
}

function finishQuiz() {
  const card = document.getElementById("quiz-main-card");
  AudioPlayer.playSuccessChime();
  Confetti.trigger(120);

  let rank = "새싹 마크다운 입문자 🌱";
  if (AppState.quizScore >= 90) rank = "마크다운 마스터 🏆 (신급 실력!)";
  else if (AppState.quizScore >= 70) rank = "마크다운 프로페셔널 🥇";
  else if (AppState.quizScore >= 50) rank = "마크다운 중급 탐험가 🥈";

  card.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <span style="font-size: 3.5rem;">🎉</span>
      <h2 style="font-size: 1.8rem; font-weight: 800;">퀴즈를 모두 완료했습니다!</h2>
      <div style="font-size: 2.5rem; font-family: var(--font-mono); font-weight: 800; color: var(--accent-primary);">
        ${AppState.quizScore} / ${QUIZ_DATA.length * 10} 점
      </div>
      <div style="padding: 0.5rem 1.25rem; border-radius: var(--radius-full); background: var(--accent-warning-bg); color: var(--accent-warning); font-weight: 700;">
        나의 등급: ${rank}
      </div>
      <p style="color: var(--text-secondary); max-width: 480px; line-height: 1.6;">
        마크다운은 작성할수록 손에 익는 도구입니다. 퀘스트 학습과 스피드 타자 모드로 실전 감각을 더 갈고닦아보세요!
      </p>
      <button class="btn-primary" id="quiz-retry-btn" style="margin-top: 1rem; padding: 0.75rem 1.5rem; font-size: 1rem;">
        🔄 퀴즈 다시 풀기
      </button>
    </div>
  `;

  document.getElementById("quiz-retry-btn").addEventListener("click", () => {
    initQuizMode();
  });
}

// ==========================================================================
// 9. 자유 연습장 & 에디터 (Playground Mode)
// ==========================================================================
const PRESET_TEMPLATES = {
  readme: `# 🚀 프로젝트 이름 (Project Name)

> 프로젝트에 대한 한 줄 요약을 이곳에 작성하세요.

## 🌟 주요 기능
- [x] 실시간 마크다운 미리보기
- [x] 오프라인 로컬 저장 지원
- [ ] 클라우드 동기화 모듈 개발

## 💻 설치 및 실행
\`\`\`bash
# 1. 저장소 복제
git clone https://github.com/username/project.git

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
\`\`\`

## 📊 지원 환경
| 플랫폼 | 지원 버전 | 상태 |
| :--- | :---: | ---: |
| Windows | 10+ | ✅ 안정적 |
| macOS | 12+ | ✅ 안정적 |
| Linux | Ubuntu 20+ | ✅ 테스트됨 |

## 📄 라이선스
MIT License © 2026 YourName`,

  blog: `# [기술 블로그] 프론트엔드 최적화 가이드

작성일: 2026-10-22 | 작성자: 마크다운 마스터

---

웹 성능은 사용자 경험(UX)과 검색 엔진 순위(SEO)에 결정적인 영향을 미칩니다.

### 1. 이미지 포맷 최적화
전통적인 PNG, JPG 대신 **WebP** 또는 **AVIF** 포맷을 사용하는 것이 좋습니다.

> [!TIP]
> 최신 브라우저는 AVIF 포맷을 기본 지원하여 최대 50%의 용량을 절감할 수 있습니다.

### 2. 코드 스플리팅 예제
\`\`\`javascript
// 동적 임포트를 통한 번들 분할
const DynamicComponent = React.lazy(() => import('./HeavyChartComponent'));
\`\`\`

다음 포스팅에서는 캐싱 전략에 대해 다룹니다!`,

  sprint: `# 📋 주간 업무 & 스프린트 보고서

- **작성 기간:** 2026.10.16 ~ 2026.10.22
- **담당자:** 홍길동 책임연구원

---

### 🎯 이번 주 목표
1. 사용자 인증 API 연동 완료
2. 마크다운 에디터 툴바 기능 고도화
3. 버그 3건 해결

### ✅ 진행 현황
- [x] Google OAuth 소셜 로그인 연동
- [x] 표(Table) 자동 생성기 모달 개발
- [ ] 모바일 반응형 뷰포트 미세 조정 (진행률 80%)

### 💬 공유 및 논의사항
> 다음 주 월요일 오전 10시 전체 스프린트 회고 미팅이 예정되어 있습니다.`,

  study: `# 📚 CS 기초 스터디 요약: 자료구조 (Data Structure)

### 1. 배열(Array) vs 연결 리스트(Linked List)
| 항목 | 배열 (Array) | 연결 리스트 (Linked List) |
| :--- | :---: | :---: |
| 접근 속도 | \`O(1)\` (빠름) | \`O(N)\` (순회 필요) |
| 삽입/삭제 | \`O(N)\` | \`O(1)\` |
| 메모리 | 연속된 공간 할당 | 포인터 공간 추가 필요 |

### 2. 핵심 메모
- 조회가 빈번한 경우에는 **배열**이 유리합니다.
- 데이터의 추가와 삭제가 수시로 일어난다면 **연결 리스트**를 고려하세요.`,

  all_syntax: `# 마크다운 전체 문법 쇼케이스 (Cheat Showcase)

## 1. 텍스트 서식
일반 텍스트와 **굵은 텍스트**, *기울임꼴*, ***굵은 기울임***, ~~취소선~~, <u>밑줄</u>입니다.

## 2. 목록과 인용
- 순서 없는 목록 항목
  - 하위 들여쓰기 항목
1. 순서 있는 목록 항목 1
2. 순서 있는 목록 항목 2

- [x] 완료된 할 일
- [ ] 미완료 할 일

> 인용구 첫 번째 줄
>> 중첩된 깊은 인용구

## 3. 코드와 표
인라인 명령어는 \`npm run build\` 로 실행합니다.

\`\`\`typescript
interface UserProfile {
  name: string;
  level: number;
}
\`\`\`

| 기능 | 지원 여부 | 비고 |
| :--- | :---: | ---: |
| 다크 모드 | 지원 | 기본 활성화 |
| 오디오 효과 | 지원 | Web Audio API |

## 4. 링크와 콜아웃
[공식 웹사이트 바로가기](https://example.com)

> [!NOTE]
> 마크다운은 사람이 읽기에도 가장 쉬운 경량 마크업 언어입니다!`
};

function initPlaygroundMode() {
  const textarea = document.getElementById("playground-textarea");
  const preview = document.getElementById("playground-preview-area");

  // Load saved draft or default
  if (AppState.playgroundDraft) {
    textarea.value = AppState.playgroundDraft;
  } else {
    textarea.value = PRESET_TEMPLATES.readme;
  }

  updatePlayground();
  enableTabIndent(textarea);

  textarea.addEventListener("input", () => {
    AppState.playgroundDraft = textarea.value;
    localStorage.setItem("mdcraft_draft", textarea.value);
    updatePlayground();
  });

  // Toolbar actions
  const toolButtons = document.querySelectorAll(".tool-btn[data-action]");
  toolButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      executeToolbarAction(textarea, action);
      updatePlayground();
    });
  });

  // Clear button
  document.getElementById("playground-clear-btn").addEventListener("click", () => {
    if (confirm("정말 모든 내용을 지우시겠습니까?")) {
      textarea.value = "";
      updatePlayground();
    }
  });

  // Template select
  const templateSelect = document.getElementById("playground-template-select");
  templateSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val && PRESET_TEMPLATES[val]) {
      if (confirm("현재 작성 중인 내용이 선택한 템플릿으로 바뀝니다. 계속하시겠습니까?")) {
        textarea.value = PRESET_TEMPLATES[val];
        updatePlayground();
      }
    }
    templateSelect.value = "";
  });

  // Export buttons
  document.getElementById("playground-copy-md-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(textarea.value).then(() => {
      showCelebrationToast("📋 복사 완료!", "마크다운 텍스트가 클립보드에 복사되었습니다.");
    });
  });

  document.getElementById("playground-copy-html-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(preview.innerHTML).then(() => {
      showCelebrationToast("🌐 HTML 복사 완료!", "렌더링된 HTML 코드가 클립보드에 복사되었습니다.");
    });
  });

  document.getElementById("playground-download-md-btn").addEventListener("click", () => {
    downloadFile("document.md", textarea.value, "text/markdown");
  });

  document.getElementById("playground-download-html-btn").addEventListener("click", () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Markdown Craft Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; max-width: 800px; margin: 2rem auto; padding: 0 1rem; color: #222; }
    table { width: 100%; border-collapse: collapse; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; }
    th { background: #f4f4f4; }
    blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; color: #555; margin: 1em 0; }
    pre { background: #222; color: #fff; padding: 1rem; border-radius: 6px; overflow-x: auto; }
    code { font-family: monospace; background: #eee; padding: 2px 4px; border-radius: 4px; }
  </style>
</head>
<body>
${preview.innerHTML}
</body>
</html>`;
    downloadFile("document.html", fullHtml, "text/html");
  });

  // Table Generator Modal
  initTableModal(textarea);
}

function updatePlayground() {
  const textarea = document.getElementById("playground-textarea");
  const preview = document.getElementById("playground-preview-area");
  const text = textarea.value;

  preview.innerHTML = renderMarkdown(text);

  // Update statistics
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const headings = (text.match(/^#{1,6}\s+/gm) || []).length;
  const readMinutes = Math.max(1, Math.ceil(words / 200));

  document.getElementById("stat-words").textContent = `단어 수: ${words.toLocaleString()}개`;
  document.getElementById("stat-chars").textContent = `글자 수: ${charsWithSpaces.toLocaleString()}자 (공백 제외: ${charsNoSpaces.toLocaleString()}자)`;
  document.getElementById("stat-headings").textContent = `헤딩 수: ${headings}개`;
  document.getElementById("stat-reading-time").textContent = `예상 읽기: 약 ${readMinutes}분`;
}

function executeToolbarAction(textarea, action) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const val = textarea.value;
  const selectedText = val.substring(start, end);

  let replacement = "";
  let cursorOffset = 0;

  switch (action) {
    case "h1":
      replacement = `# ${selectedText || "제목"}\n`;
      break;
    case "h2":
      replacement = `## ${selectedText || "중제목"}\n`;
      break;
    case "h3":
      replacement = `### ${selectedText || "소제목"}\n`;
      break;
    case "bold":
      replacement = `**${selectedText || "굵은텍스트"}**`;
      break;
    case "italic":
      replacement = `*${selectedText || "기울임텍스트"}*`;
      break;
    case "strike":
      replacement = `~~${selectedText || "취소선텍스트"}~~`;
      break;
    case "quote":
      replacement = `> ${selectedText || "인용구 내용"}\n`;
      break;
    case "code":
      replacement = `\`${selectedText || "code"}\``;
      break;
    case "codeblock":
      replacement = `\`\`\`javascript\n${selectedText || "// 코드 작성"}\n\`\`\`\n`;
      break;
    case "ul":
      replacement = `- ${selectedText || "목록 항목"}\n`;
      break;
    case "ol":
      replacement = `1. ${selectedText || "순서 항목"}\n`;
      break;
    case "task":
      replacement = `- [ ] ${selectedText || "새로운 할 일"}\n`;
      break;
    case "hr":
      replacement = `\n---\n`;
      break;
    case "link":
      replacement = `[${selectedText || "링크텍스트"}](https://example.com)`;
      break;
    case "image":
      replacement = `![${selectedText || "대체텍스트"}](https://picsum.photos/400/250)`;
      break;
  }

  textarea.setRangeText(replacement, start, end, "end");
  textarea.focus();
}

function initTableModal(textarea) {
  const modal = document.getElementById("table-modal");
  const openBtn = document.getElementById("btn-open-table-modal");
  const closeBtn = document.getElementById("table-modal-close");
  const cancelBtn = document.getElementById("table-modal-cancel");
  const insertBtn = document.getElementById("table-modal-insert");

  const openModal = () => modal.classList.add("open");
  const closeModal = () => modal.classList.remove("open");

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  insertBtn.addEventListener("click", () => {
    const rows = parseInt(document.getElementById("tbl-rows-input").value, 10) || 3;
    const cols = parseInt(document.getElementById("tbl-cols-input").value, 10) || 3;
    const align = document.getElementById("tbl-align-select").value;

    let sep = "---";
    if (align === "center") sep = ":---:";
    else if (align === "right") sep = "---:";
    else sep = ":---";

    let tableMd = "\n|";
    for (let c = 1; c <= cols; c++) {
      tableMd += ` 헤더 ${c} |`;
    }
    tableMd += "\n|";
    for (let c = 1; c <= cols; c++) {
      tableMd += ` ${sep} |`;
    }
    tableMd += "\n";

    for (let r = 2; r <= rows; r++) {
      tableMd += "|";
      for (let c = 1; c <= cols; c++) {
        tableMd += ` 데이터 ${r}-${c} |`;
      }
      tableMd += "\n";
    }
    tableMd += "\n";

    const targetArea = AppState.currentTab === "tab-quest"
      ? document.getElementById("quest-code-input")
      : document.getElementById("playground-textarea");

    insertAtCursor(targetArea, tableMd);
    closeModal();
    if (AppState.currentTab === "tab-quest") handleQuestInput();
    else updatePlayground();
  });
}

function downloadFile(filename, text, mimeType) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================================================
// 10. 치트시트 서랍 및 공통 유틸리티
// ==========================================================================
function initCheatSheet() {
  const drawer = document.getElementById("cheatsheet-drawer");
  const toggleBtn = document.getElementById("toggle-cheatsheet-btn");
  const closeBtn = document.getElementById("cheatsheet-close-btn");

  toggleBtn.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("open");
  });

  // Clicking any cheat-code will insert it into the active editor
  const cheatCodes = document.querySelectorAll(".cheat-code[data-insert]");
  cheatCodes.forEach((chip) => {
    chip.addEventListener("click", () => {
      const raw = chip.getAttribute("data-insert").replace(/\\n/g, "\n");
      const targetArea = AppState.currentTab === "tab-quest"
        ? document.getElementById("quest-code-input")
        : document.getElementById("playground-textarea");

      insertAtCursor(targetArea, raw);
      AudioPlayer.playKeyClick();
      showCelebrationToast("✨ 문법 삽입 완료", "에디터에 해당 마크다운 코드가 삽입되었습니다.");
      if (AppState.currentTab === "tab-quest") handleQuestInput();
      else updatePlayground();
    });
  });
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.setRangeText(text, start, end, "end");
  textarea.focus();
}

function enableTabIndent(textarea) {
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertAtCursor(textarea, "  "); // 2 spaces
    }
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ==========================================================================
// 11. 메인 탭 전환 & 글로벌 컨트롤
// ==========================================================================
function initGlobalControls() {
  // Theme toggle
  const themeBtn = document.getElementById("toggle-theme-btn");
  themeBtn.addEventListener("click", () => {
    AppState.theme = AppState.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", AppState.theme);
    localStorage.setItem("mdcraft_theme", AppState.theme);
  });

  // Sound toggle
  const soundBtn = document.getElementById("toggle-sound-btn");
  soundBtn.addEventListener("click", () => {
    AppState.soundEnabled = !AppState.soundEnabled;
    localStorage.setItem("mdcraft_sound", String(AppState.soundEnabled));
    updateSoundButtonUI();
  });

  // Nav Tabs switcher
  const navButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.dataset.tab;
      AppState.currentTab = targetTabId;

      navButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(targetTabId);
      if (targetPanel) targetPanel.classList.add("active");

      // Mode-specific focus actions
      if (targetTabId === "tab-typing") {
        document.getElementById("typing-hidden-input").focus();
      } else if (targetTabId === "tab-playground") {
        updatePlayground();
      }
    });
  });

  document.getElementById("brand-home-btn").addEventListener("click", () => {
    document.getElementById("nav-btn-quest").click();
  });
}

// ==========================================================================
// 12. 전체 앱 부트스트랩 (App Bootstrap)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  Confetti = new ConfettiEngine("confetti-canvas");
  loadStorage();
  initGlobalControls();
  initQuestMode();
  initTypingMode();
  initQuizMode();
  initPlaygroundMode();
  initCheatSheet();
});
