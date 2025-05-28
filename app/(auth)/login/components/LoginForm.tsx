'use client'

import Button from '@/app/components/Button'
import InputField from '@/app/components/InputField'
import React, { useState } from 'react'
import { LoginUserDto } from '../dto/login-user.dto'

type Props = {
  handleLogin: (loginUser: LoginUserDto) => void
  handleForgotPassword: () => void
}

const LoginForm = ({ handleLogin, handleForgotPassword }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email.trim()) newErrors.email = 'Email is required.'
    if (!password.trim()) newErrors.password = 'Password is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return;
    handleLogin({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 pb-8'>
        <InputField
          label='Email'
          type='email'
          value={email}
          placeholder='Email'
          error={errors.email}
          onChange={e => setEmail(e.target.value)}
        />
        <InputField
          label='Password'
          type='password'
          value={password}
          placeholder='Password'
          error={errors.password}
          onChange={e => setPassword(e.target.value)}
        />
        <span className='flex justify-end text-sm cursor-pointer hover:underline' onClick={handleForgotPassword}>
          Forgot Password?
        </span>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <Button
          type='submit'
          label='Login'
          className='bg-black text-white w-full'
          scale={1}
        />
      </div>
    </form>
  )
}

export default LoginForm