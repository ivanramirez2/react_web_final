const BASE_URL = 'https://dummyjson.com';

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
        return response.json();
    },
    post: async (endpoint, body) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`Error posting to ${endpoint}`);
        return response.json();
    },
    // Add other methods as needed
};
