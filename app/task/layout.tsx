import React from 'react'
import Header from './components/Header'

const TaskLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default TaskLayout