import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'app_users';
const CURRENT_USER_KEY = 'app_current_user';

// Initialize default users if not present
const initializeUsers = () => {
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers) {
        const defaultUsers = [
            { id: uuidv4(), username: 'admin', password: 'password', role: 'admin', name: 'Admin User' },
            { id: uuidv4(), username: 'user', password: 'password', role: 'user', name: 'Regular User' },
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
};

initializeUsers();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
    login: async (username, password) => {
        await delay(500); // Simulate network delay
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Don't return password
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        }
        throw new Error('Invalid credentials');
    },

    logout: async () => {
        await delay(200);
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    register: async (userData) => {
        await delay(500);
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

        if (users.find(u => u.username === userData.username)) {
            throw new Error('Username already exists');
        }

        const newUser = {
            id: uuidv4(),
            ...userData,
            role: 'user', // Default role
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
};
