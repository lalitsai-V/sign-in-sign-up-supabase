import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-gray-200 dark:border-gray-700 
          bg-white dark:bg-gray-800 shadow-md hover:shadow-lg
          transition-shadow duration-200 ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`border-b border-gray-200 dark:border-gray-700 px-6 py-4 ${className}`}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return <div ref={ref} className={`px-6 py-4 ${className}`} {...props} />;
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`border-t border-gray-200 dark:border-gray-700 px-6 py-4 ${className}`}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';
