#!/usr/bin/env sh

set -e

yarn build

cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:91jzhu/money-note-website.git master:gh-pages


cd -