<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import LoggedHeader from '@/components/home-logged/LoggedHeader.vue'
import LoggedFooter from '@/components/home-logged/LoggedFooter.vue'
import ModalResponderSolicitacao from '@/components/home-logged/provider/modals/ModalResponderSolicitacao.vue'
import type { Solicitacao } from '@/components/home-logged/provider/modals/ModalResponderSolicitacao.vue'

import heroImg from '@/assets/images/loggedHomeHero.png'
import joaoImg from '@/assets/images/joao-pedreiro.svg'
import wellingtonImg from '@/assets/images/wellington-tatuador.svg'
import sandroImg from '@/assets/images/sandro-fotografo.svg'
import albertoImg from '@/assets/images/alberto-cozinheiro.svg'
import solicitador01Img from '@/assets/images/solicitador01.jpg'
import solicitador02Img from '@/assets/images/solicitador02.jpg'
import solicitador03Img from '@/assets/images/solicitador03.jpg'
import solicitador04Img from '@/assets/images/solicitador04.jpg'

import eletricistaImg from '@/assets/images/eletricista.jpg'
import mecanicoImg from '@/assets/images/mecanico.jpg'
import tatuadorImg from '@/assets/images/tatuador.jpg'
import diaristaImg from '@/assets/images/diarista.jpg'
import encanadorImg from '@/assets/images/encanador.jpg'
import pedreiImg from '@/assets/images/pedreiro.jpg'
import pintorImg from '@/assets/images/pintor.jpg'

import estrelaCheiaImg from '@/assets/icons/star-full.svg'
import estrelaVaziaImg from '@/assets/icons/star-empty.svg'
import estrelaMetadeImg from '@/assets/icons/star-half.svg'
import estrelaPrestadorImg from '@/assets/icons/star-hero.svg'
import pinLocalizacaoImg from '@/assets/icons/pin-hero.svg'
import especialidadesImg from '@/assets/icons/provider-hero.svg'
import solicitacoesVazioImg from '@/assets/images/empty-box.png'
import solicitacoesRecebidasIcon from '@/assets/icons/solicitacoes-recebidas.svg'
import portfolioVazioImg from '@/assets/images/photos.png'
import quoteIcon from '@/assets/icons/quote-medium.svg'
import specialtyIcon from '@/assets/icons/specialty.svg'
import arrowRightIcon from '@/assets/icons/responder.svg'
import arrowDownIcon from '@/assets/icons/arrow-down2.svg'
import arrowLeftIcon from '@/assets/icons/arrow-left.svg'
import avArrowRightIcon from '@/assets/icons/arrow-right.svg'
import quoteSoftIcon from '@/assets/icons/quote-soft.svg'
import picsIcon from '@/assets/icons/pics.icon.svg'
import groupIcon from '@/assets/icons/group-icon.svg'
import editPurpleIcon from '@/assets/icons/edit-purple.svg'
import Plus from '@/assets/icons/plus.svg'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Solicitações', href: '#solicitacoes' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Avaliações', href: '#avaliacoes' },
]

const usuario = {
  nome: 'Rafaela',
  avaliacao: 4.0,
  bairros: 4,
  especialidades: 2,
}

const statCards = [
  { titulo: 'Solicitações recebidas', label: 'Solicitações recebidas', valor: '04', icone: solicitacoesRecebidasIcon },
  { titulo: 'Avaliação média', label: 'Avaliação média', valor: '4.0', icone: estrelaPrestadorImg },
  { titulo: 'Total de avaliações', label: 'Avaliações recebidas', valor: '06', icone: groupIcon },
  { titulo: 'Portfólio', label: 'Trabalhos publicados', valor: '10', icone: picsIcon },
  { titulo: 'Especialidades', label: 'Especialidades cadastradas', valor: '02', icone: especialidadesImg },
]

const solicitacoes = [
  {
    clienteNome: 'João da Silva',
    servicoSolicitado: 'Nutricionista',
    dataRecebida: '26/05/2026',
    status: 'Aguardando resposta',
    imagem: solicitador01Img,
    localAtendimento: 'Jaraguá, Maceió',
    faixaHorario: 'Manhã',
    descricao: 'Gostaria de acompanhamento nutricional para emagrecimento durante 3 meses.',
  },
  {
    clienteNome: 'Maria das Graças',
    servicoSolicitado: 'Personal Trainer',
    dataRecebida: '20/05/2026',
    status: 'Aguardando resposta',
    imagem: solicitador02Img,
    localAtendimento: 'Farol, Maceió',
    faixaHorario: 'Tarde',
    descricao: 'Preciso de um personal para treinos funcionais 3x por semana.',
  },
  {
    clienteNome: 'Pedro Barbosa',
    servicoSolicitado: 'Nutricionista',
    dataRecebida: '26/04/2026',
    status: 'Aguardando resposta',
    imagem: solicitador03Img,
    localAtendimento: 'Ponta Verde, Maceió',
    faixaHorario: 'Manhã',
    descricao: 'Quero melhorar minha alimentação para ganho de massa muscular.',
  },
  {
    clienteNome: 'Ana Carvalho',
    servicoSolicitado: 'Personal Trainer',
    dataRecebida: '15/04/2026',
    status: 'Aguardando resposta',
    imagem: solicitador04Img,
    localAtendimento: 'Jatiúca, Maceió',
    faixaHorario: 'Noite',
    descricao: 'Busco personal para treinos em academia, com foco em condicionamento físico.',
  },
]

const solicitacaoSelecionada = ref<Solicitacao | null>(null)
const modalResponderAberto = ref(false)

function abrirResponder(sol: typeof solicitacoes[0]) {
  solicitacaoSelecionada.value = {
    clienteNome: sol.clienteNome,
    dataRecebida: sol.dataRecebida,
    servicoSolicitado: sol.servicoSolicitado,
    localAtendimento: sol.localAtendimento,
    faixaHorario: sol.faixaHorario,
    descricao: sol.descricao,
  }
  modalResponderAberto.value = true
}

const servicos = [
  {
    especialidade: 'Nutricionista',
    corIcone: '#F8954A',
    corFundo: '#FEF3EA',
    subservicos: ['Avaliação nutricional', 'Plano alimentar personalizado', 'Acompanhamento mensal'],
  },
  {
    especialidade: 'Personal Trainer',
    corIcone: '#F8BA4F',
    corFundo: '#FEF9EA',
    subservicos: ['Avaliação física', 'Treino personalizado', 'Personal presencial', 'Personal online', 'Consultoria fitness'],
  },
]

const portfolioFotos = [
  { imagem: eletricistaImg, alt: 'Trabalho 1' },
  { imagem: mecanicoImg, alt: 'Trabalho 2' },
  { imagem: tatuadorImg, alt: 'Trabalho 3' },
  { imagem: diaristaImg, alt: 'Trabalho 4' },
  { imagem: encanadorImg, alt: 'Trabalho 5' },
  { imagem: pedreiImg, alt: 'Trabalho 6' },
  { imagem: pintorImg, alt: 'Trabalho 7' },
  { imagem: eletricistaImg, alt: 'Trabalho 8' },
]

const avaliacoes = [
  {
    nota: 2,
    texto: 'A melhor nutricionista que já consultei! Conseguiu me ajudar a perder 8kg de forma saudável e meu condicionamento físico melhorou muito.',
    autor: 'Igor Rocha',
    avatarUrl: joaoImg,
    data: '26/05/2026',
  },
  {
    nota: 5,
    texto: 'Profissional incrível que me ajudou a regular minha alimentação em poucos meses. Consegui melhorar meu condicionamento físico de forma consistente.',
    autor: 'Eduardo Calado',
    avatarUrl: albertoImg,
    data: '20/05/2026',
  },
  {
    nota: 5,
    texto: 'Excelente profissional de nutrição e treinamento. As orientações nutricionais me ajudaram muito a alcançar meus objetivos pessoais.',
    autor: 'Maria Luiza',
    avatarUrl: sandroImg,
    data: '15/04/2026',
  },
  {
    nota: 4,
    texto: 'Atendimento muito atencioso e personalizado. Já indiquei para várias amigas que também precisavam de ajuda com alimentação.',
    autor: 'Andressa Abreu',
    avatarUrl: wellingtonImg,
    data: '10/03/2026',
  },
  {
    nota: 5,
    texto: 'Resultado incrível em pouco tempo! A profissional é muito dedicada e o plano alimentar foi completamente adaptado à minha rotina.',
    autor: 'Isaque Braga',
    avatarUrl: solicitador01Img,
    data: '05/02/2026',
  },
]

type SortSolicitacao = 'recentes' | 'antigas'
const sortSolicitacao = ref<SortSolicitacao>('recentes')
const sortSolicitacaoOpen = ref(false)
const sortSolicitacaoLabel = computed(() =>
  sortSolicitacao.value === 'antigas' ? 'Mais antigas' : 'Mais recentes',
)
const sortedSolicitacoes = computed(() =>
  [...solicitacoes].sort((a, b) => {
    const toMs = (d: string) => {
      const parts = d.split('/')
      return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime()
    }
    return sortSolicitacao.value === 'antigas'
      ? toMs(a.dataRecebida) - toMs(b.dataRecebida)
      : toMs(b.dataRecebida) - toMs(a.dataRecebida)
  }),
)
function toggleSortSolicitacao() { sortSolicitacaoOpen.value = !sortSolicitacaoOpen.value }
function setSortSolicitacao(opt: SortSolicitacao) { sortSolicitacao.value = opt; sortSolicitacaoOpen.value = false }
function closeSortSolicitacao() { sortSolicitacaoOpen.value = false }

const temSolicitacoes = computed(() => solicitacoes.length > 0)
const temPortfolio = computed(() => portfolioFotos.length > 0)
const temAvaliacoes = computed(() => avaliacoes.length > 0)

type SortAv = 'recentes' | 'maiores' | 'menores'
const avSortBy = ref<SortAv>('recentes')
const avSortMenuOpen = ref(false)
const avCurrentSlide = ref(0)
const avIsMobile = ref(false)
const avCarouselRef = ref<HTMLElement | null>(null)
const avIsDragging = ref(false)
const avDragStartX = ref(0)
const avDragCurrentX = ref(0)
const avDragOffsetX = ref(0)
const AV_DRAG_THRESHOLD = 60
const AV_DESKTOP_GAP = 14
const AV_MOBILE_GAP = 14
const AV_MOBILE_PEEK = 22

const avItemsPerView = computed(() => (avIsMobile.value ? 1 : 3))

const avSortLabel = computed(() => {
  if (avSortBy.value === 'maiores') return 'Avaliações mais altas'
  if (avSortBy.value === 'menores') return 'Avaliações mais baixas'
  return 'Mais recentes'
})

const avSortedAvaliacoes = computed(() => {
  const list = [...avaliacoes]
  if (avSortBy.value === 'maiores') return list.sort((a, b) => b.nota - a.nota)
  if (avSortBy.value === 'menores') return list.sort((a, b) => a.nota - b.nota)
  return list
})

const avTotalSlides = computed(() =>
  Math.max(1, avSortedAvaliacoes.value.length - avItemsPerView.value + 1),
)

const avProgressPercent = computed(() => {
  if (avTotalSlides.value <= 1) return 100
  return ((avCurrentSlide.value + 1) / avTotalSlides.value) * 100
})

const avTrackStyle = computed(() => {
  if (avIsMobile.value && avCarouselRef.value) {
    const vw = avCarouselRef.value.clientWidth
    const cardWidth = vw - AV_MOBILE_PEEK * 2
    const step = cardWidth + AV_MOBILE_GAP
    return {
      transform: `translateX(${-(avCurrentSlide.value * step) + AV_MOBILE_PEEK + avDragOffsetX.value}px)`,
      transition: avIsDragging.value ? 'none' : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
    }
  }
  const slideW = 100 / avItemsPerView.value
  const gapOff = (AV_DESKTOP_GAP * avCurrentSlide.value) / avItemsPerView.value
  return {
    transform: `translateX(calc(-${avCurrentSlide.value * slideW}% - ${gapOff}px${avIsDragging.value ? ` + ${avDragOffsetX.value}px` : ''}))`,
    transition: avIsDragging.value ? 'none' : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
  }
})

const avCanPrev = computed(() => avCurrentSlide.value > 0)
const avCanNext = computed(() => avCurrentSlide.value < avTotalSlides.value - 1)

function avSetSort(opt: SortAv) { avSortBy.value = opt; avSortMenuOpen.value = false; avCurrentSlide.value = 0 }
function avToggleSort() { avSortMenuOpen.value = !avSortMenuOpen.value }
function avCloseSort() { avSortMenuOpen.value = false }
function avPrev() { if (avCanPrev.value) avCurrentSlide.value-- }
function avNext() { if (avCanNext.value) avCurrentSlide.value++ }

function avGetStarIcon(nota: number, index: number) {
  const pos = index + 1
  if (nota >= pos) return estrelaCheiaImg
  if (nota >= pos - 0.5) return estrelaMetadeImg
  return estrelaVaziaImg
}

function avOnPointerDown(e: PointerEvent) {
  if (!avCarouselRef.value) return
  avIsDragging.value = true
  avDragStartX.value = e.clientX
  avDragCurrentX.value = e.clientX
  avDragOffsetX.value = 0
  avCarouselRef.value.setPointerCapture?.(e.pointerId)
}
function avOnPointerMove(e: PointerEvent) {
  if (!avIsDragging.value) return
  avDragCurrentX.value = e.clientX
  avDragOffsetX.value = avDragCurrentX.value - avDragStartX.value
}
function avFinalizarDrag() {
  if (!avIsDragging.value) return
  if (avDragOffsetX.value <= -AV_DRAG_THRESHOLD && avCanNext.value) avCurrentSlide.value++
  else if (avDragOffsetX.value >= AV_DRAG_THRESHOLD && avCanPrev.value) avCurrentSlide.value--
  avIsDragging.value = false
  avDragStartX.value = 0
  avDragCurrentX.value = 0
  avDragOffsetX.value = 0
}
function avOnPointerUp(e: PointerEvent) {
  avCarouselRef.value?.releasePointerCapture?.(e.pointerId)
  avFinalizarDrag()
}
function avOnPointerCancel() { avFinalizarDrag() }

function avUpdateViewport() { avIsMobile.value = window.innerWidth <= 1080 }

let revealObserver: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pv-reveal--visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  document.querySelectorAll('.pv-reveal').forEach((el) => revealObserver?.observe(el))
  avUpdateViewport()
  window.addEventListener('resize', avUpdateViewport)
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  revealObserver = null
  window.removeEventListener('resize', avUpdateViewport)
})

watch(avItemsPerView, () => { avCurrentSlide.value = 0 })
watch(() => avaliacoes.length, () => { avCurrentSlide.value = 0 })
</script>

<template>
  <div class="provider-home">
    <LoggedHeader :nav-items="navItems" />

    <main id="inicio" class="provider-main">
      <section class="hero pv-reveal">
        <img :src="heroImg" alt="" class="hero__photo" aria-hidden="true" />
        <div class="hero__ambient hero__ambient--one"></div>
        <div class="hero__ambient hero__ambient--two"></div>

        <div class="hero__content">
          <p class="hero__greeting pv-reveal pv-reveal--delay-1">Olá, {{ usuario.nome }}!</p>

          <div class="hero__text-group">
            <h2 class="hero__title pv-reveal pv-reveal--delay-2">
              Seu perfil está disponível para clientes da sua região
            </h2>
          </div>

          <ul class="hero__stats pv-reveal pv-reveal--delay-3">
            <li class="hero__stat">
              <img :src="estrelaPrestadorImg" alt="" class="hero__stat-icon" />
              <span>Avaliação média: <strong>{{ usuario.avaliacao.toFixed(1) }}</strong></span>
            </li>
            <li class="hero__stat">
              <img :src="pinLocalizacaoImg" alt="" class="hero__stat-icon" />
              <span><strong>{{ String(usuario.bairros).padStart(2, '0') }}</strong> bairros atendidos</span>
            </li>
            <li class="hero__stat">
              <img :src="especialidadesImg" alt="" class="hero__stat-icon" />
              <span><strong>{{ String(usuario.especialidades).padStart(2, '0') }}</strong> especialidades
                cadastradas</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="profile-stats">
        <div class="profile-stats__inner">
          <h2 class="pv-section-title pv-reveal">Seu perfil em números</h2>

          <div class="stats-grid pv-reveal pv-reveal--delay-1">
            <article v-for="stat in statCards" :key="stat.label" class="stat-card">
              <span class="stat-card__title">{{ stat.titulo }}</span>
              <div class="stat-card__icon-wrap">
                <img :src="stat.icone" :alt="stat.label" class="stat-card__icon" />
              </div>
              <span class="stat-card__value">{{ stat.valor }}</span>
              <span class="stat-card__label">{{ stat.label }}</span>
            </article>
          </div>
        </div>
      </section>

      <section id="solicitacoes" class="received-requests" @click="closeSortSolicitacao">
        <div class="received-requests__inner">
          <div class="received-requests__header pv-reveal">
            <div class="received-requests__heading">
              <h2 class="pv-section-title pv-section-title--left">Solicitações recebidas</h2>
              <p class="pv-section-subtitle">Veja as pedidas de orçamento enviadas ao seu perfil</p>
            </div>

            <div class="req-sort" @click.stop>
              <span class="req-sort__label">Ordenar por:</span>
              <div class="sort-dropdown">
                <button type="button" class="sort-select" :aria-expanded="sortSolicitacaoOpen" aria-haspopup="menu"
                  @click="toggleSortSolicitacao">
                  <span class="sort-select__label">{{ sortSolicitacaoLabel }}</span>
                  <img :src="arrowDownIcon" alt="" class="sort-select__icon" :class="{ 'is-open': sortSolicitacaoOpen }"
                    width="12" height="12" aria-hidden="true" />
                </button>
                <transition name="sort-menu">
                  <div v-if="sortSolicitacaoOpen" class="sort-menu" role="menu">
                    <button v-for="opt in ([['recentes', 'Mais recentes'], ['antigas', 'Mais antigas']] as const)"
                      :key="opt[0]" type="button" class="sort-menu__item"
                      :class="{ active: sortSolicitacao === opt[0] }" role="menuitem"
                      @click="setSortSolicitacao(opt[0])">
                      <span>{{ opt[1] }}</span>
                      <span v-if="sortSolicitacao === opt[0]" class="sort-menu__check">•</span>
                    </button>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <template v-if="temSolicitacoes">
            <div class="requests-list pv-reveal pv-reveal--delay-1">
              <article v-for="sol in sortedSolicitacoes" :key="sol.clienteNome" class="request-item">
                <div class="request-item__avatar-wrap">
                  <img :src="sol.imagem" :alt="sol.clienteNome" class="request-item__avatar" />
                </div>

                <div class="request-item__info">
                  <h3 class="request-item__name">{{ sol.clienteNome }}</h3>
                  <p class="request-item__detail">Serviço solicitado: <strong>{{ sol.servicoSolicitado }}</strong></p>
                  <p class="request-item__detail">Recebida em: <strong>{{ sol.dataRecebida }}</strong></p>
                  <p class="request-item__detail">Status: <strong>{{ sol.status }}</strong></p>
                </div>

                <button type="button" class="respond-btn" @click="abrirResponder(sol)">
                  Responder
                  <img :src="arrowRightIcon" alt="" class="respond-btn__icon" />
                </button>
              </article>
            </div>
          </template>

          <template v-else>
            <div class="requests-empty pv-reveal pv-reveal--delay-1">
              <img :src="solicitacoesVazioImg" alt="" class="requests-empty__img" />
              <div class="requests-empty__text">
                <h3>Nenhuma solicitação recebida</h3>
                <p>Quando clientes solicitarem orçamentos para seus serviços, eles aparecerão aqui</p>
              </div>
            </div>
          </template>
        </div>
      </section>

      <section id="servicos" class="services-offered">
        <div class="services-offered__inner">
          <div class="services-offered__header pv-reveal">
            <h2 class="pv-section-title pv-section-title--left">Serviços que você oferece</h2>
            <p class="pv-section-subtitle">
              Cadastre e organize os serviços que você oferece para que os clientes encontrem exatamente o que procuram
            </p>
          </div>

          <div class="services-list pv-reveal pv-reveal--delay-1">
            <article v-for="servico in servicos" :key="servico.especialidade" class="service-card">
              <div class="service-card__header">
                <div class="service-card__identity">
                  <img :src="specialtyIcon" alt="" />
                  <div>
                    <p class="service-card__type-label">Especialidade:</p>
                    <h3 class="service-card__name">{{ servico.especialidade }}</h3>
                  </div>
                </div>

                <button type="button" class="edit-btn">
                  Editar
                  <img :src="editPurpleIcon" alt="" class="edit-btn__icon" />
                </button>
              </div>

              <divider class="service-card__divider" />

              <div class="service-card__subservices">
                <p class="service-card__sublabel">Serviços oferecidos:</p>
                <div class="service-card__tags">
                  <span v-for="sub in servico.subservicos" :key="sub" class="service-tag">
                    {{ sub }}
                  </span>
                </div>
              </div>
            </article>
          </div>

          <button type="button" class="add-specialty-btn pv-reveal pv-reveal--delay-2">
            Adicionar especialidade
          </button>
        </div>
      </section>

      <section class="portfolio">
        <div class="portfolio__inner">
          <div class="portfolio__header pv-reveal">
            <h2 class="pv-section-title">Trabalhos publicados</h2>
            <p class="pv-section-subtitle portfolio__subtitle">
              Apresente seus melhores trabalhos e ajude os clientes a conhecerem a qualidade dos
              seus serviços antes do primeiro contato
            </p>
          </div>

          <template v-if="temPortfolio">
            <div class="portfolio-grid pv-reveal pv-reveal--delay-1">
              <div v-for="foto in portfolioFotos" :key="foto.alt" class="portfolio-grid__item">
                <img :src="foto.imagem" :alt="foto.alt" loading="lazy" />
                <div class="portfolio-grid__overlay"></div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="portfolio-empty pv-reveal pv-reveal--delay-1">
              <img :src="portfolioVazioImg" alt="" class="portfolio-empty__img" />
              <h3>Seu portfólio está vazio</h3>
              <p>Mostre seus melhores trabalhos para transmitir mais confiança aos clientes.</p>
            </div>
          </template>

          <button type="button" class="add-work-btn pv-reveal pv-reveal--delay-2">
            Adicionar trabalho
            <img :src="Plus" alt="" width="18px" />
          </button>
        </div>
      </section>

      <section id="avaliacoes" class="reviews" @click="avCloseSort">
        <div class="reviews__inner">
          <div class="avaliacoes-toolbar pv-reveal" @click.stop>
            <span>Ordenar por:</span>
            <div class="sort-dropdown">
              <button class="sort-select" type="button" :aria-expanded="avSortMenuOpen" aria-haspopup="menu"
                @click="avToggleSort">
                <span class="sort-select__label">{{ avSortLabel }}</span>
                <img class="sort-select__icon" :class="{ 'is-open': avSortMenuOpen }" :src="arrowDownIcon" alt=""
                  width="12" height="12" aria-hidden="true" />
              </button>
              <transition name="sort-menu">
                <div v-if="avSortMenuOpen" class="sort-menu" role="menu">
                  <button class="sort-menu__item" :class="{ active: avSortBy === 'recentes' }" type="button"
                    role="menuitem" @click="avSetSort('recentes')">
                    <span>Mais recentes</span>
                    <span v-if="avSortBy === 'recentes'" class="sort-menu__check">•</span>
                  </button>
                  <button class="sort-menu__item" :class="{ active: avSortBy === 'maiores' }" type="button"
                    role="menuitem" @click="avSetSort('maiores')">
                    <span>Avaliações mais altas</span>
                    <span v-if="avSortBy === 'maiores'" class="sort-menu__check">•</span>
                  </button>
                  <button class="sort-menu__item" :class="{ active: avSortBy === 'menores' }" type="button"
                    role="menuitem" @click="avSetSort('menores')">
                    <span>Avaliações mais baixas</span>
                    <span v-if="avSortBy === 'menores'" class="sort-menu__check">•</span>
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <div class="depoimentos-layout pv-reveal pv-reveal--delay-1">
            <aside class="depoimentos-side">
              <img class="depoimentos-side__quote" :src="quoteSoftIcon" alt="" width="80" height="60"
                aria-hidden="true" />
              <h2 class="depoimentos-side__title">O que estão dizendo sobre você</h2>
              <div class="depoimentos-side__controls">
                <button class="carousel-arrow" :class="{ disabled: !avCanPrev }" :disabled="!avCanPrev" type="button"
                  aria-label="Ver avaliações anteriores" @click="avPrev">
                  <img :src="arrowLeftIcon" alt="" width="12" height="12" aria-hidden="true" />
                </button>
                <div class="carousel-progress" aria-hidden="true">
                  <div class="carousel-progress__fill" :style="{ width: avProgressPercent + '%' }"></div>
                </div>
                <button class="carousel-arrow" :class="{ disabled: !avCanNext }" :disabled="!avCanNext" type="button"
                  aria-label="Ver próximas avaliações" @click="avNext">
                  <img :src="avArrowRightIcon" alt="" width="12" height="12" aria-hidden="true" />
                </button>
              </div>
            </aside>

            <div ref="avCarouselRef" class="avaliacoes-carousel" @pointerdown="avOnPointerDown"
              @pointermove="avOnPointerMove" @pointerup="avOnPointerUp" @pointercancel="avOnPointerCancel"
              @pointerleave="avOnPointerCancel">
              <div class="avaliacoes-track" :style="avTrackStyle">
                <article v-for="av in avSortedAvaliacoes" :key="av.autor" class="avaliacao-card">
                  <img class="avaliacao-card__quote" :src="quoteIcon" alt="" width="20" height="20"
                    aria-hidden="true" />
                  <div class="avaliacao-card__stars" :aria-label="`${av.nota} estrelas`">
                    <img v-for="i in 5" :key="i" class="star-icon star-icon--small" :src="avGetStarIcon(av.nota, i - 1)"
                      alt="" width="16" height="16" aria-hidden="true" />
                  </div>
                  <p class="avaliacao-card__text">{{ av.texto }}</p>
                  <div class="avaliacao-card__author">
                    <img class="author-avatar" :src="av.avatarUrl" :alt="`Foto de ${av.autor}`" width="44" height="44"
                      loading="lazy" />
                    <div>
                      <div class="author-name">{{ av.autor }}</div>
                      <div class="author-date">{{ av.data }}</div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LoggedFooter />
  </div>

  <ModalResponderSolicitacao :aberto="modalResponderAberto" :solicitacao="solicitacaoSelecionada"
    @fechar="modalResponderAberto = false" @enviado="modalResponderAberto = false" />
</template>

<style scoped>
.provider-home {
  background: var(--color-neutral-light-white);
  overflow-x: hidden;
}

.provider-main {
  padding-top: 9rem;
}

.pv-section-title {
  margin: 0;
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: normal;
  text-align: center;
}

.pv-section-title--left {
  text-align: left;
}

.pv-section-subtitle {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.service-card__divider {
  height: 0.650px;
  background: rgba(62, 58, 166, 0.1);
  width: 100%;
}

.pv-reveal {
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.pv-reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

.pv-reveal--delay-1 {
  transition-delay: 0.08s;
}

.pv-reveal--delay-2 {
  transition-delay: 0.16s;
}

.pv-reveal--delay-3 {
  transition-delay: 0.28s;
}

.hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: min(90%, 75rem);
  margin: 0 auto;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 1rem;
  background: linear-gradient(110deg, #1a1848 0%, #2c2980 20%, #4a47bb 70%, #6b68d8 100%);
  color: #fff;
  overflow: hidden;
  isolation: isolate;
  box-shadow:
    0 0.25rem 1rem rgba(22, 29, 39, 0.12),
    0 1.5rem 3rem rgba(22, 29, 39, 0.12);
}

.hero__photo {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 52%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  pointer-events: none;
  z-index: 0;
  mask-image: linear-gradient(to right, transparent 0%, black 250%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 250%);
}

.hero__ambient {
  position: absolute;
  border-radius: 999px;
  filter: blur(12px);
  pointer-events: none;
  opacity: 0.45;
  z-index: 0;
  animation: heroFloat 8s ease-in-out infinite;
}

.hero__ambient--one {
  width: 10rem;
  height: 10rem;
  top: -2rem;
  left: -2rem;
  background: rgba(255, 255, 255, 0.16);
}

.hero__ambient--two {
  width: 12rem;
  height: 12rem;
  right: -3rem;
  bottom: -3rem;
  background: rgba(166, 164, 223, 0.26);
  animation-delay: -2.4s;
}

.hero__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.hero__greeting {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.hero__text-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.hero__title {
  margin: 0;
  max-width: 18.9375rem;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 2.375rem;
  color: #ffffff;
  text-wrap: balance;
}

.hero__stats {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero__stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #fff;
}

.hero__stat-icon {
  width: 1rem;
  height: 1rem;
  filter: brightness(10);
  flex-shrink: 0;
}

.hero__avatar-wrap {
  display: none;
}

.profile-stats {
  padding: 2.5rem 0;
  background: #fff;
}

.profile-stats__inner {
  width: min(90%, 75rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

.stats-grid {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  overflow-x: auto;
  padding: 0.5rem 0 0.75rem;
  scrollbar-width: none;
}

.stats-grid::-webkit-scrollbar {
  display: none;
}

.stat-card {
  flex: 0 0 8.5rem;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 0.75rem;
  border: 1px solid rgba(201, 211, 227, 0.6);
  border-radius: 0.9rem;
  background: #fff;
  text-align: center;
  box-shadow: 0 0.125rem 0.5rem rgba(22, 29, 39, 0.04);
  transition:
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 260ms ease,
    border-color 220ms ease;
}

.stat-card__title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  line-height: 1.25;
  min-height: 2.5rem;
}

.stat-card:hover {
  transform: translateY(-0.25rem);
  border-color: rgba(107, 104, 202, 0.32);
  box-shadow: 0 0.5rem 1.25rem rgba(22, 29, 39, 0.09);
}

.stat-card__icon-wrap {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #AEBDD5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.stat-card:hover .stat-card__icon-wrap {
  transform: scale(1.08);
}

.stat-card__icon {
  width: 1.375rem;
  height: 1.375rem;
  object-fit: contain;
}

.stat-card__value {
  font-family: 'Poppins', sans-serif;
  font-size: 1.625rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-card__label {
  font-size: 0.65rem;
  color: #516b90;
  font-weight: 500;
  line-height: 1.3;
}

.received-requests {
  background: var(--color-neutral-light-lightest);
  padding: 2.5rem 0;
  overflow-x: hidden;
}

.received-requests__inner {
  width: min(90%, 75rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.received-requests__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.875rem;
  position: relative;
  z-index: 2;
}

.received-requests__heading {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.req-sort {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

.req-sort__label {
  font-size: 0.875rem;
  color: var(--color-neutral-lightest);
}

.sort-dropdown {
  position: relative;
}

.sort-select {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0 0.875rem;
  border-radius: 0.75rem;
  background: var(--color-neutral-light-white);
  border: 0.0625rem solid var(--color-neutral-light-light);
  color: var(--color-neutral-dark);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  box-shadow: 0 0.25rem 0.75rem rgba(22, 29, 39, 0.06);
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease,
    background 180ms ease;
}

.sort-select:hover {
  border-color: var(--color-primary-lightest);
  background: var(--color-neutral-light-lightest);
  transform: translateY(-0.0625rem);
  box-shadow: 0 0.75rem 1.5rem rgba(22, 29, 39, 0.08);
}

.sort-select__label {
  white-space: nowrap;
}

.sort-select__icon {
  transition: transform 180ms ease;
}

.sort-select__icon.is-open {
  transform: rotate(180deg);
}

.sort-menu {
  position: absolute;
  top: calc(100% + 0.625rem);
  right: 0;
  min-width: 12rem;
  padding: 0.5rem;
  background: var(--color-neutral-light-white);
  border: 0.0625rem solid var(--color-neutral-light-light);
  border-radius: 0.875rem;
  box-shadow: 0 1.125rem 2.125rem rgba(22, 29, 39, 0.12);
  z-index: 20;
}

.sort-menu__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border: 0;
  border-radius: 0.625rem;
  background: transparent;
  color: var(--color-neutral-dark);
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.sort-menu__item:hover {
  background: var(--color-neutral-light-lightest);
  transform: translateX(0.125rem);
}

.sort-menu__item.active {
  background: color-mix(in srgb, var(--color-primary-lightest) 35%, white);
  color: var(--color-primary-dark);
  font-weight: 600;
}

.sort-menu__check {
  font-size: 1.125rem;
  line-height: 1;
  color: var(--color-primary-medium);
}

.sort-menu-enter-active,
.sort-menu-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
  transform-origin: top right;
}

.sort-menu-enter-from,
.sort-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.375rem) scale(0.98);
}

.requests-list {
  background: #fff;
  border: 0.0625rem solid var(--color-neutral-light-light);
  border-radius: 1rem;
  height: 27rem;
  overflow-y: auto;
  box-shadow:
    0 0.0625rem 0.1875rem rgba(22, 29, 39, 0.06),
    0 0.5rem 1.5rem rgba(22, 29, 39, 0.04);
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-medium) var(--color-neutral-light-lightest);
}

.requests-list::-webkit-scrollbar {
  width: 0.375rem;
}

.requests-list::-webkit-scrollbar-track {
  background: var(--color-neutral-light-lightest);
  border-radius: 9999px;
  margin-block: 0.5rem;
}

.requests-list::-webkit-scrollbar-thumb {
  background: var(--color-primary-medium);
  border-radius: 9999px;
}

.request-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 0.0625rem solid var(--color-neutral-light-light);
  transition: background 180ms ease;
}

.request-item:last-child {
  border-bottom: none;
}

.request-item:hover {
  background: var(--color-neutral-light-lightest);
}

.request-item__avatar-wrap {
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-neutral-light-light);
}

.request-item__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.request-item__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
}

.request-item__name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  margin: 0 0 0.25rem;
}

.request-item__detail {
  font-size: 0.8125rem;
  color: var(--color-neutral-light);
  margin: 0;
  font-weight: 500;

}

.request-item__detail strong {
  color: var(--color-primary-dark);
  font-weight: 600;
}

.respond-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem 3rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-primary-dark);
  color: #fff;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.respond-btn:hover {
  background: var(--color-primary-medium);
  transform: translateY(-0.0625rem);
  box-shadow: 0 0.5rem 1rem rgba(62, 58, 166, 0.25);
}

.respond-btn:active {
  transform: scale(0.985);
}

.respond-btn__icon {
  width: 0.725rem;
  height: 0.725rem;
  filter: brightness(10);
  flex-shrink: 0;
}

.requests-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1rem;
  text-align: center;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid rgba(201, 211, 227, 0.55);
}

.requests-empty__img {
  width: 7.5rem;
  height: auto;
}

.requests-empty__text h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.375rem;
}

.requests-empty__text p {
  font-size: 0.875rem;
  color: #516b90;
  margin: 0;
  max-width: 22rem;
}

.services-offered {
  padding: 2.5rem 0;
  background: #fff;
}

.services-offered__inner {
  width: min(90%, 75rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
}

.services-offered__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-card {
  padding: 1.25rem;
  border: 1px solid rgba(201, 211, 227, 0.65);
  border-radius: 0.9rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(22, 29, 39, 0.04);
  transition:
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 260ms ease,
    border-color 220ms ease;
}

.service-card:hover {
  transform: translateY(-0.2rem);
  border-color: rgba(107, 104, 202, 0.28);
  box-shadow: 0 0.5rem 1.25rem rgba(22, 29, 39, 0.08);
}

.service-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.service-card__identity {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-width: 0;
}

.service-card__icon-wrap {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.service-card:hover .service-card__icon-wrap {
  transform: scale(1.06);
}

.service-card__icon-circle {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-card__icon-circle img {
  width: 1.125rem;
  height: 1.125rem;
  filter: brightness(10);
}

.service-card__type-label {
  font-size: 0.6875rem;
  color: #516b90;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.service-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.edit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.750rem;
  padding: 0.4rem 0.85rem;
  border: 0.125rem solid rgba(62, 58, 166, 0.5);
  border-radius: 0.55rem;
  background: transparent;
  color: #3e3aa6;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    background 220ms ease,
    border-color 220ms ease;
}

.edit-btn:hover {
  transform: translateY(-0.1rem);
  background: rgba(62, 58, 166, 0.06);
  border-color: #3e3aa6;
}

.edit-btn__icon {
  width: 0.8rem;
  height: 0.8rem;
}

.service-card__subservices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service-card__sublabel {
  font-size: 0.6875rem;
  color: #516b90;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.service-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.service-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.40rem 0.80rem;
  border-radius: 5px;
  background: var(--color-primary-lightest);
  color: var(--neutral-dark);
  font-family: 'Poppins', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  transition: background 220ms ease;
}

.service-tag:hover {
  background: rgba(107, 104, 202, 0.18);
}

.add-specialty-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: center;
  padding: 0.75rem 1.5rem;
  border: 2px dashed rgba(62, 58, 166, 0.4);
  border-radius: 0.75rem;
  background: transparent;
  color: #3e3aa6;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 220ms ease,
    background 220ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.add-specialty-btn:hover {
  border-color: rgba(62, 58, 166, 0.7);
  background: rgba(62, 58, 166, 0.04);
  transform: translateY(-0.1rem);
}

.add-specialty-btn img {
  width: 1.125rem;
  height: 1.125rem;
  opacity: 0.75;
}

.portfolio {
  padding: 2.5rem 0;
  background: var(--color-neutral-light-lightest);
}

.portfolio__inner {
  width: min(90%, 75rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.portfolio__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.portfolio__subtitle {
  max-width: 36rem;
  text-align: center;
}

.portfolio-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.portfolio-grid__item {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 0.6rem;
  overflow: hidden;
  cursor: pointer;
}

.portfolio-grid__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-grid__overlay {
  position: absolute;
  inset: 0;
  background: rgba(30, 29, 82, 0);
  transition: background 280ms ease;
}

.portfolio-grid__item:hover img {
  transform: scale(1.06);
}

.portfolio-grid__item:hover .portfolio-grid__overlay {
  background: rgba(30, 29, 82, 0.22);
}

.portfolio-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1rem;
  text-align: center;
}

.portfolio-empty__img {
  width: 9rem;
  height: auto;
}

.portfolio-empty h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.portfolio-empty p {
  font-size: 0.875rem;
  color: #516b90;
  margin: 0;
  max-width: 22rem;
}

.add-work-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border: 2px solid var(--color-primary-darkest);
  border-radius: 0.75rem;
  background: #fff;
  color: var(--color-primary-darkest);
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0.25rem 0.75rem rgba(62, 58, 166, 0.1);
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 240ms ease,
    background 220ms ease,
    border-color 220ms ease;
}

.add-work-btn:hover {
  transform: translateY(-0.1rem);
  background: rgba(62, 58, 166, 0.04);
  border-color: #3e3aa6;
  box-shadow: 0 0.5rem 1.25rem rgba(62, 58, 166, 0.15);
}

.add-work-btn__plus {
  font-size: 1.1rem;
  line-height: 1;
  font-weight: 400;
}

.reviews {
  padding: 2.5rem 0;
  background: #fff;
  overflow-x: hidden;
}

.reviews__inner {
  width: min(90%, 75rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.avaliacoes-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.375rem;
  position: relative;
  z-index: 2;
}

.avaliacoes-toolbar span {
  font-size: 0.875rem;
  color: var(--color-neutral-lightest);
}

.depoimentos-layout {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1.5rem;
  align-items: stretch;
  overflow-x: hidden;
}

.depoimentos-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0 0.375rem;
}

.depoimentos-side__quote {
  animation: float-soft 6s ease-in-out infinite;
}

.depoimentos-side__title {
  font-size: 1.5rem;
  line-height: 1.1;
  font-weight: 600;
  color: var(--color-neutral-dark);
  max-width: 7.5rem;
  margin-top: 1.25rem;
}

.depoimentos-side__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.avaliacoes-carousel {
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  padding-top: 0.375rem;
  touch-action: pan-y;
  cursor: grab;
  -webkit-user-select: none;
  user-select: none;
}

.avaliacoes-carousel:active {
  cursor: grabbing;
}

.avaliacoes-track {
  display: flex;
  gap: 0.875rem;
  will-change: transform;
}

.avaliacao-card {
  flex: 0 0 calc((100% - 1.75rem) / 3);
  min-width: 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-neutral-light-white);
  border: 0.0625rem solid var(--color-neutral-light-light);
  border-radius: 0.75rem;
  padding: 1rem 0.875rem 0.875rem;
  min-height: 18.5rem;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
  user-select: none;
  -webkit-user-select: none;
}

.avaliacao-card:hover {
  transform: translateY(-0.1875rem);
  border-color: color-mix(in srgb, var(--color-primary-lightest) 65%, white);
}

.carousel-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  border-radius: 999rem;
  padding: 0;
  cursor: pointer;
  transition:
    transform 180ms ease,
    opacity 180ms ease,
    background 180ms ease,
    box-shadow 220ms ease;
}

.carousel-arrow:hover:not(.disabled) {
  transform: translateX(0.0625rem) translateY(-0.0625rem);
}

.carousel-arrow.disabled {
  cursor: not-allowed;
  opacity: 0.45;
  box-shadow: none;
}

.carousel-progress {
  width: 6.875rem;
  height: 0.1875rem;
  background: var(--color-neutral-light-medium);
  border-radius: 9999rem;
  overflow: hidden;
}

.carousel-progress__fill {
  height: 100%;
  background: linear-gradient(90deg,
      var(--color-primary-medium) 0%,
      color-mix(in srgb, var(--color-primary-light) 72%, white) 100%);
  border-radius: 9999rem;
  transition: width 220ms ease;
}

.avaliacao-card__quote {
  position: absolute;
  top: 0.75rem;
  right: 0.875rem;
}

.avaliacao-card__stars {
  display: flex;
  gap: 0.1875rem;
  margin-bottom: 0.875rem;
}

.avaliacao-card__text {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-neutral-medium);
  margin-bottom: 1.125rem;
  flex: 1 1 auto;
}

.avaliacao-card__author {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding-top: 0.875rem;
  border-top: 0.0625rem solid var(--color-neutral-light-light);
  margin-top: auto;
}

.author-avatar {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999rem;
  object-fit: cover;
  flex-shrink: 0;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
}

.author-date {
  font-size: 0.8125rem;
  color: var(--color-neutral-lightest);
}

.star-icon {
  display: block;
  flex-shrink: 0;
  transition: transform 180ms ease, filter 220ms ease;
}

.star-icon--small {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 67.5rem) {
  .depoimentos-layout {
    grid-template-columns: 1fr;
  }

  .depoimentos-side {
    gap: 1rem;
  }

  .depoimentos-side__title {
    max-width: none;
  }

  .avaliacoes-carousel {
    overflow: hidden;
  }

  .avaliacao-card {
    flex: 0 0 calc(100% - 2.75rem);
    min-height: 19rem;
  }

  .carousel-progress {
    width: 100%;
  }
}

@media (max-width: 48rem) {
  .request-item {
    flex-wrap: wrap;
    gap: 0.875rem;
    padding: 1rem 1.125rem;
  }

  .request-item__avatar-wrap {
    width: 4.5rem;
    height: 4.5rem;
  }

  .respond-btn {
    flex: 0 0 100%;
    padding: 0.625rem 1rem;
    justify-content: center;
  }
}

@keyframes float-soft {

  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -0.3125rem, 0);
  }
}

@keyframes heroFloat {

  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -0.5rem, 0) scale(1.03);
  }
}

@keyframes pulseStatus {

  0%,
  100% {
    transform: scaleY(1);
    opacity: 1;
  }

  50% {
    transform: scaleY(1.1);
    opacity: 0.82;
  }
}

@media (min-width: 768px) {
  .provider-main {
    padding-top: 0;
  }

  .hero {
    align-items: center;
    width: min(90%, 75rem);
    min-height: 31.25rem;
    margin: 2rem auto 0;
    padding: 3rem;
    border-radius: 1.5rem;
    background: linear-gradient(110deg, #1a1848 0%, #2c2980 38%, #4a47bb 68%, #6b68d8 100%);
  }

  .hero__photo {
    top: 50%;
    width: auto;
    height: 100%;
    transform: translateY(-50%);
    object-fit: unset;
    object-position: unset;
    mask-image: linear-gradient(to right, transparent 0%, black 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 100%);
  }

  .hero__content {
    max-width: 41.625rem;
    gap: 3rem;
    justify-content: center;
  }

  .hero__title {
    max-width: 41.625rem;
    font-size: 2.5rem;
    line-height: 3.4375rem;
  }

  .pv-section-title {
    font-size: 2rem;
  }

  .pv-section-subtitle {
    font-size: 1rem;
    max-width: 40rem;
  }

  .profile-stats {
    padding: 3.5rem 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    overflow: visible;
    padding: 0.5rem 0;
    gap: 1rem;
  }

  .stat-card {
    flex: unset;
    min-height: 9.5rem;
    padding: 1.5rem 1rem;
    gap: 0.75rem;
  }

  .stat-card__icon-wrap {
    width: 3.5rem;
    height: 3.5rem;
  }

  .stat-card__icon {
    width: 1.375rem;
    height: 1.375rem;
  }

  .stat-card__value {
    font-size: 2rem;
  }

  .stat-card__label {
    font-size: 0.75rem;
  }

  .received-requests {
    padding: 3.5rem 0;
  }

  .request-item {
    padding: 1.25rem 1.5rem;
    gap: 1.25rem;
  }

  .request-item__avatar {
    width: 6.5rem;
    height: 6.5rem;
  }

  .request-item__name {
    font-size: 1rem;
  }

  .services-offered {
    padding: 3.5rem 0;
  }

  .service-card {
    padding: 1.5rem;
  }

  .service-card__icon-wrap {
    width: 3.5rem;
    height: 3.5rem;
  }

  .service-card__icon-circle {
    width: 2.75rem;
    height: 2.75rem;
  }

  .service-card__icon-circle img {
    width: 1.375rem;
    height: 1.375rem;
  }

  .service-card__name {
    font-size: 1.125rem;
  }

  .portfolio {
    padding: 3.5rem 0;
  }

  .portfolio-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .reviews {
    padding: 3.5rem 0;
  }
}

@media (hover: none) {

  .stat-card:hover,
  .request-item:hover,
  .service-card:hover,
  .avaliacao-card:hover,
  .respond-btn:hover,
  .edit-btn:hover,
  .add-specialty-btn:hover,
  .add-work-btn:hover,
  .carousel-arrow:hover:not(.disabled),
  .sort-select:hover,
  .sort-menu__item:hover {
    transform: none;
  }

  .avaliacao-card:hover {
    border-color: var(--color-neutral-light-light);
    box-shadow: none;
  }

  .avaliacoes-carousel,
  .avaliacao-card,
  .avaliacao-card__text {
    -webkit-user-select: none;
    user-select: none;
  }

  .portfolio-grid__item:hover img {
    transform: none;
  }

  .portfolio-grid__item:hover .portfolio-grid__overlay {
    background: rgba(30, 29, 82, 0);
  }
}

@media (prefers-reduced-motion: reduce) {

  .pv-reveal,
  .hero__ambient,
  .status-dot--waiting,
  .stat-card,
  .stat-card__icon-wrap,
  .service-card,
  .service-card__icon-wrap,
  .request-item,
  .respond-btn,
  .edit-btn,
  .add-specialty-btn,
  .add-work-btn,
  .portfolio-grid__item img,
  .portfolio-grid__overlay,
  .avaliacao-card,
  .avaliacoes-track,
  .carousel-arrow,
  .carousel-progress__fill,
  .depoimentos-side__quote,
  .sort-select,
  .sort-select__icon,
  .sort-menu,
  .sort-menu__item,
  .service-tag {
    animation: none !important;
    transition: none !important;
  }

  .pv-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
