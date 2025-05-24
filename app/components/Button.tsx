import { motion } from 'framer-motion'
import React from 'react'

type ButtonProps = {
    label: string
    onClick?: () => void
    disabled?: boolean
    className?: string
    type?: 'button' | 'submit'
    padding?: string
    scale?: number
}

const Button = ({
    label,
    disabled,
    className,
    type = 'button',
    padding = 'px-6 py-2',
    scale = 1.1,
    onClick }: ButtonProps) => {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: disabled ? 1 : scale }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-xl ${!disabled && 'cursor-pointer'} ${padding} ${className}`}>
            {label}
        </motion.button>
    )
}

export default Button