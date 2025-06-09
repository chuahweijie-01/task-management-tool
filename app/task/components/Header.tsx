'use client'

import { useAuth } from '@/app/hooks/useAuth'
import React from 'react'

const Header = () => {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    logout();
  }

  return (
    <header className='flex justify-end items-center pt-5 pb-1 px-7'>
      <div className='flex gap-4'>
        <span
          onClick={handleSignOut}
          className='font-bold cursor-pointer text-gray-500 hover:text-black'>Sign Out</span>
      </div>
    </header>
  )
}

export default Header