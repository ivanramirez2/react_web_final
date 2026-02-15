import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'smartphones',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                price: product.price || '',
                description: product.description || '',
                category: product.category || 'smartphones',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price) {
            toast.error('Título y Precio son obligatorios');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
            <div className="glass-dark rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
                <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-white">
                        {product ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <button onClick={onCancel} className="text-slate-500 hover:text-rose-500 transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Título del Producto</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Ej. iPhone 15 Pro"
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-white placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Precio ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="999"
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-white placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Categoría</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-white appearance-none"
                        >
                            <option className="bg-slate-900" value="smartphones">Smartphones</option>
                            <option className="bg-slate-900" value="laptops">Laptops</option>
                            <option className="bg-slate-900" value="fragrances">Fragrances</option>
                            <option className="bg-slate-900" value="skincare">Skincare</option>
                            <option className="bg-slate-900" value="groceries">Groceries</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-white placeholder:text-slate-600"
                        ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-4 border border-white/10 text-slate-400 font-bold rounded-2xl hover:bg-white/5 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-4 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/20 active:scale-95"
                        >
                            {product ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
