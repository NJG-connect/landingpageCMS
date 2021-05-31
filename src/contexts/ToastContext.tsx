import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { ToastContextType, ToastType } from '../types/ToastContext';

const initialToast = {
  message: '',
  visible: false,
};

const initialToastContext = {
  toast: {},
  show: (): void => {
    throw new Error('setContext function must be overridden');
  },
  hide: (): void => {
    throw new Error('setContext function must be overridden');
  },
};

export const ToastContext = createContext<ToastContextType>(
  initialToastContext,
);

interface ToastProviderProps {
  children: React.ReactNodeArray;
}
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastType>(initialToast);
  const timeout: any = useRef();

  const show = useCallback(args => {
    setToast({ ...initialToast, visible: true, ...args });
  }, []);

  const hide = useCallback(() => {
    setToast({ ...toast, visible: false });
  }, [toast]);

  useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, 1500);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}>
      {children}
    </ToastContext.Provider>
  );
};
