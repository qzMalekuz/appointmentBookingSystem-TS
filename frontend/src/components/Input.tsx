import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {label}
            </label>
            <input
                className={`px-3 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border rounded-xl outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-colors duration-300 ${error ? 'border-neutral-400' : 'border-neutral-300 dark:border-neutral-600'
                    } ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-neutral-500">{error}</span>}
        </div>
    );
};

export default Input;
