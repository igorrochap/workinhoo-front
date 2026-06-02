<script setup lang="ts">
import { computed, ref } from 'vue'
import LoggedHeader from '@/components/LoggedHeader.vue'
import LoggedFooter from '@/components/LoggedFooter.vue'

import eletricistaImg from '@/assets/images/eletricista.jpg'
import mecanicoImg from '@/assets/images/mecanico.jpg'
import tatuadorImg from '@/assets/images/tatuador.jpg'

import servicosResidenciaisImg from '@/assets/images/servicos-residenciais.png'
import construcaoReparosImg from '@/assets/images/construcao-reparos.png'
import servicosDomesticosImg from '@/assets/images/servicos-domesticos.png'
import belezaBemEstarImg from '@/assets/images/beleza-bemestar.png'
import saudeQualidadeImg from '@/assets/images/saude-qualidade.png'
import criativosDigitaisImg from '@/assets/images/criativos-digitais.png'
import educacaoConsultoriaImg from '@/assets/images/educacao-consultoria.png'
import tecnicosEspecializadosImg from '@/assets/images/tecnicos-especializados.png'
import transporteLogisticaImg from '@/assets/images/transporte-logistica.png'
import eventosOutrosImg from '@/assets/images/eventos-outros.png'

import setaCategorias from '@/assets/icons/seta-categorias.svg'
import setaCategoriasVerTodos from '@/assets/icons/seta-categorias-vertodos.svg'
import estrelaPrestadorImg from '@/assets/icons/estrela-avaliacao.svg'
import pinLocalizacaoImg from '@/assets/icons/pin-localizacao.svg'
import setaCarrosselImg from '@/assets/icons/seta-carrossel.svg'
import prestadoresVazioImg from '@/assets/images/prestadores-vazio.png'
import solicitacoesVazioImg from '@/assets/images/solicitacoes-vazio.svg'

import criePerfilIcon from '@/assets/icons/crie-perfil.svg'
import divulgueIcon from '@/assets/icons/divulgue.svg'
import alcanceIcon from '@/assets/icons/alcance.svg'

import anaImg from '@/assets/images/ana-tecnicoinfo.svg'
import wellingtonImg from '@/assets/images/wellington-tatuador.svg'
import sandroImg from '@/assets/images/sandro-fotografo.svg'
import joaoImg from '@/assets/images/joao-pedreiro.svg'
import albertoImg from '@/assets/images/alberto-cozinheiro.svg'
import pauloImg from '@/assets/images/paulo-vidraceiro.png'

const menuCategoriasIndex = ref(0)
const categoriasPorPaginaDesktop = 7
const cardsPorVezDesktop = 5
const cardCentralIndex = ref(2)

const categorias = [
  { nome: 'Serviços Residenciais', quantidade: '7 prestadores', imagem: servicosResidenciaisImg },
  { nome: 'Construção e Reparos', quantidade: '18 prestadores', imagem: construcaoReparosImg },
  { nome: 'Serviços Domésticos', quantidade: '6 prestadores', imagem: servicosDomesticosImg },
  { nome: 'Beleza e Bem-estar', quantidade: '5 prestadores', imagem: belezaBemEstarImg },
  { nome: 'Saúde e Qualidade de Vida', quantidade: '6 prestadores', imagem: saudeQualidadeImg },
  { nome: 'Criativos e Digitais', quantidade: '7 prestadores', imagem: criativosDigitaisImg },
  { nome: 'Educação e Consultoria', quantidade: '6 prestadores', imagem: educacaoConsultoriaImg },
  { nome: 'Técnicos Especializados', quantidade: '11 prestadores', imagem: tecnicosEspecializadosImg },
  { nome: 'Transporte e Logística', quantidade: '8 prestadores', imagem: transporteLogisticaImg },
  { nome: 'Eventos e Outros', quantidade: '4 prestadores', imagem: eventosOutrosImg },
]

const prestadoresDestaque = [
  { nome: 'Ana Maria', profissao: 'Técnico(a) em Informática', nota: '5.0', avaliacoes: '67 avaliações', servicos: '84 serv. aceitos', localizacao: 'Maceió - AL', imagem: anaImg },
  { nome: 'Wellington Soares', profissao: 'Tatuador(a)', nota: '4.9', avaliacoes: '63 avaliações', servicos: '87 serv. aceitos', localizacao: 'Maceió - AL', imagem: wellingtonImg },
  { nome: 'Sandro Ribeiro', profissao: 'Fotógrafo(a)', nota: '4.9', avaliacoes: '67 avaliações', servicos: '98 serv. aceitos', localizacao: 'Maceió - AL', imagem: sandroImg },
  { nome: 'João Carlos', profissao: 'Pedreiro(a)', nota: '4.9', avaliacoes: '80 avaliações', servicos: '40 serv. aceitos', localizacao: 'Maceió - AL', imagem: joaoImg },
  { nome: 'Alberto Ferreira', profissao: 'Cozinheiro(a)', nota: '4.9', avaliacoes: '84 avaliações', servicos: '81 serv. aceitos', localizacao: 'Maceió - AL', imagem: albertoImg },
  { nome: 'Paulo Almeida', profissao: 'Vidraceiro(a)', nota: '4.8', avaliacoes: '52 avaliações', servicos: '60 serv. aceitos', localizacao: 'Maceió - AL', imagem: pauloImg },
]

const solicitacoesRecentes = [
  {
    nome: 'Carlos Henrique',
    profissao: 'Eletricista',
    servico: 'Instalação elétrica residencial',
    data: '12/04/2024',
    status: 'Contato iniciado',
    imagem: eletricistaImg,
  },
  {
    nome: 'Pedro Augusto',
    profissao: 'Mecânico(a)',
    servico: 'Revisão de bateria e alternador',
    data: '10/05/2025',
    status: 'Contato iniciado',
    imagem: mecanicoImg,
  },
  {
    nome: 'Ana Maria',
    profissao: 'Técnico(a) em informática',
    servico: 'Aula de informática',
    data: '24/04/2024',
    status: 'Serviço concluído',
    imagem: anaImg,
  },
  {
    nome: 'Paulo Almeida',
    profissao: 'Vidraceiro(a)',
    servico: 'Instalação de box para banheiro',
    data: '08/04/2024',
    status: 'Contato iniciado',
    imagem: pauloImg,
  },
  {
    nome: 'César Rodrigues',
    profissao: 'Barbeiro(a)',
    servico: 'Corte de cabelo',
    data: '04/03/2025',
    status: 'Serviço concluído',
    imagem: tatuadorImg,
  },
]

const beneficiosPrestador = [
  {
    titulo: 'Crie um perfil profissional',
    texto: 'Monte seu perfil e apresente suas habilidades para novos clientes.',
    icone: criePerfilIcon,
    classe: 'provider-benefit--green',
  },
  {
    titulo: 'Divulgue seus serviços',
    texto: 'Mostre seus serviços de forma simples e aumente sua visibilidade.',
    icone: divulgueIcon,
    classe: 'provider-benefit--yellow',
  },
  {
    titulo: 'Alcance clientes da sua região',
    texto: 'Conecte-se com pessoas próximas que estão em busca de profissionais como você.',
    icone: alcanceIcon,
    classe: 'provider-benefit--red',
  },
]

const podeVoltarCategorias = computed(() => menuCategoriasIndex.value > 0)
const podeAvancarCategorias = computed(
  () => menuCategoriasIndex.value + categoriasPorPaginaDesktop < categorias.length,
)

const categoriasVisiveisDesktop = computed(() =>
  categorias.slice(
    menuCategoriasIndex.value,
    menuCategoriasIndex.value + categoriasPorPaginaDesktop,
  ),
)

const prestadoresVisiveis = computed(() => {
  const inicio = Math.max(0, cardCentralIndex.value - Math.floor(cardsPorVezDesktop / 2))
  const fim = inicio + cardsPorVezDesktop
  return prestadoresDestaque.slice(inicio, Math.min(fim, prestadoresDestaque.length))
})

const podeVoltarPrestadores = computed(() => cardCentralIndex.value > 2)
const podeAvancarPrestadores = computed(() => cardCentralIndex.value < prestadoresDestaque.length - 3)

function avancarCategorias() {
  if (!podeAvancarCategorias.value) return
  menuCategoriasIndex.value += 1
}

function voltarCategorias() {
  if (!podeVoltarCategorias.value) return
  menuCategoriasIndex.value -= 1
}

function avancarPrestadores() {
  if (!podeAvancarPrestadores.value) return
  cardCentralIndex.value += 1
}

function voltarPrestadores() {
  if (!podeVoltarPrestadores.value) return
  cardCentralIndex.value -= 1
}

function isCentral(prestador: (typeof prestadoresDestaque)[0]) {
  return prestadoresVisiveis.value[Math.floor(cardsPorVezDesktop / 2)]?.nome === prestador.nome
}

const temSolicitacoesRecentes = computed(() => solicitacoesRecentes.length > 0)

function isSolicitacaoConcluida(status: string) {
  return status === 'Serviço concluído'
}
</script>

<template>
  <div class="logged-home">
    <LoggedHeader />

    <main class="logged-main">
      <section class="hero">
        <div class="hero__content">
          <p class="hero__greeting">Olá, João!</p>

          <div class="hero__text-group">
            <h2 class="hero__title">Precisa de um serviço? Encontre especialistas em minutos.</h2>
            <p class="hero__subtitle">
              Busque prestadores avaliados, compare perfis e solicite serviços diretamente pela plataforma.
            </p>
          </div>

          <div class="hero__actions">
            <button type="button" class="btn btn--white">Buscar serviços</button>
            <button type="button" class="btn btn--outline-white">Tornar-se Prestador</button>
          </div>
        </div>
      </section>

      <section class="categories">
        <h2 class="section-title">Categorias de Serviços</h2>

        <div class="categories__mobile">
          <div class="categories__track">
            <article v-for="categoria in categorias" :key="categoria.nome" class="category-card">
              <img
                class="category-card__icon"
                :src="categoria.imagem"
                :alt="`Ícone da categoria ${categoria.nome}`"
              />
              <h3>{{ categoria.nome }}</h3>
              <p>{{ categoria.quantidade }}</p>
            </article>
          </div>

          <p class="categories__hint">Deslize para ver mais</p>
        </div>

        <div class="categories__desktop">
          <div class="categories__carousel">
            <button
              type="button"
              class="categories__arrow"
              :class="{ 'categories__arrow--disabled': !podeVoltarCategorias }"
              :disabled="!podeVoltarCategorias"
              aria-label="Voltar categorias"
              @click="voltarCategorias"
            >
              <img :src="setaCategorias" alt="" />
            </button>

            <div class="categories__desktop-track">
              <article
                v-for="categoria in categoriasVisiveisDesktop"
                :key="categoria.nome"
                class="category-card"
              >
                <img
                  class="category-card__icon"
                  :src="categoria.imagem"
                  :alt="`Ícone da categoria ${categoria.nome}`"
                />
                <h3>{{ categoria.nome }}</h3>
                <p>{{ categoria.quantidade }}</p>
              </article>
            </div>

            <button
              type="button"
              class="categories__arrow categories__arrow--next"
              :class="{ 'categories__arrow--disabled': !podeAvancarCategorias }"
              :disabled="!podeAvancarCategorias"
              aria-label="Avançar categorias"
              @click="avancarCategorias"
            >
              <img :src="setaCategorias" alt="" />
            </button>
          </div>
        </div>

        <a href="#" class="section-link">
          <span>Ver todos</span>
          <img :src="setaCategoriasVerTodos" alt="" />
        </a>
      </section>

      <section class="featured">
        <div class="section-header section-header--center">
          <h2 class="section-title">
            Prestadores <em>em destaque</em>
          </h2>
          <p class="section-subtitle">Baseado em avaliações e serviços concluídos</p>
        </div>

        <template v-if="prestadoresDestaque.length > 0">
          <div class="featured__mobile">
            <div class="featured__track">
              <article
                v-for="prestador in prestadoresDestaque"
                :key="prestador.nome"
                class="provider-card"
              >
                <div class="provider-card__info">
                  <div class="provider-card__photo-group">
                    <div class="provider-card__avatar">
                      <img
                        class="provider-card__photo"
                        :src="prestador.imagem"
                        :alt="`Foto de ${prestador.nome}`"
                        width="75"
                        height="75"
                        loading="lazy"
                      />
                    </div>

                    <div class="provider-card__name-group">
                      <h3>{{ prestador.nome }}</h3>
                      <p class="provider-card__role">{{ prestador.profissao }}</p>
                    </div>
                  </div>

                  <div class="provider-card__meta">
                    <div class="provider-card__meta-item">
                      <div class="provider-card__meta-icon provider-card__meta-icon--star">
                        <img :src="estrelaPrestadorImg" alt="" />
                      </div>
                      <div class="provider-card__meta-text">
                        <span class="provider-card__meta-value">{{ prestador.nota }}</span>
                        <span class="provider-card__meta-label">{{ prestador.avaliacoes }}</span>
                      </div>
                    </div>

                    <div class="provider-card__meta-item">
                      <div class="provider-card__meta-icon provider-card__meta-icon--pin">
                        <img :src="pinLocalizacaoImg" alt="" />
                      </div>
                      <div class="provider-card__meta-text">
                        <span class="provider-card__meta-value">{{ prestador.localizacao }}</span>
                        <span class="provider-card__meta-label">{{ prestador.servicos }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="provider-card__divider" />

                <div class="provider-card__actions">
                  <button type="button" class="provider-card__btn provider-card__btn--primary">
                    Ver perfil
                  </button>
                </div>
              </article>
            </div>
          </div>

          <div class="featured__desktop">
            <div class="featured__desktop-track">
              <article
                v-for="prestador in prestadoresVisiveis"
                :key="prestador.nome"
                class="provider-card"
                :class="{ 'provider-card--central': isCentral(prestador) }"
              >
                <div class="provider-card__info">
                  <div class="provider-card__photo-group">
                    <div class="provider-card__avatar">
                      <img
                        class="provider-card__photo"
                        :src="prestador.imagem"
                        :alt="`Foto de ${prestador.nome}`"
                        loading="lazy"
                      />
                    </div>

                    <div class="provider-card__name-group">
                      <h3>{{ prestador.nome }}</h3>
                      <p class="provider-card__role">{{ prestador.profissao }}</p>
                    </div>
                  </div>

                  <div class="provider-card__meta">
                    <div class="provider-card__meta-item">
                      <div class="provider-card__meta-icon provider-card__meta-icon--star">
                        <img :src="estrelaPrestadorImg" alt="" />
                      </div>
                      <div class="provider-card__meta-text">
                        <span class="provider-card__meta-value">{{ prestador.nota }}</span>
                        <span class="provider-card__meta-label">{{ prestador.avaliacoes }}</span>
                      </div>
                    </div>

                    <div class="provider-card__meta-item">
                      <div class="provider-card__meta-icon provider-card__meta-icon--pin">
                        <img :src="pinLocalizacaoImg" alt="" />
                      </div>
                      <div class="provider-card__meta-text">
                        <span class="provider-card__meta-value">{{ prestador.localizacao }}</span>
                        <span class="provider-card__meta-label">{{ prestador.servicos }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="provider-card__divider" />

                <div class="provider-card__actions">
                  <button type="button" class="provider-card__btn provider-card__btn--primary">
                    Ver perfil
                  </button>
                  <button type="button" class="provider-card__btn provider-card__btn--outline">
                    Solicitar serviço
                  </button>
                </div>
              </article>
            </div>

            <div class="featured__nav">
              <button
                type="button"
                class="featured__nav-btn featured__nav-btn--prev"
                :disabled="!podeVoltarPrestadores"
                aria-label="Voltar prestadores"
                @click="voltarPrestadores"
              >
                <img :src="setaCarrosselImg" alt="" />
              </button>

              <button
                type="button"
                class="featured__nav-btn featured__nav-btn--next"
                :disabled="!podeAvancarPrestadores"
                aria-label="Avançar prestadores"
                @click="avancarPrestadores"
              >
                <img :src="setaCarrosselImg" alt="" />
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="featured__empty">
            <h3 class="featured__empty-title">Ainda não temos prestadores em destaque</h3>
            <p class="featured__empty-text">
              Estamos cadastrando novos profissionais na plataforma. Em breve você encontrará os
              melhores prestadores da sua região aqui.
            </p>
            <img
              :src="prestadoresVazioImg"
              alt="Nenhum prestador em destaque"
              class="featured__empty-img"
            />
            <button
              type="button"
              class="provider-card__btn provider-card__btn--primary featured__empty-cta"
            >
              Quero ser prestador
            </button>
          </div>
        </template>
      </section>

      <section class="requests">
        <div class="requests__inner">
          <div class="requests__header">
            <div class="requests__heading">
              <h2 class="section-title section-title--left">Solicitações recentes</h2>
              <p class="section-subtitle section-subtitle--left">
                Acompanhe suas últimas solicitações
              </p>
            </div>

            <a v-if="temSolicitacoesRecentes" href="#" class="requests__more">Ver mais &gt;</a>
          </div>

          <template v-if="solicitacoesRecentes.length > 0">
            <div class="requests__grid">
              <article
                v-for="solicitacao in solicitacoesRecentes"
                :key="`${solicitacao.nome}-${solicitacao.data}`"
                class="request-card"
              >
                <div class="request-card__top">
                  <div class="request-card__person">
                    <img
                      :src="solicitacao.imagem"
                      :alt="`Foto de ${solicitacao.nome}`"
                      class="request-card__avatar"
                    />
                    <button type="button" class="request-card__profile-btn">Ver perfil</button>
                  </div>

                  <div class="request-card__identity">
                    <h3>{{ solicitacao.nome }}</h3>
                    <p class="request-card__role">{{ solicitacao.profissao }}</p>
                  </div>
                </div>

                <div class="request-card__content">
                  <span class="request-card__service">{{ solicitacao.servico }}</span>
                  <span class="request-card__date">{{ solicitacao.data }}</span>
                </div>

                <hr class="request-card__divider" />

                <div class="request-card__footer">
                  <div
                    class="request-card__status-wrap"
                    :class="{
                      'request-card__status-wrap--done': isSolicitacaoConcluida(solicitacao.status),
                    }"
                  >
                    <span class="request-card__status-bar"></span>
                    <span class="request-card__status-text">{{ solicitacao.status }}</span>
                  </div>

                  <button type="button" class="request-card__details">Detalhes</button>
                </div>
              </article>
            </div>
          </template>

          <template v-else>
            <div class="requests__empty">
              <img
                :src="solicitacoesVazioImg"
                alt="Nenhuma solicitação recente"
                class="requests__empty-img"
              />

              <div class="requests__empty-content">
                <h3>Você ainda não entrou em contato com nenhum profissional.</h3>
                <p>Explore serviços e encontre prestadores agora mesmo.</p>
                <button type="button" class="requests__empty-btn">Buscar serviços</button>
              </div>
            </div>
          </template>
        </div>
      </section>

      <section class="provider-cta">
        <div class="provider-cta__inner">
          <div class="provider-cta__heading">
            <h2 class="provider-cta__title">
              Transforme sua habilidade em
              <span class="provider-cta__highlight">oportunidades</span>
            </h2>
            <p class="provider-cta__subtitle">
              Cadastre seu perfil e conecte-se com clientes de forma simples e rápida
            </p>
          </div>

          <div class="provider-cta__cards">
            <article
              v-for="beneficio in beneficiosPrestador"
              :key="beneficio.titulo"
              class="provider-benefit"
              :class="beneficio.classe"
            >
              <div class="provider-benefit__icon-wrap">
                <img :src="beneficio.icone" :alt="beneficio.titulo" />
              </div>

              <div class="provider-benefit__text">
                <h3>{{ beneficio.titulo }}</h3>
                <p>{{ beneficio.texto }}</p>
              </div>
            </article>
          </div>

          <button type="button" class="provider-cta__btn">Quero ser prestador &gt;</button>
        </div>
      </section>
    </main>

    <LoggedFooter />
  </div>
</template>

<style scoped>
.logged-home {
  min-height: 100vh;
  background-color: var(--color-neutral-light-lightest);
}

.logged-main {
  padding: 2rem 0 0;
}

.hero,
.categories,
.featured,
.requests__inner,
.provider-cta__inner {
  width: min(90%, 75rem);
  margin: 0 auto;
}

.categories,
.featured,
.requests {
  padding: 3rem 0 0;
}

.section-header {
  display: flex;
  gap: 0.75rem;
}

.section-header--center {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-header--between {
  flex-direction: column;
  align-items: flex-start;
}

.section-title {
  margin: 0;
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: normal;
  text-align: center;
}

.section-title em {
  font-style: normal;
  color: #3e3aa6;
}

.section-title--left {
  text-align: left;
}

.section-subtitle {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
}

.section-subtitle--left {
  text-align: left;
}

.section-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: normal;
}

.section-link img {
  width: 0.375rem;
  height: 0.5625rem;
}

/* Hero */

.hero {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  min-height: 31.25rem;
  border-radius: 1rem;
  background:
    linear-gradient(270deg, rgba(51, 48, 136, 0.9) 22.49%, rgba(30, 29, 82, 0.96) 134.64%),
    url('@/assets/images/loggedHomeHero.png');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
  color: #fff;
  overflow: hidden;
}

.hero__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  gap: 1.5rem;
}

.hero__greeting {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
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
}

.hero__subtitle {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: #ffffff;
}

.hero__actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

/* Botões base */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  border: none;
}

.hero .btn {
  width: 100%;
}

.hero .btn--white {
  background: #fff;
  color: #333088;
  border: 2px solid #fff;
}

.hero .btn--outline-white {
  background: transparent;
  color: #fff;
  border: 2px solid #fff !important;
}

/* Categories */

.categories {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.categories__mobile {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;
  width: 100%;
}

.categories__desktop {
  display: none;
}

.categories__track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 0.75rem 1rem;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.categories__track::-webkit-scrollbar {
  display: none;
}

.category-card {
  flex: 0 0 6.6009rem;
  width: 6.6009rem;
  min-height: 5.9408rem;
  padding: 0.6601rem 0.99rem;
  border-radius: 0.5281rem;
  background: #fff;
  box-shadow: 0 0 0.4951rem 0.165rem rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.264rem;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;
}

.category-card__icon {
  width: 2.6404rem;
  height: 2.6404rem;
  object-fit: contain;
  flex-shrink: 0;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.category-card h3 {
  margin: 0;
  color: #516b90;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.5281rem;
  font-weight: 600;
  line-height: normal;
}

.category-card p {
  margin: 0;
  color: #aebdd5;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.3961rem;
  font-weight: 500;
  line-height: normal;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.category-card:hover {
  transform: translateY(-0.15rem);
  box-shadow: 0 0.35rem 1rem rgba(0, 0, 0, 0.08);
}

.category-card:hover .category-card__icon {
  transform: scale(1.08);
  filter: brightness(0) saturate(100%) invert(24%) sepia(27%) saturate(3262%) hue-rotate(227deg)
    brightness(93%) contrast(96%);
}

.category-card:hover p {
  transform: scale(1.08);
  color: #3e3aa6;
}

.categories__hint {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 1.25rem;
  color: #516b90;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: normal;
}

/* Featured */

.featured {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.featured__mobile {
  width: 100%;
}

.featured__desktop {
  display: none;
}

.featured__track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.featured__track::-webkit-scrollbar {
  display: none;
}

.provider-card {
  flex: 0 0 12.5rem;
  width: 12.5rem;
  padding: 1rem;
  border-radius: 0.6637rem;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.provider-card__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.provider-card__photo-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.provider-card__avatar {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  border: 2.5px solid #3e3aa6;
  padding: 3px;
  background: #fff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

.provider-card__photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

.provider-card__name-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  text-align: center;
}

.provider-card__name-group h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  white-space: nowrap;
}

.provider-card__role {
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  color: #516b90;
  margin: 0;
  white-space: nowrap;
}

.provider-card__meta {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0.25rem;
}

.provider-card__meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  flex: 1;
}

.provider-card__meta-icon {
  display: flex;
  width: 1.75rem;
  height: 1.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.provider-card__meta-icon--star {
  background: #fad189;
}

.provider-card__meta-icon--pin {
  background: #e7f4e8;
}

.provider-card__meta-icon img {
  width: 0.9rem;
  height: 0.9rem;
  object-fit: contain;
}

.provider-card__meta-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.provider-card__meta-value {
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
}

.provider-card__meta-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  color: #778191;
  white-space: nowrap;
}

.provider-card__divider {
  width: 100%;
  height: 1px;
  background: #aebdd5;
  border: none;
  margin: 0;
}

.provider-card__actions {
  display: flex;
  gap: 0.4rem;
  width: 100%;
}

.provider-card__btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 0.3rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}

.provider-card__btn--primary {
  background: #3e3aa6;
  color: #fff;
}

.provider-card__btn--outline {
  background: transparent;
  color: #27256a;
  border: 1px solid #27256a;
}

.featured__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 1.5rem 1rem;
}

.featured__empty-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.featured__empty-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  color: #33445b;
  max-width: 20rem;
}

.featured__empty-img {
  width: 10rem;
  height: auto;
}

.featured__empty-cta {
  margin-top: 0.5rem;
  flex: unset;
  width: auto;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
}

/* Requests */

.requests {
  background: #e4e9f1;
}

.requests__header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.requests__heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
}

.requests__heading .section-title,
.requests__heading .section-subtitle {
  margin: 0;
}

.requests__more {
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: flex-start;
}

.requests__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1rem;
}

.requests__more {
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.requests__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
}

.request-card {
  display: flex;
  padding: 0.98rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background: #fff;
}

.request-card__top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
}

.request-card__person {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.request-card__avatar {
  width: 3.658rem;
  height: 3.658rem;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1.5px solid #3e3aa6;
  object-fit: cover;
  background: #fff;
}

.request-card__profile-btn {
  display: inline-flex;
  padding: 0.375rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.468rem;
  border: 1px solid #27256a;
  background: transparent;
  color: #27256a;
  font-family: 'Poppins', sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  white-space: nowrap;
}

.request-card__identity {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  width: 100%;
}

.request-card__identity h3 {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: normal;
}

.request-card__role {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
}

.request-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  width: 100%;
}

.request-card__service {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: #d9d7f5;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: normal;
}

.request-card__date {
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.45rem;
  border-radius: 0.25rem;
  background: #d9d7f5;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.625rem;
  font-weight: 500;
  line-height: normal;
}

.request-card__divider {
  width: 100%;
  height: 0.033rem;
  background: #aebdd5;
  border: none;
  margin: 0;
}

.request-card__footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.request-card__status-wrap {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
}

.request-card__status-bar {
  width: 0.49rem;
  height: 1.306rem;
  border-radius: 0.78rem;
  background: #f8ba4f;
  flex-shrink: 0;
}

.request-card__status-wrap--done .request-card__status-bar {
  background: #3ac0a0;
}

.request-card__status-text {
  color: #425876;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0.72rem;
}

.request-card__details {
  display: inline-flex;
  padding: 0.537rem 0.896rem;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.448rem;
  background: #3e3aa6;
  box-shadow: 0 0 0.672rem 0 rgba(0, 0, 0, 0.1);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  white-space: nowrap;
}

.requests__empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  width: 100%;
}

.requests__empty-img {
  display: none;
}

.requests__empty-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  width: 100%;
}

.requests__empty-content h3 {
  margin: 0;
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 2.375rem;
}

.requests__empty-content p {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
}

.requests__empty-btn {
  display: inline-flex;
  width: 100%;
  min-height: 3rem;
  padding: 0.875rem 1.5rem;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  background: #3e3aa6;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
}

/* Provider CTA */

.provider-cta {
  padding: 3rem 0;
  background-color: var(--color-neutral-light-lightest);
}

.provider-cta__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem 0;
}

.provider-cta__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.provider-cta__title {
  margin: 0;
  max-width: 48.875rem;
  color: #1f2937;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.25;
}

.provider-cta__highlight {
  display: block;
  color: #3e3aa6;
  font-size: clamp(2rem, 4.3vw, 2.625rem);
  font-weight: 600;
  line-height: 1.2;
}

.provider-cta__subtitle {
  margin: 0;
  color: #33445b;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  font-weight: 400;
  line-height: normal;
}

.provider-cta__cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.provider-benefit {
  display: flex;
  width: 100%;
  min-height: 10.5rem;
  padding: 1.75rem 1.5rem;
  align-items: center;
  gap: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 1.125rem 0.138rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.provider-benefit--green {
  background: linear-gradient(90deg, #3ac0a0 0%, #9ee6ce 100%);
}

.provider-benefit--yellow {
  background: linear-gradient(90deg, #f8ba4f 0%, #fad189 100%);
}

.provider-benefit--red {
  background: linear-gradient(90deg, #ff616d 0%, #ffe2e5 100%);
}

.provider-benefit__icon-wrap {
  display: flex;
  width: 3.75rem;
  height: 3.75rem;
  min-width: 3.75rem;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 2.557rem;
  background: #fff;
  box-shadow: 0 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05);
}

.provider-benefit__icon-wrap img {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
}

.provider-benefit__text {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
}

.provider-benefit__text h3 {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
}

.provider-benefit__text p {
  margin: 0;
  color: #33445b;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
}

.provider-cta__btn {
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 2px solid #27256a;
  background: transparent;
  color: #27256a;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.18s ease, color 0.18s ease;
}

.provider-cta__btn:hover {
  background: #27256a;
  color: #fff;
}

@media (min-width: 768px) {
  .section-header--between {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .hero {
    align-items: center;
    min-height: 31.25rem;
    margin-top: 2rem;
    padding: 3rem;
    border-radius: 1.5rem;
    background:
      linear-gradient(
        100deg,
        rgba(30, 29, 82, 1) 35%,
        rgba(51, 48, 136, 0.96) 50%,
        rgba(51, 48, 136, 0.82) 55%,
        rgba(62, 58, 166, 0.45) 70%,
        rgba(62, 58, 166, 0.18) 90%,
        rgba(62, 58, 166, 0.12) 100%
      ),
      url('@/assets/images/loggedHomeHero.png');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: auto 115%;
  }

  .hero__content {
    max-width: 41.625rem;
    gap: 3rem;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .hero__title {
    max-width: 41.625rem;
    font-size: 2.5rem;
    line-height: 3.4375rem;
  }

  .hero__subtitle {
    max-width: 36.875rem;
    font-size: 1.125rem;
    line-height: 1.875rem;
  }

  .hero__actions {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: auto;
  }

  .hero .btn {
    width: auto;
  }

  .categories {
    padding-bottom: 2rem;
    gap: 1rem;
  }

  .categories__mobile {
    display: none;
  }

  .categories__desktop {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .categories__carousel {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 0.575rem 0;
  }

  .categories__desktop-track {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 1rem;
    flex: 1;
  }

  .categories__arrow {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    background: #3e3aa6;
    box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  .categories__arrow img {
    width: 1.25rem;
    height: 1.1875rem;
  }

  .categories__arrow--next img {
    transform: rotate(180deg);
  }

  .categories__arrow--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .category-card {
    flex: unset;
    width: 100%;
    min-height: 8.5rem;
    padding: 1rem 0.875rem;
    border-radius: 0.75rem;
    gap: 0.5rem;
  }

  .category-card__icon {
    width: 3.25rem;
    height: 3.25rem;
  }

  .category-card h3 {
    font-size: 0.72rem;
  }

  .category-card p {
    font-size: 0.58rem;
  }

  .section-link {
    gap: 0.75rem;
    font-size: 1.25rem;
  }

  .section-link img {
    width: 0.5rem;
    height: 0.75rem;
  }

  .featured {
    width: min(92%, 82rem);
    margin: 0 auto;
    padding-top: 3.5rem;
  }

  .featured__mobile {
    display: none;
  }

  .featured__desktop {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }

  .featured__desktop-track {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    width: 100%;
    padding: 1rem 3rem;
    box-sizing: border-box;
    overflow: visible;
  }

  .featured__desktop .provider-card {
    display: flex;
    width: 14rem;
    min-width: 14rem;
    padding: 1.25rem 0.875rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    border-radius: 0.8628rem;
    background: #f5f7fa;
    box-shadow: none;
  }

  .featured__desktop .provider-card--central {
    width: 16rem;
    min-width: 16rem;
    padding: 1.55rem 1.1rem;
    gap: 1.2rem;
    border-radius: 0.9956rem;
    background: #f5f7fa;
    box-shadow: 0 0 1.25rem 0.125rem rgba(86, 86, 86, 0.05);
  }

  .featured__desktop .provider-card__avatar {
    width: 4.75rem;
    height: 4.75rem;
  }

  .featured__desktop .provider-card__btn {
    font-size: 0.62rem;
    padding: 0.5rem 0;
    white-space: nowrap;
    flex: 1;
  }

  .featured__nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
  }

  .featured__nav-btn {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1.5px solid #3e3aa6;
    background: #fff;
    box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s ease;
  }

  .featured__nav-btn img {
    width: 0.8rem;
    height: auto;
    transform: none;
  }

  .featured__nav-btn--prev img {
    transform: rotate(180deg);
  }

  .featured__nav-btn--next img {
    transform: none;
  }

  .featured__nav-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .featured__empty-title {
    font-size: 1.5rem;
  }

  .featured__empty-text {
    max-width: 30rem;
  }

  .featured__empty-img {
    width: 14rem;
  }

  .requests__header {
    align-items: flex-start;
  }

  .requests__heading {
    gap: 0.5rem;
  }

  .requests__more {
    font-size: 1.25rem;
    margin-top: 0.2rem;
  }

  .requests__inner {
    width: min(94%, 84rem);
    gap: 2rem;
    padding: 3rem 2rem;
  }

  .requests__more {
    font-size: 1.25rem;
    align-self: flex-start;
    margin-top: 0.25rem;
  }

  .requests__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .request-card {
    width: 100%;
    min-height: 16.25rem;
    padding: 0.98rem;
    gap: 0.75rem;
    border-radius: 0.5rem;
  }

  .request-card__avatar {
    width: 3.658rem;
    height: 3.658rem;
  }

  .request-card__profile-btn {
    padding: 0.28rem 0.6rem;
    font-size: 0.55rem;
  }

  .request-card__identity h3 {
    font-size: 0.75rem;
  }

  .request-card__role {
    font-size: 0.875rem;
  }

  .request-card__service {
    font-size: 0.65rem;
  }

  .request-card__date {
    font-size: 0.625rem;
  }

  .request-card__status-text {
    font-size: 0.75rem;
    line-height: 0.75rem;
  }

  .request-card__details {
    font-size: 0.6875rem;
    padding: 0.45rem 0.8rem;
  }

  .requests__empty {
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
    width: 100%;
  }

  .requests__empty-img {
    display: block;
    width: 7.5rem;
    height: auto;
    flex-shrink: 0;
  }

  .requests__empty-content {
    max-width: 32rem;
    gap: 0.875rem;
  }

  .requests__empty-content h3 {
    font-size: 2rem;
    line-height: 2.75rem;
  }

  .requests__empty-content p {
    font-size: 1rem;
  }

  .requests__empty-btn {
    width: auto;
    min-width: 0.9rem;
    padding: 0.875rem 1.5rem;
  }

  .provider-cta {
    padding: 3rem 0 4rem;
  }

  .provider-cta__inner {
    width: min(94%, 85rem);
    padding: 1.5rem 2.5rem;
    gap: 4rem;
  }

  .provider-cta__cards {
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem 0;
  }

  .provider-benefit {
    flex: 1 1 0;
    width: 0;
    min-width: 0;
    min-height: 12rem;
    padding: 3rem 2rem;
    gap: 1.5rem;
    align-items: center;
  }

  .provider-benefit__icon-wrap {
    width: 3.75rem;
    height: 3.75rem;
    min-width: 3.75rem;
    flex-shrink: 0;
  }

  .provider-benefit__text {
    flex: 1;
    min-width: 0;
    gap: 0.5rem;
  }

  .provider-benefit__text h3 {
    font-size: 1.125rem;
    line-height: 1.875rem;
  }

  .provider-benefit__text p {
    font-size: 1rem;
    line-height: 1.125rem;
  }

  .provider-cta__btn {
    font-size: 1.2rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>
