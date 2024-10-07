import ToastEventBus from 'primevue/toasteventbus';

interface ToastOptions {
    severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined;
    summary: string;
    detail: string;
    life: number
}

export const useToastService = () => {
    
    const showToast = (options: ToastOptions) => {
        ToastEventBus.emit('add', options);
    };
    
    return { showToast }
}