'use client'

import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { redirect } from 'next/navigation'
import { LoginUserDto } from './dto/login-user.dto'
import { loginUser } from '../api/auth';
import { useToast } from '@/app/hooks/useToast'
import { useAuth } from '@/app/hooks/useAuth'


const LoginPage = () => {
  const { showToast } = useToast();
  const { token, login } = useAuth();

  useEffect(() => {
    if (token) redirect('/task');
  }, [token])

  const handleLogin = async (userLoginInfo: LoginUserDto) => {
    try {
      const data = await loginUser(userLoginInfo);
      if (!data) return;

      showToast({ type: 'success', description: 'Login successfully.' });
      login(data.token);
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