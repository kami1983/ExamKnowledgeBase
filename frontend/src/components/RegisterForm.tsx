'use client'

import { useState } from 'react'

interface RegisterFormProps { }

export default function RegisterForm({ }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    pincode: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // 验证密码确认
    if (formData.password !== formData.confirmPassword) {
      setMessage('两次输入的密码不一致')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:6001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          pincode: formData.pincode
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('注册成功！请登录')
        // 清空表单
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          pincode: ''
        })
      } else {
        setMessage(data.error || '注册失败')
      }
    } catch (error) {
      setMessage('网络错误，请检查后端服务是否启动')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="username" className="sr-only">
            用户名
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base min-h-[48px]"
            placeholder="用户名"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pincode" className="sr-only">
            PIN码
          </label>
          <input
            id="pincode"
            name="pincode"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base min-h-[48px]"
            placeholder="管理员PIN码"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            密码
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base min-h-[48px]"
            placeholder="密码"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            确认密码
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base min-h-[48px]"
            placeholder="确认密码"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      {message && (
        <div className={`text-sm ${message.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '注册中...' : '注册'}
        </button>
      </div>
    </form>
  )
}
