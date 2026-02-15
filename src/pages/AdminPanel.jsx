import { useAuthStore } from '../store/useAuthStore';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

const AdminPanel = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.get('/users?limit=5');
        setUsers(data.users);
      } catch (err) {
        console.error('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-5xl font-black text-white tracking-tight">Centro de <span className="text-gradient">Control Admin</span></h1>
        <p className="text-slate-400 mt-4 text-lg font-medium">Supervisión del sistema, logs y gestión de usuarios globales.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Gestión de Usuarios */}
        <section className="glass-dark p-10 rounded-[2.5rem] premium-shadow border border-white/5">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-white flex items-center">
              <span className="bg-brand-500/10 text-brand-500 p-3 rounded-2xl mr-4 border border-brand-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              Usuarios del Sistema
            </h2>
            <button className="text-brand-500 font-bold text-sm hover:underline">Ver Todos</button>
          </div>

          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Usuario</th>
                  <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Rol</th>
                  <th className="pb-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {loading ? (
                  <tr><td colSpan="3" className="py-10 text-center text-slate-500 font-bold">Cargando usuarios...</td></tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-xl mr-4 bg-slate-800 object-cover premium-shadow group-hover:scale-110 transition-transform border border-white/10" src={u.image} alt="" />
                          <div>
                            <div className="text-sm font-black text-white">{u.firstName} {u.lastName}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase">{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">{u.role || 'Usuario'}</span>
                      </td>
                      <td className="py-5 text-right">
                        <span className="inline-flex h-2 w-2 rounded-full bg-green-500 mr-2 shadow-lg shadow-green-500/50"></span>
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Activo</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Configuración / Logs */}
        <div className="space-y-10">
          <section className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] text-white premium-shadow border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[50px] rounded-full"></div>
            <h2 className="text-2xl font-black mb-8 relative z-10">Infraestructura</h2>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-brand-500 text-xs font-black uppercase tracking-widest">Bases de Datos</h3>
                  <p className="font-bold text-lg mt-1">Sincronización OK</p>
                </div>
                <div className="p-3 bg-brand-500/20 rounded-xl text-brand-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-rose-500 text-xs font-black uppercase tracking-widest">Uso de CPU</h3>
                  <p className="font-bold text-lg mt-1">12.4% Promedio</p>
                </div>
                <div className="p-3 bg-rose-500/20 rounded-xl text-rose-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 0 00-2-2H5a2 0 00-2 2v6a2 0 002 2h2a2 0 002-2m0 0V5a2 2 0 012-2h2a2 0 012 2v14" /></svg>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-dark p-10 rounded-[2.5rem] premium-shadow border border-white/5">
            <h2 className="text-2xl font-black text-white mb-6 font-sans tracking-tight">Ajustes Rápidos</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 text-left hover:border-brand-500 transition-all group">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 premium-shadow border border-white/10 group-hover:text-brand-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <span className="text-xs font-black text-slate-400 uppercase group-hover:text-white">Sistema</span>
              </button>
              <button className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 text-left hover:border-brand-500 transition-all group">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 premium-shadow border border-white/10 group-hover:text-brand-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <span className="text-xs font-black text-slate-400 uppercase group-hover:text-white">Alertas</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
