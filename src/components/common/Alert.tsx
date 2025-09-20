import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string | React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  showIcon?: boolean;
  action?: React.ReactNode;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50',
    title: 'text-blue-800',
    message: 'text-blue-700',
    icon: (
      <svg
        className="h-5 w-5 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  success: {
    container: 'bg-green-50',
    title: 'text-green-800',
    message: 'text-green-700',
    icon: (
      <svg
        className="h-5 w-5 text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  warning: {
    container: 'bg-yellow-50',
    title: 'text-yellow-800',
    message: 'text-yellow-700',
    icon: (
      <svg
        className="h-5 w-5 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    container: 'bg-red-50',
    title: 'text-red-800',
    message: 'text-red-700',
    icon: (
      <svg
        className="h-5 w-5 text-red-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  neutral: {
    container: 'bg-gray-50',
    title: 'text-gray-800',
    message: 'text-gray-700',
    icon: (
      <svg
        className="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export function Alert({
  variant = 'info',
  title,
  message,
  className = '',
  onClose,
  showCloseButton = true,
  showIcon = true,
  action,
}: AlertProps) {
  const style = variantStyles[variant];

  return (
    <div className={cn('rounded-md p-4', style.container, className)}>
      <div className="flex">
        {showIcon && <div className="flex-shrink-0">{style.icon}</div>}
        <div className={cn(showIcon ? 'ml-3' : '')}>
          {title && (
            <h3 className={cn('text-sm font-medium', style.title)}>{title}</h3>
          )}
          <div className={cn(title ? 'mt-2' : '', 'text-sm', style.message)}>
            {message}
          </div>
          {action && <div className="mt-4">{action}</div>}
        </div>
        {showCloseButton && onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  variant === 'info' && 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600',
                  variant === 'success' && 'text-green-500 hover:bg-green-100 focus:ring-green-600',
                  variant === 'warning' && 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600',
                  variant === 'error' && 'text-red-500 hover:bg-red-100 focus:ring-red-600',
                  variant === 'neutral' && 'text-gray-500 hover:bg-gray-100 focus:ring-gray-600'
                )}
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Example usage:
/*
<Alert 
  variant="success"
  title="Order placed successfully!"
  message="Your order #12345 has been placed and is being processed."
  onClose={() => console.log('Alert closed')}
  className="mb-4"
/>
*/
