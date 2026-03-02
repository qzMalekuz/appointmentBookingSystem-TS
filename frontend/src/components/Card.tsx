import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-bg-card border border-border rounded-xl shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-border bg-bg-primary/50 ${className}`}>
        {children}
    </div>
);

export const CardBody: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-t border-border bg-bg-primary/50 ${className}`}>
        {children}
    </div>
);
