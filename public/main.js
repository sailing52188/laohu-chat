document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let nickname = '';

    // 常用表情列表
    const emojis = ['😊', '😂', '🤣', '😍', '😒', '😘', '🤔', '😮', '😭', '👍', '❤️', '😅', '😉', '🎉'];

    // DOM 元素
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const nicknameInput = document.getElementById('nickname');
    const inviteCodeInput = document.getElementById('invite-code');
    const joinBtn = document.getElementById('join-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesDiv = document.getElementById('messages');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPanel = document.getElementById('emoji-panel');

    // 初始化表情面板
    emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        span.style.cursor = 'pointer';
        span.onclick = () => {
            messageInput.value += emoji;
            emojiPanel.style.display = 'none';
        };
        emojiPanel.appendChild(span);
    });

    // 表情按钮点击事件
    emojiBtn.onclick = () => {
        emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'grid' : 'none';
    };

    // 点击其他地方关闭表情面板
    document.addEventListener('click', (e) => {
        if (!emojiBtn.contains(e.target) && !emojiPanel.contains(e.target)) {
            emojiPanel.style.display = 'none';
        }
    });

    // 加入聊天室
    joinBtn.onclick = () => {
        nickname = nicknameInput.value.trim();
        const inviteCode = inviteCodeInput.value.trim();

        if (!nickname) {
            alert('请输入昵称');
            return;
        }
        if (!inviteCode) {
            alert('请输入邀请码');
            return;
        }

        socket.emit('verify-invite-code', { code: inviteCode, nickname });
    };

    // 发送消息
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('chat-message', message);
            messageInput.value = '';
        }
    }

    sendBtn.onclick = sendMessage;
    messageInput.onkeypress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // Socket.io 事件处理
    socket.on('verify-success', () => {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
        addSystemMessage(`欢迎 ${nickname} 加入聊天室`);
    });

    socket.on('verify-failed', () => {
        alert('邀请码验证失败');
    });

    socket.on('chat-message', (data) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${data.nickname === nickname ? 'self' : 'other'}`;
        messageDiv.innerHTML = `
            <strong>${data.nickname}</strong>
            <span class="time">${data.timestamp}</span><br>
            ${data.message}
        `;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });

    socket.on('user-joined', (data) => {
        if (data.nickname !== nickname) {
            addSystemMessage(`${data.nickname} 加入了聊天室`);
        }
    });

    socket.on('user-left', (data) => {
        addSystemMessage(`${data.nickname} 离开了聊天室`);
    });

    // 添加系统消息
    function addSystemMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
});
