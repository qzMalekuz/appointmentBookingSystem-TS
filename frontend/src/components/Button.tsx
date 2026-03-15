import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "px-4 py-2 font-medium rounded-xl transition-colors duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-neutral-900 text-white hover:bg-neutral-800 border border-transparent dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 shadow-sm",
        secondary: "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700 shadow-sm",
        danger: "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700 shadow-sm",
    };

    const width = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${width} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
