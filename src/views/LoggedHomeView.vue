<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import ProviderLoggedHomeView from '@/views/logged-home/ProviderLoggedHomeView.vue'
import UsuarioLoggedHomeView from '@/views/logged-home/UsuarioLoggedHomeView.vue'

const authStore = useAuthStore()

const LoggedHome = computed(() =>
    authStore.isPrestador
        ? ProviderLoggedHomeView
        : UsuarioLoggedHomeView
)
</script>

<template>
    <div class="home-page">
        <component :is="LoggedHome" />
    </div>
</template>

<style scoped>
.home-page {
    background-color: var(--color-neutral-light-white);
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
}
</style>