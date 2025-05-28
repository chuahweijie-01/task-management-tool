'use client'

import React from 'react'
import LoginForm from './components/LoginForm'
import { redirect } from 'next/navigation'
import { LoginUserDto } from './dto/login-user.dto'
import { login } from '../api/auth';
import { useToast } from '@/app/hooks/useToast'


const LoginPage = () => {
  const { showToast } = useToast();

  const handleLogin = async (userLoginInfo: LoginUserDto) => {
    try {
      const data = await login(userLoginInfo);
      if (!data) return;
      showToast({ type: 'success', description: 'Login successfully.' });
      localStorage.setItem('token', data.token);
      window.location.href = '/task';
    } catch (error) {
      console.error('Error:', error);
      showToast({ type: 'error', description: 'Login failed.' });
    }
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