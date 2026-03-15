import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-out ${className}`}>
        {children}
    </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-900/35 transition-colors duration-300 ${className}`}>
        {children}
    </div>
);

export const CardBody: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-900/35 transition-colors duration-300 ${className}`}>
        {children}
    </div>
);
