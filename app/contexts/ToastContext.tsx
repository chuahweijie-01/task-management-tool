'use client'

import { createContext, useState } from "react";
import { ToastProps } from "../interfaces/toast.interface";
import Toast from "../components/Toast";
import { PropsWithChildren } from "react";
import { AnimatePresence } from "framer-motion";

type ToastContextType = {
    showToast: (options: ToastProps) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const showToast = (options: ToastProps) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { ...options, id }]);
    }

    const hideToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4.5 w-full max-w-sm flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onClose={() => hideToast(toast.id!)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}