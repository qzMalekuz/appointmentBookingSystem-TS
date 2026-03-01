import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

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
    const [animating, setAnimating] = useState(false);
    const circleRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (overlay && circleRef.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAnimating(true);

            // Force reflow
            void circleRef.current.offsetWidth;

            // Start Expanding
            requestAnimationFrame(() => {
                if (circleRef.current) {
                    circleRef.current.style.clipPath = `circle(150% at ${overlay.x}px ${overlay.y}px)`;
                }
            });

            // Wait for transition to end before unmounting overlay
            const timer = setTimeout(() => {
                setTheme(overlay.newTheme);
                // Slight delay to hide the circle gracefully
                setTimeout(() => {
                    setOverlay(null);
                    setAnimating(false);
                }, 50);
            }, 500); // Matches the CSS duration

            return () => clearTimeout(timer);
        }
    }, [overlay]);

    const toggleTheme = (e: React.MouseEvent) => {
        if (animating) return;

        const x = e.clientX;
        const y = e.clientY;
        const newTheme = theme === 'light' ? 'dark' : 'light';

        setOverlay({ x, y, newTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
            {overlay && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        ref={circleRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: overlay.newTheme === 'dark' ? '#121212' : '#F5F5F5',
                            clipPath: `circle(0px at ${overlay.x}px ${overlay.y}px)`,
                            transition: 'clip-path 500ms ease-in-out',
                        }}
                    />
                </div>
            )}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
