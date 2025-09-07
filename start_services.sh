#!/bin/bash

# 考试知识库系统启动脚本
# 后端端口: 6001, 前端端口: 6002

echo "🚀 启动考试知识库系统..."

# 检查conda环境是否存在
if ! conda env list | grep -q "exams"; then
    echo "❌ 未找到exams环境，请先运行: conda create -n exams python=3.9 -y"
    exit 1
fi

# 激活conda环境
echo "📦 激活conda环境: exams"
source $(conda info --base)/etc/profile.d/conda.sh
conda activate exams

# 启动后端服务
echo "🔧 启动后端服务 (端口: 6001)..."
cd backend
python app.py &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 检查后端是否启动成功
if curl -s http://localhost:6001/api/health > /dev/null; then
    echo "✅ 后端服务启动成功"
else
    echo "❌ 后端服务启动失败"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# 启动前端服务
echo "🎨 启动前端服务 (端口: 6002)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# 等待前端启动
sleep 5

echo ""
echo "🎉 系统启动完成！"
echo "📱 前端地址: http://localhost:6002"
echo "🔧 后端地址: http://localhost:6001"
echo "📊 健康检查: http://localhost:6001/api/health"
echo ""
echo "⏹️  按 Ctrl+C 停止所有服务"

# 等待用户中断
trap 'echo ""; echo "🛑 正在停止服务..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo "✅ 服务已停止"; exit 0' INT

# 保持脚本运行
wait
