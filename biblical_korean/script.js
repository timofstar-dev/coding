/**
 * LOGOS 초등 국어 통권수업 마스터 프로그램 - Core Logic Engine (OCR + AI Integration Edition)
 * 2022 개정 초등 국어 교육과정 & 성경적 세계관 (CFRR Framework)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Data Presets, Curriculum DB & Random Pools
    // ==========================================

    const CURRICULUM_DB = {
        '1-2': {
            gradeName: '1~2학년군',
            standardsList: [
                { code: '[2국01-02]', desc: '인물의 마음을 생각하며 글 읽기', defaultChecked: true },
                { code: '[2국02-01]', desc: '낱말과 문장의 관계 이해하기', defaultChecked: true },
                { code: '[2국03-02]', desc: '사건의 순서(처음-가운데-끝) 파악하기', defaultChecked: false },
                { code: '[2국04-01]', desc: '인상 깊은 일이나 생각을 짧은 문장으로 쓰기', defaultChecked: false }
            ]
        },
        '3-4': {
            gradeName: '3~4학년군',
            standardsList: [
                { code: '[4국03-01]', desc: '인물의 처지나 마음을 헤아리며 글 읽기', defaultChecked: true },
                { code: '[4국02-03]', desc: '문장의 짜임을 이해하고 자연스러운 문장 쓰기', defaultChecked: true },
                { code: '[4국05-02]', desc: '비유적 표현의 특성과 효과 알아보기', defaultChecked: false },
                { code: '[4국04-02]', desc: '느낌이나 생각을 드러내는 독후 감상문 쓰기', defaultChecked: false },
                { code: '[4국01-03]', desc: '원인과 결과의 관계를 고려하여 말하고 쓰기', defaultChecked: false }
            ]
        },
        '5-6': {
            gradeName: '5~6학년군',
            standardsList: [
                { code: '[6국02-04]', desc: '글에 나타난 관점이나 가치관 비판적으로 평가하기', defaultChecked: true },
                { code: '[6국03-02]', desc: '문맥을 활용하여 낱말의 뜻 추론하기', defaultChecked: true },
                { code: '[6국05-01]', desc: '관용적 표현의 의미 이해하고 활용하기', defaultChecked: false },
                { code: '[6국04-03]', desc: '타당한 근거를 들어 서술형/논설문 긴 글 쓰기', defaultChecked: false },
                { code: '[6국01-02]', desc: '토의 및 토론에서 타인의 의견 존중하며 경청하기', defaultChecked: false }
            ]
        }
    };

    const WORKSHEET_TYPES_MAP = {
        'standard': '📝 기본 종합 하브루타 활동지',
        'short-writing': '✍️ 짧은 글쓰기 & 공감 활동지',
        'long-writing': '📜 긴 글쓰기 / 서술형 감상문 활동지',
        'vocab-grammar': '🔤 어휘 & 문법 집중 활동지'
    };

    const SAMPLE_BOOKS = {
        dogpoop: { title: "강아지 똥", author: "권정생", grade: "1-2", chapter: "제1장. 흙덩이와의 만남과 나의 쓸모", content: `골목길 구석에 있던 강아지 똥은 자기가 더럽고 아무 짝에도 쓸모없다고 생각해서 슬퍼했습니다. 그러던 어느 날, 옆에 있던 흙덩이를 만났습니다. 흙덩이는 자기도 시골 농부의 밭으로 돌아가 곡식을 자라게 해야 하는 소중한 존재라고 말해주었습니다. 강아지 똥은 고민하던 중 민들레 싹을 만나, 자신이 거름이 되어 아름다운 꽃을 피우게 된다는 걸 깨닫습니다.` },
        givingtree: { title: "아낌없이 주는 나무", author: "쉘 실버스타인", grade: "3-4", chapter: "제1장. 소년과 나무", content: `나무는 소년을 무척 사랑하여 자신의 잎과 가지, 줄기까지 모든 것을 내어줍니다. 오랜 시간이 흘러 늙어버린 소년이 돌아왔을 때, 나무는 그루터기만 남았지만 쉴 곳을 내어주며 행복해합니다.` },
        hen: { title: "마당을 나온 암탉", author: "황선미", grade: "5-6", chapter: "제3장. 족제비의 위협", content: `양계장을 벗어난 암탉 잎싹이는 족제비 뽀뽀의 위협 속에서 남의 알을 품어 초록이를 낳습니다. 모성애와 희생을 통해 자연의 순리와 사랑을 깨닫습니다.` }
    };

    const VOCAB_POOL = [
        { word: '쓸모 / 소망', meaning: '마음속으로 간절히 바라거나 가치가 있는 것', example: '하나님은 나에게 놀라운 소망을 주셨습니다.' },
        { word: '헌신 / 희생', meaning: '남을 위해 자신을 기꺼이 바치는 고귀한 행동', example: '사랑은 나의 가장 귀한 것을 기꺼이 내어주는 희생입니다.' },
        { word: '보람 / 거름', meaning: '남을 돋우는 바탕이나 뜻깊고 가치 있는 결과', example: '친구를 도와주었을 때 내 마음에 큰 보람을 느꼈다.' },
        { word: '사랑 / 섬김', meaning: '자신보다 남을 먼저 생각하고 돌보는 따뜻한 마음', example: '우리는 예수님의 마음을 본받아 서로를 향한 섬김을 실천해야 합니다.' }
    ];

    const CFRR_CREATION_FALL_POOL = [
        { q: "[창조/왜곡] 하나님이 보시기에 소중한 존재가 세상에서 쓸모없거나 부족하다고 여겨진 까닭은 무엇일까요?", a: "세상은 겉모습이나 당장의 이익만으로 판단하기 때문입니다. 하지만 하나님은 만물을 목적에 맞게 소중하게 창조하셨습니다." }
    ];
    const CFRR_REDEMPTION_RESTORE_POOL = [
        { q: "[변화/회복] 인물이 희생과 사랑을 통해 세상을 아름답게 회복시키는 모습을 보고 어떤 마음이 들었나요?", a: "나를 내어주는 이타적 사랑이야말로 생명을 살리는 하나님 나라의 법칙임을 깨달았습니다." }
    ];

    const SLIDE_TEACHER_SCRIPTS = [
        { intro: '반가워요 여러분! 오늘 이 이야기를 읽으며 인물의 마음을 살펴보고, 우리가 얼마나 소중한 존재인지 찾아봅시다.', explore: '본문에서 인물의 감정에 깊은 변화가 일어나는 장면을 찾아봅시다.', cfrr: '세상의 시선과 다르게, 하나님은 우리를 어떻게 보실까요?', activity: '자, 준비된 활동지에 여러분의 생각과 성경적 묵상을 적어봅시다.', wrapup: '오늘 배운 내용을 바탕으로 교실에서 친구를 섬길 작은 실천을 결단합시다!' }
    ];

    const ACTIVITIES_POOL = [
        { badge: '<i class="fa-solid fa-users"></i> 하브루타 & 연극', title: '핫시트(Hot Seat) 인물 청문회', desc: '학생 한 명이 주인공을 맡고 다른 학생들이 기자가 되어 인물의 마음에 대해 질문합니다.' },
        { badge: '<i class="fa-solid fa-palette"></i> 비주얼 씽킹', title: '4컷 감정 변화 만화', desc: '주인공의 감정이 바뀌는 과정을 4컷 만화로 표현합니다.' },
        { badge: '<i class="fa-solid fa-bullhorn"></i> 토론 & 글쓰기', title: '샌드위치 가치관 토론', desc: '세상의 가치와 성경적 가치를 비교하며 격려 편지를 씁니다.' },
        { badge: '<i class="fa-solid fa-hand-holding-heart"></i> 실천', title: '밀알 교실 실천 나무', desc: '자신의 희생이나 도움 경험을 나뭇잎 포스트잇에 적어 나무에 붙입니다.' },
        { badge: '<i class="fa-solid fa-microphone"></i> 미디어', title: '1분 라디오 팟캐스트 녹음', desc: 'NotebookLM 대본을 활용해 라디오 녹음 활동을 진행합니다.' }
    ];

    function getRandomItems(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ==========================================
    // 2. DOM Elements & API Keys
    // ==========================================

    const API_STORAGE_KEY = 'gemini_api_key';
    const btnOpenApiModal = document.getElementById('btn-open-api-modal');
    const apiModal = document.getElementById('api-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const apiKeyInput = document.getElementById('api-key-input');
    const btnSaveApiKey = document.getElementById('btn-save-api-key');

    const aiUploadBox = document.getElementById('ai-upload-box');
    const aiFileInput = document.getElementById('ai-file-input');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMsg = document.getElementById('loading-msg');

    const masterForm = document.getElementById('master-form');
    const bookTitleInput = document.getElementById('book-title');
    const bookAuthorInput = document.getElementById('book-author');
    const gradeGroupSelect = document.getElementById('grade-group');
    const chapterTitleInput = document.getElementById('chapter-title');
    const chapterContentInput = document.getElementById('chapter-content');
    const worksheetTypeSelect = document.getElementById('worksheet-type');
    const standardsCheckboxGrid = document.getElementById('standards-checkbox-grid');
    
    const outputPlaceholder = document.getElementById('output-placeholder');
    const outputContent = document.getElementById('output-content');
    const sumAiBadge = document.getElementById('sum-ai-badge');

    // Load API Key
    let geminiApiKey = localStorage.getItem(API_STORAGE_KEY) || '';

    btnOpenApiModal.addEventListener('click', () => {
        apiKeyInput.value = geminiApiKey;
        apiModal.classList.remove('hidden');
    });
    btnCloseModal.addEventListener('click', () => apiModal.classList.add('hidden'));
    btnSaveApiKey.addEventListener('click', () => {
        geminiApiKey = apiKeyInput.value.trim();
        localStorage.setItem(API_STORAGE_KEY, geminiApiKey);
        apiModal.classList.add('hidden');
        alert('API 키가 브라우저에 안전하게 저장되었습니다.');
    });

    // ==========================================
    // 3. AI Core Logic (Gemini API)
    // ==========================================

    let cachedTargetModel = null;
    async function getTargetGeminiModel() {
        if (cachedTargetModel) return cachedTargetModel;
        let targetModel = 'models/gemini-1.5-flash'; // 기본 폴백
        try {
            const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`);
            if (listRes.ok) {
                const listData = await listRes.json();
                if (listData.models) {
                    const validModels = listData.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'));
                    const latestFlash = validModels.find(m => m.name.includes('gemini-3.5-flash') && !m.name.includes('preview') && !m.name.includes('lite'));
                    const v3Flash = validModels.find(m => m.name.includes('gemini-3') && m.name.includes('flash') && !m.name.includes('preview'));
                    const latestOfficial = validModels.find(m => m.name.includes('flash-latest'));
                    const flash15Model = validModels.find(m => m.name.includes('gemini-1.5-flash') && !m.name.includes('preview'));
                    
                    if (latestFlash) targetModel = latestFlash.name;
                    else if (v3Flash) targetModel = v3Flash.name;
                    else if (latestOfficial) targetModel = latestOfficial.name;
                    else if (flash15Model) targetModel = flash15Model.name;
                    else if (validModels.length > 0) targetModel = validModels[0].name;
                }
            }
        } catch (e) {
            console.warn("모델 리스트 조회 실패, 기본 모델로 시도합니다.", e);
        }
        cachedTargetModel = targetModel;
        return targetModel;
    }

    aiUploadBox.addEventListener('click', () => {
        if (!geminiApiKey) {
            alert('먼저 우측 상단의 [AI 설정]에서 Gemini API 키를 입력해주세요.');
            apiModal.classList.remove('hidden');
            return;
        }
        aiFileInput.click();
    });

    aiFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        aiFileInput.value = ''; // reset

        loadingOverlay.classList.remove('hidden');
        loadingMsg.textContent = "AI가 스캔 문서를 읽고 줄거리를 파악 중입니다... (약 10초)";

        try {
            const base64Data = await fileToBase64(file);
            const mimeType = file.type;

            const aiResult = await analyzeFileWithGemini(base64Data, mimeType);
            
            // 폼에 기본 줄거리와 책 정보만 1차로 채웁니다.
            bookTitleInput.value = aiResult.title || '분석된 도서명';
            bookAuthorInput.value = aiResult.author || '저자 미상';
            chapterTitleInput.value = aiResult.chapter || '스캔본 챕터';
            chapterContentInput.value = aiResult.summary || '줄거리 요약 실패';

            // 폼을 자동으로 서밋하여 2차 활동지 분석(analyzeTextWithGemini)을 태웁니다.
            loadingMsg.textContent = "줄거리 파악 완료! 맞춤형 질문과 활동지를 생성합니다...";
            masterForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

        } catch (error) {
            console.error(error);
            loadingOverlay.classList.add('hidden');
            alert(`AI 문서 분석 중 오류가 발생했습니다.\n\n[오류 내용]\n${error.message}`);
        }
    });

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const b64 = reader.result.split(',')[1];
                resolve(b64);
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    // 1차 AI 분석 (이미지/PDF -> 줄거리 요약)
    async function analyzeFileWithGemini(base64Data, mimeType) {
        const targetModel = await getTargetGeminiModel();
        const url = `https://generativelanguage.googleapis.com/v1beta/${targetModel}:generateContent?key=${geminiApiKey}`;

        const prompt = `
당신은 초등 국어 교육 전문가입니다.
첨부된 문서(책의 스캔본 또는 이미지)를 읽고, **반드시 아래의 JSON 형식과 영문 키(key) 이름을 정확하게 유지하여** 책의 핵심 정보만 요약해 주세요. 
마크다운 기호(\`\`\`) 없이 순수 JSON 문자열만 출력해야 합니다.
**경고: 어떠한 경우에도 JSON 키 이름(title, author, chapter, summary)을 한국어나 다른 단어로 번역하거나 바꾸지 마세요.**

{
  "title": "책 제목 (알 수 없으면 빈칸)",
  "author": "저자 이름 (알 수 없으면 빈칸)",
  "chapter": "해당 페이지들의 소제목이나 챕터명",
  "summary": "핵심 줄거리 및 사건 요약 (4~5문장)"
}
`;

        const requestBody = {
            contents: [{ parts: [{ inlineData: { mimeType: mimeType, data: base64Data } }, { text: prompt }] }],
            generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Request failed (${response.status}): ${errText}`);
        }

        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        return parseAiJson(textResponse);
    }

    // 2차 AI 분석 (줄거리 + 성취기준 + 활동지 유형 -> 맞춤형 질문/어휘 생성)
    async function analyzeTextWithGemini(formData) {
        const targetModel = await getTargetGeminiModel();
        const url = `https://generativelanguage.googleapis.com/v1beta/${targetModel}:generateContent?key=${geminiApiKey}`;
        const stdListText = formData.selectedStandards.join(', ');

        const prompt = `
당신은 초등 국어 교육 및 성경적 세계관 교육 전문가입니다.
아래의 [책 줄거리]와 선생님이 선택하신 [성취기준] 및 [활동지 유형]을 바탕으로, 
이에 정확히 부합하는 핵심 어휘 2개와 성경적 세계관(CFRR) 맞춤형 질문을 생성하세요.

[책 정보]
- 제목: ${formData.title}
- 줄거리: ${formData.content}

[적용할 교육과정 성취기준]
- ${stdListText}

[적용할 활동지 유형]
- ${WORKSHEET_TYPES_MAP[formData.worksheetType]} (이 유형의 성격에 맞게 어휘와 질문의 난이도 및 형태를 완벽하게 조절하세요.)

반드시 아래의 JSON 형식과 영문 키(key) 이름을 정확하게 유지하여 분석 결과를 출력해 주세요. 마크다운 기호(\`\`\`) 없이 순수 JSON 문자열만 출력해야 합니다.
**경고: 어떠한 경우에도 JSON 키 이름(vocabs, word, meaning, example, questions, creation, redemption, q, a)을 한국어나 다른 단어로 번역하거나 바꾸지 마세요.**

{
  "vocabs": [
    { "word": "단어1", "meaning": "뜻 설명", "example": "초등학생 수준의 예문" },
    { "word": "단어2", "meaning": "뜻 설명", "example": "초등학생 수준의 예문" }
  ],
  "questions": {
    "creation": {
      "q": "[창조/왜곡] 이야기와 성취기준(${stdListText})을 완벽히 연결한 세계관 탐구 및 글쓰기 질문",
      "a": "교사용 예시 답안 (성취기준 반영)"
    },
    "redemption": {
      "q": "[변화/회복] 인물의 희생/사랑/변화 등과 성취기준(${stdListText})을 완벽히 연결한 맞춤 질문",
      "a": "교사용 예시 답안 (성취기준 반영)"
    }
  }
}
`;

        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, responseMimeType: "application/json" }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Request failed (${response.status}): ${errText}`);
        }

        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        return parseAiJson(textResponse);
    }

    function parseAiJson(textResponse) {
        let jsonResult = {};
        try {
            jsonResult = JSON.parse(textResponse);
        } catch (e) {
            const match = textResponse.match(/\{[\s\S]*\}/);
            if (match) {
                jsonResult = JSON.parse(match[0]);
            } else {
                console.error("Raw AI Response:", textResponse);
                throw new Error('AI가 규격화된 JSON 데이터를 반환하지 않았습니다.');
            }
        }
        console.log("AI Parsed Result:", jsonResult);
        return jsonResult;
    }


    // ==========================================
    // 4. Form Actions & UI
    // ==========================================

    function renderStandards(gradeKey) {
        const currData = CURRICULUM_DB[gradeKey];
        if (!currData) return;
        standardsCheckboxGrid.innerHTML = currData.standardsList.map((std) => `
            <label class="std-chip">
                <input type="checkbox" name="standards" value="${std.code}" ${std.defaultChecked ? 'checked' : ''}>
                <span><strong>${std.code}</strong> ${std.desc}</span>
            </label>
        `).join('');
    }

    renderStandards(gradeGroupSelect.value);
    gradeGroupSelect.addEventListener('change', (e) => renderStandards(e.target.value));

    document.querySelectorAll('.btn-template').forEach(btn => {
        btn.addEventListener('click', () => {
            const sample = SAMPLE_BOOKS[btn.dataset.book];
            if (sample) {
                bookTitleInput.value = sample.title;
                bookAuthorInput.value = sample.author;
                gradeGroupSelect.value = sample.grade;
                chapterTitleInput.value = sample.chapter;
                chapterContentInput.value = sample.content;
                renderStandards(sample.grade);
            }
        });
    });

    function buildFormData() {
        const checkedStandardsBoxes = document.querySelectorAll('input[name="standards"]:checked');
        const selectedStandards = Array.from(checkedStandardsBoxes).map(cb => cb.closest('label').querySelector('span').innerText);
        return {
            title: bookTitleInput.value.trim(),
            author: bookAuthorInput.value.trim() || '저자 미상',
            grade: gradeGroupSelect.value,
            chapter: chapterTitleInput.value.trim(),
            content: chapterContentInput.value.trim(),
            worksheetType: worksheetTypeSelect.value,
            selectedStandards: selectedStandards,
            isAiMode: false // 기본값. submit 핸들러에서 동적으로 결정
        };
    }

    // Submit 버튼 클릭 시 -> AI Text 분석 -> 렌더링
    masterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = buildFormData();
        
        if (formData.selectedStandards.length === 0) {
            alert('최소 하나 이상의 2022 개정 국어 성취기준을 선택해주세요!');
            return;
        }

        // 줄거리가 20자 이상 있고 API 키가 있으면 무조건 AI 모드 작동 (실시간 맞춤 생성)
        if (geminiApiKey && formData.content.length > 20) {
            loadingOverlay.classList.remove('hidden');
            loadingMsg.textContent = "선택하신 성취기준과 활동지 유형에 맞추어 맞춤형 질문과 어휘를 생성 중입니다... (약 10초)";
            try {
                const aiData = await analyzeTextWithGemini(formData);
                formData.isAiMode = true;
                formData.aiVocabs = aiData.vocabs || [];
                formData.aiQuestions = aiData.questions || {};
            } catch(error) {
                console.error(error);
                alert('맞춤형 질문 생성에 실패하여 기본 랜덤 데이터를 사용합니다.\n' + error.message);
                formData.isAiMode = false;
            } finally {
                loadingOverlay.classList.add('hidden');
            }
        } else {
            formData.isAiMode = false;
        }

        generateMasterPackage(formData);
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Copy & Export Features
    document.getElementById('btn-copy-notebooklm').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        navigator.clipboard.writeText(document.getElementById('notebooklm-text').innerText).then(() => {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> 복사 완료!';
            setTimeout(() => btn.innerHTML = orig, 2000);
        });
    });

    let showTeacherAnswers = false;
    document.getElementById('btn-toggle-answers').addEventListener('click', (e) => {
        showTeacherAnswers = !showTeacherAnswers;
        const btn = e.currentTarget;
        const wc = document.getElementById('worksheet-content');
        if (showTeacherAnswers) {
            wc.classList.add('show-answers');
            btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> 교사용 예시 답안 숨기기';
            btn.style.backgroundColor = '#dcfce7'; btn.style.borderColor = '#86efac'; btn.style.color = '#15803d';
        } else {
            wc.classList.remove('show-answers');
            btn.innerHTML = '<i class="fa-solid fa-eye"></i> 교사용 예시 답안 보기';
            btn.style.backgroundColor = ''; btn.style.borderColor = ''; btn.style.color = '';
        }
    });

    document.getElementById('btn-export-gdocs').addEventListener('click', () => {
        let htmlContent = document.getElementById('worksheet-content').outerHTML;
        htmlContent = htmlContent.replace(/<table/g, '<table style="border-collapse: collapse; width: 100%; border: 1px solid #94a3b8;"');
        htmlContent = htmlContent.replace(/<th/g, '<th style="border: 1px solid #94a3b8; padding: 8px; background-color: #f1f5f9; text-align: left;"');
        htmlContent = htmlContent.replace(/<td/g, '<td style="border: 1px solid #94a3b8; padding: 8px;"');
        
        if (!showTeacherAnswers) {
            htmlContent = htmlContent.replace(/class="ws-answer-key"/g, 'class="ws-answer-key" style="display: none;"');
        } else {
            htmlContent = htmlContent.replace(/class="ws-answer-key"/g, 'class="ws-answer-key" style="background-color: #f0fdf4; border: 1px solid #86efac; border-left: 4px solid #16a34a; padding: 12px; margin-top: 8px; font-size: 14px; color: #166534;"');
        }

        const fullHtml = `<div style="font-family: Arial, sans-serif; color: #0f172a; max-width: 800px; line-height: 1.6;">${htmlContent}</div>`;
        const blobHtml = new Blob([fullHtml], { type: "text/html" });
        const blobText = new Blob([document.getElementById('worksheet-content').innerText], { type: "text/plain" });
        
        try {
            navigator.clipboard.write([new ClipboardItem({ "text/html": blobHtml, "text/plain": blobText })]).then(() => {
                window.open('https://docs.new', '_blank');
                alert('📄 구글 문서 생성 창이 열렸습니다!\n새 문서에서 Ctrl+V 를 누르면 서식이 유지된 채 붙여넣어집니다.');
            });
        } catch(e) { alert('복사 실패'); }
    });

    // ==========================================
    // 5. Core Generator Logic (AI Injectable)
    // ==========================================

    function generateMasterPackage(data) {
        const currInfo = CURRICULUM_DB[data.grade];

        document.getElementById('sum-grade-text').textContent = currInfo.gradeName;
        document.getElementById('sum-book-title').textContent = `『${data.title}』 (${data.author})`;
        document.getElementById('sum-chapter-title').textContent = data.chapter;
        document.getElementById('sum-curriculum-badge').innerHTML = `<i class="fa-solid fa-graduation-cap"></i> 선택 성취기준(${data.selectedStandards.length}개): ${data.selectedStandards.map(s => s.split(' ')[0]).join(', ')}`;
        document.getElementById('sum-type-badge').innerHTML = `<i class="fa-solid fa-file-pen"></i> 활동지: ${WORKSHEET_TYPES_MAP[data.worksheetType]}`;
        
        if (data.isAiMode) sumAiBadge.classList.remove('hidden');
        else sumAiBadge.classList.add('hidden');

        generateTab1(data, currInfo);
        generateTab2(data, currInfo);
        generateTab3(data, currInfo);

        outputPlaceholder.classList.add('hidden');
        outputContent.classList.remove('hidden');
        outputContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function generateTab1(data, curr) {
        const stdListText = data.selectedStandards.map(s => `- ${s}`).join('\n');
        const scriptSet = getRandomItem(SLIDE_TEACHER_SCRIPTS);

        document.getElementById('notebooklm-text').textContent = `[NotebookLM / Audio Overview & PPT 생성용 원본 소스]
책 제목: ${data.title} (${data.author})
대상 학년: 초등 ${curr.gradeName}
단원/챕터: ${data.chapter}

[핵심 줄거리 요약]
${data.content}

[선택된 2022 초등 국어 성취기준]
${stdListText}

[성경적 세계관 (CFRR) 탐구 포인트]
- 창조(Creation): 하나님이 디자인하신 본래 생명/관계의 아름다움.
- 왜곡(Fall): 등장인물이 겪는 결핍, 이기심, 상처와 세상의 왜곡된 시선.
- 변화/은혜(Redemption): 사랑과 희생, 참된 깨달음으로 변화되는 은혜.
- 회복(Restoration): 우리 교실과 삶에서 세상을 어떻게 회복시키고 섬길 것인가?`;

        const slidesData = [
            { num: "Slide 1", title: "도입: 생각 열기 & 동기유발", bullets: [`오늘 읽을 이야기: 『${data.title}』`, `오늘의 목표: ${data.selectedStandards[0] || '내용 파악'}`], script: scriptSet.intro },
            { num: "Slide 2", title: "본문 탐구", bullets: [`주요 내용: ${data.content.substring(0, 50)}...`, `성취기준: ${data.selectedStandards.join(' / ')}`], script: scriptSet.explore },
            { num: "Slide 3", title: "성경적 세계관 탐구 (CFRR)", bullets: [`창조와 왜곡의 갈등`, `변화와 회복의 은혜`], script: scriptSet.cfrr },
            { num: "Slide 4", title: `활동지 수행`, bullets: [`맞춤형 활동지 작성`, `생각 나누기`], script: scriptSet.activity },
            { num: "Slide 5", title: "적용 및 결단", bullets: [`작은 회복 실천 정하기`], script: scriptSet.wrapup }
        ];

        document.getElementById('slides-container').innerHTML = slidesData.map(s => `
            <div class="slide-card"><div class="slide-head"><span class="slide-num">${s.num}</span><span class="slide-title">${s.title}</span></div>
            <div class="slide-body"><div class="slide-section"><ul class="slide-bullets">${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul></div>
            <div class="slide-section"><div class="teacher-script"><strong>교사 대본:</strong> "${s.script}"</div></div></div></div>
        `).join('');
    }

    function generateTab2(data, curr) {
        const stdBadges = data.selectedStandards.map(s => `<span style="background:#e0f2fe; color:#0369a1; padding:2px 6px; border-radius:4px; font-size:0.8rem; margin-right:4px;">${s.split(' ')[0]}</span>`).join('');
        
        // AI Mode vs Default Random Mode
        const selectedVocabs = data.isAiMode && data.aiVocabs && data.aiVocabs.length > 0 
            ? data.aiVocabs 
            : data.isAiMode ? [
                {word: "[AI 분석 결과 없음]", meaning: "AI가 단어를 찾지 못했습니다.", example: "다시 분석해 주세요."},
                {word: "[AI 분석 결과 없음]", meaning: "AI가 단어를 찾지 못했습니다.", example: "다시 분석해 주세요."}
              ] 
            : getRandomItems(VOCAB_POOL, 2);

        const qCreation = data.isAiMode && data.aiQuestions && data.aiQuestions.creation 
            ? data.aiQuestions.creation 
            : data.isAiMode ? {q: "[AI 창조 질문 분석 실패]", a: "재시도 요망"} : getRandomItem(CFRR_CREATION_FALL_POOL);

        const qRedemption = data.isAiMode && data.aiQuestions && data.aiQuestions.redemption 
            ? data.aiQuestions.redemption 
            : data.isAiMode ? {q: "[AI 회복 질문 분석 실패]", a: "재시도 요망"} : getRandomItem(CFRR_REDEMPTION_RESTORE_POOL);

        let worksheetHTML = `
            <div class="ws-header">
                <h1 style="font-size: 1.75rem; margin-bottom: 0.4rem;">[국어+세계관] ${WORKSHEET_TYPES_MAP[data.worksheetType]}</h1>
                <div class="ws-sub">책 제목: 『${data.title}』 | ${data.chapter}</div>
            </div>
            <div class="ws-info-bar">
                <span><strong>학년군:</strong> 초등 ${curr.gradeName}</span>
                <span><strong>성취기준:</strong> ${stdBadges}</span>
                <span><strong>학년/반:</strong> ____학년 ____반</span>
                <span><strong>이름:</strong> ____________</span>
            </div>
        `;

        if (data.worksheetType === 'standard' || data.worksheetType === 'vocab-grammar') {
            worksheetHTML += `
                <div class="ws-section">
                    <div class="ws-sec-title"><i class="fa-solid fa-book-open"></i> [1단계] 성취기준 어휘 & 문장 탐구</div>
                    <div class="ws-q-box">
                        <div class="ws-q-title">1. 본문 핵심 낱말의 뜻을 파악하고 나만의 문장을 만들어 봅시다.</div>
                        <table class="ws-vocab-table">
                            <thead><tr><th style="width:20%;">핵심 낱말</th><th style="width:40%;">뜻 추론하기</th><th style="width:40%;">문장 만들기</th></tr></thead>
                            <tbody>
                                ${selectedVocabs.map(v => `
                                <tr>
                                    <td><strong>${v.word}</strong></td>
                                    <td><div class="ws-blank-space" style="min-height:30px;"></div><div class="ws-answer-key" style="margin-top:4px; padding:4px;"><strong>[답안]</strong> ${v.meaning}</div></td>
                                    <td><div class="ws-blank-space" style="min-height:30px;"></div><div class="ws-answer-key" style="margin-top:4px; padding:4px;"><strong>[예시]</strong> ${v.example}</div></td>
                                </tr>
                                `).slice(0,2).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="ws-section">
                    <div class="ws-sec-title bible-sec"><i class="fa-solid fa-cross"></i> [2단계] 성경적 세계관 질문 (CFRR)</div>
                    <div class="ws-q-box"><div class="ws-q-title">2. ${qCreation.q}</div><div class="ws-writing-box"></div><div class="ws-answer-key"><strong>[답안]</strong> ${qCreation.a}</div></div>
                    <div class="ws-q-box"><div class="ws-q-title">3. ${qRedemption.q}</div><div class="ws-writing-box"></div><div class="ws-answer-key"><strong>[답안]</strong> ${qRedemption.a}</div></div>
                </div>
            `;
        } else {
             worksheetHTML += `
                <div class="ws-section">
                    <div class="ws-sec-title bible-sec"><i class="fa-solid fa-cross"></i> [심화 질문] 성경적 세계관 (CFRR)</div>
                    <div class="ws-q-box"><div class="ws-q-title">1. ${qCreation.q}</div><div class="ws-writing-box ws-writing-box-lg"></div><div class="ws-answer-key"><strong>[답안]</strong> ${qCreation.a}</div></div>
                    <div class="ws-q-box"><div class="ws-q-title">2. ${qRedemption.q}</div><div class="ws-writing-box ws-writing-box-lg"></div><div class="ws-answer-key"><strong>[답안]</strong> ${qRedemption.a}</div></div>
                </div>
            `;
        }

        const wc = document.getElementById('worksheet-content');
        wc.innerHTML = worksheetHTML;
        showTeacherAnswers ? wc.classList.add('show-answers') : wc.classList.remove('show-answers');
    }

    function generateTab3(data, curr) {
        const selectedActivities = getRandomItems(ACTIVITIES_POOL, 5);
        document.getElementById('guide-container').innerHTML = `
            <div class="panel-header" style="border:none; margin-bottom:1rem;"><h4><i class="fa-solid fa-clock"></i> 45분 수업 지도안</h4></div>
            <div class="guide-flow">
                <div class="flow-step step-intro"><div class="flow-head"><span class="flow-title">1. 도입 (10분)</span></div></div>
                <div class="flow-step step-main"><div class="flow-head"><span class="flow-title">2. 전개 (25분) : 맞춤 활동지 수행</span></div></div>
                <div class="flow-step step-wrap"><div class="flow-head"><span class="flow-title">3. 정리 (10분)</span></div></div>
            </div>
            <div class="panel-header" style="border:none; margin:2rem 0 1rem;"><h4><i class="fa-solid fa-masks-theater"></i> 교실 추천 연계 활동</h4></div>
            <div class="activity-grid">
                ${selectedActivities.map((act, i) => `
                <div class="act-card"><span class="act-badge">${act.badge}</span><h5 class="act-title">${i + 1}. ${act.title}</h5><p class="act-desc">${act.desc}</p></div>
                `).join('')}
            </div>
        `;
    }
});
