# 前端项目

基于Next.js的现代化React应用，提供用户登录和注册功能。

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

## 功能特性

- 用户登录界面
- 用户注册界面
- 响应式设计
- 用户状态管理
- 仪表板页面

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

应用将在 http://localhost:6002 启动

## 页面结构

- `/` - 登录/注册页面
- `/dashboard` - 用户仪表板（需要登录）

## 注意事项

- 确保后端服务在 http://localhost:6001 运行
- 用户信息存储在localStorage中
- 支持跨域请求