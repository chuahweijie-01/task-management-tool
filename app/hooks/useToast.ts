'use client'

import { useContext } from "react"
import { ToastContext } from "../contexts/ToastContext"
import { ToastProps } from "../interfaces/toast.interface"

type ToastContextType = {
    showToast: (options: ToastProps) => void
}


export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    return context!
}