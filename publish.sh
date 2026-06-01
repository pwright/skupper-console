#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# Create a temporary webpack config in a repo-local hidden directory.
# This keeps temp files out of the root and allows package imports to resolve.
mkdir -p temp
tmp_config="$(mktemp temp/webpack.config.XXXXXX)"
tmp_config="${tmp_config}.mjs"
cp webpack.config.mjs "$tmp_config"
python3 - <<PY
from pathlib import Path
path = Path("$tmp_config")
text = path.read_text()
text = text.replace("publicPath: '/'", "publicPath: './'")
text = text.replace("publicPath: 'auto'", "publicPath: './'")
path.write_text(text)
PY

cleanup() {
  rm -f "$tmp_config"
}
trap cleanup EXIT

# Build with mocks using the temporary config.
USE_MOCK_SERVER=true npx tsc
USE_MOCK_SERVER=true npx webpack --config "$tmp_config"

# Publish the generated build/ directory to gh-pages.
npx gh-pages -d build
