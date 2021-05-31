import { Dispatch, SetStateAction } from 'react';

export interface ToastType {
  message?: string;
  visible?: boolean;
  type?: 'sucess' | 'error' | 'info';
}

export interface ToastContextType {
  toast: ToastType;
  show: Dispatch<SetStateAction<ToastType>>;
  hide: () => void;
}
