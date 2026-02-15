import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { user } = useAuthStore();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts(8);
            setProducts(data.products);
        } catch (err) {
            setError('Error al cargar productos');
            toast.error('Error al conectar con la API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = async (formData) => {
        try {
            const result = await productService.addProduct(formData);
            setProducts([result, ...products]);
            setIsModalOpen(false);
            toast.success('Producto creado con éxito (Simulado)');
        } catch (err) {
            toast.error('Error al crear producto');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const result = await productService.updateProduct(editingProduct.id, formData);
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...result } : p));
            setEditingProduct(null);
            toast.success('Producto actualizado con éxito (Simulado)');
        } catch (err) {
            toast.error('Error al actualizar');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            toast.success('Producto eliminado');
        } catch (err) {
            toast.error('Error al eliminar');
        }
    };

    if (loading && products.length === 0) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        </div>
    );
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">Gestión de <span className="text-gradient">Inventario</span></h1>
                    <p className="text-slate-500 mt-2 font-medium">Control total sobre el catálogo de productos y existencias.</p>
                </div>
                {user?.role === 'admin' && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10"
                    >
                        <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                        <span className="font-bold">Nuevo Producto</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="glass-dark rounded-[2.5rem] overflow-hidden premium-shadow border border-white/5 flex flex-col group hover:border-brand-500/30 transition-all">
                        <div className="relative h-56 bg-slate-900/50 overflow-hidden">
                            <img
                                src={product.thumbnail || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-white/10 shadow-sm">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-black text-white leading-tight line-clamp-2">{product.title}</h3>
                                <span className="text-brand-500 font-black text-xl ml-2">
                                    ${product.price}
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">{product.description}</p>

                            <div className="mt-auto flex gap-3">
                                <button className="flex-1 bg-white/5 text-slate-400 font-bold py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all text-sm border border-white/5">
                                    Detalles
                                </button>
                                {user?.role === 'admin' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingProduct(product)}
                                            className="p-3 bg-brand-500/10 text-brand-500 rounded-xl hover:bg-brand-600 hover:text-white transition-all border border-brand-500/20 shadow-sm"
                                            title="Editar"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-500/20 shadow-sm"
                                            title="Eliminar"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {(isModalOpen || editingProduct) && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleUpdate : handleCreate}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </div>
    );
};

export default ProductList;
