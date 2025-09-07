'use client'

import { useState } from 'react'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? '登录' : '注册'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? '欢迎回来' : '创建新账户'}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {isLogin ? '没有账户？点击注册' : '已有账户？点击登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}