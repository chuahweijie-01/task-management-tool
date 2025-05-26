'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react'
import { IInfo } from './interfaces/info.interface';
import { loginInfo, signupInfo } from './constants/info';
import loginIllustration from '@/public/images/login-illustration.png'
import signUpIllustration from '@/public/images/signup-illustration.png'
import Image from 'next/image';

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    const headerInfo: IInfo = isLoginPage ? loginInfo : signupInfo

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='flex flex-col lg:flex-row items-center lg:justify-center align-middle'>
                <div className='flex flex-col mb-6 flex-1/2 gap-4 p-10 lg:pl-50'>
                    <div className='flex flex-col gap-3 pb-2'>
                        <span className='font-bold text-2xl lg:text-4xl'>{headerInfo.header}</span>
                        <span className='text-gray-500 text-xs lg:text-base'>{headerInfo.description}</span>
                    </div>
                    {children}
                </div>
                <div className='flex-1/2 px-10 lg:p-30'>
                    <Image src={isLoginPage ? loginIllustration : signUpIllustration} alt={''} />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default AuthLayout