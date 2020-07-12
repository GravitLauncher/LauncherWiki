#!/bin/bash
mkdir ~/production
cd ~/production
git clone https://github.com/GravitLauncher/WikiProduction
cd WikiProduction
rm -rf '(^"CNAME"|".git/")'
cp -r $GITHUB_WORKSPACE/dist/ ./
git commit -m "Autoupdate from source repo"
git push