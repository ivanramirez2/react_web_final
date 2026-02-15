import { useAuthStore } from '../store/useAuthStore';

const Dashboard = () => {
    const { user } = useAuthStore();

    const stats = [
        { label: 'Sesiones Activas', value: '142', color: 'from-blue-500 to-indigo-600', trend: '+12%' },
        { label: 'Ingresos Totales', value: '$24,150', color: 'from-emerald-400 to-green-600', trend: '+8%' },
        { label: 'Pedidos Pendientes', value: '12', color: 'from-orange-400 to-rose-500', trend: '-2%' },
        { label: 'Reportes Nuevos', value: '5', color: 'from-purple-500 to-brand-600', trend: 'Nuevo' },
    ];

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                        Hola, <span className="text-gradient">{user?.firstName}</span> 👋
                    </h1>
                    <p className="mt-2 text-slate-500 font-medium">
                        Esto es lo que está pasando en tu plataforma hoy.
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Exportar Datos</button>
                    <button className="px-4 py-2 bg-brand-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all">Ver Más</button>
                </div>
            </header>

            {/* Grid de Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="glass-dark p-8 rounded-[2.5rem] premium-shadow border border-white/5 group transition-all duration-300 hover:scale-105">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/10`}>
                                <span className="text-xl font-bold">{stat.value[0]}</span>
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-green-500/20 text-green-400' : stat.trend === 'Nuevo' ? 'bg-blue-500/20 text-blue-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-dark p-10 rounded-[2.5rem] premium-shadow border border-white/5 h-80 flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center mb-6 border border-brand-500/20">
                        <svg className="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 0 00-2-2H5a2 0 00-2 2v6a2 0 002 2h2a2 0 002-2m0 0V9a2 0 012-2h2a2 0 012 2v10m-6 0a2 0 002 2h2a2 0 002-2m0 0V5a2 0 012-2h2a2 0 012 2v14" /></svg>
                    </div>
                    <h3 className="text-2xl font-black text-white">Analítica Avanzada</h3>
                    <p className="text-slate-400 mt-2 max-w-sm">Los gráficos de rendimiento están siendo procesados en tiempo real para tu cuenta.</p>
                </div>

                <div className={`${user?.role === 'admin' ? 'from-brand-600 to-indigo-800' : 'from-slate-800 to-slate-900'} bg-gradient-to-br p-10 rounded-[2.5rem] text-white shadow-2xl shadow-brand-500/30 flex flex-col justify-between border border-white/10`}>
                    <h3 className="text-2xl font-black opacity-90 leading-tight">
                        {user?.role === 'admin' ? 'Módulo de Administración' : 'Panel de Cliente'}
                    </h3>
                    <p className="text-brand-100 text-sm mt-4 opacity-80 leading-relaxed">
                        {user?.role === 'admin'
                            ? 'Tienes acceso total al control de inventario, gestión de usuarios y analíticas del sistema.'
                            : 'Desde aquí puedes gestionar tu cuenta, ver tus pedidos y explorar el catálogo de la tienda.'}
                    </p>
                    <div className="mt-10">
                        <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 py-4 rounded-2xl font-bold transition-all transform active:scale-[0.98]">
                            {user?.role === 'admin' ? 'Explorar Ajustes' : 'Mi Historial'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
