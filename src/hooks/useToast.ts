import { useState } from 'react';

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((current) => [...current, props]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t !== props));
    }, 3000);
  };

  return { toast, toasts };
};