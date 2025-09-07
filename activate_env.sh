#!/bin/bash

# 激活exams conda环境的脚本
# 在Cursor终端中运行: source activate_env.sh

echo "🔄 正在激活exams conda环境..."

# 初始化conda
source $(conda info --base)/etc/profile.d/conda.sh

# 激活exams环境
conda activate exams

# 显示当前环境信息
echo "✅ 已激活环境: $(conda info --show-active-env)"
echo "🐍 Python路径: $(which python)"
echo "📦 当前目录: $(pwd)"
echo ""
echo "🚀 现在可以运行:"
echo "   - 后端: cd backend && python app.py"
echo "   - 前端: cd frontend && npm run dev"
echo "   - 一键启动: ./start_services.sh"
