import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, X, Info } from 'lucide-react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ 
  variant, 
  title, 
  message, 
  onClose,
  className = '' 
}) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      title: title || 'Success'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      title: title || 'Warning'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      title: title || 'Error'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-400" />,
      title: title || 'Information'
    }
  };

  const { bg, border, text, icon, title: defaultTitle } = variants[variant];

  return (
    <div className={`rounded-md border ${bg} ${border} p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${text}`}>{defaultTitle}</h3>
          <div className={`mt-2 text-sm ${text}`}>
            <p>{message}</p>
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 ${bg} ${text} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${variant}-50 focus:ring-${variant}-600`}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;