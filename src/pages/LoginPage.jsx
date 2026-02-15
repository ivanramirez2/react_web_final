import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [username, setUsername] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(username, password);
            toast.success('¡Bienvenido de nuevo!');
            navigate('/');
        } catch (err) {
            toast.error('Credenciales incorrectas. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickLogin = (u, p) => {
        setUsername(u);
        setPassword(p);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Decorations */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-brand-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-rose-500/10 blur-[120px] rounded-full animate-pulse"></div>

            <div className="relative w-full max-w-[500px] px-6">
                <div className="glass-dark p-8 sm:p-12 rounded-[2.5rem] premium-shadow border border-white/5">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-500/10 rounded-2xl mb-6 border border-brand-500/20">
                            <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003 20c0 .553.447 1 1 1h16c.553 0 1-.447 1-1 0-3.173-1.474-6.003-3.745-7.868M12 11V7a4 4 0 118 0v4M12 11h8" /></svg>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Admin<span className="text-brand-500 italic">Pro.</span>
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Gestiona tu ecosistema digital con elegancia.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-800/30 border border-slate-700/50 text-white px-5 py-4 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Nombre de usuario"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/30 border border-slate-700/50 text-white px-5 py-4 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-4 rounded-2xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        >
                            {isLoading ? 'Autenticando...' : 'Entrar al Sistema'}
                        </button>

                        <div className="pt-6 border-t border-slate-800/50">
                            <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Acceso Rápido (Click para rellenar)</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleQuickLogin('emilys', 'emilyspass')}
                                    className="flex flex-col items-center p-4 bg-slate-800/20 border border-slate-700/50 rounded-2xl hover:bg-brand-500/10 hover:border-brand-500/50 transition-all group"
                                >
                                    <span className="text-xs font-bold text-white mb-1 group-hover:text-brand-400">Admin</span>
                                    <span className="text-[10px] text-slate-500">Emily S.</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickLogin('michaelw', 'michaelwpass')}
                                    className="flex flex-col items-center p-4 bg-slate-800/20 border border-slate-700/50 rounded-2xl hover:bg-rose-500/10 hover:border-rose-500/50 transition-all group"
                                >
                                    <span className="text-xs font-bold text-white mb-1 group-hover:text-rose-400">Cliente</span>
                                    <span className="text-[10px] text-slate-500">Michael W.</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
