import toast from 'react-hot-toast';

const defaultToastStyle = {
  background: 'var(--white)',
  color: 'var(--text-primary)',
  fontFamily: 'Inter, sans-serif',
  borderRadius: '25px',
};

export const showToast = {
  success: (message: string, icon = '✓') => {
    toast.success(message, {
      duration: 2000,
      position: 'bottom-center',
      style: defaultToastStyle,
      icon,
    });
  },

  error: (message: string, icon = '✕') => {
    toast.error(message, {
      duration: 2000,
      position: 'bottom-center',
      style: defaultToastStyle,
      icon,
    });
  },

  info: (message: string, icon = 'ℹ') => {
    toast(message, {
      duration: 2000,
      position: 'bottom-center',
      style: defaultToastStyle,
      icon,
    });
  },

  custom: (message: string, options?: any) => {
    toast(message, {
      duration: 2000,
      position: 'bottom-center',
      style: defaultToastStyle,
      ...options,
    });
  },
};
