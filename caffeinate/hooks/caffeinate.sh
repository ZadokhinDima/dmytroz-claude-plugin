#!/usr/bin/env bash
set -euo pipefail

# Caffeinate hook for Claude Code
# Prevents macOS from sleeping during active sessions.
# Uses caffeinate -w $PPID — auto-exits when Claude Code dies, findable by pgrep.

if ! command -v jq >/dev/null 2>&1; then exit 0; fi
if ! command -v caffeinate >/dev/null 2>&1; then exit 0; fi

INPUT="$(cat)"
EVENT="$(echo "$INPUT" | jq -r '.hook_event_name // empty' 2>/dev/null || true)"
[[ -z "$EVENT" ]] && exit 0

CAFFEINATE_FLAGS="${CLAUDE_CAFFEINATE_FLAGS:--i -m -s}"
MATCH="caffeinate -w $PPID $CAFFEINATE_FLAGS"

fire_activate() {
  [[ -n "${CLAUDE_CAFFEINATE_ON_ACTIVATE:-}" ]] && eval "$CLAUDE_CAFFEINATE_ON_ACTIVATE" >/dev/null 2>&1 || true
}

fire_deactivate() {
  [[ -n "${CLAUDE_CAFFEINATE_ON_DEACTIVATE:-}" ]] && eval "$CLAUDE_CAFFEINATE_ON_DEACTIVATE" >/dev/null 2>&1 || true
}

stop_caffeinate() {
  pkill -f "$MATCH" 2>/dev/null && fire_deactivate || true
}

start_caffeinate() {
  pgrep -f "$MATCH" >/dev/null 2>&1 && return
  # shellcheck disable=SC2086 — intentional word splitting for flags
  nohup caffeinate -w "$PPID" $CAFFEINATE_FLAGS </dev/null >/dev/null 2>&1 &
  fire_activate
}

case "$EVENT" in
  UserPromptSubmit)     start_caffeinate ;;
  Stop|Notification)    stop_caffeinate ;;
  SessionEnd)           stop_caffeinate ;;
  PostToolUseFailure)
    # Only stop on user interrupt, not on regular tool failures
    IS_INTERRUPT="$(echo "$INPUT" | jq -r '.is_interrupt // false' 2>/dev/null || true)"
    [[ "$IS_INTERRUPT" == "true" ]] && stop_caffeinate
    ;;
  *)                    ;;
esac

exit 0
