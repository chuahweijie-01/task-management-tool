'use client'

import React from 'react'
import SignupForm from './components/SignupForm'
import { redirect } from 'next/navigation'
import { CreateUserDto } from './dto/create-user.dto'
import { create } from '../api/auth';
import { useToast } from '@/app/hooks/useToast'

const SignupPage = () => {
  const { showToast } = useToast();

  const handleSignUp = async (createUser: CreateUserDto) => {
    try {
      const data = await create(createUser);
      if (!data) return;
      showToast({ type: 'success', description: 'Signup successfully.' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
      showToast({ type: 'error', description: 'Account creation failed.' });
    }
  }

  const handleLogin = () => {
    redirect('/login');
  }

  return (
    <>
      <SignupForm handleSignUp={handleSignUp} />
      <div className='flex flex-col gap-4 pt-5'>
        <span className='text-sm text-gray-500'>Already have an account? <span className='text-black cursor-pointer hover:underline' onClick={handleLogin}>Login</span></span>
      </div>
    </>
  )
}

export default SignupPage