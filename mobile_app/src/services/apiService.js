// React Native service placeholder using same API logic
const BASE_URL = 'https://dummyjson.com';

export const mobileApiService = {
    getProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`);
        return response.json();
    }
};
