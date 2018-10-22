#!/bin/bash

APPDIR=$PWD
echo "/_________________\\"
echo "[ Building client ]"
echo "\\________________/"
NPM=`which npm`
${NPM} run install:all:prod && npm run client:build

echo "/_________________\\"
echo "[  Deploying app  ]"
echo "\\________________/"

GIT=`which git`
${GIT} add --all .
${GIT} commit -m "deploy"
${GIT} push dokku master