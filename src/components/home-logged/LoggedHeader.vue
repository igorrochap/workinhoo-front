<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface NavItem {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{ navItems?: NavItem[] }>(),
  {
    navItems: () => [
      { label: 'Início', href: '#inicio' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Solicitações', href: '#solicitacoes' },
    ],
  },
)
import searchIcon from '@/assets/icons/search.svg'
import profileIcon from '@/assets/icons/profile.svg'
import menuIcon from '@/assets/icons/menu.svg'
import menuUserIcon from '@/assets/icons/menu-user.svg'
import menuCheckIcon from '@/assets/icons/menu-check.svg'
import menuToolsIcon from '@/assets/icons/menu-tools.svg'
import menuLogoutIcon from '@/assets/icons/menu-logout.svg'

const router = useRouter()
const authStore = useAuthStore()

const menuMobileAberto = ref(false)
const menuPerfilAberto = ref(false)
const termoBusca = ref('')

function toggleMenuMobile() {
  menuMobileAberto.value = !menuMobileAberto.value
  menuPerfilAberto.value = false
}

function fecharMenuMobile() {
  menuMobileAberto.value = false
}

function toggleMenuPerfil() {
  menuPerfilAberto.value = !menuPerfilAberto.value
  menuMobileAberto.value = false
}

function fecharTudo() {
  menuMobileAberto.value = false
  menuPerfilAberto.value = false
}

async function sair() {
  try {
    await authStore.logout()
  } finally {
    fecharTudo()
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <header class="logged-header">
    <div class="logged-header__container">
      <div class="logged-header__top">
        <div class="logged-header__brand-group">
          <button class="logged-header__hamburger" :class="{ 'logged-header__hamburger--ativo': menuMobileAberto }"
            type="button" aria-label="Abrir menu principal" @click="toggleMenuMobile">
            <span class="logged-header__hamburger-line"></span>
            <span class="logged-header__hamburger-line"></span>
            <span class="logged-header__hamburger-line"></span>
          </button>

          <RouterLink to="/inicio" class="logged-header__brand" @click="fecharTudo">
            <h1>Workinhoo</h1>
          </RouterLink>
        </div>

        <nav class="logged-header__nav">
          <a v-for="item in props.navItems" :key="item.href" :href="item.href">
            {{ item.label }}
          </a>
        </nav>

        <div class="logged-header__actions">
          <form class="search-box search-box--desktop" @submit.prevent>
            <input v-model="termoBusca" type="text" placeholder="Qual serviço você procura?"
              aria-label="Buscar serviços" />
            <button type="submit" aria-label="Buscar">
              <img :src="searchIcon" alt="" />
            </button>
          </form>
        </div>

        <div class="logged-header__user-group">
          <div class="profile-dropdown">
            <button class="profile-trigger" :class="{ 'profile-trigger--ativo': menuPerfilAberto }" type="button"
              aria-label="Abrir menu do usuário" @click="toggleMenuPerfil">
              <span class="profile-trigger__avatar">
                <img :src="profileIcon" alt="" />
              </span>

              <span class="profile-trigger__chevron" :class="{ 'profile-trigger__chevron--ativo': menuPerfilAberto }">
                <img :src="menuIcon" alt="" />
              </span>
            </button>

            <Transition name="profile-menu" appear>
              <div v-if="menuPerfilAberto" class="profile-dropdown__panel">
                <a href="#" class="profile-dropdown__item" @click="fecharTudo">
                  <img :src="menuUserIcon" alt="" class="profile-dropdown__item-icon" />
                  <span>Ver perfil</span>
                </a>

                <a href="#" class="profile-dropdown__item" @click="fecharTudo">
                  <img :src="menuCheckIcon" alt="" class="profile-dropdown__item-icon" />
                  <span>Minhas solicitações</span>
                </a>

                <a href="#" class="profile-dropdown__item" @click="fecharTudo">
                  <img :src="menuToolsIcon" alt="" class="profile-dropdown__item-icon" />
                  <span>Tornar-se prestador</span>
                </a>

                <a href="#" class="profile-dropdown__item profile-dropdown__item--danger" @click.prevent="sair">
                  <img :src="menuLogoutIcon" alt="" class="profile-dropdown__item-icon" />
                  <span>Sair</span>
                </a>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <form class="search-box search-box--mobile" @submit.prevent>
        <input v-model="termoBusca" type="text" placeholder="Qual serviço você procura?" aria-label="Buscar serviços" />
        <button type="submit" aria-label="Buscar">
          <img :src="searchIcon" alt="" />
        </button>
      </form>
    </div>

    <Transition name="overlay">
      <div v-if="menuMobileAberto" class="logged-header__overlay" @click="fecharTudo"></div>
    </Transition>

    <Transition name="drawer">
      <aside v-if="menuMobileAberto" class="logged-header__drawer">
        <div class="logged-header__drawer-top">
          <RouterLink to="/inicio" class="logged-header__drawer-brand" @click="fecharTudo">
            <h2>Workinhoo</h2>
          </RouterLink>

          <button class="logged-header__drawer-close" type="button" aria-label="Fechar menu" @click="fecharMenuMobile">
            <span></span>
            <span></span>
          </button>
        </div>

        <nav class="logged-header__drawer-nav">
          <a
            v-for="(item, i) in props.navItems"
            :key="item.href"
            :href="item.href"
            class="logged-header__drawer-link"
            @click="fecharTudo"
          >
            <span class="logged-header__drawer-link-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="logged-header__drawer-link-text">{{ item.label }}</span>
          </a>
        </nav>
      </aside>
    </Transition>
  </header>
</template>

<style scoped>
.logged-header {
  position: fixed;
  height: 9rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 120;
  background-color: var(--color-neutral-light-white);
  border-bottom: 1px solid rgba(168, 184, 214, 0.35);
  box-shadow: 0 2px 12px rgba(36, 45, 90, 0.07);
}

.logged-header__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0 1.25rem;
}

.logged-header__top {
  display: flex;
  height: 4.25rem;
  padding: 0.875rem 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
}

.logged-header__brand-group {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-width: 0;
}

.logged-header__brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.logged-header__brand:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

.logged-header__brand h1 {
  margin: 0;
  color: #3e3aa6;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  letter-spacing: -0.02em;
}

.logged-header__nav,
.logged-header__actions {
  display: none;
}

.logged-header__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  width: 2.75rem;
  height: 2.75rem;
  background: linear-gradient(135deg, #4d47c3 0%, #3e3aa6 100%);
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  box-shadow: 0 10px 24px rgba(62, 58, 166, 0.24);
  transition:
    transform 0.25s ease,
    box-shadow 0.3s ease,
    filter 0.3s ease;
}

.logged-header__hamburger:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 14px 28px rgba(62, 58, 166, 0.34);
  filter: brightness(1.03);
}

.logged-header__hamburger:active {
  transform: scale(0.94);
}

.logged-header__hamburger-line {
  display: block;
  width: 1.1rem;
  height: 0.14rem;
  background: #ffffff;
  border-radius: 999px;
  transition:
    transform 0.42s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.28s ease,
    width 0.28s ease;
  transform-origin: center;
}

.logged-header__hamburger--ativo .logged-header__hamburger-line:nth-child(1) {
  transform: translateY(0.45rem) rotate(45deg);
}

.logged-header__hamburger--ativo .logged-header__hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.logged-header__hamburger--ativo .logged-header__hamburger-line:nth-child(3) {
  transform: translateY(-0.45rem) rotate(-45deg);
}

.logged-header__user-group {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.profile-dropdown {
  position: relative;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.35rem 0.25rem 0.25rem;
  border: 1px solid rgba(168, 184, 214, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 22px rgba(36, 45, 90, 0.08);
  cursor: pointer;
  will-change: transform, box-shadow, border-color, background-color;
  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 260ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease,
    background-color 220ms ease;
}

.profile-trigger:hover {
  transform: translateY(-1px);
  border-color: rgba(62, 58, 166, 0.28);
  box-shadow: 0 12px 28px rgba(36, 45, 90, 0.12);
  background: rgba(255, 255, 255, 0.96);
}

.profile-trigger:active {
  transform: scale(0.985);
}

.profile-trigger--ativo {
  border-color: rgba(62, 58, 166, 0.34);
  box-shadow:
    0 10px 26px rgba(36, 45, 90, 0.12),
    0 0 0 4px rgba(62, 58, 166, 0.06);
  background: rgba(255, 255, 255, 0.98);
}

.profile-trigger__avatar {
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: linear-gradient(180deg, #ebf1f8 0%, #dbe4f1 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
}

.profile-trigger__avatar img {
  width: 1rem;
  height: 1rem;
}

.profile-trigger__chevron {
  display: flex;
  width: 1.75rem;
  height: 1.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  transition:
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 220ms ease;
}

.profile-trigger__chevron--ativo {
  transform: rotate(180deg);
}

.profile-trigger__chevron img {
  width: 0.9rem;
  height: 0.9rem;
}

.profile-dropdown__panel {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 16rem;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(168, 184, 214, 0.2);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  box-shadow:
    0 18px 38px rgba(24, 30, 61, 0.14),
    0 6px 14px rgba(62, 58, 166, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  z-index: 320;
  transform-origin: top right;
  will-change: transform, opacity;
}

.profile-dropdown__item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 3rem;
  padding: 0.8rem 0.9rem;
  border-radius: 0.85rem;
  text-decoration: none;
  color: #3f516e;
  font-family: 'Poppins', sans-serif;
  font-size: 0.94rem;
  font-weight: 500;
  transition:
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 180ms ease,
    color 180ms ease;
}

.profile-dropdown__item:hover {
  background: linear-gradient(135deg, #f4f6ff 0%, #eef3fb 100%);
  color: #2f347d;
  transform: translateX(2px);
}

.profile-dropdown__item:active {
  transform: scale(0.985);
}

.profile-dropdown__item--danger:hover {
  background: linear-gradient(135deg, #fff1f3 0%, #ffe8ec 100%);
  color: #b42347;
}

.profile-dropdown__item-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  opacity: 0.82;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.profile-dropdown__item:hover .profile-dropdown__item-icon {
  opacity: 1;
  transform: scale(1.05);
}

.search-box {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.search-box--desktop {
  display: none;
}

.search-box--mobile {
  width: 100%;
  height: 3.1rem;
  padding-left: 1.125rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 1.5rem;
  border: 1px solid rgba(168, 184, 214, 0.45);
  background: linear-gradient(180deg, #f8fafd 0%, #f3f6fb 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
  margin-bottom: 0.85rem;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.search-box--mobile:focus-within {
  border-color: rgba(62, 58, 166, 0.42);
  box-shadow: 0 0 0 4px rgba(62, 58, 166, 0.08);
}

.search-box--mobile input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #516b90;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
}

.search-box--mobile input::placeholder {
  color: #9bacc6;
}

.search-box--mobile button {
  display: flex;
  width: 3.35rem;
  height: 100%;
  padding: 0.75rem 1.25rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-left: 1px solid rgba(168, 184, 214, 0.4);
  border-radius: 0 1.5rem 1.5rem 0;
  background: linear-gradient(135deg, #4d47c3 0%, #3e3aa6 100%);
  box-shadow: 0 8px 18px rgba(62, 58, 166, 0.24);
  cursor: pointer;
  transition:
    filter 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;
}

.search-box--mobile button:hover {
  filter: brightness(1.04);
  box-shadow: 0 12px 22px rgba(62, 58, 166, 0.3);
}

.search-box--mobile button:active {
  transform: scale(0.97);
}

.search-box--mobile button img {
  width: 1.25rem;
  height: 1.25rem;
}

.logged-header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 47, 0.42);
  backdrop-filter: blur(4px);
  z-index: 200;
}

.logged-header__drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: min(84vw, 21rem);
  height: 100dvh;
  background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
  z-index: 310;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem 2rem;
  box-shadow: 12px 0 40px rgba(20, 10, 50, 0.18);
  border-radius: 0 1.5rem 1.5rem 0;
  overflow: hidden;
}

.logged-header__drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.25rem;
}

.logged-header__drawer-brand {
  text-decoration: none;
}

.logged-header__drawer-brand h2 {
  color: #3e3aa6;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
}

.logged-header__drawer-close {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.85rem;
  background: #f3f6fb;
  transition:
    background 0.25s ease,
    transform 0.2s ease;
  border: none;
}

.logged-header__drawer-close:hover {
  background: #eceffd;
}

.logged-header__drawer-close:active {
  transform: scale(0.94);
}

.logged-header__drawer-close span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.05rem;
  height: 0.14rem;
  background: #3f4b63;
  border-radius: 999px;
}

.logged-header__drawer-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.logged-header__drawer-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.logged-header__drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.logged-header__drawer-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.95rem;
  padding: 1rem;
  border-radius: 1rem;
  text-decoration: none;
  color: #35445f;
  overflow: hidden;
  transition: transform 0.22s ease;
}

.logged-header__drawer-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background: linear-gradient(135deg, #4d47c3 0%, #6a63df 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.logged-header__drawer-link:hover::after,
.logged-header__drawer-link.router-link-active::after {
  opacity: 1;
}

.logged-header__drawer-link:hover,
.logged-header__drawer-link:active {
  transform: translateX(4px);
}

.logged-header__drawer-link:hover .logged-header__drawer-link-num,
.logged-header__drawer-link:hover .logged-header__drawer-link-text,
.logged-header__drawer-link.router-link-active .logged-header__drawer-link-num,
.logged-header__drawer-link.router-link-active .logged-header__drawer-link-text {
  color: #ffffff;
}

.logged-header__drawer-link-num,
.logged-header__drawer-link-text {
  position: relative;
  z-index: 1;
  transition: color 0.25s ease;
}

.logged-header__drawer-link-num {
  min-width: 1.6rem;
  color: #4d47c3;
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.logged-header__drawer-link-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.32s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.drawer-enter-active {
  transition: transform 0.42s cubic-bezier(0.23, 1, 0.32, 1);
}

.drawer-leave-active {
  transition: transform 0.28s cubic-bezier(0.55, 0, 1, 0.45);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}

.profile-menu-enter-active {
  transition:
    opacity 240ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 240ms ease;
}

.profile-menu-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease,
    filter 180ms ease;
  pointer-events: none;
}

.profile-menu-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.985);
  filter: blur(4px);
}

.profile-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.99);
  filter: blur(2px);
}

@media (min-width: 768px) {
  .logged-header {
    position: relative;
    height: auto;
    z-index: 120;
    background-color: var(--color-neutral-light-white);
    border: none;
    box-shadow: none;
  }

  .logged-header__container {
    width: min(92%, 85rem);
    margin: 0 auto;
    padding: 1.4rem 0;
    gap: 0;
  }

  .logged-header__top {
    height: auto;
    padding: 0;
    gap: 1.5rem;
  }

  .logged-header__brand-group {
    flex-shrink: 0;
  }

  .logged-header__brand h1 {
    font-size: 2rem;
  }

  .logged-header__hamburger,
  .search-box--mobile {
    display: none;
  }

  .logged-header__nav {
    display: flex;
    width: auto;
    min-height: 1.5rem;
    align-items: center;
    gap: 1.5rem;
    margin-left: 1.5rem;
    margin-right: auto;
  }

  .logged-header__nav a {
    position: relative;
    color: #516b90;
    font-family: 'Poppins', sans-serif;
    font-size: 0.98rem;
    font-weight: 500;
    text-decoration: none;
    transition:
      color 0.25s ease,
      transform 0.2s ease;
  }

  .logged-header__nav a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.35rem;
    width: 0;
    height: 0.14rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #4d47c3 0%, #3e3aa6 100%);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .logged-header__nav a:hover,
  .logged-header__nav a.router-link-active {
    color: #2e378c;
  }

  .logged-header__nav a:hover::after,
  .logged-header__nav a.router-link-active::after {
    width: 100%;
  }

  .logged-header__actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .search-box--desktop {
    display: flex;
    width: 21rem;
    height: 2.9rem;
    padding-left: 1rem;
    align-items: center;
    gap: 1rem;
    border-radius: 1.5rem;
    border: 1px solid rgba(168, 184, 214, 0.45);
    background: linear-gradient(180deg, #f8fafd 0%, #f3f6fb 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;
  }

  .search-box--desktop:focus-within {
    border-color: rgba(62, 58, 166, 0.42);
    box-shadow: 0 0 0 4px rgba(62, 58, 166, 0.08);
  }

  .search-box--desktop input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: #516b90;
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
  }

  .search-box--desktop input::placeholder {
    color: #516b90;
    opacity: 0.55;
  }

  .search-box--desktop button {
    display: flex;
    width: 3.4rem;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: none;
    border-left: 1px solid rgba(168, 184, 214, 0.4);
    border-radius: 0 1.5rem 1.5rem 0;
    background: linear-gradient(135deg, #4d47c3 0%, #3e3aa6 100%);
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(62, 58, 166, 0.22);
    transition:
      filter 0.25s ease,
      transform 0.2s ease,
      box-shadow 0.25s ease;
  }

  .search-box--desktop button:hover {
    filter: brightness(1.04);
    box-shadow: 0 12px 24px rgba(62, 58, 166, 0.3);
  }

  .search-box--desktop button:active {
    transform: scale(0.97);
  }

  .search-box--desktop button img {
    width: 1.35rem;
    height: 1.35rem;
  }

  .logged-header__user-group {
    margin-left: 1rem;
    flex-shrink: 0;
  }

  .profile-trigger {
    min-height: 3rem;
    padding: 0.3rem 0.4rem 0.3rem 0.3rem;
  }

  .profile-trigger__avatar {
    width: 2.35rem;
    height: 2.35rem;
  }

  .profile-trigger__avatar img {
    width: 1.1rem;
    height: 1.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  .logged-header__brand,
  .logged-header__hamburger,
  .logged-header__hamburger-line,
  .profile-trigger,
  .profile-trigger__chevron,
  .profile-dropdown__item,
  .search-box--mobile,
  .search-box--mobile button,
  .search-box--desktop,
  .search-box--desktop button,
  .logged-header__drawer-link,
  .overlay-enter-active,
  .overlay-leave-active,
  .drawer-enter-active,
  .drawer-leave-active,
  .profile-menu-enter-active,
  .profile-menu-leave-active {
    transition: none;
  }
}
</style>