<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

const categoriasPopulares = [
  'Eletricistas',
  'Pedreiros',
  'Diaristas',
  'Encanadores',
  'Professores',
  'Mecânicos',
]

let observer: IntersectionObserver | null = null

onMounted(() => {
  const elementosReveal = document.querySelectorAll('.reveal')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visivel')
        }
      })
    },
    {
      threshold: 0.18,
      root: null,
      rootMargin: '0px 0px -40px 0px',
    }
  )

  elementosReveal.forEach((elemento) => observer?.observe(elemento))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <footer class="logged-footer">
    <div class="logged-footer__content">
      <section class="logged-footer__brand reveal">
        <h2>Workinhoo</h2>
        <p>Conectando você a profissionais locais.</p>
      </section>

      <section class="logged-footer__column reveal reveal--delay-1">
        <h3>Navegação</h3>
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#solicitacoes">Solicitações</a></li>
          <li><a href="#">Ajuda</a></li>
          <li><a href="#">Tornar-se prestador</a></li>
        </ul>
      </section>

      <section class="logged-footer__column reveal reveal--delay-2">
        <h3>Categorias populares</h3>
        <ul>
          <li v-for="categoria in categoriasPopulares" :key="categoria">
            <a href="#">{{ categoria }}</a>
          </li>
        </ul>
      </section>

      <section class="logged-footer__column reveal reveal--delay-3">
        <h3>Contato</h3>
        <p class="logged-footer__contact">workinhoo@gmail.com</p>
      </section>
    </div>

    <div class="logged-footer__bottom reveal reveal--delay-4">
      <p>© 2026 Workinhoo. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.logged-footer {
  width: 100%;
  padding: 4rem 4rem 2rem;
  background:
    radial-gradient(circle at top left, rgba(87, 81, 198, 0.12) 0%, transparent 28%),
    radial-gradient(circle at bottom right, rgba(121, 112, 255, 0.08) 0%, transparent 22%),
    linear-gradient(180deg, #18202c 0%, #161d27 100%);
  color: #fff;
  font-family: Poppins, sans-serif;
  position: relative;
  overflow: hidden;
}

.logged-footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0%, transparent 18%, transparent 82%, rgba(255, 255, 255, 0.025) 100%);
  pointer-events: none;
}

.logged-footer__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 82rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 18.4375rem 1fr 1fr 1fr;
  align-items: start;
  column-gap: 4rem;
}

.logged-footer__brand,
.logged-footer__column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logged-footer__brand {
  gap: 0.75rem;
}

.logged-footer__column {
  gap: 0.9rem;
}

.logged-footer__brand h2,
.logged-footer__column h3,
.logged-footer__brand p,
.logged-footer__column ul,
.logged-footer__column li,
.logged-footer__column a,
.logged-footer__contact,
.logged-footer__bottom p {
  margin: 0;
}

.logged-footer__brand h2,
.logged-footer__column h3 {
  position: relative;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.01em;
}

.logged-footer__brand h2::after,
.logged-footer__column h3::after {
  content: '';
  display: block;
  width: 2.25rem;
  height: 0.16rem;
  margin-top: 0.65rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #8c84ff 0%, #b2adff 100%);
  box-shadow: 0 0 18px rgba(140, 132, 255, 0.28);
}

.logged-footer__brand p,
.logged-footer__contact {
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5rem;
  transition: color 0.25s ease, transform 0.25s ease;
}

.logged-footer__brand:hover p,
.logged-footer__column:hover .logged-footer__contact {
  color: rgba(255, 255, 255, 0.9);
}

.logged-footer__column ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.logged-footer__column li {
  width: fit-content;
}

.logged-footer__column a {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: normal;
  transition:
    color 0.24s ease,
    transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.24s ease;
}

.logged-footer__column a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.22rem;
  width: 100%;
  height: 0.1rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #8c84ff 0%, #c6c2ff 100%);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.logged-footer__column a:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.logged-footer__column a:hover::after {
  transform: scaleX(1);
}

.logged-footer__column a:active {
  transform: translateX(2px) scale(0.98);
}

.logged-footer__contact {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: fit-content;
}

.logged-footer__contact::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.2rem;
  width: 100%;
  height: 0.1rem;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(140, 132, 255, 0.75) 0%, rgba(198, 194, 255, 0.85) 100%);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.logged-footer__column:hover .logged-footer__contact::after {
  transform: scaleX(1);
}

.logged-footer__bottom {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 82rem;
  margin: 5rem auto 0;
  padding: 1.5rem 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.logged-footer__bottom p {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 2rem;
  text-align: left;
  transition: color 0.25s ease;
}

.logged-footer__bottom:hover p {
  color: rgba(255, 255, 255, 0.88);
}

.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.7s ease;
  filter: blur(6px);
  will-change: opacity, transform, filter;
}

.reveal.reveal--visivel {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.reveal--delay-1 {
  transition-delay: 0.08s;
}

.reveal--delay-2 {
  transition-delay: 0.16s;
}

.reveal--delay-3 {
  transition-delay: 0.24s;
}

.reveal--delay-4 {
  transition-delay: 0.32s;
}

@media (max-width: 1024px) {
  .logged-footer {
    padding: 3rem 2rem 2rem;
  }

  .logged-footer__content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2.5rem;
    column-gap: 3rem;
  }

  .logged-footer__brand {
    max-width: 18.4375rem;
  }

  .logged-footer__bottom {
    margin-top: 3rem;
    padding: 1.5rem 0 0;
  }
}

@media (max-width: 768px) {
  .logged-footer {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .logged-footer__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .logged-footer__bottom {
    margin-top: 2.5rem;
  }

  .logged-footer__bottom p {
    line-height: 1.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .logged-footer__column a,
  .logged-footer__column a::after,
  .logged-footer__contact,
  .logged-footer__contact::after,
  .logged-footer__brand p,
  .logged-footer__bottom p {
    transition: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>