#!/usr/bin/env bash

set -e

cd player
make
cd -

cd server
npm install
cd -

mkdir build
zip build/1tv.zip server scripts
