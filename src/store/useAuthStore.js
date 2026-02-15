import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
    user: authService.getCurrentUser(),
    isAuthenticated: !!authService.getCurrentUser(),
    login: async (username, password) => {
        try {
            const user = await authService.login(username, password);
            set({ user, isAuthenticated: true });
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
    },
}));
