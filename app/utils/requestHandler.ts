import { ToastProps } from "../interfaces/toast.interface";

const requestHandler = async <T>(
    promise: Promise<T>,
    showToast: ({ }: ToastProps) => void,
    message: string): Promise<T | undefined> => {
    try {
        const data = await promise;
        showToast({ type: 'success', description: message });
        return data;
    } catch (error) {
        console.error('Error:', error);
        showToast({ type: 'error', description: 'An error occurred. Please try again.' });
    }
}
export default requestHandler;