# ExamKnowledgeBase

考试知识库系统 - 包含前端和后端的完整用户认证系统

## 项目结构

```
ExamKnowledgeBase/
├── backend/                 # Python Flask 后端
│   ├── app.py              # 主应用文件
│   ├── requirements.txt    # Python依赖
│   ├── start.sh           # 启动脚本
│   └── README.md          # 后端说明
├── frontend/               # Next.js 前端
│   ├── src/
│   │   ├── app/           # 页面组件
│   │   └── components/    # 可复用组件
│   ├── package.json       # 前端依赖
│   └── README.md          # 前端说明yong一个xin眼
├── Junior-high-school-mathematics.txt
├── Junior-high-school-physics.txt
└── README.md
```

## 快速开始

### 方法一：Cursor终端快速启动（推荐）

```bash
# 1. 激活exams环境
source activate_env.sh

# 2. 快速启动（交互式选择）
./quick_start.sh
```

### 方法二：一键启动

```bash
# 确保已创建exams conda环境
conda create -n exams python=3.9 -y
conda activate exams
conda install flask flask-sqlalchemy flask-cors -y

# 安装前端依赖
cd frontend
npm install
cd ..

# 一键启动前后端服务
./start_services.sh
```

### 方法三：分别启动

#### 1. 启动后端服务

```bash
# 激活conda环境
conda activate exams

# 启动后端
cd backend
python app.py
```

后端服务将在 http://localhost:6001 启动

#### 2. 启动前端服务

```bash
cd frontend
npm run dev
```

前端服务将在 http://localhost:6002 启动

## 功能特性

### 后端 (Flask + SQLite)
- 用户注册和登录
- 密码加密存储
- SQLite数据库
- RESTful API
- 跨域支持

### 前端 (Next.js + TypeScript)
- 现代化React应用
- 响应式设计
- 用户认证界面
- 仪表板页面
- TypeScript支持

## API接口

- `POST /api/register` - 用户注册
- `POST /api/login` - 用户登录
- `GET /api/users` - 获取用户列表
- `GET /api/health` - 健康检查

## 数据库管理

### 初始化数据库
```bash
cd backend
python init_db.py init
```
- 创建数据库表
- 创建默认管理员用户 (admin/admin123)

### 查看数据库信息
```bash
cd backend
python init_db.py info
```

### 重置数据库
```bash
cd backend
python init_db.py reset
```

### 数据库文件
- **位置**: `backend/users.db`
- **类型**: SQLite
- **表结构**: 
  ```sql
  CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(80) UNIQUE NOT NULL,
      password_hash VARCHAR(120) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 环境变量配置
项目使用 `.env` 文件管理环境变量：

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑环境变量（可选）
# ADMIN_PINCODE=123456  # 管理员PIN码，用于用户注册验证
```

### 默认管理员账户
- **用户名**: admin
- **密码**: admin123
- **PIN码**: 123456 (用于注册新用户)

## 使用说明

1. 访问 http://localhost:6002
2. 使用默认管理员账户登录，或点击"注册"创建新账户
3. 登录成功后进入仪表板页面
