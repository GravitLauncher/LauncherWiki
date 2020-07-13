#!/bin/bash
mkdir ~/production
cd ~/production
git clone https://github.com/GravitLauncher/WikiProduction
cd WikiProduction
rm -rf '(^"CNAME"|".git/")'
echo "$GITHUB_WORKSPACE/dist/"
ls -la $GITHUB_WORKSPACE/dist/
cp -r $GITHUB_WORKSPACE/dist/ ./
git config --global user.email "auto@gravit.pro"
git config --global user.name "auto-commiter"
git add .
git commit -m "Autoupdate from source repo"
git push