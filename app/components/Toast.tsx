import FeatherIcon, { FeatherIconName } from 'feather-icons-react'
import React, { useEffect } from 'react'
import { ToastProps } from '../interfaces/toast.interface';
import { motion } from 'framer-motion';

type ToastMap = {
    [key in ToastProps['type']]: {
        icon: FeatherIconName;
        textColor: string;
        borderStyle?: string;
    }
}

const toastMap: ToastMap = {
    success: {
        icon: 'check-circle',
        textColor: 'text-green-700',
        borderStyle: 'bg-green-100 border-green-600',
    },
    error: {
        icon: 'x-circle',
        textColor: 'text-red-700',
        borderStyle: 'bg-red-100 border-red-600',
    },
    info: {
        icon: 'info',
        textColor: 'text-blue-700',
        borderStyle: 'bg-blue-100 border-blue-600',
    },
    warning: {
        icon: 'alert-triangle',
        textColor: 'text-yellow-700',
        borderStyle: 'bg-yellow-100 border-yellow-600',
    },
}

const Toast = ({ type, description, onClose }: ToastProps) => {
    const { icon, textColor, borderStyle } = toastMap[type];

    useEffect(() => {
        const timer = setTimeout(() => { if (onClose) onClose(); }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-2 px-4 py-5 rounded-lg justify-between border-1 ${borderStyle} cursor-pointer shadow-lg`}>
            <div className='flex gap-2 items-center'>
                <FeatherIcon icon={icon} size={18} className={`${textColor}`} />
                <span className={textColor}>{description}</span>
            </div>
            <FeatherIcon
                icon='x'
                size={16}
                className={`cursor-pointer ${textColor}`}
                onClick={onClose}
            />
        </motion.div>
    )
}

export default Toast