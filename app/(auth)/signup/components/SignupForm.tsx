'use client'

import Button from '@/app/components/Button'
import InputField from '@/app/components/InputField'
import React, { useEffect, useState } from 'react'
import { IPasswordRules } from '../interfaces/password-rules.interface'
import PasswordRulesValidator from './PasswordRulesValidator'

type Props = {
    handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void
}

const SignupForm = ({ handleSignUp }: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; name?: string }>({})
    const [hasUserInteracted, setHasUserInteracted] = useState(false)
    const [passwordRules, setPasswordRules] = useState<IPasswordRules>({
        minLength: false,
        hasSpecialChar: false,
        hasAlphanumeric: false,
    })

    useEffect(() => {
        setPasswordRules({
            minLength: password.length >= 8,
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasAlphanumeric: /[a-zA-Z]/.test(password) && /\d/.test(password),
        })
    }, [password])

    const validate = (): boolean => {
        const newErrors: { email?: string; password?: string; confirmPassword?: string; name?: string } = {}
        if (!name.trim()) newErrors.name = 'Name is required.'
        if (!email.trim()) newErrors.email = 'Email is required.'
        if (!password.trim()) newErrors.password = 'Password is required.'
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!hasUserInteracted) setHasUserInteracted(true)
        if (!validate()) return
        handleSignUp(e)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (!hasUserInteracted) setHasUserInteracted(true)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 pb-2'>
                <InputField
                    label='Your Name'
                    type='text'
                    value={name}
                    placeholder='Hello, John Doe'
                    error={errors.name}
                    onChange={e => setName(e.target.value)}
                />
                <InputField
                    label='Email'
                    type='email'
                    value={email}
                    placeholder='Email'
                    error={errors.email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className='flex gap-2'>
                    <div className='flex-1/2'>
                        <InputField
                            label='Password'
                            type='password'
                            value={password}
                            placeholder='Password'
                            error={errors.password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className='flex-1/2'>
                        <InputField
                            label='Confirm Password'
                            type='password'
                            value={confirmPassword}
                            placeholder='Re-enter Password'
                            error={errors.confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <PasswordRulesValidator
                    hasUserInteracted={hasUserInteracted}
                    rules={passwordRules} />
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