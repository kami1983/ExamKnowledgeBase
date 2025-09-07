# 项目启动指南

## 环境要求

### 后端 (Python)
- Python 3.7+
- 以下Python包：
  - Flask
  - Flask-SQLAlchemy
  - Flask-CORS
  - Werkzeug

### 前端 (Node.js)
- Node.js 16+
- npm 或 yarn

## 安装步骤

### 1. 安装后端依赖

#### 方法一：使用pip（推荐）
```bash
cd backend
pip install -r requirements.txt
```

#### 方法二：使用conda
```bash
cd backend
conda install flask flask-sqlalchemy flask-cors -y
```

#### 方法三：手动安装
```bash
pip install flask==2.3.3 flask-sqlalchemy==3.0.5 flask-cors==4.0.0 werkzeug==2.3.7
```

### 2. 安装前端依赖
```bash
cd frontend
npm install
```

## 启动项目

### 1. 启动后端服务

#### 使用启动脚本（如果依赖已安装）
```bash
cd backend
./start.sh
```

#### 手动启动
```bash
cd backend
python app.py
```

#### 测试启动（简化版本）
```bash
cd backend
python test_backend.py
```

后端服务将在 http://localhost:6001 启动

### 2. 启动前端服务
```bash
cd frontend
npm run dev
```

前端服务将在 http://localhost:6002 启动

## 验证安装

### 后端验证
访问以下URL确认后端正常运行：
- http://localhost:6001/api/health
- http://localhost:6001/api/test

### 前端验证
访问 http://localhost:6002 查看登录界面

## 使用流程

1. 确保后端服务正在运行（端口6001）
2. 启动前端服务（端口6002）
3. 在浏览器中访问 http://localhost:6002
4. 点击"注册"创建新账户
5. 使用用户名和密码登录
6. 登录成功后进入仪表板页面

## 故障排除

### 后端启动失败
- 检查Python版本：`python --version`
- 检查依赖安装：`pip list | grep flask`
- 尝试使用虚拟环境：
  ```bash
  python -m venv venv
  source venv/bin/activate  # Linux/Mac
  # 或 venv\Scripts\activate  # Windows
  pip install -r requirements.txt
  ```

### 前端启动失败
- 检查Node.js版本：`node --version`
- 清除缓存：`npm cache clean --force`
- 删除node_modules重新安装：`rm -rf node_modules && npm install`

### 跨域问题
- 确保后端CORS配置正确
- 检查前端API请求URL是否正确

## 项目结构说明

```
ExamKnowledgeBase/
├── backend/                 # Python Flask 后端
│   ├── app.py              # 主应用文件
│   ├── test_backend.py     # 测试启动脚本
│   ├── requirements.txt    # Python依赖
│   ├── start.sh           # 启动脚本
│   └── users.db           # SQLite数据库（运行后生成）
├── frontend/               # Next.js 前端
│   ├── src/
│   │   ├── app/           # 页面组件
│   │   └── components/    # 可复用组件
│   └── package.json       # 前端依赖
└── README.md              # 项目说明
```
