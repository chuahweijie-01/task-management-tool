import Button from '@/app/components/Button'
import React from 'react'

type Props = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
  handleForgotPassword: () => void
}

const LoginForm = ({ handleLogin, handleForgotPassword }: Props) => {
  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 pb-8'>
        <div className='flex gap-2 flex-col'>
          <label className='font-bold text-sm'>Email</label>
          <input
            type='email'
            placeholder='Username'
            className='border rounded-lg p-2 border-gray-300 w-full'
          />
        </div>
        <div className='flex gap-2 flex-col'>
          <label className='font-bold text-sm'>Password</label>
          <input
            type='password'
            placeholder='Password'
            className='border rounded-lg p-2 border-gray-300 w-full'
          />
          <div className='flex justify-end'>
            <span className='text-sm cursor-pointer hover:underline' onClick={handleForgotPassword}>
              Forgot Password?
            </span>
          </div>
        </div>
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