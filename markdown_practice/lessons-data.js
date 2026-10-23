/**
 * Markdown Craft - 퀘스트 및 레슨 데이터셋
 * 총 6개 챕터, 25개 단계별 인터랙티브 실습 과제
 */

const LESSONS_DATA = [
  // ==========================================
  // CHAPTER 1: 기본 서식 (Basic Formatting)
  // ==========================================
  {
    id: "l1",
    chapter: 1,
    chapterTitle: "기초 서식 & 텍스트 스타일",
    title: "1단계: 제목(Heading) 크기별 조절",
    badge: "# ~ ######",
    difficulty: "입문",
    description: `마크다운에서 제목(헤딩)은 \`#\` 기호의 개수로 1단계부터 6단계까지 지정합니다.<br>
    <strong>핵심 규칙:</strong> \`#\` 기호와 제목 텍스트 사이에는 <strong>반드시 1칸 이상의 공백(스페이스)</strong>이 있어야 합니다.`,
    guide: [
      "`# 큰 제목` -> HTML의 `<h1>` 태그 (문서의 메인 타이틀)",
      "`## 중간 제목` -> HTML의 `<h2>` 태그 (섹션 소제목)",
      "`### 작은 제목` -> HTML의 `<h3>` 태그 (소단락 소제목)"
    ],
    requirements: [
      {
        id: "req_h1",
        text: "`#` 1개를 사용한 대제목(H1) 만들기",
        check: (code) => /(^|\n)#[ \t]+[^\n#]+/.test(code)
      },
      {
        id: "req_h2",
        text: "`##` 2개를 사용한 중제목(H2) 만들기",
        check: (code) => /(^|\n)##[ \t]+[^\n#]+/.test(code)
      },
      {
        id: "req_h3",
        text: "`###` 3개를 사용한 소제목(H3) 만들기",
        check: (code) => /(^|\n)###[ \t]+[^\n#]+/.test(code)
      }
    ],
    starterCode: `여기 아래에 H1, H2, H3 제목을 직접 작성해보세요!
`,
    targetCode: `# 마크다운 마스터 가이드
## 1장. 시작하기
### 1.1 기본 문법 안내`,
    hint: "`# 대제목`, `## 중제목`, `### 소제목` 형태로 각각 한 줄씩 적어보세요. `#` 뒤에 스페이스바 한 번 누르는 것을 잊지 마세요!"
  },
  {
    id: "l2",
    chapter: 1,
    chapterTitle: "기초 서식 & 텍스트 스타일",
    title: "2단계: 굵게(Bold)와 기울임(Italic)",
    badge: "**굵게** / *기울임*",
    difficulty: "입문",
    description: `텍스트를 강조할 때 가장 많이 사용하는 문법입니다.<br>
    - <strong>굵게:</strong> 단어 앞뒤를 별표 두 개(\`**\`) 또는 밑줄 두 개(\`__\`)로 감쌉니다.<br>
    - <strong>기울임(이탤릭):</strong> 단어 앞뒤를 별표 하나(\`*\`) 또는 밑줄 하나(\`_\`)로 감쌉니다.<br>
    - <strong>굵은 기울임:</strong> 별표 세 개(\`***\`)로 감쌉니다.`,
    guide: [
      "`**중요한 내용**` -> **중요한 내용** (굵게)",
      "`*핵심 포인트*` -> *핵심 포인트* (기울임)",
      "`***아주 중요한 핵심***` -> ***아주 중요한 핵심*** (굵게+기울임)"
    ],
    requirements: [
      {
        id: "req_bold",
        text: "텍스트에 굵게(`**단어**`) 적용하기",
        check: (code) => /\*\*[^\s*][^*]*\*\*/.test(code) || /__[^\s_][^_]*__/.test(code)
      },
      {
        id: "req_italic",
        text: "텍스트에 기울임(`*단어*`) 적용하기",
        check: (code) => /(^|[^*])\*[^\s*][^*]*\*(?![\*])/.test(code) || /(^|[^_])_[^\s_][^_]*_(?![\_])/.test(code)
      },
      {
        id: "req_bold_italic",
        text: "굵은 기울임(`***단어***`) 적용하기",
        check: (code) => /\*\*\*[^\s*][^*]*\*\*\*/.test(code)
      }
    ],
    starterCode: `이 문장에서 중요한단어는 굵게, 강조단어는 기울임으로, 마지막단어는 둘 다 적용해보세요.`,
    targetCode: `이 문장에서 **중요한단어**는 굵게, *강조단어*는 기울임으로, ***마지막단어***는 둘 다 적용해보세요.`,
    hint: "단어의 앞과 뒤에 공백 없이 붙여서 `**단어**`, `*단어*`, `***단어***` 형태로 작성하세요."
  },
  {
    id: "l3",
    chapter: 1,
    chapterTitle: "기초 서식 & 텍스트 스타일",
    title: "3단계: 취소선과 밑줄",
    badge: "~~취소선~~",
    difficulty: "입문",
    description: `이전 내용을 정정하거나 삭제된 상태를 나타낼 때 물결 기호 두 개(\`~~\`)로 감싸 취소선을 만듭니다.<br>
    마크다운 표준에는 밑줄 전용 기호가 없으므로 HTML의 \`<u>밑줄</u>\` 태그를 함께 사용합니다.`,
    guide: [
      "`~~이전 가격: 50,000원~~` -> ~~이전 가격: 50,000원~~",
      "`<u>특별 할인가: 29,000원</u>` -> <u>특별 할인가: 29,000원</u>"
    ],
    requirements: [
      {
        id: "req_strike",
        text: "`~~`로 감싼 취소선 작성하기",
        check: (code) => /~~[^\s~][^~]*~~/.test(code)
      },
      {
        id: "req_underline",
        text: "`<u>` 태그를 활용한 밑줄 텍스트 작성하기",
        check: (code) => /<u>.+?<\/u>/i.test(code)
      }
    ],
    starterCode: `정가: 100,000원
특가: 50,000원 (한정 수량)`,
    targetCode: `정가: ~~100,000원~~
특가: <u>50,000원</u> (한정 수량)`,
    hint: "100,000원에 앞뒤 `~~`를 붙이고, 50,000원에 `<u>50,000원</u>`을 적용하세요."
  },
  {
    id: "l4",
    chapter: 1,
    chapterTitle: "기초 서식 & 텍스트 스타일",
    title: "4단계: 문단 구분과 줄바꿈(Line Break)",
    badge: "줄바꿈 & 문단",
    difficulty: "초급",
    description: `마크다운에서 엔터(Enter) 키를 한 번만 치면 같은 문단으로 인식되어 줄바꿈이 되지 않습니다!<br>
    - <strong>새 문단 만들기:</strong> 엔터를 <strong>두 번</strong> 쳐서 빈 줄을 하나 만듭니다.<br>
    - <strong>문단 내 줄바꿈(br):</strong> 문장 끝에 <strong>스페이스(공백) 2칸</strong>을 입력하고 엔터를 치거나 \`<br>\` 태그를 사용합니다.`,
    guide: [
      "첫 번째 문장 뒤에 스페이스 2칸  <br>두 번째 문장 (줄바꿈됨)",
      "첫 번째 문단\n\n두 번째 문단 (문단 분리됨)"
    ],
    requirements: [
      {
        id: "req_blankline",
        text: "빈 줄 1개로 두 문단을 확실히 분리하기",
        check: (code) => /\n[ \t]*\n/.test(code.trim())
      },
      {
        id: "req_lines",
        text: "총 2개 이상의 문단 작성하기",
        check: (code) => {
          const paras = code.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0);
          return paras.length >= 2;
        }
      }
    ],
    starterCode: `첫 번째 단락입니다. 마크다운의 구조를 배웁니다.
엔터를 한 번만 치면 브라우저에서는 줄바꿈이 안 될 수 있습니다.`,
    targetCode: `첫 번째 단락입니다. 마크다운의 구조를 배웁니다.

두 번째 단락입니다. 빈 줄을 하나 두면 깔끔한 새 문단이 형성됩니다.`,
    hint: "문단 사이에 아무것도 없는 빈 줄(Enter 두 번)을 만들어보세요."
  },

  // ==========================================
  // CHAPTER 2: 목록과 인용구 (Lists & Quotes)
  // ==========================================
  {
    id: "l5",
    chapter: 2,
    chapterTitle: "목록과 인용구",
    title: "5단계: 순서 없는 목록(Unordered List)",
    badge: "- 또는 *",
    difficulty: "초급",
    description: `순서가 상관없는 항목들을 나열할 때는 대시(\`-\`) 또는 별표(\`*\`)를 사용합니다.<br>
    하위 항목을 만들려면 <strong>스페이스 2칸 또는 탭(Tab)</strong>으로 들여쓰기합니다.`,
    guide: [
      "- 과일 목록",
      "  - 사과 (2칸 들여쓰기)",
      "  - 바나나",
      "- 채소 목록"
    ],
    requirements: [
      {
        id: "req_top_list",
        text: "최상위 목록 항목 2개 이상 작성 (`- 항목`)",
        check: (code) => {
          const matches = code.match(/^[ \t]*[-*+][ \t]+[^\n]+/gm) || [];
          return matches.length >= 2;
        }
      },
      {
        id: "req_sub_list",
        text: "들여쓰기된 하위 항목 1개 이상 작성",
        check: (code) => /^[ \t]{2,}[-*+][ \t]+[^\n]+/m.test(code)
      }
    ],
    starterCode: `사과
바나나
당근`,
    targetCode: `- 과일
  - 사과
  - 바나나
- 채소
  - 당근`,
    hint: "대시(`-`) 뒤에 스페이스 한 칸을 띄우고, 하위 항목은 앞에 공백 2칸을 먼저 넣으세요."
  },
  {
    id: "l6",
    chapter: 2,
    chapterTitle: "목록과 인용구",
    title: "6단계: 순서 있는 목록(Ordered List)",
    badge: "1. 2. 3.",
    difficulty: "초급",
    description: `단계나 순서가 있는 리스트는 숫자와 마침표(\`1.\`, \`2.\`)를 사용합니다.<br>
    놀랍게도 마크다운에서는 숫자를 모두 \`1.\`로 적어도 렌더링될 때는 1, 2, 3 순서대로 자동 계산됩니다!`,
    guide: [
      "1. 물 500ml를 냄비에 붓는다.",
      "2. 물이 끓으면 면과 스프를 넣는다.",
      "3. 4분간 더 끓인 후 맛있게 먹는다."
    ],
    requirements: [
      {
        id: "req_ordered_list",
        text: "순서 있는 목록 항목 3개 이상 작성 (`1.`, `2.`, `3.`)",
        check: (code) => {
          const matches = code.match(/^[ \t]*\d+\.[ \t]+[^\n]+/gm) || [];
          return matches.length >= 3;
        }
      }
    ],
    starterCode: `라면 끓이는 법을 3단계 순서 목록으로 작성해보세요!`,
    targetCode: `1. 냄비에 물 550ml를 넣고 끓입니다.
2. 물이 끓으면 면과 분말스프, 후레이크를 넣습니다.
3. 4분 30초간 더 끓인 후 불을 끄고 그릇에 담습니다.`,
    hint: "`1. 첫번째단계`, `2. 두번째단계`, `3. 세번째단계` 형식으로 작성하세요."
  },
  {
    id: "l7",
    chapter: 2,
    chapterTitle: "목록과 인용구",
    title: "7단계: 할 일 목록(체크리스트 / Task List)",
    badge: "- [ ] / - [x]",
    difficulty: "초급",
    description: `GitHub, Notion, Obsidian 등에서 필수적으로 쓰이는 투두(Todo) 리스트입니다.<br>
    대시 뒤에 대괄호와 공백(\`- [ ]\`)을 넣으면 미완료, 대괄호 안에 x(\`- [x]\`)를 넣으면 완료 체크박스가 됩니다.`,
    guide: [
      "- [ ] 미완료 할 일 (대괄호 사이에 공백 1칸)",
      "- [x] 완료된 할 일 (소문자 x 또는 대문자 X)"
    ],
    requirements: [
      {
        id: "req_unchecked",
        text: "미완료 체크박스 1개 이상 (`- [ ]`)",
        check: (code) => /^[ \t]*[-*+][ \t]+\[ \][ \t]+[^\n]+/m.test(code)
      },
      {
        id: "req_checked",
        text: "완료 체크박스 1개 이상 (`- [x]`)",
        check: (code) => /^[ \t]*[-*+][ \t]+\[[xX]\][ \t]+[^\n]+/m.test(code)
      }
    ],
    starterCode: `오늘 할 일:
마크다운 공부하기
산책 30분 하기`,
    targetCode: `### 오늘의 체크리스트
- [x] 마크다운 기초 문법 정복하기
- [ ] 30분 유산소 운동하기
- [ ] 독서 1챕터 읽기`,
    hint: "`- [ ]` (가운데 빈칸)와 `- [x]` (가운데 소문자 x)를 대시 뒤에 띄어쓰기하여 작성하세요."
  },
  {
    id: "l8",
    chapter: 2,
    chapterTitle: "목록과 인용구",
    title: "8단계: 인용구(Blockquote)와 중첩 인용",
    badge: "> 인용구",
    difficulty: "초급",
    description: `책의 글귀, 다른 사람의 발언, 강조 안내 문구를 적을 때 꺾쇠 기호(\`>\`)를 맨 앞에 적습니다.<br>
    \`>>\` 처럼 기호를 두 번 쓰면 인용구 안에 또 다른 인용구(중첩 인용)를 넣을 수 있습니다.`,
    guide: [
      "> 단순한 것이 복잡한 것보다 낫다. - 파이썬의 선",
      "> 바깥 인용구",
      ">> 안쪽 중첩 인용구"
    ],
    requirements: [
      {
        id: "req_quote",
        text: "기본 인용구(`>`) 작성하기",
        check: (code) => /(^|\n)>[ \t]+[^\n>]+/.test(code)
      },
      {
        id: "req_nested_quote",
        text: "중첩 인용구(`>>`) 작성하기",
        check: (code) => /(^|\n)>>[ \t]*[^\n]+/.test(code)
      }
    ],
    starterCode: `지식은 나눌수록 커진다.
- 어느 개발자의 명언`,
    targetCode: `> 지식은 나눌수록 커진다.
> 
>> 배움에는 끝이 없으며, 함께 나눌 때 빛납니다.
> 
> — 오픈소스 철학 중에서`,
    hint: "`> 첫번째 줄` 아래에 `>> 중첩된 내용` 형태로 적어보세요."
  },

  // ==========================================
  // CHAPTER 3: 링크와 이미지 (Links & Media)
  // ==========================================
  {
    id: "l9",
    chapter: 3,
    chapterTitle: "링크와 이미지",
    title: "9단계: 하이퍼링크(Hyperlink)",
    badge: "[텍스트](URL)",
    difficulty: "중급",
    description: `클릭하면 해당 웹페이지로 이동하는 링크를 만듭니다.<br>
    대괄호 \`[링크할 이름]\` 뒤에 공백 없이 소괄호 \`(웹주소)\`를 연결합니다.<br>
    <strong>암기 꿀팁:</strong> "대괄호는 겉으로 보이는 이름, 소괄호는 비밀스러운 주소!"`,
    guide: [
      "`[구글 검색](https://google.com)` -> [구글 검색](https://google.com)",
      "`[네이버](https://naver.com \"네이버로 이동\")` (선택적 툴팁 설명)"
    ],
    requirements: [
      {
        id: "req_link",
        text: "표준 링크 문법 `[텍스트](https://...)` 작성하기",
        check: (code) => /\[[^\]\n]+\]\(\s*https?:\/\/[^\)]+\)/.test(code)
      }
    ],
    starterCode: `내가 좋아하는 검색 사이트로 이동하려면 구글을 클릭하세요.`,
    targetCode: `내가 가장 자주 쓰는 검색 사이트는 [구글(Google)](https://www.google.com)과 [깃허브(GitHub)](https://github.com)입니다.`,
    hint: "`[텍스트](https://url)` 사이에 띄어쓰기가 없어야 링크로 작동합니다!"
  },
  {
    id: "l10",
    chapter: 3,
    chapterTitle: "링크와 이미지",
    title: "10단계: 이미지(Image) 삽입",
    badge: "![설명](이미지URL)",
    difficulty: "중급",
    description: `문서에 이미지를 띄울 때는 링크 문법 맨 앞에 느낌표(\`!\`)를 붙입니다.<br>
    대괄호 안에는 이미지가 로딩되지 않았을 때 대신 표시되는 <strong>대체 텍스트(alt)</strong>를 적습니다.`,
    guide: [
      "`![로고 이미지](https://picsum.photos/300/200)`",
      "`![풍경 사진](https://images.unsplash.com/... \"툴팁 타이틀\")`"
    ],
    requirements: [
      {
        id: "req_image",
        text: "이미지 문법 `![대체텍스트](이미지URL)` 작성하기",
        check: (code) => /!\[[^\]\n]*\]\(\s*https?:\/\/[^\)]+\)/.test(code)
      }
    ],
    starterCode: `아래에 멋진 풍경 이미지를 마크다운 문법으로 넣어보세요!
(테스트 이미지 URL: https://picsum.photos/400/250)`,
    targetCode: `### 아름다운 풍경
![자연 풍경 사진](https://picsum.photos/400/250 "감성 풍경")`,
    hint: "링크 문법 앞에 느낌표 `!`를 붙여서 `![설명글](https://picsum.photos/400/250)` 형식으로 작성하세요."
  },
  {
    id: "l11",
    chapter: 3,
    chapterTitle: "링크와 이미지",
    title: "11단계: 클릭 가능한 링크 이미지",
    badge: "[![이미지](URL)](링크)",
    difficulty: "중급",
    description: `이미지를 클릭했을 때 특정 웹사이트로 이동하게 만들고 싶을 때가 많습니다.<br>
    링크 문법의 대괄호 \`[ ]\` 자리에 이미지 문법 \`![alt](이미지주소)\`를 통째로 집어넣으면 됩니다!`,
    guide: [
      "`[![GitHub 로고](https://picsum.photos/200/100)](https://github.com)`"
    ],
    requirements: [
      {
        id: "req_linked_image",
        text: "이미지에 링크가 걸린 복합 문법 `[![..](..)](..)` 작성하기",
        check: (code) => /\[!\[[^\]]*\]\([^\)]+\)\]\([^\)]+\)/.test(code)
      }
    ],
    starterCode: `이미지를 클릭하면 위키백과로 이동하는 배너를 만들어보세요.
이미지: https://picsum.photos/300/150
이동주소: https://ko.wikipedia.org`,
    targetCode: `[![위키백과 배너](https://picsum.photos/300/150)](https://ko.wikipedia.org)`,
    hint: "`[` 로 시작해서 `![대체](이미지URL)` 를 넣고 `](이동할웹주소)` 로 닫아주세요."
  },

  // ==========================================
  // CHAPTER 4: 코드와 코드 블록 (Code Mastery)
  // ==========================================
  {
    id: "l12",
    chapter: 4,
    chapterTitle: "코드와 기술 문서",
    title: "12단계: 인라인 코드(Inline Code)",
    badge: "`인라인 코드`",
    difficulty: "초급",
    description: "일반 문장 속에서 변수명, 단축키, 짧은 명령어, 함수 이름을 돋보이게 할 때 백틱(`코드`, 키보드 물결표 아래 키) 1개로 감쌉니다.",
    guide: [
      "터미널에서 `npm install` 명령어를 실행하세요.",
      "변수 `userAge`의 기본값은 `0`입니다."
    ],
    requirements: [
      {
        id: "req_inline_code",
        text: "문장 속에 인라인 코드(`` `코드` ``) 2개 이상 포함하기",
        check: (code) => {
          const matches = code.match(/`[^`\n]+`/g) || [];
          return matches.length >= 2;
        }
      }
    ],
    starterCode: `깃 저장소를 복제하려면 git clone url 명령을 입력하고, cd 명령으로 이동하세요.`,
    targetCode: `깃 저장소를 복제하려면 \`git clone <url>\` 명령을 입력하고, \`cd\` 디렉토리로 이동하세요.`,
    hint: "명령어나 코드 단어 앞뒤를 백틱(\` ` \`) 기호로 감싸보세요."
  },
  {
    id: "l13",
    chapter: 4,
    chapterTitle: "코드와 기술 문서",
    title: "13단계: 펜스 코드 블록과 언어 강조",
    badge: "```javascript",
    difficulty: "중급",
    description: `여러 줄의 소스 코드를 표시할 때는 백틱 세 개(\`\`\`\`)로 위아래를 감싸는 펜스 코드 블록을 작성합니다.<br>
    첫 번째 백틱 세 개 바로 뒤에 \`python\`, \`javascript\`, \`html\` 같은 언어 이름을 명시하면 구문 강조(Syntax Highlighting)가 적용됩니다.`,
    guide: [
      "\\`\\`\\`javascript",
      "function greet(name) {",
      "  console.log(`Hello, ${name}!`);",
      "}",
      "\\`\\`\\`"
    ],
    requirements: [
      {
        id: "req_fenced_block",
        text: "백틱 세 개(```)로 시작하고 끝나는 코드 블록 작성",
        check: (code) => /```[a-zA-Z0-9_-]*\n[\s\S]+?\n```/.test(code)
      },
      {
        id: "req_lang_tag",
        text: "코드 블록에 프로그래밍 언어 이름 지정하기 (예: js, python, css 등)",
        check: (code) => /```[a-zA-Z0-9_-]{2,}\n/.test(code)
      }
    ],
    starterCode: `아래에 파이썬 또는 자바스크립트 코드 블록을 작성해보세요!`,
    targetCode: `\`\`\`python
def calculate_sum(a, b):
    # 두 숫자의 합을 반환합니다
    return a + b

print(calculate_sum(10, 20))
\`\`\``,
    hint: "첫 줄에 ` ```python ` 또는 ` ```javascript ` 를 적고 내용을 작성한 후 마지막 줄에 ` ``` ` 로 닫으세요."
  },

  // ==========================================
  // CHAPTER 5: 표와 구분선 (Tables & Dividers)
  // ==========================================
  {
    id: "l14",
    chapter: 5,
    chapterTitle: "표(Table)와 구조화",
    title: "14단계: 수평 구분선(Horizontal Rule)",
    badge: "---",
    difficulty: "입문",
    description: `섹션과 섹션을 시각적으로 명확하게 분리할 때 가로 구분선을 긋습니다.<br>
    대시 세 개 이상(\`---\`) 또는 별표 세 개 이상(\`***\`)을 단독 줄에 작성하면 수평선이 생성됩니다.`,
    guide: [
      "상단 섹션 내용",
      "",
      "---",
      "",
      "하단 섹션 내용"
    ],
    requirements: [
      {
        id: "req_hr",
        text: "독립된 줄에 수평 구분선(`---`) 작성하기",
        check: (code) => /(^|\n)[ \t]*(?:---|\*\*\*|___)[ \t]*(\n|$)/.test(code)
      }
    ],
    starterCode: `여기는 위쪽 문단입니다.

여기는 아래쪽 문단입니다.`,
    targetCode: `여기는 위쪽 문단입니다.

---

여기는 아래쪽 문단입니다.`,
    hint: "두 문단 사이에 빈 줄을 두고 `---` 만 있는 줄을 하나 추가하세요."
  },
  {
    id: "l15",
    chapter: 5,
    chapterTitle: "표(Table)와 구조화",
    title: "15단계: 마크다운 표(Table) 만들기",
    badge: "| Header | Header |",
    difficulty: "중급",
    description: `마크다운 표는 파이프(\`|\`) 기호와 대시(\`-\`)를 사용합니다.<br>
    - 1번째 행: 헤더 제목<br>
    - 2번째 행: 헤더와 데이터를 구분하는 구분선 (\`| --- | --- |\`)<br>
    - 3번째 행 이후: 실제 데이터 행들`,
    guide: [
      "| 과목명 | 학점 | 담당교수 |",
      "| --- | --- | --- |",
      "| 알고리즘 | 3 | 김교수 |",
      "| 웹프로그래밍 | 3 | 이교수 |"
    ],
    requirements: [
      {
        id: "req_table_header",
        text: "2개 이상의 열을 가진 표 헤더 작성",
        check: (code) => /\|.+?\|.+?\|/.test(code)
      },
      {
        id: "req_table_delimiter",
        text: "헤더 구분선(`| --- | --- |`) 작성",
        check: (code) => /\|[ \t]*:?---+:?[ \t]*\|[ \t]*:?---+:?[ \t]*\|/.test(code)
      },
      {
        id: "req_table_rows",
        text: "데이터 행 2개 이상 작성",
        check: (code) => {
          const lines = code.trim().split("\n").filter(l => l.includes("|"));
          return lines.length >= 3; // header + separator + at least 1 data row (usually >= 3 total lines)
        }
      }
    ],
    starterCode: `언어, 용도, 난이도를 나타내는 3열짜리 표를 만들어보세요!`,
    targetCode: `| 언어 | 주요 용도 | 난이도 |
| --- | --- | --- |
| Python | 데이터 분석, 인공지능 | 보통 |
| JavaScript | 웹 프론트엔드/백엔드 | 쉬움 |
| Rust | 고성능 시스템 프로그래밍 | 어려움 |`,
    hint: "첫째 줄 `| 언어 | 용도 |`, 둘째 줄 `| --- | --- |`, 셋째 줄 `| 파이썬 | 인공지능 |` 형태로 파이프(`|`) 기호를 활용하세요."
  },
  {
    id: "l16",
    chapter: 5,
    chapterTitle: "표(Table)와 구조화",
    title: "16단계: 표 텍스트 정렬(Alignment)",
    badge: ":--- / :---: / ---:",
    difficulty: "중급",
    description: `구분선 행에 콜론(\`:\`)의 위치를 지정하여 셀 안의 텍스트 정렬을 바꿀 수 있습니다.<br>
    - \`:---\` : 왼쪽 정렬 (기본값)<br>
    - \`:---:\` : 가운데 정렬<br>
    - \`---:\` : 오른쪽 정렬 (주로 숫자, 가격 데이터에 사용)`,
    guide: [
      "| 상품명 (왼쪽) | 수량 (가운데) | 가격 (오른쪽) |",
      "| :--- | :---: | ---: |",
      "| 무소음 마우스 | 2 | 25,000원 |"
    ],
    requirements: [
      {
        id: "req_align_center",
        text: "가운데 정렬(`:---:`) 열 포함하기",
        check: (code) => /\|[ \t]*:---+:[ \t]*\|/.test(code)
      },
      {
        id: "req_align_right",
        text: "오른쪽 정렬(`---:`) 열 포함하기",
        check: (code) => /\|[ \t]*---+:[ \t]*\|/.test(code)
      }
    ],
    starterCode: `| 품목 | 등급 | 단가 |
| --- | --- | --- |
| 사과 | 특상 | 3,000 |
| 배 | 우수 | 4,500 |`,
    targetCode: `| 품목 (좌측) | 등급 (중앙) | 단가 (우측) |
| :--- | :---: | ---: |
| 맛있는 사과 | 특상 | 3,000원 |
| 나주 배 | 우수 | 4,500원 |`,
    hint: "둘째 줄의 구분선을 `| :--- | :---: | ---: |` 형태로 변경해보세요."
  },

  // ==========================================
  // CHAPTER 6: 고급 & 실무 확장 (Advanced GFM)
  // ==========================================
  {
    id: "l17",
    chapter: 6,
    chapterTitle: "고급 및 실무 확장 문법",
    title: "17단계: 접기/펼치기 아코디언(Details)",
    badge: "<details><summary>",
    difficulty: "고급",
    description: `긴 설명, 정답 확인, FAQ처럼 필요할 때만 펼쳐보는 아코디언 메뉴는 HTML의 \`<details>\`와 \`<summary>\` 태그를 결합하여 만듭니다.`,
    guide: [
      "<details>",
      "<summary>클릭하여 상세 내용 보기</summary>",
      "",
      "이곳에 숨겨진 텍스트나 이미지가 들어갑니다.",
      "</details>"
    ],
    requirements: [
      {
        id: "req_details",
        text: "`<details>`와 `</details>` 태그 작성",
        check: (code) => /<details>[\s\S]*<\/details>/i.test(code)
      },
      {
        id: "req_summary",
        text: "`<summary>` 제목 태그 작성",
        check: (code) => /<summary>[\s\S]*<\/summary>/i.test(code)
      }
    ],
    starterCode: `Q: 이 소프트웨어는 무료인가요?
A: 네! 누구나 자유롭게 사용 가능한 오픈소스 소프트웨어입니다.`,
    targetCode: `<details>
<summary>Q: 이 소프트웨어는 무료인가요? (클릭하여 정답 보기)</summary>

A: 네! 개인과 기업 모두 무료로 사용할 수 있는 MIT 라이선스입니다.
</details>`,
    hint: "`<details>` 열고, `<summary>제목</summary>`, 그 뒤에 내용 작성 후 `</details>`로 닫으세요."
  },
  {
    id: "l18",
    chapter: 6,
    chapterTitle: "고급 및 실무 확장 문법",
    title: "18단계: GitHub 콜아웃(Callout/Alert)",
    badge: "> [!NOTE]",
    difficulty: "고급",
    description: `GitHub, Obsidian, 현대 기술 문서에서 표준으로 자리 잡은 콜아웃 강조 박스입니다.<br>
    인용구 맨 첫 줄에 \`> [!NOTE]\`, \`> [!TIP]\`, \`> [!WARNING]\`, \`> [!CAUTION]\` 등을 적으면 눈에 띄는 특별한 배너가 만들어집니다.`,
    guide: [
      "> [!TIP]",
      "> 단축키 Ctrl+S를 누르면 언제든지 자동 저장됩니다.",
      "",
      "> [!WARNING]",
      "> 데이터가 영구 삭제될 수 있으니 주의하세요."
    ],
    requirements: [
      {
        id: "req_callout",
        text: "`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!IMPORTANT]` 중 하나 이상 작성",
        check: (code) => />[ \t]*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i.test(code)
      }
    ],
    starterCode: `주의: 한 번 삭제된 파일은 복구할 수 없습니다.`,
    targetCode: `> [!WARNING]
> 주의: 한 번 삭제된 파일은 복구할 수 없으니 반드시 백업을 진행하세요!`,
    hint: "`> [!WARNING]` 을 첫째 줄에 쓰고, 둘째 줄부터 `> 내용` 을 적어보세요."
  },
  {
    id: "l19",
    chapter: 6,
    chapterTitle: "고급 및 실무 확장 문법",
    title: "19단계: 특수 문자 이스케이프(Escape)",
    badge: "\\ 기호",
    difficulty: "고급",
    description: `마크다운에서 특수 기호(\`*\`, \`#\`, \`[\`, \`]\`)를 문법 효과 없이 글자 그대로 화면에 보여주고 싶을 때는 기호 바로 앞에 <strong>역슬래시(\`\\\`)</strong>를 붙여 이스케이프합니다.`,
    guide: [
      "`\\*별표 감싸기 안됨\\*` -> *별표 감싸기 안됨*",
      "`\\# 제목이 아닌 일반 샵 기호` -> # 제목이 아닌 일반 샵 기호"
    ],
    requirements: [
      {
        id: "req_escape",
        text: "역슬래시(`\\`)를 사용해 별표, 샵, 대괄호 중 하나를 이스케이프하기",
        check: (code) => /\\[*#\[\]_~]/.test(code)
      }
    ],
    starterCode: `*이 문장을 기울임꼴로 만들지 말고 별표를 양쪽에 그대로 출력해보세요.*`,
    targetCode: `\\*이 문장은 기울임이 아니라 별표 글자가 그대로 보입니다\\*`,
    hint: "별표 `*` 바로 앞에 `\\` 를 붙여서 `\\*단어\\*` 형태로 작성하세요."
  },
  {
    id: "l20",
    chapter: 6,
    chapterTitle: "고급 및 실무 확장 문법",
    title: "20단계: 최종 보스 챌린지 - 프로젝트 README 완성!",
    badge: "🏆 종합 실습",
    difficulty: "마스터",
    description: `지금까지 배운 모든 문법을 총동원하여 멋진 오픈소스 프로젝트의 **README.md** 문서를 완성해 보세요!<br>
    <strong>통과 조건:</strong> 제목(H1/H2), 굵게 강조, 체크리스트, 코드 블록, 표(Table)가 모두 포함되어야 합니다.`,
    guide: [
      "1. `# 프로젝트 이름` (H1 제목)",
      "2. `**프로젝트 소개**` (굵게)",
      "3. `- [x] 기능 목록` (체크리스트)",
      "4. ` ```bash ... ``` ` (코드 블록)",
      "5. `| 항목 | 설명 |` (테이블)"
    ],
    requirements: [
      {
        id: "req_final_heading",
        text: "H1 또는 H2 제목 포함 (`#` or `##`)",
        check: (code) => /^#{1,2}[ \t]+[^\n]+/m.test(code)
      },
      {
        id: "req_final_bold",
        text: "굵은 글씨(`**단어**`) 포함",
        check: (code) => /\*\*[^\s*][^*]*\*\*/.test(code)
      },
      {
        id: "req_final_checklist",
        text: "체크리스트(`- [ ]` 또는 `- [x]`) 포함",
        check: (code) => /^[ \t]*[-*+][ \t]+\[[ xX]\]/m.test(code)
      },
      {
        id: "req_final_codeblock",
        text: "펜스 코드 블록(```) 포함",
        check: (code) => /```[\s\S]+?```/.test(code)
      },
      {
        id: "req_final_table",
        text: "표(Table `| --- |`) 포함",
        check: (code) => /\|.+?\|[\s\S]*?\|[ \t]*:?---+:?[ \t]*\|/.test(code)
      }
    ],
    starterCode: `# My Awesome Project

여기에 멋진 프로젝트 소개를 마크다운 문법으로 꾸며보세요!`,
    targetCode: `# 🚀 SuperNote App

**SuperNote**는 마크다운으로 작성하는 세상에서 가장 빠른 노트 앱입니다.

## ✨ 주요 기능
- [x] 실시간 미리보기 듀얼 뷰
- [x] 자동 저장 및 로컬 백업
- [ ] 클라우드 동기화 (진행 중)

## 💻 빠른 시작
\`\`\`bash
npm install supernote
npm run dev
\`\`\`

## 📊 브라우저 지원 현황
| 브라우저 | 지원 버전 | 상태 |
| :--- | :---: | ---: |
| Chrome | 100+ | 완벽 지원 |
| Safari | 15+ | 지원 |
| Firefox | 98+ | 지원 |
`,
    hint: "제목, 굵게, 체크리스트, 코드 블록, 표(테이블) 5가지 요소를 모두 골고루 넣어보세요!"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LESSONS_DATA };
}
