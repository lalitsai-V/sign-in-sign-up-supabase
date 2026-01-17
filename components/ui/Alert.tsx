import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'error' | 'success' | 'info' | 'warning';
  title?: string;
  description?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type, title, description, className = '', children, ...props }, ref) => {
    const typeStyles = {
      error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      success:
        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      warning:
        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    };

    const iconStyles = {
      error: '❌',
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`rounded-lg border-l-4 p-4 ${typeStyles[type]} ${className}`}
        {...props}
      >
        <div className="flex gap-3">
          <span className="text-lg mt-0.5" aria-hidden="true">
            {iconStyles[type]}
          </span>
          <div className="flex-1">
            {title && <h3 className="font-semibold">{title}</h3>}
            {description && <p className="text-sm mt-1">{description}</p>}
            {children && <div className="mt-2">{children}</div>}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
