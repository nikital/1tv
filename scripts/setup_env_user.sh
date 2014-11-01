#!/usr/bin/env bash

set -e

THIS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG=~/.config/autostart

mkdir -p $CONFIG
cp $THIS/1tv.desktop $THIS/xset.desktop $CONFIG

gsettings set org.gnome.desktop.screensaver idle-activation-enabled false
gsettings set org.gnome.desktop.screensaver lock-enabled false
