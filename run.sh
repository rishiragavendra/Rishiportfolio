#!/usr/bin/env bash
# Rishi Ragavendra R — Portfolio launcher (macOS / Linux)
cd "$(dirname "$0")" || exit 1
PORT=5500

echo
echo "============================================"
echo "  RISHI RAGAVENDRA R - PORTFOLIO"
echo "============================================"
echo

open_browser() {
  sleep 1
  URL="http://localhost:$PORT/"
  if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL" >/dev/null 2>&1
  elif command -v open >/dev/null 2>&1; then open "$URL"
  else echo "Open $URL in your browser."; fi
}

if command -v python3 >/dev/null 2>&1; then
  echo "Serving on http://localhost:$PORT/  (Ctrl+C to stop)"
  open_browser &
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  echo "Serving on http://localhost:$PORT/  (Ctrl+C to stop)"
  open_browser &
  python -m http.server "$PORT"
elif command -v npx >/dev/null 2>&1; then
  echo "Serving with npx serve on http://localhost:$PORT/"
  open_browser &
  npx --yes serve -l "$PORT" .
else
  echo "No Python or Node found — opening index.html directly."
  open_browser &
  if command -v xdg-open >/dev/null 2>&1; then xdg-open index.html
  elif command -v open >/dev/null 2>&1; then open index.html; fi
fi
