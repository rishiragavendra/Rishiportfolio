@echo off
title Rishi Ragavendra R - Portfolio
cd /d "%~dp0"

echo.
echo  ============================================
echo    RISHI RAGAVENDRA R - PORTFOLIO
echo  ============================================
echo.

set PORT=5500

REM ---- find a Python launcher --------------------------------
set PYCMD=
where py >nul 2>nul && set PYCMD=py -3
if "%PYCMD%"=="" ( where python >nul 2>nul && set PYCMD=python )
if "%PYCMD%"=="" ( where python3 >nul 2>nul && set PYCMD=python3 )

if not "%PYCMD%"=="" goto serve

REM ---- no Python: try Node -----------------------------------
where npx >nul 2>nul
if %errorlevel%==0 (
  echo  Starting server with Node ^(npx serve^) on port %PORT% ...
  start "" http://localhost:%PORT%/
  npx --yes serve -l %PORT% .
  goto end
)

REM ---- last resort: open the file directly --------------------
echo  Python and Node were not found.
echo  Opening index.html directly in your browser instead.
echo  ^(Everything works, but a local server is recommended.^)
echo.
start "" "index.html"
pause
goto end

:serve
echo  Starting local server on http://localhost:%PORT%/
echo  Opening your browser...
echo.
echo  Keep this window open while you browse.
echo  Press Ctrl+C or close this window to stop the server.
echo.
start "" http://localhost:%PORT%/
%PYCMD% -m http.server %PORT%

:end
