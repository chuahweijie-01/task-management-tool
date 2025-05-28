import { ToastProps } from "../interfaces/toast.interface";

const requestHandler = async <T>(
    promise: Promise<T>,
    showToast: ({ }: ToastProps) => void,
    successMessage: string,
    errorMessage?: string): Promise<T | undefined> => {
    try {
        const data = await promise;
        showToast({ type: 'success', description: successMessage });
        return data;
    } catch (error) {
        console.error('Error:', error);
        showToast({ type: 'error', description: errorMessage ?? 'An error occurred. Please try again.' });
    }
}
export default requestHandler;