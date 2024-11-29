const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 存储当前有效的邀请码
let currentInviteCode = null;

// 生成新的邀请码
function generateInviteCode() {
    return crypto.randomBytes(4).toString('hex');
}

// 每小时更新一次邀请码
function updateInviteCode() {
    currentInviteCode = generateInviteCode();
    console.log('新的邀请码已生成:', currentInviteCode);
}

// 初始化邀请码并设置定时更新
updateInviteCode();
setInterval(updateInviteCode, 60 * 60 * 1000);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket 连接处理
io.on('connection', (socket) => {
    console.log('用户连接');

    // 验证邀请码
    socket.on('verify-invite-code', (data) => {
        const { code, nickname } = data;
        // 转换为小写进行比较
        if (code.toLowerCase() === currentInviteCode.toLowerCase()) {
            socket.nickname = nickname;
            socket.emit('verify-success');
            io.emit('user-joined', { nickname: nickname });
            console.log(`用户 ${nickname} 验证成功，使用邀请码: ${code}`);
        } else {
            socket.emit('verify-failed');
            console.log(`验证失败 - 输入的邀请码: ${code}, 当前有效邀请码: ${currentInviteCode}`);
        }
    });

    // 处理聊天消息
    socket.on('chat-message', (message) => {
        if (socket.nickname) {
            io.emit('chat-message', {
                nickname: socket.nickname,
                message: message,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });

    // 处理断开连接
    socket.on('disconnect', () => {
        if (socket.nickname) {
            io.emit('user-left', { nickname: socket.nickname });
        }
        console.log('用户断开连接');
    });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});
