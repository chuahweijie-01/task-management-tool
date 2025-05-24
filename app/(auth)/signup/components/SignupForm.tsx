import Button from '@/app/components/Button'
import React from 'react'

type Props = {
    handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void
}

const SignupForm = ({ handleSignUp }: Props) => {
    return (
        <form onSubmit={handleSignUp} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 pb-8'>
                <div className='flex gap-2 flex-col'>
                    <label className='font-bold text-sm'>Your Name</label>
                    <input
                        type='textß'
                        placeholder='Hello, John Doe'
                        className='border rounded-lg p-2 border-gray-300 w-full'
                    />
                </div>
                <div className='flex gap-2 flex-col'>
                    <label className='font-bold text-sm'>Email</label>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        className='border rounded-lg p-2 border-gray-300 w-full'
                    />
                </div>
                <div className='flex gap-2'>
                    <div className='flex flex-1/2 gap-2 flex-col'>
                        <label className='font-bold text-sm'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='border rounded-lg p-2 border-gray-300 w-full'
                        />
                    </div>
                    <div className='flex flex-1/2 gap-2 flex-col'>
                        <label className='font-bold text-sm'>Confirm Password</label>
                        <input
                            type='password'
                            placeholder='Re-enter Password'
                            className='border rounded-lg p-2 border-gray-300 w-full'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <Button
                    type='submit'
                    label='Join Now'
                    className='bg-black text-white w-full'
                    scale={1}
                />
            </div>
        </form>
    )
}

export default SignupForm