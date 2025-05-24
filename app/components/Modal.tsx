'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const overlayClass = `
        fixed inset-0 z-[100] bg-black/20 backdrop-blur-xs 
        flex justify-center items-center
    `;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={handleOverlayClick}
                    className={overlayClass}
                    role="dialog"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="relative bg-white p-6 rounded-xl shadow-2xl w-[80%] lg:w-[50%]"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="absolute top-4 right-4">
                            <Icon icon="x" size={30} onClick={onClose} />
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;