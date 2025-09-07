#!/usr/bin/env python3
"""
数据库初始化脚本
用于创建数据库表和初始数据
"""

from app import app, db, User
from werkzeug.security import generate_password_hash
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

def init_database():
    """初始化数据库"""
    print("🔄 正在初始化数据库...")
    
    with app.app_context():
        # 创建所有表
        db.create_all()
        print("✅ 数据库表创建成功")
        
        # 检查是否已存在admin用户
        if not User.query.filter_by(username='admin').first():
            # 创建默认管理员用户
            admin_user = User(
                username='admin',
                password_hash=generate_password_hash('admin123')
            )
            
            try:
                db.session.add(admin_user)
                db.session.commit()
                print("👤 默认管理员用户创建成功")
                print("   用户名: admin")
                print("   密码: admin123")
                print("   PIN码: " + os.getenv('ADMIN_PINCODE', '123456'))
            except Exception as e:
                print(f"⚠️  创建管理员用户失败: {e}")
                db.session.rollback()
        else:
            print("ℹ️  管理员用户已存在")
        
        # 显示数据库信息
        user_count = User.query.count()
        print(f"📊 当前用户数量: {user_count}")
        
        print("🎉 数据库初始化完成！")

def show_database_info():
    """显示数据库信息"""
    print("\n📋 数据库信息:")
    print("=" * 50)
    
    with app.app_context():
        # 显示表结构
        print("🗂️  表结构:")
        print("   users 表:")
        print("     - id: INTEGER PRIMARY KEY")
        print("     - username: VARCHAR(80) UNIQUE NOT NULL")
        print("     - password_hash: VARCHAR(120) NOT NULL")
        print("     - created_at: DATETIME")
        
        # 显示用户数据
        users = User.query.all()
        print(f"\n👥 用户数据 (共 {len(users)} 个用户):")
        for user in users:
            created_at = user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else '未知'
            print(f"   ID: {user.id}, 用户名: {user.username}, 注册时间: {created_at}")

def reset_database():
    """重置数据库"""
    print("⚠️  正在重置数据库...")
    
    with app.app_context():
        # 删除所有表
        db.drop_all()
        print("🗑️  已删除所有表")
        
        # 重新创建表
        db.create_all()
        print("✅ 已重新创建所有表")
        
        print("🎉 数据库重置完成！")

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'init':
            init_database()
        elif command == 'info':
            show_database_info()
        elif command == 'reset':
            reset_database()
        else:
            print("❌ 未知命令")
            print("可用命令:")
            print("  python init_db.py init   - 初始化数据库")
            print("  python init_db.py info   - 显示数据库信息")
            print("  python init_db.py reset  - 重置数据库")
    else:
        # 默认执行初始化
        init_database()
        show_database_info()
