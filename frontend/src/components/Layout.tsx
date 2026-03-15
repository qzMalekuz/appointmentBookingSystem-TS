import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { BrandWordmark } from './Brand';

const Layout = () => {
    const { logout, role } = useAuth();
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
        <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
            <nav className="bg-bg-secondary border-b border-border sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to={rootPath} className="flex items-center gap-2 text-text-primary font-semibold text-lg hover:opacity-80 transition-opacity">
                        <BrandWordmark textClassName="text-lg" markClassName="h-8 w-8 rounded-lg" />
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-border" />

                        <ThemeToggle />

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
