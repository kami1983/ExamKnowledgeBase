# 后端项目

基于Flask的简单用户认证系统，使用SQLite数据库存储用户信息。

## 功能特性

- 用户注册
- 用户登录
- 密码加密存储
- 跨域支持
- SQLite数据库

## 安装和运行

1. 安装依赖：
```bash
pip install -r requirements.txt
```

2. 初始化数据库：
```bash
python init_db.py init
```

3. 运行应用：
```bash
python app.py
```

服务器将在 http://localhost:6001 启动

## 数据库管理

### 初始化数据库
```bash
python init_db.py init
```
- 创建数据库表
- 创建默认管理员用户 (admin/admin123)

### 查看数据库信息
```bash
python init_db.py info
```

### 重置数据库
```bash
python init_db.py reset
```

### 数据库文件
- 位置: `backend/users.db`
- 类型: SQLite
- 表结构: 见 `schema.sql`

## API接口

### 用户注册
- **POST** `/api/register`
- 请求体：
```json
{
  "username": "用户名",
  "email": "邮箱",
  "password": "密码"
}
```

### 用户登录
- **POST** `/api/login`
- 请求体：
```json
{
  "username": "用户名",
  "password": "密码"
}
```

### 获取用户列表
- **GET** `/api/users`

### 健康检查
- **GET** `/api/health`
