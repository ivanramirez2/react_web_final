import { useAuthStore } from '../store/useAuthStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Layout = ({ children }) => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Tienda', path: '/tienda' },
    ];

    if (user?.role === 'admin') {
        navItems.push({ name: 'Gestión', path: '/productos' });
        navItems.push({ name: 'Panel Admin', path: '/admin' });
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar con Glassmorphism */}
            <nav className="glass-dark sticky top-0 z-50 border-b border-white/5">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <span className="text-2xl font-black text-brand-500 tracking-tighter">
                                Admin<span className="text-white italic">Pro.</span>
                            </span>
                            <div className="hidden md:ml-10 md:flex md:space-x-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                                                : 'text-slate-400 hover:text-brand-400 hover:bg-white/5'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-bold text-white leading-none mb-1">
                                    {user?.firstName} {user?.lastName}
                                </span>
                                <span className="text-[10px] font-black text-slate-900 bg-brand-500 px-2 py-0.5 rounded-md uppercase tracking-widest">
                                    {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
                                </span>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-10 w-10 rounded-2xl bg-slate-800 object-cover premium-shadow border-2 border-white/5 ring-1 ring-white/10"
                                    src={user?.image || 'https://via.placeholder.com/40'}
                                    alt="Profile"
                                />
                                <div className="absolute top-0 right-0 h-3 w-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="hidden md:flex p-2 text-slate-500 hover:text-rose-500 transition-colors"
                                title="Cerrar sesión"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>

                            {/* Botón menú móvil */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 text-slate-400"
                                >
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isMobileMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                {isMobileMenuOpen && (
                    <div className="md:hidden glass-dark px-4 pt-4 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-300 border-b border-white/5">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-2xl text-base font-bold transition-all ${isActive ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/20' : 'text-slate-400 hover:bg-white/5'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 rounded-2xl text-base font-bold text-rose-500 hover:bg-rose-500/10 transition-all border border-rose-500/20 mt-4"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </nav>

            <main className="flex-1 max-w-[1920px] w-full mx-auto p-4 sm:p-8 lg:p-12">
                {children}
            </main>

            <footer className="py-12 text-center border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-500">
                    © 2026 <span className="text-brand-500 font-bold">AdminPro</span> Ecosystem. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
};

export default Layout;
