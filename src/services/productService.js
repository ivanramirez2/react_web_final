import { api } from './api';

export const productService = {
    getProducts: async (limit = 10, skip = 0) => {
        return api.get(`/products?limit=${limit}&skip=${skip}`);
    },
    getProductById: async (id) => {
        return api.get(`/products/${id}`);
    },
    addProduct: async (productData) => {
        return api.post('/products/add', productData);
    },
    updateProduct: async (id, productData) => {
        // Note: DummyJSON PUT/PATCH doesn't actually persist
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        return response.json();
    },
    deleteProduct: async (id) => {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
};
