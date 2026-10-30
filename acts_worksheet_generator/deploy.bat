@echo off
chcp 65001 > nul
setlocal
pushd "%~dp0"
call npm ci
if errorlevel 1 goto failed
call npm test
if errorlevel 1 goto failed
call npm run build
if errorlevel 1 goto failed
git status --short
git add -- .
if errorlevel 1 goto failed
git diff --cached --quiet -- .
if errorlevel 1 (
  git commit --only . -m "활동지 생성기 업데이트"
  if errorlevel 1 goto failed
)
git push origin HEAD:main
if errorlevel 1 goto failed
echo GitHub 업데이트 완료. Cloudflare 배포 결과를 확인해 주세요.
echo https://bible-worksheets.pages.dev
popd
pause
exit /b 0
:failed
echo 오류가 발생하여 배포를 중단했습니다. 위의 오류를 확인해 주세요.
popd
pause
exit /b 1
