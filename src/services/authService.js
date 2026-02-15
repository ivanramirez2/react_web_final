const CURRENT_USER_KEY = 'app_current_user';
const TOKEN_KEY = 'app_auth_token';

export const authService = {
    login: async (username, password) => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();

        // Simular roles ya que DummyJSON no los provee por defecto
        // Asignamos 'admin' a emilys y 'user' al resto
        data.role = data.username === 'emilys' ? 'admin' : 'user';

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data));
        localStorage.setItem(TOKEN_KEY, data.token);

        return data;
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        if (!userStr) return null;
        const user = JSON.parse(userStr);
        // Asegurar que tenga rol incluso si es una sesión antigua
        if (!user.role) {
            user.role = user.username === 'emilys' ? 'admin' : 'user';
        }
        return user;
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    }
};
