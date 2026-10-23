/**
 * Markdown Craft - 마크다운 타자/스피드 연습 데이터셋
 * 실전 마크다운 특수 기호와 실무 문서 패턴 연습
 */

const TYPING_DATA = [
  {
    id: "type_1",
    title: "Level 1: 마크다운 기호 적응 훈련",
    category: "기호 훈련",
    difficulty: "쉬움",
    description: "마크다운에서 가장 빈번하게 쓰는 #, *, -, ` 기호의 타이핑 손가락 위치를 익힙니다.",
    text: `# 마크다운 시작하기
**굵은 글씨**와 *기울임꼴* 텍스트를 연습합니다.
- 첫 번째 항목
- 두 번째 항목
명령어는 \`npm start\` 로 실행합니다.`
  },
  {
    id: "type_2",
    title: "Level 2: 주간 업무 및 할 일 체크리스트",
    category: "체크리스트",
    difficulty: "보통",
    description: "대괄호와 대시를 결합한 체크리스트 문법과 인용구를 빠르게 타이핑합니다.",
    text: `## 📌 이번 주 스프린트
- [x] 메인 대시보드 UI 컴포넌트 완성
- [x] 사용자 마크다운 렌더링 성능 최적화
- [ ] 주간 보고서 작성 및 배포 테스트

> 주의: 금요일 오후 5시 이전까지 코드 리뷰를 완료하세요.`
  },
  {
    id: "type_3",
    title: "Level 3: 오픈소스 깃허브 README",
    category: "README & 링크",
    difficulty: "보통",
    description: "링크, 배지, 볼드 텍스트가 조화된 전형적인 오픈소스 저장소 소개글입니다.",
    text: `# ⚡ Vite React Starter

현대적인 웹 개발을 위한 초고속 **React 템플릿**입니다.

### 🚀 특징
- **빠른 HMR**: 0.1초 만에 반영되는 핫 모듈 리로드
- **TypeScript 내장**: 안전한 정적 타입 검사 지원
- 공식 문서: [가이드 읽기](https://vitejs.dev)`
  },
  {
    id: "type_4",
    title: "Level 4: 기술 블로그 & 코드 스니펫",
    category: "코드 블록",
    difficulty: "어려움",
    description: "백틱 3개 펜스 코드 블록과 인라인 코드가 복합적으로 섞인 기술 문서입니다.",
    text: `### 🛠️ 데이터 페칭 함수 작성

비동기 통신을 위해 \`async/await\` 구문을 활용합니다.

\`\`\`javascript
async function loadUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  return data;
}
\`\`\`

에러 발생 시 \`try...catch\` 블록으로 예외를 처리하세요.`
  },
  {
    id: "type_5",
    title: "Level 5: 복합 데이터 비교 테이블",
    category: "테이블",
    difficulty: "마스터",
    description: "파이프(|)와 콜론(:)을 신속하고 정확하게 타이핑하는 테이블 마스터 코스입니다.",
    text: `| 플랜 이름 | 월 요금 | 저장 공간 | 지원 방식 |
| :--- | :---: | :---: | ---: |
| 스타터 | 무료 | 1 GB | 커뮤니티 |
| 프로 | $12 | 50 GB | 24시간 채팅 |
| 엔터프라이즈 | $49 | 무제한 | 전담 엔지니어 |`
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TYPING_DATA };
}
