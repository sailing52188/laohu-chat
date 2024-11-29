# 老胡笑谈 (Lao Hu's Laugh Talk)

一个充满复古风格的私密聊天室，专为小型私密群组设计。

## 🌟 特点

- 无需注册，使用邀请码即可加入
- 每小时更新的邀请码系统，确保安全性
- 复古风格界面，带来怀旧的聊天体验
- 实时消息推送
- 支持表情符号
- 简洁直观的用户界面

## 🚀 快速开始

1. 访问聊天室：
   ```
   http://114.55.247.135:3000
   ```

2. 输入昵称和邀请码
   - 昵称：随意设置
   - 邀请码：向管理员获取当前有效的邀请码
   - 注意：邀请码每小时自动更新

3. 开始聊天
   - 在输入框中输入消息
   - 点击发送或按回车键发送消息
   - 系统会显示用户的加入和离开信息

## 💻 技术栈

- 前端：HTML5, CSS3, 原生JavaScript
- 后端：Node.js, Express
- 实时通信：Socket.io
- 部署：Aliyun Cloud Server
- 进程管理：PM2

## 🔒 安全特性

- 基于时间的邀请码系统
- 不存储聊天记录
- 仅限邀请用户访问
- 阿里云安全组防护

## 🛠️ 部署信息

### 服务器配置
- IP: 114.55.247.135
- 端口: 3000
- 操作系统: Linux

### 部署步骤
1. 克隆项目
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动应用：
   ```bash
   npm start
   ```

### PM2管理命令
- 查看应用状态：
  ```bash
  pm2 list
  ```
- 查看日志：
  ```bash
  pm2 logs chat-app
  ```
- 重启应用：
  ```bash
  pm2 restart chat-app
  ```

## 📝 使用须知

1. 聊天内容不会被保存，关闭页面后消息将丢失
2. 为了保持私密性，请不要随意分享邀请码
3. 如遇到问题，请刷新页面重新连接
4. 建议使用现代浏览器访问（Chrome, Firefox, Safari等）

## ⚠️ 注意事项

- 邀请码每小时更新一次
- 服务器重启后邀请码会重新生成
- 当前不支持图片和文件传输
- 为保护隐私，不建议在聊天室分享敏感信息

## 🔄 更新记录

### v1.0.0 (2024-11-29)
- 初始版本发布
- 实现基本的聊天功能
- 添加邀请码系统
- 完成复古风格界面设计

## 👥 贡献者

- 项目负责人：老胡 (GitHub: [sailing52188](https://github.com/sailing52188))
- 开发团队：XXF

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub: https://github.com/sailing52188

## 📄 许可证

本项目仅供私人使用，未经允许不得用于商业目的。