#!/usr/bin/env python3
"""
简单的后端测试脚本
用于验证Flask应用是否能正常启动
"""

try:
    from flask import Flask, request, jsonify
    from flask_sqlalchemy import SQLAlchemy
    from werkzeug.security import generate_password_hash, check_password_hash
    from flask_cors import CORS
    import os
    
    print("✅ 所有依赖包导入成功")
    
    # 创建Flask应用
    app = Flask(__name__)
    CORS(app)
    
    # 数据库配置
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "test_users.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db = SQLAlchemy(app)
    
    # 用户模型
    class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password_hash = db.Column(db.String(120), nullable=False)
        
        def __repr__(self):
            return f'<User {self.username}>'
    
    # 创建数据库表
    with app.app_context():
        db.create_all()
        print("✅ 数据库表创建成功")
    
    # 测试路由
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'ok', 'message': '后端服务正常运行'})
    
    @app.route('/api/test', methods=['GET'])
    def test():
        return jsonify({'message': '测试成功', 'users_count': User.query.count()})
    
    print("✅ Flask应用配置完成")
    print("🚀 启动测试服务器...")
    print("📝 访问 http://localhost:6001/api/health 测试服务")
    print("📝 访问 http://localhost:6001/api/test 测试数据库")
    print("⏹️  按 Ctrl+C 停止服务")
    
    if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0', port=6001)
        
except ImportError as e:
    print(f"❌ 缺少依赖包: {e}")
    print("请运行以下命令安装依赖:")
    print("pip install flask flask-sqlalchemy flask-cors werkzeug")
except Exception as e:
    print(f"❌ 启动失败: {e}")
