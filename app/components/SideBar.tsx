'use client';

import React from 'react'

const SideBar = () => {
    return (
        <div className='h-full rounded-2xl p-10 bg-white'>
            <div className='flex justify-center'>
                <div>Image</div>
                <div>Name</div>
            </div>
            <div>
                <ul>
                    <li>
                        All tasks
                    </li>
                    <li>
                        Top Priority
                    </li>
                    <li>
                        Completed
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar