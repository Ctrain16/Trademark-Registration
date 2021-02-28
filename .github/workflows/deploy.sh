#!/bin/bash
set -e
user="ubuntu"


rm -rf .git
rm -rf .gitignore
git config --global user.email "cal16trainor@gmail.com"
git config --global user.name "Cal Trainor"
mv .gitignore_cicd .gitignore
git init .
git add .
git commit -m "Deploying"
git remote add production ssh://$user@$AWS_HOST/~/webapp
git push --force production master

ssh $user@$AWS_HOST "cd ~/webapp && \
pm2 kill
npm install
NODE_ENV=production pm2 start /home/ubuntu/webapp/server/server.js
exit"