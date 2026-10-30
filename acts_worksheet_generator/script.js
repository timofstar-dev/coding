const grammarPools = {
  12: [
    {
      name: "문장 부호 바르게 쓰기",
      exp: "💡 <strong>개념 알기:</strong> 생각이나 느낌을 글로 쓸 때는 문장이 끝나는 곳에 마침표(.), 쉼표(,), 물음표(?) 등 알맞은 문장 부호를 써야 해요.",
      fn: (v) =>
        `<strong>[바르게 쓰기]</strong> 다음 말씀을 소리 내어 읽고, 문장 부호(마침표, 쉼표 등)에 주의하며 따라 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "흉내 내는 말 적기",
      exp: "💡 <strong>개념 알기:</strong> 소리나 모양을 흉내 내는 말(의성어, 의태어)을 쓰면 글을 훨씬 더 생생하고 재미있게 표현할 수 있어요.",
      fn: (v) =>
        `<strong>[흉내 내는 말]</strong> 다음 말씀의 상황에 어울리는 소리나 모양을 나타내는 흉내 내는 말(의성어, 의태어)을 상상해 적어보세요. (예: 사뿐사뿐, 우당탕)<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "마음과 기분 표현하기",
      exp: "💡 <strong>개념 알기:</strong> 내 마음이나 기분을 글로 솔직하게 쓰면, 다른 사람에게 내 생각을 더 잘 전달할 수 있어요.",
      fn: (v) =>
        `<strong>[마음 표현하기]</strong> 다음 말씀을 읽고 난 내 마음이나 기분을 "나는 ~해요"라는 문장으로 짧게 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "일어난 일 요약하기",
      exp: "💡 <strong>개념 알기:</strong> 일어난 일을 글로 쓸 때는 '누가 어찌했다'처럼 간단하고 명확하게 쓰는 연습이 필요해요.",
      fn: (v) =>
        `<strong>[일어난 일 찾기]</strong> 다음 말씀에서 무슨 일이 일어났나요? "누가 ~했어요"라고 짧게 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 2px dotted #ccc; margin-top: 35px;"></div>`,
    },
  ],
  34: [
    {
      name: "주어와 서술어 찾기",
      exp: "💡 <strong>개념 알기:</strong> '주어'는 문장에서 행동을 하는 주인공(누가/무엇이)을 뜻하고, '서술어'는 그 주인공의 상태나 행동(어찌하다/어떠하다)을 나타내는 말이에요.",
      fn: (v) =>
        `<strong>[주어와 서술어]</strong> 다음 말씀에서 행동을 하는 주인공(누가/무엇이)과 그 행동(어찌하다/어떠하다)을 찾아 적어보세요.<br><span class="grammar-passage">${v.text}</span><br>누가: <span class="spelling-blank" style="width: 120px;"><span class="answer-text">원본 참조</span></span> 어찌하다: <span class="spelling-blank" style="width: 120px;"><span class="answer-text">원본 참조</span></span>`,
    },
    {
      name: "꾸며주는 말 넣기",
      exp: "💡 <strong>개념 알기:</strong> '예쁜', '빠르게'처럼 다른 말을 꾸며주는 말을 넣으면 문장의 뜻이 훨씬 더 자세하고 생생해져요.",
      fn: (v) =>
        `<strong>[꾸며주는 말]</strong> 다음 말씀에 알맞은 '꾸며주는 말'(예: 아름다운, 높이, 몹시 등)을 스스로 상상하여 하나 이상 덧붙인 뒤, 문장을 더 생생하게 다시 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "이어주는 말 넣기",
      exp: "💡 <strong>개념 알기:</strong> '그리고', '그래서', '그러나' 등 문장과 문장을 자연스럽게 이어주는 접속어를 쓰면 글이 더 매끄러워져요.",
      fn: (v) =>
        `<strong>[이어주는 말]</strong> 이 말씀의 다음 상황이 이어질 때, (그래서 / 그러나 / 그리고) 중 가장 어울리는 접속어를 하나 고르고 뒷문장을 지어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "높임말 바꾸기",
      exp: "💡 <strong>개념 알기:</strong> 어른에게 말씀드릴 때나 공손한 글을 쓸 때는 서술어 끝을 바꾸거나 '께서', '시' 등을 넣어 알맞은 높임 표현을 써야 해요.",
      fn: (v) =>
        `<strong>[높임 표현]</strong> 다음 말씀을 어른에게 공손하게 말씀드린다고 상상하고, 높임말을 사용하여 다시 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "육하원칙 찾기",
      exp: "💡 <strong>개념 알기:</strong> 육하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 맞추어 글을 쓰면 일어난 사건을 아주 정확하게 전달할 수 있어요.",
      fn: (v) =>
        `<strong>[육하원칙]</strong> 다음 말씀에서 육하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜) 중 하나를 골라, 거기에 해당하는 내용을 찾아 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
  ],
  56: [
    {
      name: "주어와 서술어",
      exp: "💡 <strong>개념 알기:</strong> 문장에서 꼭 필요한 주성분인 주어(누가/무엇이)와 서술어(어찌하다/어떠하다/무엇이다)를 정확히 쓰면 흔들림 없는 바른 문장이 돼요.",
      fn: (v) =>
        `<strong>[문장 성분: 주어/서술어]</strong> 다음 문장의 주어와 서술어를 찾아 적어보세요.<br><span class="grammar-passage">${v.text}</span><br>주어: <span class="spelling-blank" style="width: 100px;"><span class="answer-text">원본 참조</span></span> 서술어: <span class="spelling-blank" style="width: 100px;"><span class="answer-text">원본 참조</span></span>`,
    },
    {
      name: "목적어 찾기",
      exp: "💡 <strong>개념 알기:</strong> '목적어'는 서술어가 나타내는 행동의 대상이 되는 문장 성분으로, 보통 끝에 '∼을/를'이 붙어요.",
      fn: (v) =>
        `<strong>[문장 성분: 목적어]</strong> 다음 문장에서 목적어(~을/를)를 찾아 적어보세요. (만약 목적어가 없는 문장이라면 '없음'이라고 적으세요.)<br><span class="grammar-passage">${v.text}</span><br>목적어: <span class="spelling-blank" style="width: 100px;"><span class="answer-text">원본 참조</span></span>`,
    },
    {
      name: "빗대어 표현하기",
      exp: "💡 <strong>개념 알기:</strong> 어떤 대상을 다른 것에 빗대어 표현하는 비유법(직유법, 은유법 등)을 쓰면 글의 느낌이 훨씬 깊어지고 인상 깊어집니다.",
      fn: (v) =>
        `<strong>[빗대어 표현하기]</strong> 다음 말씀의 상황이나 핵심 단어를 다른 사물이나 자연에 빗대어(직유법, 은유법 등) 비유적으로 표현해 보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "호응 관계 맞추기",
      exp: "💡 <strong>개념 알기:</strong> '결코 ∼않다', '비록 ∼일지라도'처럼 문장에서 앞말과 뒷말이 문법적으로 짝지어 쓰이는 것을 문장의 '호응'이라고 해요.",
      fn: (v) =>
        `<strong>[문장의 호응]</strong> 다음 문장을 바탕으로, "비록 ~일지라도, 반드시 ~하겠다"의 호응 관계를 사용하여 나의 다짐을 담은 문장으로 바꿔 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "피동/사동 상상하기",
      exp: "💡 <strong>개념 알기:</strong> 남에게 어떤 행동을 당하는 표현(피동)이나, 남에게 행동을 하도록 시키는 표현(사동)으로 문장의 주체와 관점을 다채롭게 바꿀 수 있어요.",
      fn: (v) =>
        `<strong>[피동/사동 상상하기]</strong> 다음 말씀의 주인공 입장이 아닌, 주변 인물의 입장에서 이 상황을 당하는 문장(피동) 혹은 시키는 문장(사동)으로 상상하여 적어보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
    {
      name: "주장하는 글쓰기",
      exp: "💡 <strong>개념 알기:</strong> 자신의 생각이나 주장을 글로 쓸 때는, 읽는 사람을 설득하기 위해 그것을 뒷받침하는 타당한 까닭(근거)을 반드시 함께 써야 해요.",
      fn: (v) =>
        `<strong>[주장하는 글쓰기]</strong> 다음 말씀에 나타난 행동이나 사건에 대한 나의 의견(본받을 점, 느낌 등)을 까닭을 들어 논리적으로 써보세요.<br><span class="grammar-passage">${v.text}</span><div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>`,
    },
  ],
};

const confusingWordsPool = [
  {
    title: "[의 / 에]",
    explanation:
      "<strong>'의'</strong>는 누구의 것인지(소유)를 나타내고, <strong>'에'</strong>는 장소나 시간을 나타냅니다.",
    example:
      "예수님<strong>의</strong> 제자 (소유) / 교회<strong>에</strong> 가다 (장소)",
    task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
    question: "나의 성경책을 책상의 두었다.",
    correctAnswer: "나의 성경책을 책상에 두었다.",
  },
  {
    title: "[되 / 돼]",
    explanation:
      "<strong>'돼'</strong>는 '되어'의 줄임말입니다. 헷갈릴 때는 '하'와 '해'를 넣어보세요. ('하'가 어울리면 '되', '해'가 어울리면 '돼')",
    example:
      "착한 사람이 <strong>돼</strong>라. (해라 ⭕ / 하라 ❌) <br> 밥을 먹으면 안 <strong>되</strong>니? (하니 ⭕ / 해니 ❌)",
    task: "다음 문장에서 알맞은 말을 골라 동그라미 치고, 문장을 바르게 다시 써보세요.",
    question: "이제 집에 가도 ( 되 / 돼 )?",
    correctAnswer: "이제 집에 가도 돼?",
  },
  {
    title: "[안 / 않]",
    explanation:
      "<strong>'안'</strong>은 '아니'의 줄임말이고, <strong>'않'</strong>은 '아니하'의 줄임말입니다. 빼버렸을 때 문장이 말이 되면 '안', 말이 안 되면 '않'을 씁니다.",
    example:
      "밥을 <strong>안</strong> 먹었다. (밥을 먹었다 ⭕) <br> 먹지 <strong>않</strong>았다. (먹지 았다 ❌)",
    task: "다음 빈칸에 '안'이나 '않' 중 알맞은 것을 넣고 문장을 완성해 보세요.",
    question: "나는 오늘 거짓말을 하지 (ㅤㅤㅤ)겠다고 다짐했다.",
    correctAnswer: "나는 오늘 거짓말을 하지 않겠다고 다짐했다.",
  },
  {
    title: "[로서 / 로써]",
    explanation:
      "<strong>'로서'</strong>는 자격이나 신분을 나타내고, <strong>'로써'</strong>는 도구나 방법을 나타냅니다. (사람 뒤에는 보통 '로서', 물건이나 수단 뒤에는 '로써'가 옵니다.)",
    example:
      "학생으<strong>로서</strong> 공부를 열심히 한다. (자격) <br> 눈물으<strong>로써</strong> 호소했다. (수단/방법)",
    task: "다음 빈칸에 '로서' 또는 '로써'를 알맞게 적어 문장을 완성해 보세요.",
    question: "하나님의 자녀(ㅤㅤㅤ) 부끄럽지 않게 살아야 한다.",
    correctAnswer: "하나님의 자녀로서 부끄럽지 않게 살아야 한다.",
  },
  {
    title: "[다르다 / 틀리다]",
    explanation:
      "<strong>'다르다'</strong>는 서로 같지 않다는 뜻(Different)이고, <strong>'틀리다'</strong>는 사실과 어긋나거나 정답이 맞지 않다는 뜻(Wrong)입니다.",
    example:
      "나와 너는 성격이 <strong>달라</strong>. / 계산이 <strong>틀렸어</strong>.",
    task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
    question: "내 생각은 너의 생각과 틀려.",
    correctAnswer: "내 생각은 너의 생각과 달라.",
  },
  {
    title: "[가르치다 / 가리키다]",
    explanation:
      "<strong>'가르치다'</strong>는 지식이나 이치를 깨닫게 한다는 뜻이고, <strong>'가리키다'</strong>는 손가락 등으로 어떤 방향이나 대상을 집어서 보여준다는 뜻입니다.",
    example:
      "선생님이 수학을 <strong>가르치다</strong>. / 손가락으로 별을 <strong>가리키다</strong>.",
    task: "다음 괄호 안에서 알맞은 말을 고르고, 그 단어를 사용하여 나만의 짧은 문장을 지어보세요.",
    question: "예수님께서 하늘을 ( 가르치며 / 가리키며 ) 말씀하셨다.",
    correctAnswer: "가리키며 (자유롭게 지은 문장을 확인해 주세요)",
  },
  {
    title: "[맞히다 / 맞추다]",
    explanation:
      "<strong>'맞히다'</strong>는 정답을 골라내거나 과녁에 명중시킬 때 쓰고, <strong>'맞추다'</strong>는 서로 떨어져 있는 것을 제자리에 붙이거나 서로 비교해 볼 때 씁니다.",
    example:
      "퀴즈 정답을 <strong>맞히다</strong>. / 퍼즐을 <strong>맞추다</strong>. / 친구와 정답을 <strong>맞춰</strong>보다.",
    task: "다음 빈칸에 '맞혀' 또는 '맞춰' 중 알맞은 말을 골라 적어보세요.",
    question: "시험이 끝난 후 친구와 함께 답안지를 (ㅤㅤㅤ) 보았다.",
    correctAnswer: "맞춰",
  },
  {
    title: "[띄다 / 띠다]",
    explanation:
      "<strong>'띄다'</strong>는 눈에 확 보이거나 간격을 벌릴 때(뜨이다/띄우다) 쓰고, <strong>'띠다'</strong>는 어떤 성질, 색깔, 감정을 몸이나 얼굴에 가질 때 씁니다.",
    example:
      "눈에 <strong>띄는</strong> 행동을 하다. / 온화한 미소를 <strong>띠다</strong>.",
    task: "다음 문장에서 틀린 부분을 찾아 바르게 고쳐 써보세요.",
    question: "예수님은 인자한 미소를 띄고 계셨다.",
    correctAnswer: "예수님은 인자한 미소를 띠고 계셨다.",
  },
  {
    title: "[낫다 / 낳다]",
    explanation:
      "<strong>'낫다'</strong>는 병이 고쳐지거나 두 개를 비교해 더 좋을 때 쓰고, <strong>'낳다'</strong>는 아기나 알을 몸 밖으로 내놓을 때 씁니다.",
    example:
      "감기가 <strong>낫다</strong>. / 이것이 저것보다 <strong>낫다</strong>. / 아기를 <strong>낳다</strong>.",
    task: "다음 빈칸에 알맞은 말을 골라 적어보세요.",
    question: "아프던 배가 드디어 다 ( 나았어 / 낳았어 ).",
    correctAnswer: "나았어",
  },
  {
    title: "[이었다 / 이였다]",
    explanation:
      "<strong>'이었다(였)'</strong>는 명사 뒤에 붙는데, 앞 글자에 받침이 있으면 '이었다', 받침이 없으면 '였다'를 씁니다. '이였다'는 아예 없는 말입니다.",
    example:
      "그는 학생<strong>이었다</strong>. (받침 O) / 그는 천사<strong>였다</strong>. (받침 X)",
    task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
    question: "베드로는 갈릴리의 어부이였다.",
    correctAnswer: "베드로는 갈릴리의 어부였다. (또는 어부이었다.)",
  },
  {
    title: "[체하다 / 채]",
    explanation:
      "<strong>'~은 체하다'</strong>는 거짓으로 꾸미는 태도를 뜻합니다. <strong>'채'</strong>는 어떤 상태가 계속되는 것을 뜻합니다. (참고: 음식을 먹고 탈이 나는 것도 '체하다'입니다.)",
    example:
      "아프면서도 안 아픈 <strong>체하다</strong>. / 옷을 입은 <strong>채</strong> 잠들다.",
    task: "다음 빈칸에 '체'와 '채' 중 알맞은 글자를 넣어 문장을 완성해 보세요.",
    question: "나는 성경책을 펼쳐 놓은 (ㅤ)로 꾸벅꾸벅 졸았다.",
    correctAnswer: "나는 성경책을 펼쳐 놓은 채로 꾸벅꾸벅 졸았다.",
  },
  {
    title: "[같이 / 같은 띄어쓰기]",
    explanation:
      "<strong>'같은'</strong>은 항상 앞말과 띄어 씁니다(예: 천사 같은). <strong>'같이'</strong>는 '얼음같이(처럼)' 뜻일 때는 앞말에 붙여 쓰고, '나와 같이(함께)' 뜻일 때는 띄어 씁니다. <strong>'다 같이'</strong>는 두 단어이므로 띄어 씁니다.",
    example:
      "바람 <strong>같은</strong> 소리 (띄움) / 생각과 <strong>같이</strong> (띄움) / <strong>다 같이</strong> 모이다 (띄움)",
    task: "다음 괄호 안에서 띄어쓰기가 알맞은 것을 골라보세요.",
    question: "제자들은 ( 다같이 / 다 같이 ) 모여 기도했습니다.",
    correctAnswer: "다 같이",
  },
  {
    title: "[웬일 / 왠일]",
    explanation:
      "<strong>'웬'</strong>은 '어찌 된'이라는 뜻으로 쓰이고, <strong>'왠'</strong>은 '왜인지'의 준말인 '왠지'에만 쓰입니다.",
    example:
      "이게 <strong>웬</strong> 떡이냐? / 오늘 <strong>웬일</strong>이니? / 오늘은 <strong>왠지</strong> 기분이 좋다.",
    task: "다음 빈칸에 '웬' 또는 '왠' 중 알맞은 말을 골라 적어보세요.",
    question: "아침 일찍 스스로 성경을 읽다니 이게 (ㅤㅤ)일이니?",
    correctAnswer: "웬",
  },
  {
    title: "[며칠 / 몇 일]",
    explanation:
      "<strong>'며칠'</strong>이 항상 맞는 표준어입니다. '몇 일'이라는 표기는 우리말에 아예 없습니다.",
    example:
      "오늘이 <strong>며칠</strong>이니? / <strong>며칠</strong> 동안 기도했다.",
    task: "다음 문장에서 잘못된 부분을 찾아 바르게 고쳐 써보세요.",
    question: "오늘이 몇 월 몇 일인지 달력을 확인해 보렴.",
    correctAnswer: "오늘이 몇 월 며칠인지 달력을 확인해 보렴.",
  },
  {
    title: "[어떻게 / 어떡해]",
    explanation:
      "<strong>'어떻게'</strong>는 '어떠하게'의 줄임말로 뒤에 행동이 오고, <strong>'어떡해'</strong>는 '어떻게 해'의 줄임말로 문장 끝에 홀로 쓰입니다.",
    example:
      "이 일을 <strong>어떻게</strong> 할까? / 책을 잃어버렸어, 나 <strong>어떡해</strong>!",
    task: "다음 괄호 안에서 알맞은 말을 골라보세요.",
    question: "약속 시간에 늦었으니 이를 ( 어떻게 / 어떡해 )?",
    correctAnswer: "어떡해",
  },
  {
    title: "[백분율 / 백분률]",
    explanation:
      "<strong>'-율'</strong>은 모음이나 'ㄴ' 받침 뒤에 오고, <strong>'-률'</strong>은 그 밖의 모든 받침 뒤에 옵니다.",
    example:
      "백분<strong>율</strong> (ㄴ 받침) / 실패<strong>율</strong> (모음) / 출석<strong>률</strong> (ㄱ 받침) / 합격<strong>률</strong> (ㄱ 받침)",
    task: "다음 빈칸에 '율' 또는 '률' 중 알맞은 글자를 넣어 완성하세요.",
    question: "성경 퀴즈 대회 정답(ㅤㅤ)을 백분(ㅤㅤ)로 계산해 보았다.",
    correctAnswer: "정답률, 백분율",
  },
  {
    title: "[벌이다 / 벌리다]",
    explanation:
      "<strong>'벌이다'</strong>는 잔치나 사업 등 일을 크게 시작할 때 쓰고, <strong>'벌리다'</strong>는 사이나 틈을 넓힐 때 씁니다.",
    example:
      "마을 잔치를 <strong>벌이다</strong>. / 입을 크게 <strong>벌리다</strong>.",
    task: "다음 괄호 안에서 알맞은 말을 골라보세요.",
    question: "온 성도들이 모여 복음 축제를 ( 벌였다 / 벌렸다 ).",
    correctAnswer: "벌였다",
  },
  {
    title: "[바치다 / 받치다]",
    explanation:
      "<strong>'바치다'</strong>는 귀한 것을 정성껏 드릴 때 쓰고, <strong>'받치다'</strong>는 아래에 물건을 대어 괴거나 우산을 펼쳐 들 때 씁니다.",
    example:
      "하나님께 예물을 <strong>바치다</strong>. / 턱을 손으로 <strong>받치다</strong>. / 우산을 <strong>받치다</strong>.",
    task: "다음 괄호 안에서 알맞은 말을 골라보세요.",
    question: "온 마음과 정성을 다해 주님께 찬양을 ( 바쳤다 / 받쳤다 ).",
    correctAnswer: "바쳤다",
  },
];

// 세인 표준 맞춤법 7문항 세트 (PDF 제공 원본)
const seinStandardSpelling = {
  questions: [
    {
      num: 1,
      text: "오늘이 (몇 일 / 며칠)인지 달력을 확인했어요.",
      answer: "며칠",
      options: ["몇 일", "며칠"],
    },
    {
      num: 2,
      text: "숙제를 다 하면 놀아도 (되 / 돼).",
      answer: "돼",
      options: ["되", "돼"],
    },
    {
      num: 3,
      text: "비가 (안 / 않) 와서 소풍이 미뤄졌어요.",
      answer: "안",
      options: ["안", "않"],
    },
    {
      num: 4,
      text: "동생이 밥을 먹지 (안았다 / 않았다).",
      answer: "않았다",
      options: ["안았다", "않았다"],
    },
    {
      num: 5,
      text: "감기가 다 (나았다 / 낳았다).",
      answer: "나았다",
      options: ["나았다", "낳았다"],
    },
    {
      num: 6,
      text: "빌린 책을 잃어버렸어. 이를 (어떻게 / 어떡해)!",
      answer: "어떡해",
      options: ["어떻게", "어떡해"],
    },
    {
      num: 7,
      text: "바르게 띄어 써 보세요: 우리는 함께 나눌수있다. →",
      answer: "나눌 수 있다",
      isSpacing: true,
    },
  ],
  tips: [
    '<strong>되/돼:</strong> "되어"로 바꿔도 말이 되면 "돼", 안 되면 "되"를 써요.',
    '<strong>안/않:</strong> "안"은 "아니"의 준말, "않"은 "아니하"의 준말이에요. 서술어 앞에는 "안", 서술어 뒤에는 "않-"을 써요.',
    '<strong>낫다/낳다:</strong> 병이 "낫다", 아기·알을 "낳다"예요.',
  ],
  answerGuide:
    "1) 며칠 2) 돼 3) 안 4) 않았다 5) 나았다 6) 어떡해 7) 나눌 수 있다",
};

// 현재 활성화된 워크시트 상태 객체 전역 저장
let currentWorksheetState = null;

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  document.getElementById("date").value =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const chapterSelect = document.getElementById("chapter");
  for (let i = 1; i <= Object.keys(actsData).length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    chapterSelect.appendChild(option);
  }

  updateVerseSelects();
  chapterSelect.addEventListener("change", updateVerseSelects);

  initConfusingWordsCheckboxes();
  updateGrammarTypeSelect();
  document
    .getElementById("grade")
    .addEventListener("change", updateGrammarTypeSelect);

  document
    .getElementById("generatorForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      generateWorksheet(false);
    });

  handleTemplateChange();
  updateFilterDateDropdown();
  renderHistory();
});

// 템플릿 변경 처리
function handleTemplateChange() {
  const templateType = document.getElementById("templateType").value;
  const seinGroup = document.getElementById("seinOptionsGroup");
  const basicGroup = document.getElementById("basicOptionsGroup");

  if (templateType === "sein_essay") {
    if (seinGroup) seinGroup.style.display = "block";
    if (basicGroup) basicGroup.style.display = "none";
  } else {
    if (seinGroup) seinGroup.style.display = "none";
    if (basicGroup) basicGroup.style.display = "block";
  }
}

function toggleSpellingOption(checked) {
  const group = document.getElementById("spellingSetGroup");
  if (group) {
    group.style.display = checked ? "block" : "none";
  }
}

function initConfusingWordsCheckboxes() {
  const container = document.getElementById("confusingWordsCheckboxes");
  if (!container) return;
  let html = "";
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
  randomIndices.forEach((idx) => {
    if (checkboxes[idx]) checkboxes[idx].checked = true;
  });
}

function updateGrammarTypeSelect() {
  const grade = document.getElementById("grade").value;
  const select = document.getElementById("grammarType");
  if (!select) return;
  select.innerHTML = "";

  const pool = grammarPools[grade] || [];
  pool.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

function updateVerseSelects() {
  const chapter = document.getElementById("chapter").value;
  const verses = actsData[chapter] || [];
  const startSelect = document.getElementById("startVerse");
  const endSelect = document.getElementById("endVerse");

  startSelect.innerHTML = "";
  endSelect.innerHTML = "";

  for (let i = 1; i <= verses.length; i++) {
    const opt1 = document.createElement("option");
    opt1.value = i;
    opt1.textContent = i;
    startSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = i;
    opt2.textContent = i;
    if (i === verses.length) opt2.selected = true;
    endSelect.appendChild(opt2);
  }
}

function getRandomVerses(verses, count) {
  const arr = verses.filter((v) => v.text && v.text !== "(없음)");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = [];
  for (let i = 0; i < Math.min(count, arr.length); i++) {
    result.push(arr[i]);
  }
  return result;
}

function getGradeName(val) {
  if (val === "12") return "1~2학년";
  if (val === "34") return "3~4학년";
  return "5~6학년";
}

function getSeinGradeText(grade) {
  if (grade === "12") return "1-2 세인";
  if (grade === "34") return "3-4 세인";
  if (grade === "56") return "5-6 세인";
  return "3-4 세인";
}

// 활동지 생성 메인 함수
function generateWorksheet(isFromHistory = false, historyState = null) {
  notifyStatus("");
  let state;

  if (!isFromHistory) {
    const templateType = document.getElementById("templateType").value;
    const date = document.getElementById("date").value;
    const grade = document.getElementById("grade").value;
    const chapter = document.getElementById("chapter").value;
    const startVerse = parseInt(document.getElementById("startVerse").value);
    const endVerse = parseInt(document.getElementById("endVerse").value);

    if (
      !Number.isInteger(startVerse) ||
      !Number.isInteger(endVerse) ||
      startVerse > endVerse ||
      !actsDataRkv[chapter] ||
      startVerse < 1 ||
      endVerse > actsDataRkv[chapter].length
    ) {
      alert("시작 절이 끝 절보다 클 수 없습니다.");
      return;
    }

    const versesERV = [];
    const versesRKV = [];
    for (let i = startVerse; i <= endVerse; i++) {
      versesERV.push({ num: i, text: actsData[chapter][i - 1] });
      versesRKV.push({ num: i, text: actsDataRkv[chapter][i - 1] });
    }

    if (!versesRKV.some((v) => v.text && v.text !== "(없음)")) {
      alert("선택한 범위에 활동할 본문이 없습니다. 다른 절을 선택해 주세요.");
      return;
    }

    if (templateType === "sein_essay") {
      const includeSpellingEl = document.getElementById("includeSpelling");
      const includeSpelling = includeSpellingEl
        ? includeSpellingEl.checked
        : true;
      const modernBibleLabel =
        document.getElementById("modernBibleLabel")?.value || "현대인의성경";
      const spellingSetType =
        document.getElementById("spellingSetType")?.value || "random100";

      // 맞춤법 문제 세트 데이터 결정 (바른AI 100선 및 표준 세트 지원)
      let spellingData;
      if (spellingSetType === "standard") {
        spellingData = seinStandardSpelling;
      } else if (typeof getRandomBareunSpellingSet === "function") {
        spellingData = getRandomBareunSpellingSet(spellingSetType);
      } else {
        spellingData = seinStandardSpelling;
      }

      state = {
        id: Date.now(),
        schemaVersion: 2,
        templateType: "sein_essay",
        date: date,
        grade: grade,
        chapter: chapter,
        startVerse: startVerse,
        endVerse: endVerse,
        includeSpelling: includeSpelling,
        includePassage: document.getElementById("includePassage").checked,
        modernBibleLabel: modernBibleLabel,
        spellingSetType: spellingSetType,
        spellingData: spellingData,
        allVersesERV: versesERV,
        allVersesRKV: versesRKV,
        aiAnswers: null, // AI 생성 시 채워짐
      };
    } else {
      // 기존 기본 양식
      const checkedBoxes = document.querySelectorAll(
        'input[name="confusingWord"]:checked',
      );
      if (checkedBoxes.length !== 3) {
        document.getElementById("checkbox-warning").style.display = "block";
        alert("헷갈리는 우리말 항목을 정확히 3개 선택해 주세요.");
        return;
      }
      document.getElementById("checkbox-warning").style.display = "none";

      const confusingWordIndices = Array.from(checkedBoxes).map((cb) =>
        parseInt(cb.value),
      );
      const qTypeIndex = parseInt(document.getElementById("grammarType").value);

      state = {
        id: Date.now(),
        schemaVersion: 2,
        templateType: "basic_grammar",
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
        allVersesRKV: versesRKV,
      };
    }

    saveHistory(state);
  } else {
    state = historyState;
  }

  cancelAIRequest();
  currentWorksheetState = state;
  renderWorksheetUI(state);
}

// 활동지 UI 렌더링 분기
function renderWorksheetUI(state) {
  const wsArea = document.getElementById("worksheetArea");
  const contentArea = document.getElementById("worksheetContent");
  wsArea.style.display = "block";
  document.getElementById("emptyState").hidden = true;
  wsArea.classList.remove("show-answers");

  // 템플릿 판별 (기존 저장 데이터에 templateType이 없으면 basic_grammar로 호환)
  const tType = state.templateType || "basic_grammar";

  if (tType === "sein_essay") {
    contentArea.innerHTML = renderSeinWorksheetHtml(state);
  } else {
    contentArea.innerHTML = renderBasicWorksheetHtml(state);
    renderSavedBasicAnswers(state);
  }

  document.getElementById("answerPreview").checked = false;
  document.getElementById("answerReviewNote").hidden = true;
  contentArea.querySelectorAll("[data-answer-path]").forEach((el) => {
    el.addEventListener("blur", () => saveEditedAnswer(el, state));
  });
  wsArea.scrollIntoView({ behavior: "smooth" });
}

// ==========================================
// 1. [신규] 세인 5단계 심화 논술 활동지 렌더러
// ==========================================
function renderBasicWorksheetHtml(state) {
  const versesERV = state.allVersesERV || [];
  const versesRKV = state.allVersesRKV || [];

  let rkvHtml = "";
  let ervHtml = "";
  versesRKV.forEach((v) => {
    rkvHtml += `<div style="margin-bottom: 8px;"><strong>${v.num}</strong> ${v.text}</div>`;
  });
  versesERV.forEach((v) => {
    ervHtml += `<div style="margin-bottom: 8px;"><strong>${v.num}</strong> ${v.text}</div>`;
  });

  let confusingHtml = "";
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
      { regex: /그 때에/g, replace: "그때에" },
      { regex: /그 때/g, replace: "그때" },
      { regex: /이 때에/g, replace: "이때에" },
      { regex: /이 때/g, replace: "이때" },
      { regex: /저 때에/g, replace: "저때에" },
      { regex: /저 때/g, replace: "저때" },
      { regex: /그 곳/g, replace: "그곳" },
      { regex: /이 곳/g, replace: "이곳" },
      { regex: /저 곳/g, replace: "저곳" },
      { regex: /그 날/g, replace: "그날" },
      { regex: /이 날/g, replace: "이날" },
      { regex: /저 날/g, replace: "저날" },
      { regex: /아무 것도/g, replace: "아무것도" },
      { regex: /아무 도/g, replace: "아무도" },

      { regex: /그 동안/g, replace: "그동안" },
      { regex: /오랫 동안/g, replace: "오랫동안" },

      { regex: /본 래/g, replace: "본래" },
      { regex: /할 수록/g, replace: "할수록" },
      { regex: /그 중/g, replace: "그중" },
    ];
    rules.forEach((rule) => {
      result = result.replace(rule.regex, rule.replace);
    });
    result = result.replace(/([첫둘셋넷다여일여아열]) 째/g, "$1째");
    return result;
  }

  let spacingHtml = "";
  (state.spacingVerses || []).forEach((v, index) => {
    const modernText = applyModernSpacing(v.text);
    const noSpaceText = modernText.replace(/\s+/g, "");
    const answerText = modernText.replace(
      / /g,
      ' <span style="color:#e63946;">v</span> ',
    );
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

  if (state.grade === "12" || state.grade === "34") {
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
    for (let i = 0; i < (state.grammarVerses || []).length; i++) {
      const v = (state.grammarVerses && state.grammarVerses[i]) || { text: "" };
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
                <strong>문제 ${(state.grammarVerses || []).length + 1}. [세 줄 글쓰기] 오늘 읽은 진도의 말씀 중 가장 기억에 남는 구절을 고르고, 그 이유를 세 줄 이상의 문장으로 자세히 묘사해 보세요.</strong><br>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div class="grammar-answer"><span style="color:#e63946;">[정답 가이드]</span> 자유 서술형 문항입니다. 세 줄 이상 작성했는지 확인해 주세요.</div>
            </div>
            <div class="grammar-q">
                <strong>문제 ${(state.grammarVerses || []).length + 2}. [자유로운 글쓰기] 이 말씀을 통해 내가 삶 속에서 실천할 수 있는 것을 육하원칙에 맞게 구체적인 문장으로 적어보세요.</strong><br>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 35px;"></div>
                <div class="grammar-answer"><span style="color:#e63946;">[정답 가이드]</span> 자유 서술형 문항입니다. 육하원칙이 포함되었는지 확인해 주세요.</div>
            </div>
        `;
  }

  return `
        <div class="worksheet-header">
            <h2 id="ws-main-title">성경적 세계관 논술 활동지</h2>
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
function setAnswerPreview(show) {
  document
    .getElementById("worksheetArea")
    .classList.toggle("show-answers", show);
  document.getElementById("answerReviewNote").hidden = !show;
}
function printWorksheet(answers) {
  const area = document.getElementById("worksheetArea");
  const previous = area.classList.contains("show-answers");
  area.classList.toggle("show-answers", answers);
  const restore = () => {
    area.classList.toggle("show-answers", previous);
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}
function printAnswers() {
  printWorksheet(true);
}
function saveEditedAnswer(el, state) {
  if (state !== currentWorksheetState || !state.aiAnswers) return;
  const keys = el.dataset.answerPath.split(".");
  let target = state.aiAnswers;
  for (const key of keys.slice(0, -1)) {
    if (!target[key]) return;
    target = target[key];
  }
  target[keys.at(-1)] = el.textContent.slice(0, 5000);
  el.textContent = target[keys.at(-1)];
  updateStoredState(state);
}
function reshuffleSpellingQuestions() {
  if (!currentWorksheetState) return;
  const type = currentWorksheetState.spellingSetType || "random100";
  if (type === "standard") {
    notifyStatus(
      "표준 고정 세트는 문항이 바뀌지 않습니다. 다른 세트를 선택해 주세요.",
    );
    return;
  }
  currentWorksheetState.spellingData = getRandomBareunSpellingSet(type);
  updateStoredState(currentWorksheetState);
  renderWorksheetUI(currentWorksheetState);
}

// 히스토리 관리
function toggleHistory() {
  const section = document.getElementById("historySection");
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

function updateFilterDateDropdown() {
  const history = readHistory();
  const dateSelect = document.getElementById("filterDate");
  if (!dateSelect) return;
  const currentVal = dateSelect.value;

  const uniqueDates = [...new Set(history.map((item) => item.date))].sort(
    (a, b) => b.localeCompare(a),
  );

  let html = '<option value="all">모든 날짜</option>';
  uniqueDates.forEach((d) => {
    html += `<option value="${d}">${d}</option>`;
  });
  dateSelect.innerHTML = html;

  if (uniqueDates.includes(currentVal)) {
    dateSelect.value = currentVal;
  }
}

function saveHistory(state) {
  let history = readHistory();
  while (history.some((item) => item.id === state.id)) state.id++;
  history.unshift(state);
  if (history.length > 200) history = history.slice(0, 200);
  writeHistory(history);

  updateFilterDateDropdown();
  renderHistory();
}

function renderHistory() {
  const history = readHistory();
  const ul = document.getElementById("historyList");
  if (!ul) return;
  ul.innerHTML = "";

  const filterGrade = document.getElementById("filterGrade").value;
  const filterDate = document.getElementById("filterDate").value;

  let filteredHistory = history;
  if (filterGrade !== "all") {
    filteredHistory = filteredHistory.filter(
      (item) => item.grade === filterGrade,
    );
  }
  if (filterDate !== "all") {
    filteredHistory = filteredHistory.filter(
      (item) => item.date === filterDate,
    );
  }

  if (filteredHistory.length === 0) {
    ul.innerHTML =
      '<li style="color: #666; text-align: center; padding: 20px;">출제 기록이 없습니다.</li>';
    return;
  }

  filteredHistory.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const isSein = item.templateType === "sein_essay";
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
  const checkboxes = document.querySelectorAll(".history-checkbox");
  checkboxes.forEach((cb) => (cb.checked = checked));
}

function deleteSelectedHistory() {
  const checkboxes = document.querySelectorAll(".history-checkbox:checked");
  if (checkboxes.length === 0) {
    alert("삭제할 기록을 선택해 주세요.");
    return;
  }

  if (
    confirm(`선택한 ${checkboxes.length}개의 출제 기록을 삭제하시겠습니까?`)
  ) {
    const idsToDelete = Array.from(checkboxes).map((cb) => parseInt(cb.value));
    let history = readHistory();
    history = history.filter((item) => !idsToDelete.includes(item.id));
    writeHistory(history);

    const selectAllCb = document.getElementById("selectAllHistory");
    if (selectAllCb) selectAllCb.checked = false;

    updateFilterDateDropdown();
    renderHistory();
  }
}

function loadState(id) {
  const history = readHistory();
  const state = history.find((s) => s.id === id);
  if (state) {
    const templateType = state.templateType || "basic_grammar";
    document.getElementById("templateType").value = templateType;
    handleTemplateChange();

    document.getElementById("date").value = state.date;
    document.getElementById("grade").value = state.grade;

    if (templateType === "sein_essay") {
      if (document.getElementById("includeSpelling")) {
        const inc = state.includeSpelling !== false;
        document.getElementById("includeSpelling").checked = inc;
        document.getElementById("includePassage").checked =
          !!state.includePassage;
        toggleSpellingOption(inc);
      }
      if (
        state.modernBibleLabel &&
        document.getElementById("modernBibleLabel")
      ) {
        document.getElementById("modernBibleLabel").value =
          state.modernBibleLabel;
      }
      if (state.spellingSetType && document.getElementById("spellingSetType")) {
        document.getElementById("spellingSetType").value =
          state.spellingSetType;
      }
    } else {
      updateGrammarTypeSelect();
      if (state.qTypeIndex !== undefined) {
        document.getElementById("grammarType").value = state.qTypeIndex;
      }
      if (state.confusingWordIndices) {
        const checkboxes = document.querySelectorAll(
          'input[name="confusingWord"]',
        );
        checkboxes.forEach((cb) => (cb.checked = false));
        state.confusingWordIndices.forEach((idx) => {
          if (checkboxes[idx]) checkboxes[idx].checked = true;
        });
      }
    }

    document.getElementById("chapter").value = state.chapter;
    updateVerseSelects();
    document.getElementById("startVerse").value = state.startVerse;
    document.getElementById("endVerse").value = state.endVerse;

    generateWorksheet(true, state);
  } else {
    alert("기록을 찾을 수 없습니다.");
  }
}

function clearHistory() {
  if (confirm("모든 출제 기록을 완전히 지우시겠습니까?")) {
    try {
      localStorage.removeItem("actsHistory");
    } catch {
      notifyStatus(
        "기록을 지우지 못했습니다. 브라우저 저장 권한을 확인해 주세요.",
        true,
      );
      return;
    }
    updateFilterDateDropdown();
    renderHistory();
  }
}

// ==========================================
// 3. AI 정답 자동 생성 기능
// ==========================================
let activeAIRequest = null;
function cancelAIRequest() {
  if (activeAIRequest) {
    activeAIRequest.abort();
    activeAIRequest = null;
  }
  setAIButtonState(false);
}
function setAIButtonState(busy) {
  ["aiAnswerBtn", "aiAnswerBtnBottom"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = busy;
      el.textContent = busy ? "예시 답안 작성 중…" : "AI 예시 답안 만들기";
    }
  });
}
async function generateAIAnswers() {
  if (!currentWorksheetState || activeAIRequest) return;
  const state = currentWorksheetState;
  const controller = new AbortController();
  activeAIRequest = controller;
  setAIButtonState(true);
  notifyStatus(
    "예시 답안을 작성하고 있습니다. 새 활동지를 열면 이 요청은 취소됩니다.",
  );
  const timer = setTimeout(() => controller.abort(), 65000);
  try {
    let promptText;
    if (state.templateType === "sein_essay") {
      const actualVerses = state.allVersesRKV.filter(
        (v) => v.text !== "(없음)",
      );
      const versesText = actualVerses
        .map((v) => `${v.num}절: ${v.text}`)
        .join("\n");
      promptText = `
너는 초등학교 국어 및 성경 논술 전문 교사야.
다음 사도행전 ${state.chapter}장 ${state.startVerse}~${state.endVerse}절 본문을 분석하여, 교사용 활동지 정답 가이드를 작성해줘.

[학년별 기준] ${gradeProfiles[state.grade].ai}
핵심 낱말은 정확히 ${gradeProfiles[state.grade].keywords}개 작성해. 단락은 본문 길이에 맞게 1~${Math.min(3, actualVerses.length)}개로 나눠. 범위가 짧으면 억지로 나누지 마. 시간, 장소, 이유가 본문에 없으면 "본문에 나오지 않음"이라고 써.
[본문 말씀]
${versesText}

반드시 아래 JSON 형식으로만 반환해 (마크다운 코드블록이나 부가 설명 금지):
{
  "characters": "이야기에 등장하는 인물이나 무리를 쉼표로 나열 (예: 베드로, 열한 사도, 예루살렘 사람들)",
  "divisions": [
    { "range": "시작절 ~ 끝절", "title": "소제목 (본문에 따라 1~${Math.min(3, actualVerses.length)}개 작성)" }
  ],
  "oneSentenceSummary": "본문 전체를 아우르는 명확하고 교훈적인 한 문장 요약 (~했다 또는 ~이다 체)",
  "verseSummaries": [
    ${actualVerses.map((v) => `{"verse": ${v.num}, "summary": "${v.num}절의 20자 내외 요약", "keyword": "중심단어"}`).join(",\n    ")}
  ],
  "keyWords": [
    ${Array.from({ length: gradeProfiles[state.grade].keywords }, (_, i) => `{"word":"핵심단어${i + 1}","verse":"OO절","reason":"이 낱말이 중요한 까닭"}`).join(",\n    ")}
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
  "sixWSummary": "학년별 기준에 맞춘 요약 문단",
  "myThought": "나는 OO라고 생각한다. 왜냐하면 OO이기 때문이다."
}
`;
    } else {
      const selected = grammarPools[state.grade][state.qTypeIndex || 0];
      const titleEl = selected.name;
      const instEl = selected.exp.replace(/<[^>]*>/g, "");
      const questions = state.grammarVerses.map(
        (v, i) => `문제 ${i + 1}: ${v.text}`,
      );
      promptText = `
너는 초등학생 주일학교 선생님이야. 다음 문제들에 대해 교사용 정답 가이드를 만들어줘.
학년: ${gradeProfiles[state.grade].ai}
문제 수: ${questions.length}개. 입력 순서대로 정확히 같은 수의 답안을 반환해.
단원: ${titleEl}
지시사항: ${instEl}

${questions.join("\n")}

각 문제에 대한 교사용 정답(초등학생 눈높이에 맞춘 간단한 정답 및 풀이)을 아래 JSON 배열 형식으로만 반환해. 다른 설명은 절대 넣지 마.
[
  { 
    "inlineAnswers": ["주어 정답", "서술어 정답"],
    "guide": "이 문장의 주어는 'OOO'이고, 서술어는 'OOO'입니다."
  }
]
`;
    }
    const response = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ prompt: promptText }),
      signal: controller.signal,
    });
    if (!response.headers.get("content-type")?.includes("application/json"))
      throw new Error(
        "로그인이 만료되었거나 AI 서버가 준비되지 않았습니다. 페이지를 새로 열어 주세요.",
      );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "AI 답안을 받지 못했습니다.");
    if (controller.signal.aborted || state !== currentWorksheetState) return;
    state.aiAnswers = validateAnswers(data.result, state);
    renderWorksheetUI(state);
    notifyStatus(
      "예시 답안을 만들었습니다. 교사용 보기에서 본문과 대조하고 필요한 답안을 수정하세요.",
    );
    updateStoredState(state);
    document.getElementById("answerPreview").checked = true;
    setAnswerPreview(true);
  } catch (error) {
    if (state === currentWorksheetState && activeAIRequest === controller)
      notifyStatus(
        error.name === "AbortError"
          ? "요청 시간이 초과되었습니다. 다시 시도해 주세요."
          : error.message,
        true,
      );
  } finally {
    clearTimeout(timer);
    if (activeAIRequest === controller) {
      activeAIRequest = null;
      setAIButtonState(false);
    }
  }
}

function updateStoredState(updatedState) {
  let history = readHistory();
  const idx = history.findIndex((item) => item.id === updatedState.id);
  if (idx !== -1) {
    history[idx] = updatedState;
    writeHistory(history);
  }
}
