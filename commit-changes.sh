#!/bin/bash
mkdir ~/production
cd ~/production
git clone https://github.com/GravitLauncher/WikiProduction
cd WikiProduction
rm -rf '(^"CNAME"|".git/")'
cp -r $GITHUB_WORKSPACE/dist/ ./
git config --global user.email "auto@gravit.pro"
git config --global user.name "auto-commiter"
git commit -m "Autoupdate from source repo"
git push