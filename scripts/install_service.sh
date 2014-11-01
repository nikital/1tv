#!/usr/bin/env bash

set -e

THIS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INIT_PATH="/etc/init.d/1tv"

[[ -n "$1" ]] || { echo "Usage: install_service.sh path-to-server"; exit 0 ; }

sed "s!<SERVER_PATH>!$1!" $THIS/1tv_service > $INIT_PATH
chmod +x $INIT_PATH
update-rc.d 1tv defaults
