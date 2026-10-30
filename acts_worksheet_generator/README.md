# 세인 말씀 활동지

사도행전 본문으로 학년별 논술·문법 활동지를 만드는 브라우저 앱입니다.
출제 기록은 각 브라우저에 저장되며, JSON 백업·복원으로 다른 기기로 옮길 수 있습니다.

## 개발과 검증

```sh
npm ci
npm test
npm run build
```

`dist/`만 배포합니다. 서버 코드는 `server/worker.js`, 화면은 `index.html`과
`style.css`, 활동지 렌더링·기록 검증은 `worksheet-core.js`에 있습니다.
`script.js`에는 기존 문법 문제와 생성 흐름이 있습니다.

## Cloudflare Pages 빌드

- 프로젝트: `bible-worksheets`
- 저장소 루트: 빈 값 (저장소 최상위)
- 빌드 명령: `npm --prefix acts_worksheet_generator ci && npm --prefix acts_worksheet_generator run build`
- 출력 폴더: `acts_worksheet_generator/dist`

`_worker.js`는 빌드 시 jose와 함께 번들됩니다. `/api/*`만 Functions로 처리합니다.
키와 허용 이메일은 소스, GitHub, 브라우저 저장소에 넣지 않습니다.

## AI 기능 활성화 순서

1. Cloudflare Zero Trust에서 Access 초기 설정을 완료합니다.
2. `bible-worksheets.pages.dev`를 보호하는 Access 애플리케이션을 만듭니다.
   Pages의 **Enable access policy**로 미리보기 정책을 만든 후 관리 화면에서
   와일드카드 없는 운영 도메인 정책과 `*.bible-worksheets.pages.dev` 정책을
   각각 확인합니다. 운영 정책의 Allow 조건은 지정한 이메일만 포함합니다.
   Everyone / 이메일 도메인 전체 / Bypass 정책을 사용하지 않습니다.
3. 이메일 일회용 코드(One-time PIN) 로그인을 활성화합니다.
4. Pages 프로젝트의 Production 환경에 다음 값을 설정합니다.

| 이름 | 종류 | 값 |
|---|---|---|
| `GEMINI_API_KEY` | Secret | 새로 발급한 Gemini 키 |
| `ACCESS_TEAM_DOMAIN` | Plaintext | `https://팀이름.cloudflareaccess.com` (끝 슬래시 없음) |
| `ACCESS_AUD` | Plaintext | 운영 Access 애플리케이션의 Audience (AUD) |
| `ALLOWED_EMAILS` | Secret 권장 | 허용 이메일을 쉼표로 구분 |
| `GEMINI_MODEL` | Plaintext, 선택 | 기본 `gemini-3.5-flash` |

5. 다시 배포합니다. 설정 변경만으로 기존 배포에 반영되었다고 가정하지 않습니다.
6. 허용 이메일 로그인과 실제 답안 생성, 비허용 이메일 거부를 확인합니다.
7. Google AI Studio에서 기존 노출 키를 폐기합니다. Git 기록에 남은 키도 폐기 후에는 사용할 수 없습니다.

새 키는 채팅에 붙여 넣지 말고 Cloudflare Secret에 직접 입력합니다.
Preview에는 운영 키를 복사하지 않는 것이 기본입니다. Preview AI도 필요하면
그 미리보기 Access 앱의 AUD와 별도 설정을 사용합니다.

서버는 서명·발급자·대상·만료 시간과 이메일 허용 목록을 검증합니다.
설정이 없거나 인증이 실패하면 AI 요청을 거부합니다. 프런트엔드 코드 제거만으로
과거 배포 URL이나 Git 기록의 기존 키까지 폐기되는 것은 아닙니다.

## 현재 변경과 검증 범위

- 공개 JavaScript에서 API 키 제거, 서버에서만 Gemini 호출
- 학년별 핵심 낱말 수·쓰기 분량·AI 지시문 적용
- 흑백 교재형 출력물과 반응형 설정/미리보기 화면
- 교사용 보기, 논술 답안 직접 수정 및 저장
- 기초 문법 AI 답안 저장·복원, 늦은 AI 응답의 다른 활동지 덮어쓰기 방지
- 손상된 기록 보존, 저장 실패 시 생성 유지, 백업·복원
- `다 같이` 오답과 문맥을 무시한 일부 띄어쓰기 치환 제거
- 짧은 범위의 중복 출제와 `(없음)` 절 출제 방지

자동 테스트는 DOM·저장·비동기 처리와 서명된 테스트 JWT의 허용/거부를 확인합니다.
실제 계정 로그인과 Gemini 호출은 새 키와 Access 설정 후 따로 확인해야 합니다.
실제 브라우저의 A4 인쇄 미리보기에서 긴 본문·긴 답안의 페이지 나눔도 확인하세요.
문항 은행 전체에 대한 국어·성경 내용 감수까지 완료한 것은 아닙니다.

## 참고

- [Pages Access 설정](https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain)
- [Gemini 키 관리](https://ai.google.dev/gemini-api/docs/api-key)

## 되돌리기

Cloudflare의 이전 배포로 롤백하면 화면은 복구되지만, 과거 공개 키가 다시
노출될 수 있습니다. 기존 키를 폐기하고 새 키를 서버 Secret에만 보관하세요.
출제 기록은 배포와 별개로 브라우저에 남습니다. 변경 전후 백업을 권장합니다.
