import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
    user: authService.getCurrentUser(),
    isLoading: false,
    error: null,

    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            const user = await authService.login(username, password);
            set({ user, isLoading: false });
            return user;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        await authService.logout();
        set({ user: null, isLoading: false });
    },

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const user = await authService.register(userData);
            // Auto login after register? Or just return user.
            // Let's just return user and let component decide.
            set({ isLoading: false });
            return user;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
