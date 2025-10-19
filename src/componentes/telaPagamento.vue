<template>
  <section class="main-payment">
    <form id="form-checkout">
      <div class="card-header">
        <p style="color: aliceblue">
          Valor da compra: {{ props.dadosPagamento.valorCompra }} 💵
        </p>
        <button class="btn-fechar" @click="fecharCard">
          <span>&times;</span>
        </button>
      </div>

      <div class="payment-container">
        <div class="payment-header">
          <h2 class="payment-title">Pagamento Seguro</h2>
          <div class="payment-icons">
            <span class="payment-icon">🔒</span>
            <span class="payment-icon">💳</span>
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Dados do Cartão</h3>

          <div class="input-group">
            <label for="form-checkout__cardNumber">Número do Cartão</label>
            <div class="input-with-hint">
              <div id="form-checkout__cardNumber" class="container"></div>
              <span class="hint-text">Ex: 5031 4332 1540 6351</span>
            </div>
          </div>

          <div class="card-details-grid">
            <div class="input-group">
              <label for="form-checkout__expirationDate">Validade</label>
              <div class="input-with-hint">
                <div id="form-checkout__expirationDate" class="container"></div>
                <span class="hint-text">Ex: 11/30</span>
              </div>
            </div>

            <div class="input-group">
              <label for="form-checkout__securityCode">CVV</label>
              <div class="input-with-hint">
                <div id="form-checkout__securityCode" class="container"></div>
                <span class="hint-text">Ex: 123</span>
              </div>
            </div>
          </div>

          <div class="input-group">
            <label for="form-checkout__cardholderName">Nome no Cartão</label>
            <input
              type="text"
              id="form-checkout__cardholderName"
              class="styled-input"
            />
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Informações Adicionais</h3>

          <div class="input-group">
            <label for="form-checkout__issuer">Banco Emissor</label>
            <select id="form-checkout__issuer" class="styled-select"></select>
          </div>

          <div class="input-group">
            <label for="form-checkout__installments">Parcelas</label>
            <select
              id="form-checkout__installments"
              class="styled-select"
            ></select>
          </div>

          <div class="identification-grid">
            <div class="input-group">
              <label for="form-checkout__identificationType"
                >Tipo de Documento</label
              >
              <select
                id="form-checkout__identificationType"
                class="styled-select"
              ></select>
            </div>

            <div class="input-group">
              <label for="form-checkout__identificationNumber"
                >Número do Documento</label
              >
              <div class="input-with-hint">
                <input
                  type="text"
                  id="form-checkout__identificationNumber"
                  class="styled-input"
                />
              </div>
            </div>
          </div>

          <div class="input-group">
            <label for="form-checkout__cardholderEmail">E-mail</label>
            <div class="input-with-hint">
              <input
                type="email"
                id="form-checkout__cardholderEmail"
                class="styled-input"
              />
            </div>
          </div>
        </div>

        <div class="payment-footer">
          <button
            type="submit"
            id="form-checkout__submit"
            class="submit-button"
          >
            <span class="button-text">Finalizar Pagamento</span>
            <span class="button-icon">💳</span>
          </button>

          <div class="security-notice">
            <span class="security-icon">🔒</span>
            <span class="security-text"
              >Pagamento 100% seguro via Mercado Pago</span
            >
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import paymentService from "../../service/payment";
const emit = defineEmits(["fechar-tela-pagamento"]);
const descricaoProdutos = ref([]);
const props = defineProps({
  dadosPagamento: Object,
});
let cardForm = null;

function fecharCard() {
  // Destruir instância ao fechar
  if (cardForm) {
    cardForm.unmount();
    cardForm = null;
  }
  emit("fechar-tela-pagamento");
}
async function realizarCompra(dados, dadosProdutos) {
  const response = await paymentService.realizarPagamento(dados, dadosProdutos);
  if (response.status >= 200 && response.status <= 300) {
    alert(
      "Compra foi efetuada e está sob análise, para mais informações vá em minhas compras!"
    );
    fecharCard();
  } else {
    alert("Compra negada, tente novamente em pelo menos 1 minuto!");
    fecharCard();
  }
}
async function iniciarForm() {
  if (cardForm) {
    cardForm.unmount();
    cardForm = null;
  }

  props.dadosPagamento.compras.map((produto) => {
    descricaoProdutos.value.push(produto.produto.tituloProduto);
  });
  await loadMercadoPago();
  const mp = new window.MercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP_TEST, {
    locale: "pt-BR",
  });
  cardForm = mp.cardForm({
    amount: props.dadosPagamento.valorCompra.replace(",", "."),
    iframe: true,
    form: {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número do cartão",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/AA",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "CVV",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Nome como está no cartão",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Número de parcelas",
      },
      identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Número do documento",
      },
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "Seu e-mail",
      },
    },
    callbacks: {
      onFormMounted: (error) => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        console.log("Form mounted");
      },
      onSubmit: async (event) => {
        event.preventDefault();
        const {
          paymentMethodId: payment_method_id,
          issuerId: issuer_id,
          cardholderEmail: email,
          amount,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();
        const dados = {
          body: JSON.stringify({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: descricaoProdutos.value,
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          }),
        };
        realizarCompra(dados, props.dadosPagamento);
      },
    },
  });
}
onMounted(() => {
  setTimeout(() => {
    iniciarForm();
  }, 100);
});

onBeforeUnmount(() => {
  if (cardForm) {
    cardForm.unmount();
    cardForm = null;
  }
});
</script>

<style scoped>
.main-payment {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  max-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  padding: 20px;
}

#form-checkout {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f4ff 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(106, 44, 248, 0.25);
  overflow: hidden;
  position: relative;
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
  overflow-y: auto;
  max-height: calc(90vh - 80px);
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
  padding: 20px 25px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  color: #4a5568;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: "•";
  color: #8a2be2;
  font-size: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.input-with-hint {
  position: relative;
}

.hint-text {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #a0aec0;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 8px;
  border-radius: 4px;
  pointer-events: none;
}

.container {
  height: 52px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 15px;
  background: white;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  margin-bottom: 0;
}

.container:focus-within {
  border-color: #8a2be2;
  box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
}

.styled-input,
.styled-select {
  width: 100%;
  height: 52px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 15px;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
  color: #2d3748;
  font-family: inherit;
}

.styled-input::placeholder,
.styled-select::placeholder {
  color: #a0aec0;
}

.styled-input:focus,
.styled-select:focus {
  outline: none;
  border-color: #8a2be2;
  box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
}

.styled-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 12px;
  padding-right: 45px;
}

.card-details-grid,
.identification-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.payment-footer {
  padding: 25px;
  background: linear-gradient(135deg, #f8f4ff 0%, #ffffff 100%);
  border-top: 1px solid #f0f0f0;
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
  margin-bottom: 15px;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4);
}

.submit-button:active {
  transform: translateY(0);
}

.button-text {
  font-size: 16px;
}

.button-icon {
  font-size: 18px;
}

.security-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #718096;
  font-size: 13px;
}

.security-icon {
  font-size: 14px;
}

.security-text {
  font-weight: 500;
}

/* Animações */
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

#form-checkout {
  animation: fadeIn 0.3s ease-out;
}

/* Scrollbar personalizado */
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

/* Responsividade */
@media (max-width: 520px) {
  .main-payment {
    padding: 10px;
  }

  #form-checkout {
    max-width: 100%;
    border-radius: 16px;
  }

  .card-header {
    padding: 15px 20px;
    border-radius: 16px 16px 0 0;
  }

  .payment-header,
  .form-section,
  .payment-footer {
    padding: 15px 20px;
  }

  .card-details-grid,
  .identification-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .payment-title {
    font-size: 20px;
  }
}

@media (max-width: 380px) {
  .card-header p {
    font-size: 16px;
  }

  .payment-title {
    font-size: 18px;
  }

  .section-title {
    font-size: 15px;
  }
}
</style>
