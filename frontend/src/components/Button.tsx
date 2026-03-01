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
    const baseStyles = "px-4 py-2 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-button-text hover:opacity-90 shadow-sm border border-transparent",
        secondary: "bg-surface text-text-main border border-border-subtle hover:bg-background shadow-sm",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 dark:border-red-500/20 shadow-sm"
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
