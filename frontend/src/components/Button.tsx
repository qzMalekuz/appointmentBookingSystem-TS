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
        primary: "bg-accent text-bg-primary hover:bg-accent-hover shadow-sm border border-transparent",
        secondary: "bg-bg-card text-text-primary border border-border hover:bg-bg-hover shadow-sm",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 shadow-sm",
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
