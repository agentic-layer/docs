#!/usr/bin/env bash
# local-build.sh — Build the unified Antora site against local sibling repos.
#
# Generates antora-playbook.local.yml by rewriting each GitHub source URL to the
# matching ../<repo> sibling path and switching branches to HEAD (so Antora reads
# the working tree). Then runs Antora against the local playbook.
#
# Run from anywhere; the script locates the docs repo root via its own path.
#
# Requires kroki to be running locally for diagram rendering. Start it from the
# docs repo root with `docker compose up -d` before running this script.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$REPO_ROOT"

PLAYBOOK="antora-playbook.yml"
LOCAL_PLAYBOOK="antora-playbook.local.yml"

if [[ ! -f "$PLAYBOOK" ]]; then
  echo "error: $PLAYBOOK not found in $REPO_ROOT" >&2
  exit 1
fi

# Rewrite GitHub URLs to local sibling paths and switch branches to HEAD.
sed -E \
  -e 's#url: https://github.com/agentic-layer/([^.]+)\.git#url: ../\1#g' \
  -e 's#branches: \[[[:space:]]*main[[:space:]]*\]#branches: HEAD#g' \
  "$PLAYBOOK" > "$LOCAL_PLAYBOOK"

echo "Generated $LOCAL_PLAYBOOK"
echo

npx antora --log-failure-level warn "$LOCAL_PLAYBOOK"
