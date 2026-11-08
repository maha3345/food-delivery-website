@echo off
title PostgreSQL - Chulha (food_delivery database)
color 0A
echo ========================================================
echo   Connecting to PostgreSQL - food_delivery database...
echo ========================================================
set PGPASSWORD=3345
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d food_delivery
pause
