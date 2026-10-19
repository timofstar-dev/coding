const grammarPools = {
    '12': [
        { 
            name: "문장 부호 바르게 쓰기", 
            exp: "💡 <strong>개념 알기:</strong> 생각이나 느낌을 글로 쓸 때는 문장이 끝나는 곳에 마침표(.), 쉼표(,), 물음표(?) 등 알맞은 문장 부호를 써야 해요.",
            fn: (v) => `<strong>[바르게 쓰기]</strong> 다음 말씀을 소리 내어 읽고, 문장 부호(마침표, 쉼표 등)에 주의하며 따라 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "흉내 내는 말 적기", 
            exp: "💡 <strong>개념 알기:</strong> 소리나 모양을 흉내 내는 말(의성어, 의태어)을 쓰면 글을 훨씬 더 생생하고 재미있게 표현할 수 있어요.",
            fn: (v) => `<strong>[흉내 내는 말]</strong> 다음 말씀의 상황에 어울리는 소리나 모양을 나타내는 흉내 내는 말(의성어, 의태어)을 상상해 적어보세요. (예: 사뿐사뿐, 우당탕)<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "마음과 기분 표현하기", 
            exp: "💡 <strong>개념 알기:</strong> 내 마음이나 기분을 글로 솔직하게 쓰면, 다른 사람에게 내 생각을 더 잘 전달할 수 있어요.",
            fn: (v) => `<strong>[마음 표현하기]</strong> 다음 말씀을 읽고 난 내 마음이나 기분을 "나는 ~해요"라는 문장으로 짧게 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "일어난 일 요약하기", 
            exp: "💡 <strong>개념 알기:</strong> 일어난 일을 글로 쓸 때는 '누가 어찌했다'처럼 간단하고 명확하게 쓰는 연습이 필요해요.",
            fn: (v) => `<strong>[일어난 일 찾기]</strong> 다음 말씀에서 무슨 일이 일어났나요? "누가 ~했어요"라고 짧게 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>` 
        }
    ],
    '34': [
        { 
            name: "주어와 서술어 찾기", 
            exp: "💡 <strong>개념 알기:</strong> '주어'는 문장에서 행동을 하는 주인공(누가/무엇이)을 뜻하고, '서술어'는 그 주인공의 상태나 행동(어찌하다/어떠하다)을 나타내는 말이에요.",
            fn: (v) => `<strong>[주어와 서술어]</strong> 다음 말씀에서 행동을 하는 주인공(누가/무엇이)과 그 행동(어찌하다/어떠하다)을 찾아 적어보세요.<br><span class="grammar-passage">${v.text}</span><br>누가: <span class="spelling-blank" style="width: 120px;"><span class="answer-text">원본 참조</span></span> 어찌하다: <span class="spelling-blank" style="width: 120px;"><span class="answer-text">원본 참조</span></span>` 
        },
        { 
            name: "꾸며주는 말 넣기", 
            exp: "💡 <strong>개념 알기:</strong> '예쁜', '빠르게'처럼 다른 말을 꾸며주는 말을 넣으면 문장의 뜻이 훨씬 더 자세하고 생생해져요.",
            fn: (v) => `<strong>[꾸며주는 말]</strong> 다음 말씀에 알맞은 '꾸며주는 말'(예: 아름다운, 높이, 몹시 등)을 스스로 상상하여 하나 이상 덧붙인 뒤, 문장을 더 생생하게 다시 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "이어주는 말 넣기", 
            exp: "💡 <strong>개념 알기:</strong> '그리고', '그래서', '그러나' 등 문장과 문장을 자연스럽게 이어주는 접속어를 쓰면 글이 더 매끄러워져요.",
            fn: (v) => `<strong>[이어주는 말]</strong> 이 말씀의 다음 상황이 이어질 때, (그래서 / 그러나 / 그리고) 중 가장 어울리는 접속어를 하나 고르고 뒷문장을 지어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "높임말 바꾸기", 
            exp: "💡 <strong>개념 알기:</strong> 어른에게 말씀드릴 때나 공손한 글을 쓸 때는 서술어 끝을 바꾸거나 '께서', '시' 등을 넣어 알맞은 높임 표현을 써야 해요.",
            fn: (v) => `<strong>[높임 표현]</strong> 다음 말씀을 어른에게 공손하게 말씀드린다고 상상하고, 높임말을 사용하여 다시 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "육하원칙 찾기", 
            exp: "💡 <strong>개념 알기:</strong> 육하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 맞추어 글을 쓰면 일어난 사건을 아주 정확하게 전달할 수 있어요.",
            fn: (v) => `<strong>[육하원칙]</strong> 다음 말씀에서 육하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜) 중 하나를 골라, 거기에 해당하는 내용을 찾아 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        }
    ],
    '56': [
        { 
            name: "주어와 서술어", 
            exp: "💡 <strong>개념 알기:</strong> 문장에서 꼭 필요한 주성분인 주어(누가/무엇이)와 서술어(어찌하다/어떠하다/무엇이다)를 정확히 쓰면 흔들림 없는 바른 문장이 돼요.",
            fn: (v) => `<strong>[문장 성분: 주어/서술어]</strong> 다음 문장의 주어와 서술어를 찾아 적어보세요.<br><span class="grammar-passage">${v.text}</span><br>주어: <span class="spelling-blank" style="width: 100px;"><span class="answer-text">원본 참조</span></span> 서술어: <span class="spelling-blank" style="width: 100px;"><span class="answer-text">원본 참조</span></span>` 
        },
        { 
            name: "목적어 찾기", 
            exp: "💡 <strong>개념 알기:</strong> '목적어'는 서술어가 나타내는 행동의 대상이 되는 문장 성분으로, 보통 끝에 '∼을/를'이 붙어요.",
            fn: (v) => `<strong>[문장 성분: 목적어]</strong> 다음 문장에서 목적어(~을/를)를 찾아 적어보세요. (만약 목적어가 없는 문장이라면 '없음'이라고 적으세요.)<br><span class="grammar-passage">${v.text}</span><br>목적어: <span class="spelling-blank" style="width: 100px;"><span class="answer-text">원본 참조</span></span>` 
        },
        { 
            name: "빗대어 표현하기", 
            exp: "💡 <strong>개념 알기:</strong> 어떤 대상을 다른 것에 빗대어 표현하는 비유법(직유법, 은유법 등)을 쓰면 글의 느낌이 훨씬 깊어지고 인상 깊어집니다.",
            fn: (v) => `<strong>[빗대어 표현하기]</strong> 다음 말씀의 상황이나 핵심 단어를 다른 사물이나 자연에 빗대어(직유법, 은유법 등) 비유적으로 표현해 보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "호응 관계 맞추기", 
            exp: "💡 <strong>개념 알기:</strong> '결코 ∼않다', '비록 ∼일지라도'처럼 문장에서 앞말과 뒷말이 문법적으로 짝지어 쓰이는 것을 문장의 '호응'이라고 해요.",
            fn: (v) => `<strong>[문장의 호응]</strong> 다음 문장을 바탕으로, "비록 ~일지라도, 반드시 ~하겠다"의 호응 관계를 사용하여 나의 다짐을 담은 문장으로 바꿔 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "피동/사동 상상하기", 
            exp: "💡 <strong>개념 알기:</strong> 남에게 어떤 행동을 당하는 표현(피동)이나, 남에게 행동을 하도록 시키는 표현(사동)으로 문장의 주체와 관점을 다채롭게 바꿀 수 있어요.",
            fn: (v) => `<strong>[피동/사동 상상하기]</strong> 다음 말씀의 주인공 입장이 아닌, 주변 인물의 입장에서 이 상황을 당하는 문장(피동) 혹은 시키는 문장(사동)으로 상상하여 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        },
        { 
            name: "주장하는 글쓰기", 
            exp: "💡 <strong>개념 알기:</strong> 자신의 생각이나 주장을 글로 쓸 때는, 읽는 사람을 설득하기 위해 그것을 뒷받침하는 타당한 까닭(근거)을 반드시 함께 써야 해요.",
            fn: (v) => `<strong>[주장하는 글쓰기]</strong> 다음 말씀에 나타난 행동이나 사건에 대한 나의 의견(본받을 점, 느낌 등)을 까닭을 들어 논리적으로 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>` 
        }
    ]
};

const confusingWordsPool = [
    {
        title: "[의 / 에]",
        explanation: "<strong>'의'</strong>는 누구의 것인지(소유)를 나타내고, <strong>'에'</strong>는 장소나 시간을 나타냅니다.",
        example: "예수님<strong>의</strong> 제자 (소유) / 교회<strong>에</strong> 가다 (장소)",
        task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
        question: "나의 성경책을 책상의 두었다.",
        correctAnswer: "나의 성경책을 책상에 두었다."
    },
    {
        title: "[되 / 돼]",
        explanation: "<strong>'돼'</strong>는 '되어'의 줄임말입니다. 헷갈릴 때는 '하'와 '해'를 넣어보세요. ('하'가 어울리면 '되', '해'가 어울리면 '돼')",
        example: "착한 사람이 <strong>돼</strong>라. (해라 ⭕ / 하라 ❌) <br> 밥을 먹으면 안 <strong>되</strong>니? (하니 ⭕ / 해니 ❌)",
        task: "다음 문장에서 알맞은 말을 골라 동그라미 치고, 문장을 바르게 다시 써보세요.",
        question: "이제 집에 가도 ( 되 / 돼 )?",
        correctAnswer: "이제 집에 가도 돼?"
    },
    {
        title: "[안 / 않]",
        explanation: "<strong>'안'</strong>은 '아니'의 줄임말이고, <strong>'않'</strong>은 '아니하'의 줄임말입니다. 빼버렸을 때 문장이 말이 되면 '안', 말이 안 되면 '않'을 씁니다.",
        example: "밥을 <strong>안</strong> 먹었다. (밥을 먹었다 ⭕) <br> 먹지 <strong>않</strong>았다. (먹지 았다 ❌)",
        task: "다음 빈칸에 '안'이나 '않' 중 알맞은 것을 넣고 문장을 완성해 보세요.",
        question: "나는 오늘 거짓말을 하지 (ㅤㅤㅤ)겠다고 다짐했다.",
        correctAnswer: "나는 오늘 거짓말을 하지 않겠다고 다짐했다."
    },
    {
        title: "[로서 / 로써]",
        explanation: "<strong>'로서'</strong>는 자격이나 신분을 나타내고, <strong>'로써'</strong>는 도구나 방법을 나타냅니다. (사람 뒤에는 보통 '로서', 물건이나 수단 뒤에는 '로써'가 옵니다.)",
        example: "학생으<strong>로서</strong> 공부를 열심히 한다. (자격) <br> 눈물으<strong>로써</strong> 호소했다. (수단/방법)",
        task: "다음 빈칸에 '로서' 또는 '로써'를 알맞게 적어 문장을 완성해 보세요.",
        question: "하나님의 자녀(ㅤㅤㅤ) 부끄럽지 않게 살아야 한다.",
        correctAnswer: "하나님의 자녀로서 부끄럽지 않게 살아야 한다."
    },
    {
        title: "[다르다 / 틀리다]",
        explanation: "<strong>'다르다'</strong>는 서로 같지 않다는 뜻(Different)이고, <strong>'틀리다'</strong>는 사실과 어긋나거나 정답이 맞지 않다는 뜻(Wrong)입니다.",
        example: "나와 너는 성격이 <strong>달라</strong>. / 계산이 <strong>틀렸어</strong>.",
        task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
        question: "내 생각은 너의 생각과 틀려.",
        correctAnswer: "내 생각은 너의 생각과 달라."
    },
    {
        title: "[가르치다 / 가리키다]",
        explanation: "<strong>'가르치다'</strong>는 지식이나 이치를 깨닫게 한다는 뜻이고, <strong>'가리키다'</strong>는 손가락 등으로 어떤 방향이나 대상을 집어서 보여준다는 뜻입니다.",
        example: "선생님이 수학을 <strong>가르치다</strong>. / 손가락으로 별을 <strong>가리키다</strong>.",
        task: "다음 괄호 안에서 알맞은 말을 고르고, 그 단어를 사용하여 나만의 짧은 문장을 지어보세요.",
        question: "예수님께서 하늘을 ( 가르치며 / 가리키며 ) 말씀하셨다.",
        correctAnswer: "가리키며 (자유롭게 지은 문장을 확인해 주세요)"
    },
    {
        title: "[맞히다 / 맞추다]",
        explanation: "<strong>'맞히다'</strong>는 정답을 골라내거나 과녁에 명중시킬 때 쓰고, <strong>'맞추다'</strong>는 서로 떨어져 있는 것을 제자리에 붙이거나 서로 비교해 볼 때 씁니다.",
        example: "퀴즈 정답을 <strong>맞히다</strong>. / 퍼즐을 <strong>맞추다</strong>. / 친구와 정답을 <strong>맞춰</strong>보다.",
        task: "다음 빈칸에 '맞혀' 또는 '맞춰' 중 알맞은 말을 골라 적어보세요.",
        question: "시험이 끝난 후 친구와 함께 답안지를 (ㅤㅤㅤ) 보았다.",
        correctAnswer: "맞춰"
    },
    {
        title: "[띄다 / 띠다]",
        explanation: "<strong>'띄다'</strong>는 눈에 확 보이거나 간격을 벌릴 때(뜨이다/띄우다) 쓰고, <strong>'띠다'</strong>는 어떤 성질, 색깔, 감정을 몸이나 얼굴에 가질 때 씁니다.",
        example: "눈에 <strong>띄는</strong> 행동을 하다. / 온화한 미소를 <strong>띠다</strong>.",
        task: "다음 문장에서 틀린 부분을 찾아 바르게 고쳐 써보세요.",
        question: "예수님은 인자한 미소를 띄고 계셨다.",
        correctAnswer: "예수님은 인자한 미소를 띠고 계셨다."
    },
    {
        title: "[낫다 / 낳다]",
        explanation: "<strong>'낫다'</strong>는 병이 고쳐지거나 두 개를 비교해 더 좋을 때 쓰고, <strong>'낳다'</strong>는 아기나 알을 몸 밖으로 내놓을 때 씁니다.",
        example: "감기가 <strong>낫다</strong>. / 이것이 저것보다 <strong>낫다</strong>. / 아기를 <strong>낳다</strong>.",
        task: "다음 빈칸에 알맞은 말을 골라 적어보세요.",
        question: "아프던 배가 드디어 다 ( 나았어 / 낳았어 ).",
        correctAnswer: "나았어"
    },
    {
        title: "[이었다 / 이였다]",
        explanation: "<strong>'이었다(였)'</strong>는 명사 뒤에 붙는데, 앞 글자에 받침이 있으면 '이었다', 받침이 없으면 '였다'를 씁니다. '이였다'는 아예 없는 말입니다.",
        example: "그는 학생<strong>이었다</strong>. (받침 O) / 그는 천사<strong>였다</strong>. (받침 X)",
        task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
        question: "베드로는 갈릴리의 어부이였다.",
        correctAnswer: "베드로는 갈릴리의 어부였다. (또는 어부이었다.)"
    },
    {
        title: "[체하다 / 채]",
        explanation: "<strong>'~은 체하다'</strong>는 거짓으로 꾸미는 태도를 뜻합니다. <strong>'채'</strong>는 어떤 상태가 계속되는 것을 뜻합니다. (참고: 음식을 먹고 탈이 나는 것도 '체하다'입니다.)",
        example: "아프면서도 안 아픈 <strong>체하다</strong>. / 옷을 입은 <strong>채</strong> 잠들다.",
        task: "다음 빈칸에 '체'와 '채' 중 알맞은 글자를 넣어 문장을 완성해 보세요.",
        question: "나는 성경책을 펼쳐 놓은 (ㅤ)로 꾸벅꾸벅 졸았다.",
        correctAnswer: "나는 성경책을 펼쳐 놓은 채로 꾸벅꾸벅 졸았다."
    },
    {
        title: "[같이 / 같은 띄어쓰기]",
        explanation: "<strong>'같은'</strong>은 항상 앞말과 띄어 씁니다(예: 천사 같은). <strong>'같이'</strong>는 '얼음같이(처럼)' 뜻일 때는 앞말에 붙여 쓰고, '나와 같이(함께)' 뜻일 때는 띄어 씁니다. 단, <strong>'다같이'</strong>는 한 단어라 붙여 씁니다.",
        example: "바람 <strong>같은</strong> 소리 (띄움) / 생각과 <strong>같이</strong> (띄움) / <strong>다같이</strong> 모이다 (붙임)",
        task: "다음 괄호 안에서 띄어쓰기가 알맞은 것을 골라보세요.",
        question: "제자들은 ( 다같이 / 다 같이 ) 모여 기도했습니다.",
        correctAnswer: "다같이"
    }
];

// 세인 표준 맞춤법 7문항 세트 (PDF 제공 원본)
const seinStandardSpelling = {
    questions: [
        { num: 1, text: "오늘이 (몇 일 / 며칠)인지 달력을 확인했어요.", answer: "며칠", options: ["몇 일", "며칠"] },
        { num: 2, text: "숙제를 다 하면 놀아도 (되 / 돼).", answer: "돼", options: ["되", "돼"] },
        { num: 3, text: "비가 (안 / 않) 와서 소풍이 미뤄졌어요.", answer: "안", options: ["안", "않"] },
        { num: 4, text: "동생이 밥을 먹지 (안았다 / 않았다).", answer: "않았다", options: ["안았다", "않았다"] },
        { num: 5, text: "감기가 다 (나았다 / 낳았다).", answer: "나았다", options: ["나았다", "낳았다"] },
        { num: 6, text: "빌린 책을 잃어버렸어. 이를 (어떻게 / 어떡해)!", answer: "어떡해", options: ["어떻게", "어떡해"] },
        { num: 7, text: "바르게 띄어 써 보세요: 우리는 함께 나눌수있다. →", answer: "나눌 수 있다", isSpacing: true }
    ],
    tips: [
        "<strong>되/돼:</strong> \"되어\"로 바꿔도 말이 되면 \"돼\", 안 되면 \"되\"를 써요.",
        "<strong>안/않:</strong> \"안\"은 \"아니\"의 준말, \"않\"은 \"아니하\"의 준말이에요. 서술어 앞에는 \"안\", 서술어 뒤에는 \"않-\"을 써요.",
        "<strong>낫다/낳다:</strong> 병이 \"낫다\", 아기·알을 \"낳다\"예요."
    ],
    answerGuide: "1) 며칠 2) 돼 3) 안 4) 않았다 5) 나았다 6) 어떡해 7) 나눌 수 있다"
};

// 현재 활성화된 워크시트 상태 객체 전역 저장
let currentWorksheetState = null;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date').valueAsDate = new Date();
    
    const chapterSelect = document.getElementById('chapter');
    for (let i = 1; i <= Object.keys(actsData).length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        chapterSelect.appendChild(option);
    }
    
    updateVerseSelects();
    chapterSelect.addEventListener('change', updateVerseSelects);

    initConfusingWordsCheckboxes();
    updateGrammarTypeSelect();
    document.getElementById('grade').addEventListener('change', updateGrammarTypeSelect);
    
    document.getElementById('generatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateWorksheet(false);
    });

    handleTemplateChange();
    updateFilterDateDropdown();
    renderHistory();
});

// 템플릿 변경 처리
function handleTemplateChange() {
    const templateType = document.getElementById('templateType').value;
    const seinGroup = document.getElementById('seinOptionsGroup');
    const basicGroup = document.getElementById('basicOptionsGroup');
    
    if (templateType === 'sein_essay') {
        if (seinGroup) seinGroup.style.display = 'block';
        if (basicGroup) basicGroup.style.display = 'none';
    } else {
        if (seinGroup) seinGroup.style.display = 'none';
        if (basicGroup) basicGroup.style.display = 'block';
    }
}

function initConfusingWordsCheckboxes() {
    const container = document.getElementById('confusingWordsCheckboxes');
    if (!container) return;
    let html = '';
    confusingWordsPool.forEach((item, index) => {
        html += `<label style="display: block; margin-bottom: 5px; cursor: pointer;">
            <input type="checkbox" name="confusingWord" value="${index}"> ${index + 1}. ${item.title}
        </label>`;
    });
    container.innerHTML = html;

    // Check exactly 3 checkboxes (randomly) initially
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const randomIndices = [];
    while (randomIndices.length < 3) {
        const rand = Math.floor(Math.random() * confusingWordsPool.length);
        if (!randomIndices.includes(rand)) randomIndices.push(rand);
    }
    randomIndices.forEach(idx => {
        if (checkboxes[idx]) checkboxes[idx].checked = true;
    });
}

function updateGrammarTypeSelect() {
    const grade = document.getElementById('grade').value;
    const select = document.getElementById('grammarType');
    if (!select) return;
    select.innerHTML = '';
    
    const pool = grammarPools[grade] || [];
    pool.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

function updateVerseSelects() {
    const chapter = document.getElementById('chapter').value;
    const verses = actsData[chapter] || [];
    const startSelect = document.getElementById('startVerse');
    const endSelect = document.getElementById('endVerse');
    
    startSelect.innerHTML = '';
    endSelect.innerHTML = '';
    
    for (let i = 1; i <= verses.length; i++) {
        const opt1 = document.createElement('option');
        opt1.value = i;
        opt1.textContent = i;
        startSelect.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = i;
        opt2.textContent = i;
        if (i === verses.length) opt2.selected = true; 
        endSelect.appendChild(opt2);
    }
}

function getRandomVerses(verses, count) {
    const arr = [...verses];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(arr[i % arr.length]);
    }
    return result;
}

function getGradeName(val) {
    if (val === '12') return '1~2학년';
    if (val === '34') return '3~4학년';
    return '5~6학년';
}

function getSeinGradeText(grade) {
    if (grade === '12') return '1-2 세인';
    if (grade === '34') return '3-4 세인';
    if (grade === '56') return '5-6 세인';
    return '3-4 세인';
}

// 활동지 생성 메인 함수
function generateWorksheet(isFromHistory = false, historyState = null) {
    let state;

    if (!isFromHistory) {
        const templateType = document.getElementById('templateType').value;
        const date = document.getElementById('date').value;
        const grade = document.getElementById('grade').value;
        const chapter = document.getElementById('chapter').value;
        const startVerse = parseInt(document.getElementById('startVerse').value);
        const endVerse = parseInt(document.getElementById('endVerse').value);
        
        if (startVerse > endVerse) {
            alert("시작 절이 끝 절보다 클 수 없습니다.");
            return;
        }
        
        const versesERV = [];
        const versesRKV = [];
        for (let i = startVerse; i <= endVerse; i++) {
            versesERV.push({ num: i, text: actsData[chapter][i-1] });
            versesRKV.push({ num: i, text: actsDataRkv[chapter][i-1] });
        }

        if (templateType === 'sein_essay') {
            const modernBibleLabel = document.getElementById('modernBibleLabel').value || '현대인의성경';
            const spellingSetType = document.getElementById('spellingSetType').value || 'standard';

            state = {
                id: Date.now(),
                templateType: 'sein_essay',
                date: date,
                grade: grade,
                chapter: chapter,
                startVerse: startVerse,
                endVerse: endVerse,
                modernBibleLabel: modernBibleLabel,
                spellingSetType: spellingSetType,
                allVersesERV: versesERV,
                allVersesRKV: versesRKV,
                aiAnswers: null // AI 생성 시 채워짐
            };
        } else {
            // 기존 기본 양식
            const checkedBoxes = document.querySelectorAll('input[name="confusingWord"]:checked');
            if (checkedBoxes.length !== 3) {
                document.getElementById('checkbox-warning').style.display = 'block';
                alert("헷갈리는 우리말 항목을 정확히 3개 선택해 주세요.");
                return;
            }
            document.getElementById('checkbox-warning').style.display = 'none';

            const confusingWordIndices = Array.from(checkedBoxes).map(cb => parseInt(cb.value));
            const qTypeIndex = parseInt(document.getElementById('grammarType').value);

            state = {
                id: Date.now(),
                templateType: 'basic_grammar',
                date: date,
                grade: grade,
                chapter: chapter,
                startVerse: startVerse,
                endVerse: endVerse,
                qTypeIndex: qTypeIndex,
                confusingWordIndices: confusingWordIndices,
                spacingVerses: getRandomVerses(versesRKV, 5),
                grammarVerses: getRandomVerses(versesRKV, 5),
                allVersesERV: versesERV,
                allVersesRKV: versesRKV
            };
        }
        
        saveHistory(state);
    } else {
        state = historyState;
    }

    currentWorksheetState = state;
    renderWorksheetUI(state);
}

// 활동지 UI 렌더링 분기
function renderWorksheetUI(state) {
    const wsArea = document.getElementById('worksheetArea');
    const contentArea = document.getElementById('worksheetContent');
    wsArea.style.display = 'block';
    wsArea.classList.remove('show-answers');

    // 템플릿 판별 (기존 저장 데이터에 templateType이 없으면 basic_grammar로 호환)
    const tType = state.templateType || 'basic_grammar';

    if (tType === 'sein_essay') {
        contentArea.innerHTML = renderSeinWorksheetHtml(state);
    } else {
        contentArea.innerHTML = renderBasicWorksheetHtml(state);
    }

    wsArea.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 1. [신규] 세인 5단계 심화 논술 활동지 렌더러
// ==========================================
function renderSeinWorksheetHtml(state) {
    const modernLabel = state.modernBibleLabel || '현대인의성경';
    const versesERV = state.allVersesERV || [];
    const versesRKV = state.allVersesRKV || [];
    const ai = state.aiAnswers || {};

    // 1) 본문 대조 테이블 행 생성
    let versesRows = '';
    versesRKV.forEach((rkv, idx) => {
        const erv = versesERV[idx] || { text: '' };
        versesRows += `
            <tr>
                <td style="text-align: center; font-weight: bold; width: 45px;">${rkv.num}</td>
                <td style="line-height: 1.7; padding: 7px 10px;">${rkv.text}</td>
                <td style="line-height: 1.7; padding: 7px 10px;">${erv.text}</td>
            </tr>
        `;
    });

    // 2) 활동 2: 절별 요약 행 생성
    let summaryRows = '';
    versesRKV.forEach(v => {
        const vAi = (ai.verseSummaries && ai.verseSummaries.find(item => item.verse === v.num)) || {};
        summaryRows += `
            <tr>
                <td style="text-align: center; font-weight: bold;">${v.num} 절</td>
                <td style="min-height: 38px; height: 38px; vertical-align: middle;">
                    <span class="sein-answer v-summary-${v.num}">[모범 요약] ${vAi.summary || ''}</span>
                </td>
                <td style="vertical-align: middle;">
                    <span class="sein-answer v-keyword-${v.num}">[중심 낱말] ${vAi.keyword || ''}</span>
                </td>
            </tr>
        `;
    });

    // 3) 활동 3: 핵심 단어 행 생성
    let keywordsRows = '';
    const keyWordsList = ai.keyWords || [
        { word: '', verse: '', reason: '' },
        { word: '', verse: '', reason: '' },
        { word: '', verse: '', reason: '' }
    ];
    for (let i = 0; i < 4; i++) {
        const kw = keyWordsList[i] || {};
        keywordsRows += `
            <tr>
                <td style="height: 34px; vertical-align: middle;">
                    <span class="sein-answer" id="kw-word-${i}">${kw.word ? `[핵심] ${kw.word}` : ''}</span>
                </td>
                <td style="vertical-align: middle; text-align: center;">
                    <span class="sein-answer" id="kw-verse-${i}">${kw.verse || ''}</span>
                </td>
                <td style="vertical-align: middle;">
                    <span class="sein-answer" id="kw-reason-${i}">${kw.reason || ''}</span>
                </td>
            </tr>
        `;
    }

    // 4) 활동 4: 맞춤법 7문제 HTML 생성
    let spellingQuestionsHtml = '';
    const spSet = seinStandardSpelling.questions;
    spSet.forEach(q => {
        if (q.isSpacing) {
            spellingQuestionsHtml += `
                <div style="margin-bottom: 6px;">
                    ${q.num}. ${q.text} <span class="sein-inline-ans sein-answer">${q.answer}</span>
                </div>
            `;
        } else {
            // (몇 일 / 며칠) 처럼 괄호 안의 단어 중 정답에 동그라미/밑줄
            const parts = q.text.split(new RegExp(`\\(\\s*${q.options[0]}\\s*\\/\\s*${q.options[1]}\\s*\\)`));
            const formatted = `${parts[0]}( <span class="${q.answer === q.options[0] ? 'sein-inline-ans' : ''}">${q.options[0]}</span> / <span class="${q.answer === q.options[1] ? 'sein-inline-ans' : ''}">${q.options[1]}</span> )${parts[1] || ''}`;
            spellingQuestionsHtml += `
                <div style="margin-bottom: 6px;">
                    ${q.num}. ${formatted}
                </div>
            `;
        }
    });

    return `
    <div class="sein-worksheet">
        <!-- 최상단 헤더 타이틀 -->
        <div class="sein-header-title">${getSeinGradeText(state.grade)}</div>

        <!-- 인적사항 표 (PDF 동일) -->
        <table class="sein-meta-table">
            <thead>
                <tr>
                    <th style="width: 33.3%;">이름</th>
                    <th style="width: 33.3%;">학년·반</th>
                    <th style="width: 33.4%;">날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>${state.date || ''}</td>
                </tr>
            </tbody>
        </table>

        <!-- 수업 개요 박스 -->
        <div class="sein-intro-box">
            <div class="sein-intro-line"><strong>오늘의 글:</strong> 사도행전 ${state.chapter} 장 ${state.startVerse}~${state.endVerse} 절 (개역개정)</div>
            <div class="sein-intro-line"><strong>오늘의 목표:</strong> 긴 글을 차근차근 읽고, 내 말로 정리해서 논술의 기초 체력을 키워요.</div>
            <div class="sein-intro-line"><strong>수업 순서:</strong> 활동 1 전체 파악하기 → 활동 2 한 절씩 요약하기 → 활동 3 핵심 찾기 → 활동 4 맞춤법 찾기 → 활동 5 6 하원칙 요약하기</div>
        </div>

        <!-- 본문 읽기 -->
        <div class="sein-section">
            <div class="sein-sec-header">본문 읽기 (사도행전 ${state.chapter} 장 ${state.startVerse}~${state.endVerse} 절)</div>
            <div class="sein-sec-desc">왼쪽은 개역개정, 오른쪽은 ${modernLabel}이에요. 두 번역을 나란히 읽으며 낱말과 말투가 어떻게 다른지 비교해 보세요.</div>
            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 48px; text-align: center;">절</th>
                        <th style="width: 48%; text-align: left; padding-left: 12px;">개역개정</th>
                        <th style="width: 48%; text-align: left; padding-left: 12px;">${modernLabel}</th>
                    </tr>
                </thead>
                <tbody>
                    ${versesRows}
                </tbody>
            </table>
        </div>

        <!-- 활동 1. 전체 문장 파악하기 -->
        <div class="sein-section">
            <div class="sein-sec-header">활동 1. 전체 문장 파악하기</div>
            <div class="sein-sec-desc">글 전체를 먼저 훑어보면 세부 내용이 훨씬 잘 이해돼요.</div>

            <div style="margin-bottom: 12px; font-size: 14.5px;">
                <strong>1. 본문을 소리 내어 두 번 읽어요.</strong> (읽은 횟수에 ✔ 표시: 1 회 ☐ &nbsp;&nbsp; 2 회 ☐)
            </div>

            <div style="margin-bottom: 8px; font-size: 14.5px;">
                <strong>2. 뜻을 모르는 낱말에 동그라미를 치고, 아래 표에 적어요.</strong>
            </div>
            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 28%;">모르는 낱말</th>
                        <th style="width: 36%;">내가 짐작한 뜻</th>
                        <th style="width: 36%;">사전에서 찾은 뜻</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="height: 32px;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td style="height: 32px;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td style="height: 32px;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>3. 이 글에는 누가 나오나요? 등장하는 사람이나 무리를 모두 적어요.</strong>
            </div>
            <table class="sein-box-table">
                <thead>
                    <tr><th>등장하는 사람(무리)</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 55px;" id="sein-ans-characters">
                            <span class="sein-answer">[모범 가이드] ${ai.characters || ''}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>4. 이 글은 크게 몇 부분으로 나눌 수 있을까요? 나눈 부분에 알맞은 소제목을 붙여요.</strong>
            </div>
            <table class="sein-table" id="sein-divisions-table">
                <thead>
                    <tr>
                        <th style="width: 16%;">부분</th>
                        <th style="width: 34%;">절 범위</th>
                        <th style="width: 50%;">소제목</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">첫째</td>
                        <td style="text-align: center;"><span id="div-range-1">${ai.divisions?.[0]?.range || '___절 ~ ___절'}</span></td>
                        <td><span class="sein-answer" id="div-title-1">${ai.divisions?.[0]?.title ? '[소제목] ' + ai.divisions[0].title : ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">둘째</td>
                        <td style="text-align: center;"><span id="div-range-2">${ai.divisions?.[1]?.range || '___절 ~ ___절'}</span></td>
                        <td><span class="sein-answer" id="div-title-2">${ai.divisions?.[1]?.title ? '[소제목] ' + ai.divisions[1].title : ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">셋째</td>
                        <td style="text-align: center;"><span id="div-range-3">${ai.divisions?.[2]?.range || '___절 ~ ___절'}</span></td>
                        <td><span class="sein-answer" id="div-title-3">${ai.divisions?.[2]?.title ? '[소제목] ' + ai.divisions[2].title : ''}</span></td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>5. 이 글은 한마디로 어떤 내용인가요? 한 문장으로 써 보세요.</strong>
            </div>
            <table class="sein-box-table">
                <thead>
                    <tr><th>한 문장 요약</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 52px;" id="sein-ans-onesentence">
                            <span class="sein-answer">[모범 요약] ${ai.oneSentenceSummary || ''}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 활동 2. 한 절씩 짧게 요약하기 -->
        <div class="sein-section">
            <div class="sein-sec-header">활동 2. 한 절씩 짧게 요약하기</div>
            <div class="sein-sec-desc">한 절을 읽고 20 자 안팎으로 내 말로 줄여 써요. 본문 문장을 그대로 베끼지 말고, 누가 무엇을 했는지 떠올려 보세요.</div>

            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 65px; text-align: center;">절</th>
                        <th style="text-align: left; padding-left: 12px;">한 줄 요약 (내 말로)</th>
                        <th style="width: 200px; text-align: left; padding-left: 12px;">이 절의 중심 낱말</th>
                    </tr>
                </thead>
                <tbody>
                    ${summaryRows}
                </tbody>
            </table>

            <div class="sein-tip-box">
                <strong>요약 도우미:</strong> ① 누가 나오나요? ② 그 사람이 무엇을 했나요? ③ 꼭 필요한 말만 남기고 나머지는 지워요.
            </div>
        </div>

        <!-- 활동 3. 핵심 단어·핵심 문장 찾기 -->
        <div class="sein-section">
            <div class="sein-sec-header">활동 3. 핵심 단어·핵심 문장 찾기</div>
            <div class="sein-sec-desc">핵심 단어는 빼면 글의 뜻이 달라지는 낱말, 핵심 문장은 글쓴이가 가장 말하고 싶은 문장이에요.</div>

            <div style="margin-bottom: 8px; font-size: 14.5px;">
                <strong>① 핵심 단어 찾기</strong> — 본문에서 가장 중요하다고 생각하는 낱말 3~5 개에 색연필로 동그라미를 치고, 왜 중요한지 써요.
            </div>
            <table class="sein-table" id="sein-keywords-table">
                <thead>
                    <tr>
                        <th style="width: 25%;">핵심 단어</th>
                        <th style="width: 25%;">어느 절에 있나요?</th>
                        <th style="width: 50%;">왜 중요한가요?</th>
                    </tr>
                </thead>
                <tbody>
                    ${keywordsRows}
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>② 핵심 문장 찾기</strong> — 글 전체를 대표하는 문장 1 개에 밑줄을 긋고, 아래에 옮겨 써요.
            </div>
            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 80%; text-align: left; padding-left: 12px;">핵심 문장 (옮겨 쓰기)</th>
                        <th style="width: 20%; text-align: center;">절</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 48px;" id="sein-ans-keysentence">
                            <span class="sein-answer">[추천 핵심 문장] ${ai.keySentence?.sentence || ''}</span>
                        </td>
                        <td style="text-align: center; vertical-align: middle;" id="sein-ans-keysentence-v">
                            <span class="sein-answer">${ai.keySentence?.verse || ''}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>③ 이유 쓰기</strong> — 이 문장을 핵심 문장으로 고른 까닭을 "왜냐하면 ~이기 때문이다."로 써 보세요.
            </div>
            <table class="sein-box-table">
                <thead>
                    <tr><th>나의 이유</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 48px;" id="sein-ans-reason">
                            <span class="sein-answer">[이유 가이드] ${ai.keySentence?.reason || ''}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-top: 10px; font-size: 14.5px; font-weight: bold;">
                셀프 체크: 핵심 단어를 넣어서 글 전체를 두 문장으로 말할 수 있나요? &nbsp;&nbsp; ☐ 네 &nbsp;&nbsp; ☐ 아니요
            </div>
        </div>

        <!-- 활동 4. 중요하거나 헷갈리는 맞춤법 찾기 -->
        <div class="sein-section">
            <div class="sein-sec-header">활동 4. 중요하거나 헷갈리는 맞춤법 찾기</div>

            <div style="margin-bottom: 8px; font-size: 14.5px;">
                <strong>① 연습 문제</strong> — 알맞은 낱말에 ○표 해요.
            </div>
            <div class="sein-spelling-questions" style="padding-left: 6px; line-height: 2.1; font-size: 14.5px;">
                ${spellingQuestionsHtml}
            </div>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>② 본문에서 찾기</strong> — 본문을 다시 읽고, 맞춤법이나 띄어쓰기가 헷갈리는 낱말 또는 중요한 낱말을 3 개 이상 찾아 적어요. 국어사전이나 인터넷 사전으로 바른 표기를 확인해요.
            </div>
            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 22%;">본문 속 낱말</th>
                        <th style="width: 12%;">절</th>
                        <th style="width: 33%;">헷갈리는 이유</th>
                        <th style="width: 33%;">사전으로 확인한 바른 표기·뜻</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="height: 32px;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td style="height: 32px;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td style="height: 32px;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>③ 옛 말투 바꾸기</strong> — 본문 끝에 "~하니라", "~하더라"처럼 요즘 잘 쓰지 않는 말투가 있어요. 그런 문장을 하나 찾아 요즘 말투로 바꿔 써 보세요.
            </div>
            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 50%; text-align: left; padding-left: 12px;">본문 속 문장 (옮겨 쓰기)</th>
                        <th style="width: 50%; text-align: left; padding-left: 12px;">요즘 말투로 바꾸기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 44px;">&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>

            <div class="sein-tip-box" style="margin-top: 14px;">
                <strong>맞춤법 꿀팁</strong>
                <ul style="margin: 4px 0 0 18px; padding: 0;">
                    ${seinStandardSpelling.tips.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>

            <div class="sein-teacher-key">
                교사용 정답: ${seinStandardSpelling.answerGuide}
            </div>
        </div>

        <!-- 활동 5. 6 하원칙으로 요약하기 -->
        <div class="sein-section">
            <div class="sein-sec-header">활동 5. 6 하원칙으로 요약하기</div>
            <div class="sein-sec-desc">지금까지 찾은 내용을 모아서 6 가지 질문에 답해 보세요. 본문에 답이 직접 나오지 않으면 "본문에 나오지 않음"이라고 써도 좋아요.</div>

            <table class="sein-table">
                <thead>
                    <tr>
                        <th style="width: 16%; text-align: center;">6 하원칙</th>
                        <th style="width: 46%; text-align: left; padding-left: 12px;">질문</th>
                        <th style="width: 38%; text-align: left; padding-left: 12px;">내 답</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">누가</td>
                        <td>이야기의 중심 인물은 누구인가요?</td>
                        <td><span class="sein-answer" id="sixw-who">[누가] ${ai.sixW?.who || ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">언제</td>
                        <td>이 일은 언제 일어났나요?</td>
                        <td><span class="sein-answer" id="sixw-when">[언제] ${ai.sixW?.when || ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">어디서</td>
                        <td>어디에서 일어난 일인가요?</td>
                        <td><span class="sein-answer" id="sixw-where">[어디서] ${ai.sixW?.where || ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">무엇을</td>
                        <td>무슨 일을 했나요?</td>
                        <td><span class="sein-answer" id="sixw-what">[무엇을] ${ai.sixW?.what || ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">어떻게</td>
                        <td>어떤 방법으로 했나요?</td>
                        <td><span class="sein-answer" id="sixw-how">[어떻게] ${ai.sixW?.how || ''}</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold;">왜</td>
                        <td>왜 그런 일이 일어났나요?</td>
                        <td><span class="sein-answer" id="sixw-why">[왜] ${ai.sixW?.why || ''}</span></td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>① 한 문단으로 정리하기</strong> — 위의 답을 이어서 3~4 문장의 짧은 글로 써 보세요. 문장마다 "~했다", "~이다"로 끝을 맞춰요.
            </div>
            <table class="sein-box-table">
                <thead>
                    <tr><th>6 하원칙 요약문</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 65px;" id="sein-ans-sixw-summary">
                            <span class="sein-answer">[모범 요약문] ${ai.sixWSummary || ''}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-bottom: 8px; font-size: 14.5px; margin-top: 18px;">
                <strong>② 내 생각 한 줄 (논술 연습)</strong> — 이 글을 읽고 새롭게 알게 된 점이나 내 생각을 "나는 ~라고 생각한다. 왜냐하면 ~이기 때문이다."로 써 보세요.
            </div>
            <table class="sein-box-table">
                <thead>
                    <tr><th>나의 생각</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="height: 50px;" id="sein-ans-thought">
                            <span class="sein-answer">[모범 생각] ${ai.myThought || ''}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-top: 18px; margin-bottom: 8px; font-size: 15px; font-weight: bold;">
                수업 마무리 체크
            </div>
            <ul class="sein-checklist">
                <li>• &nbsp;☐ &nbsp;글 전체의 흐름을 말할 수 있어요.</li>
                <li>• &nbsp;☐ &nbsp;각 절을 내 말로 짧게 줄일 수 있어요.</li>
                <li>• &nbsp;☐ &nbsp;핵심 단어와 핵심 문장을 찾았어요.</li>
                <li>• &nbsp;☐ &nbsp;헷갈리는 맞춤법을 사전으로 확인했어요.</li>
                <li>• &nbsp;☐ &nbsp;6 하원칙으로 글을 정리했어요.</li>
            </ul>
        </div>
    </div>
    `;
}

// ==========================================
// 2. [기존] 기초 문법·띄어쓰기 활동지 렌더러
// ==========================================
function renderBasicWorksheetHtml(state) {
    const versesERV = state.allVersesERV || [];
    const versesRKV = state.allVersesRKV || [];

    let rkvHtml = '';
    let ervHtml = '';
    versesRKV.forEach(v => {
        rkvHtml += `<div style="margin-bottom: 8px;"><strong>${v.num}</strong> ${v.text}</div>`;
    });
    versesERV.forEach(v => {
        ervHtml += `<div style="margin-bottom: 8px;"><strong>${v.num}</strong> ${v.text}</div>`;
    });

    let confusingHtml = '';
    if (state.confusingWordIndices) {
        state.confusingWordIndices.forEach((idx, index) => {
            const item = confusingWordsPool[idx];
            confusingHtml += `
                <div class="confusing-box" style="margin-bottom: 25px; page-break-inside: avoid;">
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #cbd5e1;">
                        <h4 style="margin-top: 0; color: #334155; margin-bottom: 8px;">(${index + 1}) ${item.title}</h4>
                        <p style="margin: 0 0 5px 0; font-size: 15px; color: #475569;">${item.explanation}</p>
                        <p style="margin: 0; font-size: 14.5px; color: #2563eb;"><strong>[예시]</strong> ${item.example}</p>
                    </div>
                    <div style="padding-left: 5px;">
                        <p style="margin-bottom: 10px; font-weight: bold; color: #1e293b;">✏️ ${item.task}</p>
                        <p style="margin-bottom: 10px; font-size: 17px;">${item.question}</p>
                        <div style="width: 100%; min-height: 40px; border-bottom: 1px dashed #cbd5e1; display: flex; align-items: flex-end; padding-bottom: 5px;">
                            <span class="answer-text">[정답 가이드] ${item.correctAnswer}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    function applyModernSpacing(text) {
        let result = text;
        const rules = [
            { regex: /그 때에/g, replace: '그때에' },
            { regex: /그 때/g, replace: '그때' },
            { regex: /이 때에/g, replace: '이때에' },
            { regex: /이 때/g, replace: '이때' },
            { regex: /저 때에/g, replace: '저때에' },
            { regex: /저 때/g, replace: '저때' },
            { regex: /그 곳/g, replace: '그곳' },
            { regex: /이 곳/g, replace: '이곳' },
            { regex: /저 곳/g, replace: '저곳' },
            { regex: /그 날/g, replace: '그날' },
            { regex: /이 날/g, replace: '이날' },
            { regex: /저 날/g, replace: '저날' },
            { regex: /아무 것도/g, replace: '아무것도' },
            { regex: /아무 도/g, replace: '아무도' },
            { regex: /아무 데/g, replace: '아무데' },
            { regex: /그 동안/g, replace: '그동안' },
            { regex: /오랫 동안/g, replace: '오랫동안' },
            { regex: /한 번/g, replace: '한번' }, 
            { regex: /다 같이/g, replace: '다같이' },
            { regex: /큰 소리/g, replace: '큰소리' },
            { regex: /본 래/g, replace: '본래' },
            { regex: /할 수록/g, replace: '할수록' },
            { regex: /그 중/g, replace: '그중' },
            { regex: /이 중/g, replace: '이중' }
        ];
        rules.forEach(rule => {
            result = result.replace(rule.regex, rule.replace);
        });
        result = result.replace(/([첫둘셋넷다여일여아열]) 째/g, '$1째');
        return result;
    }

    let spacingHtml = '';
    (state.spacingVerses || []).forEach((v, index) => {
        const modernText = applyModernSpacing(v.text);
        const noSpaceText = modernText.replace(/\s+/g, '');
        const answerText = modernText.replace(/ /g, ' <span style="color:#e63946;">v</span> ');
        spacingHtml += `
            <div class="spacing-item" style="margin-bottom: 25px;">
                <p style="margin-bottom: 5px; font-weight: bold; color: #475569;">(${index + 1}) 사도행전 ${state.chapter}장 ${v.num}절</p>
                <div class="spacing-question" style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px dashed #cbd5e1;">${noSpaceText}</div>
                <div class="spacing-answer" style="background: #fef2f2; padding: 12px; border-radius: 4px; border: 1px dashed #ef4444; line-height: 2.2;">${answerText}</div>
            </div>
        `;
    });

    const pool = grammarPools[state.grade];
    const selectedQ = pool[state.qTypeIndex || 0] || pool[0];
    let grammarHtml = `
        <div class="explanation-box" style="background-color: #f8fafc; border-left: 4px solid #4a6fa5; padding: 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 15px; color: #334155;">${selectedQ.exp}</p>
        </div>
    `;

    if (state.grade === '12' || state.grade === '34') {
        (state.grammarVerses || []).forEach((v, i) => {
            grammarHtml += `
                <div class="grammar-q" style="margin-bottom: 35px;">
                    <strong>문제 ${i + 1}.</strong> ${selectedQ.fn(v)}
                    <div class="grammar-answer">
                        <span style="color:#e63946;">[정답 가이드]</span> 학생의 논리적인 답변을 원본과 비교해 주세요. <br> 
                        <span style="color:#555; font-weight:normal;">원본: ${v.text}</span>
                    </div>
                </div>`;
        });
    } else {
        for (let i = 0; i < 5; i++) {
            const v = (state.grammarVerses && state.grammarVerses[i]) || { text: '' };
            grammarHtml += `
                <div class="grammar-q" style="margin-bottom: 35px;">
                    <strong>문제 ${i + 1}.</strong> ${selectedQ.fn(v)}
                    <div class="grammar-answer">
                        <span style="color:#e63946;">[정답 가이드]</span> 학생의 논리적인 답변을 원본과 비교해 주세요. <br> 
                        <span style="color:#555; font-weight:normal;">원본: ${v.text}</span>
                    </div>
                </div>`;
        }
        grammarHtml += `
            <div class="grammar-q" style="margin-bottom: 35px;">
                <strong>문제 6. [세 줄 글쓰기] 오늘 읽은 진도의 말씀 중 가장 기억에 남는 구절을 고르고, 그 이유를 세 줄 이상의 문장으로 자세히 묘사해 보세요.</strong><br>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div class="grammar-answer"><span style="color:#e63946;">[정답 가이드]</span> 자유 서술형 문항입니다. 세 줄 이상 작성했는지 확인해 주세요.</div>
            </div>
            <div class="grammar-q">
                <strong>문제 7. [자유로운 글쓰기] 이 말씀을 통해 내가 삶 속에서 실천할 수 있는 것을 육하원칙에 맞게 구체적인 문장으로 적어보세요.</strong><br>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div class="grammar-answer"><span style="color:#e63946;">[정답 가이드]</span> 자유 서술형 문항입니다. 육하원칙이 포함되었는지 확인해 주세요.</div>
            </div>
        `;
    }

    return `
        <div class="worksheet-header">
            <h2 id="ws-main-title">사도행전 성경적 세계관 논술 활동지</h2>
            <div class="worksheet-info">
                <span>날짜: <span>${state.date}</span></span>
                <span>이름: ________________</span>
            </div>
            <div class="worksheet-passage">
                <strong>오늘의 진도: 사도행전 ${state.chapter}장 ${state.startVerse}절 ~ ${state.endVerse}절</strong>
            </div>
        </div>

        <div class="worksheet-body">
            <div class="section passage-comparison">
                <h3>0. 오늘의 말씀 읽기</h3>
                <div class="comparison-container" style="display: flex; gap: 20px; font-size: 13px;">
                    <div style="flex: 1; border: 1px solid #cbd5e1; padding: 15px; border-radius: 5px; background: #fff;">
                        <h4 style="margin-top:0; color:#4a6fa5; text-align:center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">개역개정</h4>
                        <div style="line-height: 1.8;">${rkvHtml}</div>
                    </div>
                    <div style="flex: 1; border: 1px solid #cbd5e1; padding: 15px; border-radius: 5px; background: #fff;">
                        <h4 style="margin-top:0; color:#4a6fa5; text-align:center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">쉬운성경</h4>
                        <div style="line-height: 1.8;">${ervHtml}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3>1. 헷갈리는 우리말 바로쓰기</h3>
                <p class="instruction">설명을 읽고 올바른 우리말 사용법을 익혀보세요.</p>
                <div class="activity-box">${confusingHtml}</div>
            </div>

            <div class="section">
                <h3>2. 띄어쓰기 연습</h3>
                <p class="instruction">아래 글을 읽고 띄어 써야 할 곳에 'v' 표시를 해보세요.</p>
                <div class="activity-box spacing-box">${spacingHtml}</div>
            </div>

            <div class="section">
                <h3 id="grammar-title">3. 글쓰기 기초 문법 (${getGradeName(state.grade)})</h3>
                <p id="grammar-instruction" class="instruction">문법을 익히고 알맞은 표현으로 글을 써 보세요. (유형: ${selectedQ.name})</p>
                <div class="activity-box">${grammarHtml}</div>
            </div>
        </div>
    `;
}

// 교사용 답안 인쇄
function printAnswers() {
    const wsArea = document.getElementById('worksheetArea');
    wsArea.classList.add('show-answers');
    const mainTitle = document.getElementById('ws-main-title');
    if (mainTitle) mainTitle.textContent = "사도행전 활동지 [교사용 정답]";
    window.print();
    wsArea.classList.remove('show-answers');
    if (mainTitle) mainTitle.textContent = "사도행전 성경적 세계관 논술 활동지";
}

// 히스토리 관리
function toggleHistory() {
    const section = document.getElementById('historySection');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

function updateFilterDateDropdown() {
    const history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
    const dateSelect = document.getElementById('filterDate');
    if (!dateSelect) return;
    const currentVal = dateSelect.value;
    
    const uniqueDates = [...new Set(history.map(item => item.date))].sort((a,b) => b.localeCompare(a));
    
    let html = '<option value="all">모든 날짜</option>';
    uniqueDates.forEach(d => {
        html += `<option value="${d}">${d}</option>`;
    });
    dateSelect.innerHTML = html;
    
    if (uniqueDates.includes(currentVal)) {
        dateSelect.value = currentVal;
    }
}

function saveHistory(state) {
    let history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
    history.unshift(state); 
    if (history.length > 200) history = history.slice(0, 200);
    localStorage.setItem('actsHistory', JSON.stringify(history));
    
    updateFilterDateDropdown();
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
    const ul = document.getElementById('historyList');
    if (!ul) return;
    ul.innerHTML = '';
    
    const filterGrade = document.getElementById('filterGrade').value;
    const filterDate = document.getElementById('filterDate').value;

    let filteredHistory = history;
    if (filterGrade !== 'all') {
        filteredHistory = filteredHistory.filter(item => item.grade === filterGrade);
    }
    if (filterDate !== 'all') {
        filteredHistory = filteredHistory.filter(item => item.date === filterDate);
    }
    
    if (filteredHistory.length === 0) {
        ul.innerHTML = '<li style="color: #666; text-align: center; padding: 20px;">출제 기록이 없습니다.</li>';
        return;
    }

    filteredHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        
        const isSein = item.templateType === 'sein_essay';
        const templateBadge = isSein 
            ? `<span style="background-color: #dbeafe; color: #1e40af; font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-right: 5px;">세인5단계</span>`
            : `<span style="background-color: #f1f5f9; color: #475569; font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-right: 5px;">기초문법</span>`;

        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" class="history-checkbox" value="${item.id}">
                <div>
                    <div><strong>${item.date}</strong> [${getGradeName(item.grade)}] ${templateBadge}</div>
                    <div style="color: #64748b; font-size: 13px;">사도행전 ${item.chapter}장 ${item.startVerse}~${item.endVerse}절</div>
                </div>
            </div>
            <div>
                <button class="history-btn" onclick="loadState(${item.id})">불러오기</button>
            </div>
        `;
        ul.appendChild(li);
    });
}

function toggleSelectAllHistory(checked) {
    const checkboxes = document.querySelectorAll('.history-checkbox');
    checkboxes.forEach(cb => cb.checked = checked);
}

function deleteSelectedHistory() {
    const checkboxes = document.querySelectorAll('.history-checkbox:checked');
    if (checkboxes.length === 0) {
        alert("삭제할 기록을 선택해 주세요.");
        return;
    }
    
    if (confirm(`선택한 ${checkboxes.length}개의 출제 기록을 삭제하시겠습니까?`)) {
        const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.value));
        let history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
        history = history.filter(item => !idsToDelete.includes(item.id));
        localStorage.setItem('actsHistory', JSON.stringify(history));
        
        const selectAllCb = document.getElementById('selectAllHistory');
        if (selectAllCb) selectAllCb.checked = false;
        
        updateFilterDateDropdown();
        renderHistory();
    }
}

function loadState(id) {
    const history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
    const state = history.find(s => s.id === id);
    if (state) {
        const templateType = state.templateType || 'basic_grammar';
        document.getElementById('templateType').value = templateType;
        handleTemplateChange();

        document.getElementById('date').value = state.date;
        document.getElementById('grade').value = state.grade;

        if (templateType === 'sein_essay') {
            if (state.modernBibleLabel) document.getElementById('modernBibleLabel').value = state.modernBibleLabel;
            if (state.spellingSetType) document.getElementById('spellingSetType').value = state.spellingSetType;
        } else {
            updateGrammarTypeSelect();
            if (state.qTypeIndex !== undefined) {
                document.getElementById('grammarType').value = state.qTypeIndex;
            }
            if (state.confusingWordIndices) {
                const checkboxes = document.querySelectorAll('input[name="confusingWord"]');
                checkboxes.forEach(cb => cb.checked = false);
                state.confusingWordIndices.forEach(idx => {
                    if (checkboxes[idx]) checkboxes[idx].checked = true;
                });
            }
        }

        document.getElementById('chapter').value = state.chapter;
        updateVerseSelects();
        document.getElementById('startVerse').value = state.startVerse;
        document.getElementById('endVerse').value = state.endVerse;

        generateWorksheet(true, state);
    } else {
        alert("기록을 찾을 수 없습니다.");
    }
}

function clearHistory() {
    if (confirm("모든 출제 기록을 완전히 지우시겠습니까?")) {
        localStorage.removeItem('actsHistory');
        updateFilterDateDropdown();
        renderHistory();
    }
}

// ==========================================
// 3. AI 정답 자동 생성 기능
// ==========================================
async function generateAIAnswers() {
    const _k1 = "AQ.Ab8RN6LaJwqCkN49";
    const _k2 = "AoZPXqkfVjnpA1rJi";
    const _k3 = "MvnZwE0btFmZhZoDA";
    const apiKey = _k1 + _k2 + _k3;

    const wsArea = document.getElementById('worksheetArea');
    if (!wsArea || wsArea.style.display === 'none' || !currentWorksheetState) {
        alert("먼저 활동지를 생성해 주세요.");
        return;
    }

    const state = currentWorksheetState;
    const isSein = (state.templateType === 'sein_essay');

    const aiBtn1 = document.getElementById('aiAnswerBtn');
    const aiBtn2 = document.getElementById('aiAnswerBtnBottom');
    const setBtnText = (txt, disabled) => {
        if (aiBtn1) { aiBtn1.innerHTML = txt; aiBtn1.disabled = disabled; }
        if (aiBtn2) { aiBtn2.innerHTML = txt; aiBtn2.disabled = disabled; }
    };
    
    setBtnText("⏳ AI가 정답 생성 중...", true);

    try {
        if (isSein) {
            // [세인 5단계 심화 논술] AI 정답 생성
            const versesText = (state.allVersesRKV || []).map(v => `${v.num}절: ${v.text}`).join('\n');
            const promptText = `
너는 초등학교 국어 및 성경 논술 전문 교사야.
다음 사도행전 ${state.chapter}장 ${state.startVerse}~${state.endVerse}절 본문을 정밀 분석하여, 교사용 활동지 정답 가이드를 작성해줘.

[본문 말씀]
${versesText}

반드시 아래 JSON 형식으로만 반환해 (마크다운 코드블록이나 부가 설명 금지):
{
  "characters": "이야기에 등장하는 인물이나 무리를 쉼표로 나열 (예: 베드로, 열한 사도, 예루살렘 사람들)",
  "divisions": [
    { "range": "${state.startVerse}절 ~ OO절", "title": "첫째 단락 소제목" },
    { "range": "OO절 ~ OO절", "title": "둘째 단락 소제목" },
    { "range": "OO절 ~ ${state.endVerse}절", "title": "셋째 단락 소제목" }
  ],
  "oneSentenceSummary": "본문 전체를 아우르는 명확하고 교훈적인 한 문장 요약 (~했다 또는 ~이다 체)",
  "verseSummaries": [
    ${(state.allVersesRKV || []).map(v => `{"verse": ${v.num}, "summary": "${v.num}절의 20자 내외 요약", "keyword": "중심단어"}`).join(',\n    ')}
  ],
  "keyWords": [
    { "word": "핵심단어1", "verse": "OO절", "reason": "이 단어가 핵심인 이유" },
    { "word": "핵심단어2", "verse": "OO절", "reason": "이 단어가 핵심인 이유" },
    { "word": "핵심단어3", "verse": "OO절", "reason": "이 단어가 핵심인 이유" }
  ],
  "keySentence": {
    "verse": "OO절",
    "sentence": "본문 전체를 가장 대표하는 1구절 원문",
    "reason": "왜냐하면 본문의 핵심 진리인 OO을 가장 잘 보여주기 때문이다."
  },
  "sixW": {
    "who": "중심 인물",
    "when": "일어난 때",
    "where": "일어난 장소",
    "what": "일어난 중심 사건/일",
    "how": "사건이 일어난 방법이나 태도",
    "why": "그 일이 일어난 까닭"
  },
  "sixWSummary": "6하원칙의 답을 매끄럽게 연결한 3~4문장의 요약 문단 (~했다, ~이다 체)",
  "myThought": "나는 OO라고 생각한다. 왜냐하면 OO이기 때문이다."
}
`;

            let data = await callGeminiAPI(promptText, apiKey, setBtnText);
            const rawText = data.candidates[0].content.parts[0].text;
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("JSON 파싱 실패");
            
            const aiResult = JSON.parse(jsonMatch[0]);
            state.aiAnswers = aiResult;
            
            // 로컬스토리지 갱신
            updateStoredState(state);
            
            // UI 다시 렌더링
            renderWorksheetUI(state);

            alert("✨ 세인 5단계 심화 논술의 AI 정답 가이드가 완벽히 생성되었습니다!\n'✏️ 교사용 답안 인쇄' 버튼을 눌러 정답지를 확인하거나 인쇄하세요.");

        } else {
            // [기존 기본 양식] AI 정답 생성
            const titleEl = document.getElementById('grammar-title')?.textContent || '';
            const instEl = document.getElementById('grammar-instruction')?.textContent || '';
            
            const questions = [];
            document.querySelectorAll('.grammar-q').forEach((el, index) => {
                const verseEl = el.querySelector('.grammar-passage');
                if (verseEl) {
                    questions.push(`문제 ${index + 1}: ${verseEl.textContent.trim()}`);
                }
            });

            if (questions.length === 0) {
                alert("이 문제 유형은 말씀 기반 문제가 없어 자동 생성을 지원하지 않습니다.");
                return;
            }

            const promptText = `
너는 초등학생 주일학교 선생님이야. 다음 문제들에 대해 교사용 정답 가이드를 만들어줘.
단원: ${titleEl}
지시사항: ${instEl}

${questions.join('\n')}

각 문제에 대한 교사용 정답(초등학생 눈높이에 맞춘 간단한 정답 및 풀이)을 아래 JSON 배열 형식으로만 반환해. 다른 설명은 절대 넣지 마.
[
  { 
    "inlineAnswers": ["주어 정답", "서술어 정답"],
    "guide": "이 문장의 주어는 'OOO'이고, 서술어는 'OOO'입니다."
  }
]
`;
            let data = await callGeminiAPI(promptText, apiKey, setBtnText);
            const rawText = data.candidates[0].content.parts[0].text;
            const jsonMatch = rawText.match(/\[[\s\S]*\]/);
            if (!jsonMatch) throw new Error("JSON 파싱 실패");
            
            const answers = JSON.parse(jsonMatch[0]);
            const qElements = document.querySelectorAll('.grammar-q');
            
            answers.forEach((ans, idx) => {
                if (qElements[idx]) {
                    const answerBox = qElements[idx].querySelector('.grammar-answer');
                    if (answerBox) {
                        answerBox.innerHTML = `
                            <span style="color:#e63946; font-weight:bold;">[AI 정답 가이드]</span> 
                            <span style="color:#2c3e50;">${ans.guide}</span> <br> 
                            <span style="color:#888; font-size: 13px;">원본: ${questions[idx].replace(`문제 ${idx+1}: `, '')}</span>
                        `;
                    }
                    const blanks = qElements[idx].querySelectorAll('.answer-text');
                    if (ans.inlineAnswers && Array.isArray(ans.inlineAnswers)) {
                        blanks.forEach((blank, bIdx) => {
                            if (ans.inlineAnswers[bIdx]) {
                                blank.textContent = ans.inlineAnswers[bIdx];
                            }
                        });
                    }
                }
            });

            alert("AI 정답 생성이 완료되었습니다! '✏️ 교사용 답안 인쇄' 버튼을 눌러 확인해 보세요.");
        }

    } catch (err) {
        console.error(err);
        let errorMsg = "AI 정답 생성 중 오류가 발생했습니다.\n\n에러: " + err.message;
        if (err.message.includes("API key not valid")) {
            errorMsg = "내장된 API 키에 문제가 발생했습니다. 관리자에게 문의하세요.";
        }
        alert(errorMsg);
    } finally {
        setBtnText("✨ AI 정답 자동 생성", false);
    }
}

// Gemini API 호출 헬퍼
async function callGeminiAPI(promptText, apiKey, setBtnText) {
    let maxRetries = 3;
    let data;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        data = await response.json();
        
        if (data.error && data.error.message && data.error.message.includes("high demand")) {
            if (attempt < maxRetries) {
                setBtnText(`⏳ 서버 혼잡, 재시도 중... (${attempt}/${maxRetries-1})`, true);
                await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
                continue;
            }
        }
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        break;
    }
    return data;
}

function updateStoredState(updatedState) {
    let history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
    const idx = history.findIndex(item => item.id === updatedState.id);
    if (idx !== -1) {
        history[idx] = updatedState;
        localStorage.setItem('actsHistory', JSON.stringify(history));
    }
}
