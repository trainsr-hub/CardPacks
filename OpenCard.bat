@echo off
REM CMD 1: chạy frontend
start cmd /k "cd backend && uvicorn main:app --reload"

REM CMD 2: chạy backend
start cmd /k "npm run dev"
