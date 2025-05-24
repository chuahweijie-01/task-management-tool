'use client'

import React from 'react'
import SignupForm from './components/SignupForm'
import { redirect } from 'next/navigation'

const SignupPage = () => {

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    redirect('/login');
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