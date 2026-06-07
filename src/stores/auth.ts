import { defineStore } from 'pinia'
import api from '@/services/api'

export interface AuthUser {
    uuid: string
    nome: string
    email: string
    is_prestador: boolean
}

interface AuthState {
    user: AuthUser | null
    initialized: boolean
    loading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        initialized: false,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
        isPrestador: (state) => !!state.user?.is_prestador,
    },

    actions: {
        async fetchMe() {
            this.loading = true

            try {
                const { data } = await api.get<AuthUser>('api/auth/me')
                this.user = data
            } catch {
                this.user = null
            } finally {
                this.loading = false
                this.initialized = true
            }
        },

        async ensureUserLoaded() {
            if (!this.initialized) {
                await this.fetchMe()
            }
        },

        async logout() {
            try {
                await api.get('/sanctum/csrf-cookie')
                await api.post('api/auth/logout')
            } finally {
                this.user = null
                this.initialized = true
            }
        },

        clearAuth() {
            this.user = null
            this.initialized = true
        },
    },
})