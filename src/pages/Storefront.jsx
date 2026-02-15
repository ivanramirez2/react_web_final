import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { toast } from 'react-toastify';

const Storefront = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    const addToCart = (product) => {
        toast.success(`¡${product.title} añadido al carrito!`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts(30); // More products for the store
                setProducts(data.products);
            } catch (err) {
                toast.error('Error al cargar la tienda');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
        </div>
    );

    return (
        <div className="space-y-12">
            <header className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
                    Descubre nuestra <span className="text-gradient">Colección Exclusiva</span>
                </h1>
                <p className="text-slate-400 text-lg">
                    Productos seleccionados con la mejor calidad y tecnología para potenciar tu día a día.
                </p>
            </header>

            {/* Categorías (Glass Pill) */}
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-4 no-scrollbar">
                {['all', 'smartphones', 'laptops', 'fragrances', 'skincare', 'groceries'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-brand-500 font-bold'
                            : 'glass-dark text-slate-400 hover:text-brand-400 border-white/5'
                            } border`}
                    >
                        {cat === 'all' ? 'Todos' : cat}
                    </button>
                ))}
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <div key={product.id} className="glass-dark rounded-[2.5rem] overflow-hidden premium-shadow border border-white/5 flex flex-col group hover:border-brand-500/30 transition-all">
                        <div className="relative h-64 bg-slate-900/50 overflow-hidden">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="bg-brand-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase shadow-lg">
                                    -{Math.round(product.discountPercentage)}%
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                            <div className="mb-4">
                                <span className="text-brand-500 text-[10px] font-black uppercase tracking-widest">{product.category}</span>
                                <h3 className="text-xl font-bold text-white mt-1 line-clamp-1">{product.title}</h3>
                            </div>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">{product.description}</p>

                            <div className="mt-auto flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-black text-white">${product.price}</span>
                                    <span className="text-slate-600 text-xs line-through ml-2">
                                        ${Math.round(product.price * (1 + product.discountPercentage / 100))}
                                    </span>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="p-4 bg-brand-600 text-white rounded-2xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/10 active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Storefront;
