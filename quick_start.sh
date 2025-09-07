#!/bin/bash

# 快速启动脚本 - 适用于Cursor终端
# 使用方法: ./quick_start.sh

echo "🚀 考试知识库系统快速启动"
echo "================================"

# 检查是否在exams环境中
if [[ "$CONDA_DEFAULT_ENV" != "exams" ]]; then
    echo "⚠️  当前不在exams环境中，正在激活..."
    source $(conda info --base)/etc/profile.d/conda.sh
    conda activate exams
    echo "✅ 已激活exams环境"
else
    echo "✅ 已在exams环境中"
fi

echo ""
echo "请选择启动方式:"
echo "1) 启动后端服务 (端口: 6001)"
echo "2) 启动前端服务 (端口: 6002)"
echo "3) 同时启动前后端服务"
echo "4) 退出"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo "🔧 启动后端服务..."
        cd backend
        python app.py
        ;;
    2)
        echo "🎨 启动前端服务..."
        cd frontend
        npm run dev
        ;;
    3)
        echo "🚀 同时启动前后端服务..."
        echo "🔧 启动后端服务 (后台)..."
        cd backend
        python app.py &
        BACKEND_PID=$!
        
        echo "🎨 启动前端服务..."
        cd ../frontend
        npm run dev &
        FRONTEND_PID=$!
        
        echo ""
        echo "✅ 服务启动完成!"
        echo "📱 前端: http://localhost:6002"
        echo "🔧 后端: http://localhost:6001"
        echo ""
        echo "⏹️  按 Ctrl+C 停止所有服务"
        
        # 等待用户中断
        trap 'echo ""; echo "🛑 停止服务..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo "✅ 服务已停止"; exit 0' INT
        wait
        ;;
    4)
        echo "👋 再见!"
        exit 0
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac
