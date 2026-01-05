<template>
  <section v-if="mostrarModal" class="modal-overlay" @click="fecharModal">
    <div class="modal-container" @click.stop>
      <button class="btn-close" @click="fecharModal">
        <span>&times;</span>
      </button>

      <div class="modal-icon">💳</div>

      <h2 class="modal-title">Escolha a forma de pagamento</h2>
      <p class="modal-subtitle">Como você deseja pagar?</p>

      <div class="payment-buttons">
        <button class="btn-payment btn-pix" @click="selecionarMetodo('pix')">
          <span class="btn-icon">📱</span>
          <span class="btn-text">PIX</span>
        </button>

        <button class="btn-payment btn-card" @click="selecionarMetodo('cartao')">
          <span class="btn-icon">💳</span>
          <span class="btn-text">Cartão</span>
        </button>
      </div>

      <div class="total-value">
        <span>Total: </span>
        <strong>R$ {{ valorTotal }}</strong>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps({
  valorTotal: {
    type: String,
    default: "150,00",
  },
});

// Emits
const emit = defineEmits(["fechar", "selecionar-metodo"]);

// Estado
const mostrarModal = ref(true);

// Métodos
function fecharModal() {
  mostrarModal.value = false;
  emit("fechar");
}

function selecionarMetodo(metodo) {
  console.log("Método selecionado:", metodo);
  emit("selecionar-metodo", metodo);
  // Aqui você integra com sua lógica
  // O modal pode fechar automaticamente ou não, como preferir
  // fecharModal();
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

.modal-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f4ff 100%);
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  padding: 40px 35px;
  box-shadow: 0 25px 70px rgba(138, 43, 226, 0.3);
  position: relative;
  text-align: center;
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.btn-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(138, 43, 226, 0.1);
  border: none;
  color: #8a2be2;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: rgba(138, 43, 226, 0.2);
  transform: scale(1.1);
}

.modal-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.modal-title {
  color: #2d3748;
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.modal-subtitle {
  color: #718096;
  font-size: 15px;
  margin: 0 0 35px 0;
}

.payment-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.btn-payment {
  background: white;
  border: 3px solid #e2e8f0;
  border-radius: 16px;
  padding: 30px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.btn-payment:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.btn-pix:hover {
  border-color: #00c9a7;
  background: linear-gradient(135deg, #ffffff 0%, #e6fff9 100%);
}

.btn-card:hover {
  border-color: #8a2be2;
  background: linear-gradient(135deg, #ffffff 0%, #f0e7ff 100%);
}

.btn-icon {
  font-size: 48px;
}

.btn-text {
  color: #2d3748;
  font-size: 18px;
  font-weight: 700;
}

.total-value {
  background: linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%);
  color: white;
  padding: 18px;
  border-radius: 12px;
  font-size: 18px;
}

.total-value strong {
  font-size: 22px;
  font-weight: 700;
}

/* Responsividade */
@media (max-width: 480px) {
  .modal-container {
    max-width: 95%;
    padding: 35px 25px;
  }

  .modal-title {
    font-size: 22px;
  }

  .payment-buttons {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .btn-payment {
    padding: 25px 20px;
  }

  .modal-icon {
    font-size: 56px;
  }
}
</style>
