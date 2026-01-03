<template>
  <section class="main-payment">
    <div class="payment-card">
      <div class="card-header">
        <p>
          Valor da compra: {{ formatCurrency(dadosPagamento.valorCompra) }} 💵
        </p>
        <button class="btn-fechar" @click="fecharCard">
          <span>&times;</span>
        </button>
      </div>

      <div class="payment-container">
        <!-- Cabeçalho do PIX -->
        <div class="payment-header">
          <h2 class="payment-title">Pagamento via PIX</h2>
          <div class="payment-icons">
            <span class="payment-icon">🔒</span>
            <span class="payment-icon">📱</span>
          </div>
        </div>

        <!-- Conteúdo condicional: Formulário ou QR Code -->
        <div v-if="!qrCodeData" class="form-section">
          <div class="pix-info-card">
            <div class="pix-icon">
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path
                  d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.5H112.6C132.6 391.5 151.5 383.7 165.7 369.5L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.1C151.5 127.9 132.6 120.1 112.6 120.1H103.3L200.7 23.40C231.1-6.00 280.3-6.00 310.6 23.40L407.8 120.1H392.6C372.6 120.1 353.7 127.9 339.5 142.1L262.5 218.9zM112.6 142.1C126.4 142.1 139.1 148.3 149.7 158.1L226.4 236.4C233.6 243.6 243.1 247.1 252.5 247.1C261.9 247.1 271.3 243.6 278.5 236.4L355.5 158.1C365.3 148.3 378.8 142.1 392.6 142.1H407.7L488.6 222.9C518.9 253.2 518.9 302.4 488.6 332.7L407.8 413.5H392.6C378.8 413.5 365.3 407.3 355.5 397.5L278.5 320.5C264.6 306.6 240.3 306.6 226.4 320.5L149.7 397.5C139.1 407.3 126.4 413.5 112.6 413.5H103.3L23.40 332.7C-6.00 302.4-6.00 253.2 23.40 222.9L103.3 142.1H112.6z"
                />
              </svg>
            </div>
            <h3 class="pix-title">Pagamento Instantâneo</h3>
            <p class="pix-description">
              O código PIX será gerado após confirmar seus dados. Você terá
              <strong>10 minutos</strong> para realizar o pagamento.
            </p>
          </div>

          <div class="form-group">
            <label for="pix-name">Nome Completo</label>
            <input
              type="text"
              id="pix-name"
              v-model="formData.nome"
              class="styled-input"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div class="form-group">
            <label for="pix-email">E-mail</label>
            <input
              type="email"
              id="pix-email"
              v-model="formData.email"
              class="styled-input"
              placeholder="seu@email.com"
            />
          </div>

          <div class="form-group">
            <label for="pix-cpf">CPF</label>
            <input
              type="text"
              id="pix-cpf"
              v-model="formData.cpf"
              @input="formatCPF"
              class="styled-input"
              placeholder="000.000.000-00"
              maxlength="14"
            />
          </div>

          <div class="purchase-summary">
            <h4 class="summary-title">Resumo da Compra</h4>
            <div class="summary-items">
              <div
                v-for="(item, index) in dadosPagamento.compras"
                :key="index"
                class="summary-item"
              >
                <span class="item-name">{{ item.produto.tituloProduto }}</span>
                <span class="item-price">{{
                  formatCurrency(item.produto.precoCentavos)
                }}</span>
              </div>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span class="total-value">{{
                formatCurrency(dadosPagamento.valorCompra)
              }}</span>
            </div>
          </div>

          <button
            @click="gerarQRCode"
            class="submit-button"
            :disabled="!isFormValid"
          >
            <span class="button-text">Gerar QR Code PIX</span>
            <span class="button-icon">📱</span>
          </button>
        </div>

        <!-- Tela do QR Code -->
        <div v-else class="qrcode-section">
          <div class="qrcode-status">
            <div class="status-icon" :class="paymentStatus">
              <span v-if="paymentStatus === 'pending'">⏱️</span>
              <span v-else-if="paymentStatus === 'approved'">✅</span>
              <span v-else>❌</span>
            </div>
            <h3 class="status-title">
              {{ statusMessages[paymentStatus] }}
            </h3>
            <p class="status-description" v-if="paymentStatus === 'pending'">
              Escaneie o QR Code com o app do seu banco
            </p>
          </div>

          <div class="qrcode-container">
            <div class="qrcode-wrapper">
              <img :src="qrCodeData" alt="QR Code PIX" class="qrcode-image" />
            </div>
            <p class="qrcode-hint">
              Abra o app do seu banco e escaneie o código
            </p>
          </div>

          <div class="copy-section">
            <label class="copy-label">Ou copie o código PIX:</label>
            <div class="copy-container">
              <input
                type="text"
                :value="pixCopiaECola"
                readonly
                class="copy-input"
              />
              <button @click="copiarCodigo" class="copy-button">
                <span v-if="!copiado">📋</span>
                <span v-else>✅</span>
                {{ copiado ? "Copiado!" : "Copiar" }}
              </button>
            </div>
          </div>

          <div class="timer-section" v-if="paymentStatus === 'pending'">
            <div class="timer-icon">⏰</div>
            <div class="timer-info">
              <span class="timer-label">Tempo restante:</span>
              <span class="timer-value">{{ tempoRestante }}</span>
            </div>
          </div>

          <div class="payment-value-display">
            <span class="value-label">Valor a pagar:</span>
            <span class="value-amount">{{
              formatCurrency(dadosPagamento.valorCompra)
            }}</span>
          </div>

          <button
            v-if="paymentStatus === 'pending'"
            @click="cancelarPagamento"
            class="cancel-button"
          >
            Cancelar Pagamento
          </button>
        </div>

        <div class="payment-footer">
          <div class="security-notice">
            <span class="security-icon">🔒</span>
            <span class="security-text">Pagamento 100% seguro via PIX</span>
          </div>
          <div class="mercadopago-badge">
            <span class="badge-text">Powered by Mercado Pago</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import paymentPix from "../../service/paymentPix";

const emit = defineEmits(["fechar-tela-pagamento-pix"]);

const props = defineProps({
  dadosPagamento: {
    type: Object,
    required: true,
  },
});
console.log(props.dadosPagamento);
// Estados
const qrCodeData = ref(null);
const pixCopiaECola = ref("");
const copiado = ref(false);
const paymentStatus = ref("pending"); // pending, approved, rejected
const tempoRestante = ref("10:00");
let timerInterval = null;

const formData = ref({
  nome: "",
  email: "",
  cpf: "",
});

const statusMessages = {
  pending: "Aguardando Pagamento",
  approved: "Pagamento Aprovado!",
  rejected: "Pagamento Expirado",
};

// Computed
const isFormValid = computed(() => {
  return (
    formData.value.nome.length > 3 &&
    formData.value.email.includes("@") &&
    formData.value.cpf.replace(/\D/g, "").length === 11
  );
});

// Métodos
function formatCurrency(value) {
  const numValue =
    typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numValue);
}

function formatCPF(event) {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    formData.value.cpf = value;
  }
}

async function gerarQRCode() {
  try {
    const response = await paymentPix.realizarPagamentoPix(
      props.dadosPagamento.valorCompra,
      props.dadosPagamento.compras
    );
    console.log(response);
    setTimeout(() => {
      qrCodeData.value = `data:image/png;base64,${response.data.qrCodeBase64}`;
      pixCopiaECola.value = response.data.qrCode;
      iniciarTimer();
    }, 1000);
  } catch (error) {
    alert("Erro ao gerar QR Code. Tente novamente.");
  }
}

function copiarCodigo() {
  navigator.clipboard.writeText(pixCopiaECola.value);
  copiado.value = true;
  setTimeout(() => {
    copiado.value = false;
  }, 2000);
}

function iniciarTimer() {
  let segundosRestantes = 600; // 10 minutos

  timerInterval = setInterval(() => {
    segundosRestantes--;

    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    tempoRestante.value = `${minutos}:${segundos.toString().padStart(2, "0")}`;

    if (segundosRestantes <= 0) {
      clearInterval(timerInterval);
      paymentStatus.value = "rejected";
    }
  }, 1000);
}

function cancelarPagamento() {
  if (confirm("Deseja realmente cancelar o pagamento?")) {
    fecharCard();
  }
}

function fecharCard() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  emit("fechar-tela-pagamento-pix");
}

onBeforeUnmount(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.main-payment {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  padding: 20px;
  overflow-y: auto;
}

.payment-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f4ff 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(106, 44, 248, 0.25);
  overflow: hidden;
  margin: auto;
}

.card-header {
  background: linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%);
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
}

.card-header p {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-fechar:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.payment-container {
  padding: 0;
  max-height: 70vh;
  overflow-y: auto;
}

.payment-header {
  padding: 25px 25px 15px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.payment-title {
  color: #2d3748;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.payment-icons {
  display: flex;
  gap: 10px;
}

.payment-icon {
  font-size: 20px;
  opacity: 0.7;
}

.form-section {
  padding: 25px;
}

.pix-info-card {
  background: linear-gradient(135deg, #f0e7ff 0%, #e7d4ff 100%);
  border-radius: 16px;
  padding: 25px;
  text-align: center;
  margin-bottom: 30px;
  border: 2px solid #e0d0f5;
}

.pix-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  color: #8a2be2;
}

.pix-icon svg {
  width: 100%;
  height: 100%;
}

.pix-title {
  color: #2d3748;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.pix-description {
  color: #4a5568;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.styled-input {
  width: 100%;
  height: 52px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 15px;
  background: white;
  transition: all 0.3s ease;
  color: #2d3748;
  font-family: inherit;
}

.styled-input::placeholder {
  color: #a0aec0;
}

.styled-input:focus {
  outline: none;
  border-color: #8a2be2;
  box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
}

.purchase-summary {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
}

.summary-title {
  color: #2d3748;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
}

.summary-items {
  margin-bottom: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.summary-item:last-child {
  border-bottom: none;
}

.item-name {
  color: #4a5568;
  font-size: 14px;
}

.item-price {
  color: #2d3748;
  font-weight: 600;
  font-size: 14px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 2px solid #e2e8f0;
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
}

.total-value {
  color: #8a2be2;
  font-size: 20px;
}

.submit-button {
  background: linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qrcode-section {
  padding: 25px;
}

.qrcode-status {
  text-align: center;
  margin-bottom: 25px;
}

.status-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  background: linear-gradient(135deg, #f0e7ff 0%, #e7d4ff 100%);
  border: 3px solid #e0d0f5;
}

.status-icon.approved {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border-color: #b1dfbb;
}

.status-icon.rejected {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border-color: #f1b0b7;
}

.status-title {
  color: #2d3748;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.status-description {
  color: #4a5568;
  font-size: 14px;
  margin: 0;
}

.qrcode-container {
  text-align: center;
  margin-bottom: 25px;
}

.qrcode-wrapper {
  background: white;
  border: 3px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.qrcode-image {
  width: 220px;
  height: 220px;
  display: block;
}

.qrcode-hint {
  color: #718096;
  font-size: 13px;
  margin: 15px 0 0 0;
}

.copy-section {
  margin-bottom: 25px;
}

.copy-label {
  display: block;
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.copy-container {
  display: flex;
  gap: 10px;
}

.copy-input {
  flex: 1;
  height: 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 15px;
  font-size: 13px;
  background: #f7fafc;
  color: #4a5568;
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-button {
  background: linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
}

.timer-section {
  background: linear-gradient(135deg, #fff5e6 0%, #ffe0b3 100%);
  border: 2px solid #ffd699;
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.timer-icon {
  font-size: 28px;
}

.timer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timer-label {
  color: #805300;
  font-size: 13px;
  font-weight: 600;
}

.timer-value {
  color: #2d3748;
  font-size: 24px;
  font-weight: 700;
  font-family: monospace;
}

.payment-value-display {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.value-label {
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
}

.value-amount {
  color: #8a2be2;
  font-size: 24px;
  font-weight: 700;
}

.cancel-button {
  background: white;
  color: #e53e3e;
  border: 2px solid #feb2b2;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.cancel-button:hover {
  background: #fff5f5;
  border-color: #fc8181;
}

.payment-footer {
  padding: 20px 25px;
  background: linear-gradient(135deg, #f8f4ff 0%, #ffffff 100%);
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

.security-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #718096;
  font-size: 13px;
  margin-bottom: 8px;
}

.security-icon {
  font-size: 14px;
}

.security-text {
  font-weight: 500;
}

.mercadopago-badge {
  color: #a0aec0;
  font-size: 11px;
}

.payment-container::-webkit-scrollbar {
  width: 6px;
}

.payment-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.payment-container::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.payment-container::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.payment-card {
  animation: fadeIn 0.3s ease-out;
}

@media (max-width: 520px) {
  .main-payment {
    padding: 10px;
  }

  .payment-card {
    border-radius: 16px;
  }

  .card-header {
    padding: 15px 20px;
    border-radius: 16px 16px 0 0;
  }

  .card-header p {
    font-size: 16px;
  }

  .payment-header,
  .form-section,
  .qrcode-section,
  .payment-footer {
    padding: 20px;
  }

  .payment-title {
    font-size: 20px;
  }

  .qrcode-image {
    width: 180px;
    height: 180px;
  }

  .copy-container {
    flex-direction: column;
  }

  .copy-button {
    width: 100%;
    justify-content: center;
    height: 48px;
  }
}

@media (max-width: 380px) {
  .card-header p {
    font-size: 14px;
  }

  .payment-title {
    font-size: 18px;
  }

  .pix-title {
    font-size: 18px;
  }

  .value-amount {
    font-size: 20px;
  }

  .timer-value {
    font-size: 20px;
  }
}
</style>
