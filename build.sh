#!/usr/bin/env bash

set -e

cd player
make
cd -

cd server
npm install
echo Build $(git rev-parse HEAD) on $(date) > public/version.txt
cd -

mkdir build
zip -r build/1tv.zip server scripts
