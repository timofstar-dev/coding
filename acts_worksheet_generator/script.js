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

    updateFilterDateDropdown();
    renderHistory();
});

function initConfusingWordsCheckboxes() {
    const container = document.getElementById('confusingWordsCheckboxes');
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
        checkboxes[idx].checked = true;
    });
}

function updateGrammarTypeSelect() {
    const grade = document.getElementById('grade').value;
    const select = document.getElementById('grammarType');
    select.innerHTML = '';
    
    const pool = grammarPools[grade];
    pool.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

function updateVerseSelects() {
    const chapter = document.getElementById('chapter').value;
    const verses = actsData[chapter];
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

function generateWorksheet(isFromHistory = false, historyState = null) {
    let state;

    if (!isFromHistory) {
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
            date: date,
            grade: grade,
            chapter: chapter,
            startVerse: startVerse,
            endVerse: endVerse,
            qTypeIndex: qTypeIndex,
            confusingWordIndices: confusingWordIndices,
            spacingVerses: getRandomVerses(versesRKV, 5),
            grammarVerses: getRandomVerses(versesRKV, 5), // 기본 5문제용 (5~6학년은 5문제+고정2문제)
            allVersesERV: versesERV,
            allVersesRKV: versesRKV
        };
        
        saveHistory(state);
    } else {
        state = historyState;
    }

    renderWorksheetUI(state);
}

function renderWorksheetUI(state) {
    // 1. 헤더
    document.getElementById('ws-date').textContent = state.date;
    document.getElementById('ws-passage').textContent = `${state.chapter}장 ${state.startVerse}절 ~ ${state.endVerse}절`;
    document.getElementById('ws-main-title').textContent = "사도행전 성경적 세계관 논술 활동지";

    // 0. 오늘의 말씀 읽기 (비교)
    let rkvHtml = '';
    let ervHtml = '';
    
    const versesERV = state.allVersesERV || [];
    const versesRKV = state.allVersesRKV || [];
    
    if (versesERV.length === 0) {
        for (let i = state.startVerse; i <= state.endVerse; i++) {
            versesERV.push({ num: i, text: actsData[state.chapter][i-1] });
            versesRKV.push({ num: i, text: actsDataRkv[state.chapter][i-1] });
        }
    }

    versesRKV.forEach(v => {
        rkvHtml += `<div style="margin-bottom: 8px;"><strong>${v.num}</strong> ${v.text}</div>`;
    });
    versesERV.forEach(v => {
        ervHtml += `<div style="margin-bottom: 8px;"><strong>${v.num}</strong> ${v.text}</div>`;
    });
    
    const rkvEl = document.getElementById('ws-passage-rkv');
    const ervEl = document.getElementById('ws-passage-erv');
    if (rkvEl && ervEl) {
        rkvEl.innerHTML = rkvHtml;
        ervEl.innerHTML = ervHtml;
    }

    // 2. 헷갈리는 우리말 바로쓰기
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
    } else {
        confusingHtml = '<p style="color:#888;">이전 버전의 기록이라 표시할 수 없습니다. (새로 생성해주세요.)</p>';
    }
    document.getElementById('ws-confusing-words').innerHTML = confusingHtml;

    // 3. 띄어쓰기 연습
    let spacingHtml = '';
    state.spacingVerses.forEach((v, index) => {
        const noSpaceText = v.text.replace(/\s+/g, '');
        const answerText = v.text.replace(/ /g, ' <span style="color:#e63946;">v</span> ');
        
        spacingHtml += `
            <div style="margin-bottom: 20px;">
                <strong>(${index + 1})</strong> 
                <span class="spacing-question">${noSpaceText}</span>
                <span class="spacing-answer">${answerText}</span>
            </div>`;
    });
    document.getElementById('ws-spacing').innerHTML = spacingHtml;

    // 4. 문법 연습
    const titleEl = document.getElementById('grammar-title');
    const instEl = document.getElementById('grammar-instruction');
    const boxEl = document.getElementById('ws-grammar');
    
    const pool = grammarPools[state.grade];
    const selectedQ = pool[state.qTypeIndex];

    // 개념 설명 박스 렌더링
    let grammarHtml = `
        <div style="background-color: #fef9c3; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-size: 15px; color: #854d0e; border: 1px solid #fef08a;">
            ${selectedQ.exp}
        </div>
    `;

    if (state.grade === '12') {
        titleEl.textContent = '3. 글쓰기 기초 (초등 1~2학년군)';
        instEl.textContent = `말씀을 읽고, 다음 활동을 해보세요. (유형: ${selectedQ.name})`;
        
        for (let i = 0; i < 5; i++) {
            grammarHtml += `
                <div class="grammar-q" style="margin-bottom: 35px;">
                    <strong>문제 ${i + 1}.</strong> ${selectedQ.fn(state.grammarVerses[i])}
                    <div class="grammar-answer">
                        <span style="color:#e63946;">[정답 가이드]</span> 자유롭게 쓴 글을 확인해 주세요. <br> 
                        <span style="color:#555; font-weight:normal;">원본: ${state.grammarVerses[i].text}</span>
                    </div>
                </div>`;
        }
    } else if (state.grade === '34') {
        titleEl.textContent = '3. 글쓰기 문법 (초등 3~4학년군)';
        instEl.textContent = `문장의 기본 짜임과 표현을 생각하며 문제를 풀어보세요. (유형: ${selectedQ.name})`;
        
        for (let i = 0; i < 5; i++) {
            grammarHtml += `
                <div class="grammar-q" style="margin-bottom: 35px;">
                    <strong>문제 ${i + 1}.</strong> ${selectedQ.fn(state.grammarVerses[i])}
                    <div class="grammar-answer">
                        <span style="color:#e63946;">[정답 가이드]</span> 아래 원본 말씀을 바탕으로 학생들이 쓴 답을 확인해 주세요. <br> 
                        <span style="color:#555; font-weight:normal;">원본: ${state.grammarVerses[i].text}</span>
                    </div>
                </div>`;
        }
    } else {
        titleEl.textContent = '3. 글쓰기 문법 및 논술 (초등 5~6학년군)';
        instEl.textContent = `문장 성분을 분석하고 논리적인 글을 작성해 보세요. (유형: ${selectedQ.name})`;
        
        for (let i = 0; i < 5; i++) {
            grammarHtml += `
                <div class="grammar-q" style="margin-bottom: 35px;">
                    <strong>문제 ${i + 1}.</strong> ${selectedQ.fn(state.grammarVerses[i])}
                    <div class="grammar-answer">
                        <span style="color:#e63946;">[정답 가이드]</span> 학생의 논리적인 답변을 원본과 비교해 주세요. <br> 
                        <span style="color:#555; font-weight:normal;">원본: ${state.grammarVerses[i].text}</span>
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
    
    boxEl.innerHTML = grammarHtml;

    document.getElementById('worksheetArea').style.display = 'block';
    document.getElementById('worksheetArea').classList.remove('show-answers');
    document.getElementById('worksheetArea').scrollIntoView({ behavior: 'smooth' });
}

// 교사용 답안 인쇄
function printAnswers() {
    const wsArea = document.getElementById('worksheetArea');
    wsArea.classList.add('show-answers');
    document.getElementById('ws-main-title').textContent = "사도행전 활동지 [교사용 정답]";
    window.print();
    wsArea.classList.remove('show-answers');
    document.getElementById('ws-main-title').textContent = "사도행전 성경적 세계관 논술 활동지";
}

// 히스토리 관리 및 필터 토글
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
        ul.innerHTML = '<li style="color:#888; text-align:center; padding: 10px;">조건에 맞는 출제 기록이 없습니다.</li>';
        return;
    }

    filteredHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        
        let typeName = "알 수 없는 유형";
        if (grammarPools[item.grade] && grammarPools[item.grade][item.qTypeIndex]) {
            typeName = grammarPools[item.grade][item.qTypeIndex].name;
        }

        li.innerHTML = `
            <span>📅 ${item.date} | 📖 행 ${item.chapter}:${item.startVerse}~${item.endVerse} | 🧑‍🎓 ${getGradeName(item.grade)} | ✏️ <strong>${typeName}</strong></span>
            <button type="button" class="history-btn" onclick='loadState(${item.id})'>불러오기</button>
        `;
        ul.appendChild(li);
    });
}

function loadState(id) {
    const history = JSON.parse(localStorage.getItem('actsHistory') || '[]');
    const state = history.find(s => s.id === id);
    if (state) {
        document.getElementById('date').value = state.date;
        document.getElementById('grade').value = state.grade;
        updateGrammarTypeSelect(); // Update dropdown options first
        if (state.qTypeIndex !== undefined) {
            document.getElementById('grammarType').value = state.qTypeIndex;
        }

        document.getElementById('chapter').value = state.chapter;
        updateVerseSelects();
        document.getElementById('startVerse').value = state.startVerse;
        document.getElementById('endVerse').value = state.endVerse;

        if (state.confusingWordIndices) {
            const checkboxes = document.querySelectorAll('input[name="confusingWord"]');
            checkboxes.forEach(cb => cb.checked = false);
            state.confusingWordIndices.forEach(idx => {
                if (checkboxes[idx]) checkboxes[idx].checked = true;
            });
        }

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
