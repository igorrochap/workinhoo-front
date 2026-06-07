<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import ModalSuccess from '@/components/layout/ModalSuccess.vue'

export interface Solicitacao {
  clienteNome: string
  dataRecebida: string
  servicoSolicitado: string
  localAtendimento?: string
  faixaHorario?: string
  descricao?: string
}

const props = defineProps<{
  aberto: boolean
  solicitacao: Solicitacao | null
}>()

const emit = defineEmits<{
  fechar: []
  enviado: []
}>()

const valorEmCentavos = ref(0)
const observacoes = ref('')
const modalSucessoAberto = ref(false)

const valorFormatado = computed(() => {
  const centavos = valorEmCentavos.value % 100
  const reais = Math.floor(valorEmCentavos.value / 100)
  const reaisStr = reais.toLocaleString('pt-BR')
  return `${reaisStr},${String(centavos).padStart(2, '0')}`
})

function onValorKeydown(e: KeyboardEvent) {
  const permitidas = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (permitidas.includes(e.key)) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

function onValorInput(e: Event) {
  const input = e.target as HTMLInputElement
  const digitos = input.value.replace(/\D/g, '')
  valorEmCentavos.value = parseInt(digitos || '0', 10)
  input.value = valorFormatado.value
}

const podaEnviar = () => valorEmCentavos.value > 0

function enviar() {
  if (!podaEnviar()) return
  modalSucessoAberto.value = true
  emit('enviado')
  emit('fechar')
}

function resetar() {
  valorEmCentavos.value = 0
  observacoes.value = ''
}

function fecharSucesso() {
  modalSucessoAberto.value = false
}

watch(
  () => props.aberto,
  (aberto) => {
    if (aberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      resetar()
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="aberto && solicitacao" class="modal-overlay">
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="Responder solicitação">
          <button class="btn-fechar" type="button" aria-label="Fechar" @click="emit('fechar')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <div class="modal-header">
            <h2 class="modal-titulo">Responder Solicitação</h2>
            <p class="modal-subtitulo">Envie sua proposta para o cliente</p>
          </div>

          <div class="divider" />

          <div class="modal-body">
            <div class="info-card">
              <dl class="info-list">
                <div class="info-pair">
                  <div class="info-row">
                    <dt class="info-label">Solicitante</dt>
                    <dd class="info-value">{{ solicitacao.clienteNome }}</dd>
                  </div>
                  <div class="info-row">
                    <dt class="info-label">Data</dt>
                    <dd class="info-value">{{ solicitacao.dataRecebida }}</dd>
                  </div>
                </div>
                <div class="info-pair">
                  <div class="info-row">
                    <dt class="info-label">Serviço</dt>
                    <dd class="info-value">{{ solicitacao.servicoSolicitado }}</dd>
                  </div>
                  <div v-if="solicitacao.localAtendimento" class="info-row">
                    <dt class="info-label">Local</dt>
                    <dd class="info-value">{{ solicitacao.localAtendimento }}</dd>
                  </div>
                </div>
                <div v-if="solicitacao.faixaHorario" class="info-row info-row--full">
                  <dt class="info-label">Faixa de horário</dt>
                  <dd class="info-value">{{ solicitacao.faixaHorario }}</dd>
                </div>
                <div v-if="solicitacao.descricao" class="info-row info-row--full info-row--last">
                  <dt class="info-label">Descrição</dt>
                  <dd class="info-value">{{ solicitacao.descricao }}</dd>
                </div>
              </dl>
            </div>

            <div class="proposta-section">
              <h3 class="proposta-titulo">Sua proposta</h3>

              <div class="form-group">
                <label class="form-label" for="modal-valor">Valor</label>
                <div class="input-prefix-wrap">
                  <span class="input-prefix">R$</span>
                  <input id="modal-valor" type="text" inputmode="numeric" :value="valorFormatado" class="form-input"
                    placeholder="0,00" @keydown="onValorKeydown" @input="onValorInput" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-obs">
                  Observações
                  <span class="rotulo-opcional">(opcional)</span>
                </label>
                <textarea id="modal-obs" v-model="observacoes" class="form-textarea" maxlength="500" rows="4"
                  placeholder="Explique o que está incluso no valor, condições ou informações importantes para o cliente." />
                <div class="char-count" aria-live="polite">{{ observacoes.length }}/500</div>
              </div>
            </div>
          </div>

          <div class="divider" />

          <div class="modal-footer">
            <button class="btn btn-outline" type="button" @click="emit('fechar')">Cancelar</button>
            <button class="btn btn-primary" type="button" :disabled="!podaEnviar()" @click="enviar">
              Enviar orçamento
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <ModalSuccess :aberto="modalSucessoAberto" titulo="Orçamento enviado!"
    subtitulo="Sua proposta foi enviada ao cliente com sucesso." botaoTexto="Fechar" @fechar="fecharSucesso" />
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at top, rgba(113, 63, 255, 0.08), transparent 32%),
    rgba(17, 17, 17, 0.52);
  backdrop-filter: blur(0.375rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  z-index: 400;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.modal-card {
  width: min(100%, 34rem);
  background: linear-gradient(180deg,
      color-mix(in srgb, var(--color-neutral-light-white) 96%, white) 0%,
      var(--color-neutral-light-white) 100%);
  border-radius: 1.125rem;
  border: 0.0625rem solid var(--color-neutral-light-light);
  box-shadow:
    0 1.5rem 5rem rgba(0, 0, 0, 0.18),
    0 0.125rem 0.5rem rgba(22, 29, 39, 0.08);
  padding: 1.75rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  overflow: hidden;
  transform-origin: center;
}

.modal-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
      color-mix(in srgb, var(--color-primary-lightest) 18%, transparent) 0%,
      transparent 40%,
      color-mix(in srgb, var(--color-primary-lightest) 8%, transparent) 100%);
  pointer-events: none;
}

.btn-fechar {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-neutral-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  padding: 0;
  border-radius: 0.75rem;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-fechar:hover {
  color: var(--color-neutral-dark);
  background: var(--color-neutral-light-light);
  transform: translateY(-0.0625rem) scale(1.03);
  box-shadow: 0 0.375rem 1rem rgba(22, 29, 39, 0.1);
}

.btn-fechar:active {
  transform: scale(0.96);
}

.modal-header {
  text-align: center;
  padding-bottom: 1.25rem;
  padding-top: 0.25rem;
  padding-right: 2rem;
}

.modal-titulo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  line-height: 1.3;
  font-family: 'Poppins', sans-serif;
}

.modal-subtitulo {
  font-size: 0.82rem;
  color: var(--color-neutral-medium);
  margin-top: 0.25rem;
  font-family: 'Poppins', sans-serif;
  line-height: 1.45;
}

.divider {
  border-top: 0.0625rem solid var(--color-neutral-light-light);
  width: 100%;
}

.modal-body {
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: var(--color-neutral-light-lightest);
  border: 0.0625rem solid var(--color-neutral-light-light);
  border-radius: 0.875rem;
  overflow: hidden;
}

.info-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.info-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  animation: fade-up 0.4s ease both;
}

.info-pair:nth-child(1) { animation-delay: 0.04s; }
.info-pair:nth-child(2) { animation-delay: 0.12s; }

.info-row {
  padding: 0.875rem 1.125rem;
  animation: fade-up 0.4s ease both;
}

.info-row--full {
  grid-column: 1 / -1;
}

.info-row--last {
  border-bottom: none;
}

.info-row:nth-child(3) { animation-delay: 0.20s; }
.info-row:nth-child(4) { animation-delay: 0.28s; }

.info-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  font-family: 'Poppins', sans-serif;
  display: block;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--color-neutral-medium);
  font-family: 'Poppins', sans-serif;
  margin: 0;
  line-height: 1.5;
}

.proposta-section {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  animation: fade-up 0.5s ease 0.1s both;
}

.proposta-titulo {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.01em;
}

.input-prefix-wrap {
  display: inline-flex;
  align-items: center;
  border: 0.0625rem solid var(--color-neutral-light-light);
  border-radius: 0.75rem;
  background: var(--color-neutral-light-white);
  overflow: hidden;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow: inset 0 0.0625rem 0 rgba(255, 255, 255, 0.7);
  width: fit-content;
}

.input-prefix-wrap:focus-within {
  border-color: var(--color-primary-medium);
  box-shadow:
    0 0 0 0.25rem color-mix(in srgb, var(--color-primary-lightest) 28%, transparent),
    0 0.75rem 1.5rem rgba(22, 29, 39, 0.06);
}

.input-prefix {
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-neutral-medium);
  font-family: 'Poppins', sans-serif;
  border-right: 0.0625rem solid var(--color-neutral-light-light);
  background: var(--color-neutral-light-lightest);
  white-space: nowrap;
  user-select: none;
}

.rotulo-opcional {
  font-weight: 400;
  color: var(--color-neutral-lightest);
  margin-left: 0.25rem;
  font-size: 0.82rem;
}

.form-input {
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  font-family: 'Poppins', sans-serif;
  color: var(--color-neutral-dark);
  background: transparent;
  border: none;
  outline: none;
  width: 9rem;
}

.form-textarea {
  width: 100%;
  min-height: 7rem;
  box-sizing: border-box;
  padding: 0.75rem 0.875rem;
  border-radius: 0.875rem;
  border: 0.0625rem solid var(--color-neutral-light-light);
  background: var(--color-neutral-light-white);
  color: var(--color-neutral-dark);
  font-size: 0.82rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  line-height: 1.55;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
  box-shadow: inset 0 0.0625rem 0 rgba(255, 255, 255, 0.7);
}

.form-textarea::placeholder {
  color: var(--color-neutral-lightest);
}

.form-textarea:hover {
  border-color: color-mix(in srgb, var(--color-primary-lightest) 70%, white);
}

.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary-medium);
  background: color-mix(in srgb, var(--color-primary-lightest) 7%, white);
  box-shadow:
    0 0 0 0.25rem color-mix(in srgb, var(--color-primary-lightest) 28%, transparent),
    0 0.75rem 1.5rem rgba(22, 29, 39, 0.06);
}

.char-count {
  align-self: flex-end;
  font-size: 0.75rem;
  color: var(--color-neutral-lightest);
  margin-top: 0.125rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6875rem 2rem;
  border-radius: 0.875rem;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition:
    all 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
  border: 0.125rem solid transparent;
  min-width: 10rem;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.22) 35%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.45s ease;
}

.btn:hover::after {
  transform: translateX(120%);
}

.btn:hover {
  transform: translateY(-0.0625rem);
}

.btn:active {
  transform: scale(0.985);
}

.btn-outline {
  background: transparent;
  border-color: var(--color-primary-darkest);
  color: var(--color-primary-darkest);
}

.btn-outline:hover {
  background: color-mix(in srgb, var(--color-primary-lightest) 20%, white);
  box-shadow: 0 0.75rem 1.5rem rgba(22, 29, 39, 0.08);
}

.btn-primary {
  background: linear-gradient(180deg,
      color-mix(in srgb, var(--color-primary-darkest) 90%, white) 0%,
      var(--color-primary-darkest) 100%);
  color: #ffffff;
  border-color: var(--color-primary-darkest);
  box-shadow: 0 0.875rem 1.5rem rgba(22, 29, 39, 0.14);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(180deg,
      color-mix(in srgb, var(--color-primary-dark) 90%, white) 0%,
      var(--color-primary-dark) 100%);
  border-color: var(--color-primary-dark);
  box-shadow: 0 1rem 2rem rgba(22, 29, 39, 0.18);
}

.btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-card {
  animation: modal-pop 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal-leave-active .modal-card {
  animation: modal-out 0.2s ease forwards;
}

@keyframes modal-pop {
  0% {
    transform: translateY(1rem) scale(0.96);
    opacity: 0;
    filter: blur(0.25rem);
  }

  60% {
    transform: translateY(-0.125rem) scale(1.01);
    opacity: 1;
    filter: blur(0);
  }

  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes modal-out {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  to {
    transform: translateY(0.75rem) scale(0.98);
    opacity: 0;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(0.375rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 48rem) {
  .modal-overlay {
    padding: 1rem;
    align-items: flex-end;
  }

  .modal-card {
    width: 100%;
    max-width: 100%;
    border-radius: 1.25rem;
    padding: 1.375rem 1.25rem 1.25rem;
    max-height: 92dvh;
    overflow-y: auto;
  }

  .modal-header {
    padding-right: 2.5rem;
    padding-bottom: 1rem;
  }

  .modal-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
    min-width: 100%;
  }
}

@media (max-width: 30rem) {
  .modal-card {
    padding: 1.125rem 1rem 1rem;
  }

  .info-row {
    padding: 0.75rem 0.875rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  .modal-card,
  .info-pair,
  .info-row,
  .proposta-section,
  .btn,
  .btn-fechar,
  .form-textarea,
  .input-prefix-wrap {
    animation: none !important;
    transition: none !important;
  }
}
</style>
