#!/bin/bash

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "Python3 未安装，请先安装Python3"
    exit 1
fi

# 检查pip是否安装
if ! command -v pip3 &> /dev/null; then
    echo "pip3 未安装，请先安装pip3"
    exit 1
fi

# 安装依赖
echo "安装Python依赖..."
pip3 install -r requirements.txt

# 启动Flask应用
echo "启动后端服务..."
python3 app.py
