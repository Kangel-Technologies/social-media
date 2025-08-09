import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        // Login and store token
        async login(form) {
            try {
                const res = await api.post('/auth/login', form);
                this.token = res.data.token;
                localStorage.setItem('token', this.token);
                await this.getUser();
            } catch (err) {
                throw err.response?.data || err;
            }
        },

        // Register new user
        async register(form) {
            try {
                await api.post('/auth/register', form);
            } catch (err) {
                throw err.response?.data || err;
            }
        },

        // Get authenticated user
        async getUser() {
            try {
                const res = await api.get('/auth/me', {
                    headers: {Authorization: `Bearer ${this.token}`},
                });
                this.user = res.data;
            } catch (err) {
                this.token = null;
                localStorage.removeItem('token');
                throw err.respones?.data || err;
            }
        },

        // Logout user and clear token
        async logout() {
            try {
                await api.post('/auth/logout', {}, {
                    headers: {Authorization: `Bearer ${this.token}`},
                });
            } catch (err) {
                // Do nothing if server fails to log out
            }

            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        }
    },
});