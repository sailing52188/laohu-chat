#!/bin/bash

# 设置服务器信息
SERVER_USER="root"
SERVER_IP="114.55.247.135"
PEM_FILE="/Users/mac/Downloads/letschat.pem"
REMOTE_DIR="/root/chat-app"

# 确保PEM文件权限正确
chmod 400 $PEM_FILE

# 创建远程目录
ssh -i $PEM_FILE $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

# 复制项目文件到服务器
scp -i $PEM_FILE -r package.json app.js public $SERVER_USER@$SERVER_IP:$REMOTE_DIR/

# 在服务器上安装依赖和启动应用
ssh -i $PEM_FILE $SERVER_USER@$SERVER_IP "cd $REMOTE_DIR && \
    npm install && \
    npm install -g pm2 && \
    pm2 stop chat-app || true && \
    pm2 start app.js --name chat-app && \
    pm2 save"

echo "部署完成！"
