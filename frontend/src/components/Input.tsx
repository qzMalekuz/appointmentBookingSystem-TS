import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-main">
                {label}
            </label>
            <input
                className={`px-3 py-2 bg-surface text-text-main border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${error ? 'border-red-500' : 'border-border-subtle'
                    } ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
