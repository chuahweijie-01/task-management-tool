'use client'

import React from 'react'
import LoginForm from './components/LoginForm'
import { redirect } from 'next/navigation'

const LoginPage = () => {

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    redirect('/task');
  }
  const handleSignUp = () => {
    redirect('/signup');
  }
  const handleForgotPassword = () => {
    // Handle forgot password logic here
  }

  return (
    <>
      <LoginForm handleLogin={handleLogin} handleForgotPassword={handleForgotPassword} />
      <div className='flex flex-col gap-4 pt-5'>
        <span className='text-sm text-gray-500'>Don&#39;t have an account? <span className='text-black cursor-pointer hover:underline' onClick={handleSignUp}>Sign Up</span></span>
      </div>
    </>
  )
}

export default LoginPage