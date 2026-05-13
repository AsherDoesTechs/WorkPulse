@echo off
set PATH=%PATH%;%CD%\node\node-v20.12.2-win-x64
call npm install > npm.log 2>&1
call npx vite --port 5173 > vite.log 2>&1
