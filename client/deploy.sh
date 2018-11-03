#!/bin/bash

echo "/_________________\\"
echo "[  Deploying client  ]"
echo "\\________________/"

GIT=`which git`
${GIT} add --all .
${GIT} commit -m "deploy"
${GIT} push dokku master