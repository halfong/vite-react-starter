#!/bin/bash

# 定义本地文件夹路径
localFolder="./dist"

# 定义远程服务器信息
remoteUser="ubuntu"
remoteHost="ip address"
remoteFolder="/var/www/client"

# 使用rsync命令通过SSH上传文件夹
npm run build
rsync -avz --update -e ssh $localFolder $remoteUser@$remoteHost:$remoteFolder