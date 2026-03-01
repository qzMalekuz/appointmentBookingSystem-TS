import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Layout = () => {
    const { logout, role } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = role === 'USER'
        ? [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'My Appointments', path: '/appointments' },
        ]
        : [
            { name: 'Dashboard', path: '/provider/dashboard' },
            { name: 'Daily Schedule', path: '/provider/schedule' },
        ];

    const rootPath = role === 'USER' ? '/dashboard' : '/provider/dashboard';

    return (
        <div className="min-h-screen flex flex-col bg-background text-text-main transition-colors duration-0">
            <nav className="bg-surface border-b border-border-subtle sticky top-0 z-10 transition-colors duration-0">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to={rootPath} className="flex items-center gap-2 text-text-main font-semibold text-lg hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-surface" />
                        </div>
                        AppointmentLelo.io
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-border-subtle"></div>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <Button variant="danger" onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-5xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
