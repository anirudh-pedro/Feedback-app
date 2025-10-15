import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!EmailRegex.test(formData.email)) {
      toast.error('Invalid email format.')
      return;
    }
    
    if (!formData.password) {
      toast.error('Password is required.')
      return;
    }
    
    await authAPI.login(formData)
    setFormData({ email: '', password: '' })
    setShowPassword(false)
    setRememberMe(false)
    
    toast.success('Login successful!')
    console.log('Login data:', formData)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 p-4'>
      <div className='w-full max-w-sm'>
        <div className='bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6'>
          <div className='text-center mb-6'>
            <div className='w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
              </svg>
            </div>
            <h2 className='text-xl font-bold text-white mb-1'>Welcome Back</h2>
            <p className='text-gray-400 text-sm'>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter email'
                  required
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-300 mb-1'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300'
                >
                  {showPassword ? (
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                    </svg>
                  ) : (
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2'
                />
                <label htmlFor='remember-me' className='ml-2 text-gray-300'>
                  Remember me
                </label>
              </div>
              <a href='#' className='text-blue-400 hover:text-blue-300'>
                Forgot password?
              </a>
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
            >
              Sign In
            </button>

            <div className='text-center mt-4'>
              <p className='text-gray-400 text-sm'>
                Don't have an account?{' '}
                <a href='/register' className='text-blue-400 hover:text-blue-300 font-medium'>
                  Create Account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
