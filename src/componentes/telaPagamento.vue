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
      <span>5031 4332 1540 6351</span>
      <div id="form-checkout__cardNumber" class="container"></div>
      <span> 11/30</span>
      <div id="form-checkout__expirationDate" class="container"></div>
      <span>123</span>
      <div id="form-checkout__securityCode" class="container"></div>

      <input type="text" id="form-checkout__cardholderName" />
      <select id="form-checkout__issuer"></select>
      <select id="form-checkout__installments"></select>
      <select id="form-checkout__identificationType"></select>
      <span>12345678909</span>
      <input type="text" id="form-checkout__identificationNumber" />
      <span>erik.maia15oliveira@gmail.com</span>
      <input type="email" id="form-checkout__cardholderEmail" />

      <button type="submit" id="form-checkout__submit">Pagar</button>
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
  props.dadosPagamento.carrinho.map((produto) => {
    descricaoProdutos.value.push(produto.tituloProduto);
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
        placeholder: "MM/YY",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de segurança",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular do cartão",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Parcelas",
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
        placeholder: "E-mail",
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
  console.log(props.dadosPagamento.valorCompra.replace(",", "."));
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
  background-color: black;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card-header {
  top: 0;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  border-radius: 24px 24px 0 0;
  z-index: 10;
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
  font-weight: bold;
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
#form-checkout {
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1000;
  max-width: 480px;
  height: 100%;
  max-height: 80vh;
  background: linear-gradient(135deg, #f9f5ff 0%, #ffffff 100%);
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(106, 44, 248, 0.15);
  overflow: hidden;
  padding: 0;
  color: #333;
}

/* Cabeçalho */
.card-header {
  background: linear-gradient(135deg, #ec2bfe 0%, #aa1bb8 100%);
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 24px 24px 0 0;
}

.btn-fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 30px;
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

/* Conteúdo do formulário */
.form-content {
  padding: 30px;
}

/* Campos do cartão - agrupamento visual */
.card-data-group {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
}

/* Campos de entrada */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  padding: 10px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #760980;
  font-size: 14px;
}

.container {
  height: 50px;
  border: 1px solid #d9c5f4;
  border-radius: 12px;
  padding: 0 15px;
  background: white;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.container:focus-within {
  border-color: #8a2be2;
  box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
}

input,
select {
  width: 100%;
  height: 48px;
  border: 1px solid #d9c5f4;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: none;
  border-color: #8a2be2;
  box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
}

/* Estilização dos spans com dados de exemplo */
/* Botão de pagamento */
#form-checkout__submit {
  background: linear-gradient(135deg, #e31ef5 0%, #590460 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.25);
}

#form-checkout__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(138, 43, 226, 0.35);
}

#form-checkout__submit:active {
  transform: translateY(0);
}

/* Barra de progresso */
.progress-bar {
  width: 100%;
  height: 6px;
  margin-top: 20px;
  border-radius: 3px;
  overflow: hidden;
  background-color: #e5d9f9;
}

.progress-bar::-webkit-progress-value {
  background: linear-gradient(135deg, #6e2dc4 0%, #8a2be2 100%);
  border-radius: 3px;
}

.progress-bar::-moz-progress-bar {
  background: linear-gradient(135deg, #6e2dc4 0%, #8a2be2 100%);
  border-radius: 3px;
}

/* Títulos e informações */
.form-title {
  color: #6e2dc4;
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 700;
}

/* Responsividade */
@media (max-width: 520px) {
  .form-content {
    padding: 20px;
  }

  .card-data-group {
    grid-template-columns: 1fr;
  }

  .card-number-group {
    grid-column: 1;
  }
}
</style>
