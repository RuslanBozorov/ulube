import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('admin_token') || null,
  isAuthenticated: !!localStorage.getItem('admin_token'),

  login: (token) => {
    localStorage.setItem('admin_token', token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    set({ token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
