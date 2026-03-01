import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [overlay, setOverlay] = useState<{ x: number; y: number; newTheme: Theme } | null>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (e: React.MouseEvent) => {
        if (overlay) return; // Prevent spam clicking

        const x = e.clientX;
        const y = e.clientY;
        const newTheme = theme === 'light' ? 'dark' : 'light';

        setOverlay({ x, y, newTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
            <AnimatePresence>
                {overlay && (
                    <motion.div
                        initial={{
                            clipPath: `circle(0px at ${overlay.x}px ${overlay.y}px)`,
                            opacity: 1
                        }}
                        animate={{
                            clipPath: `circle(150% at ${overlay.x}px ${overlay.y}px)`,
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3, ease: 'easeOut' }
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onAnimationComplete={() => {
                            setTheme(overlay.newTheme);
                            setOverlay(null);
                        }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: overlay.newTheme === 'dark' ? '#121212' : '#F5F5F5',
                            zIndex: 99999,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </AnimatePresence>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
