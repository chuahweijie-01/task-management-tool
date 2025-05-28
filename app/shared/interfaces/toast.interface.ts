export type ToastProps = {
    id?: number,
    type: 'success' | 'error' | 'info' | 'warning',
    description: string,
    onClose?: () => void
}