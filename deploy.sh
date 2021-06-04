#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn build
# cd 到构建输出的目录下
cd dist/spa

# 部署到自定义域域名
#echo 'ksgxkai.top' > CNAME

git init
git add .
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
#git push -f git@github.com:TurboQuasar/vue3-quasar-template.github.io.git main

# 部署到 https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:TurboQuasar/vue3-quasar-template.git main:gh-pages

cd -
