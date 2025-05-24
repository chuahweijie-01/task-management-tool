import React from 'react'

type Props = {
    children: React.ReactNode;
};

const Body = ({ children }: Props) => {
    return (
        <>
            <body className='bg-gray-100 min-h-screen min-w-[380px]'>
                <main>
                    {children}
                </main>
            </body>
        </>
    )
}

export default Body