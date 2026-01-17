import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-colors duration-200
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}`}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-600 dark:text-red-400 font-medium" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
