@echo off
chcp 65001 > nul
echo ==============================================
echo [사도행전 활동지 생성기] 깃허브 및 클라우드플레어 배포
echo ==============================================

cd /d "%~dp0.."
git add .
git status -s

set /p msg="커밋 메시지 (입력 없이 엔터 누르면 '자동 업데이트'): "
if "%msg%"=="" set msg=업데이트: 활동지 생성기 내용 수정

git commit -m "%msg%"
git push origin main

echo.
echo ==============================================
echo 깃허브 푸시 완료! 클라우드플레어가 자동으로 배포합니다.
echo 배포 사이트: https://bible-worksheets.pages.dev
echo ==============================================
pause
