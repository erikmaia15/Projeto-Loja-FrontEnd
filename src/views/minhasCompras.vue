<template>
  <Navbar
    url="minhas-compras"
    @carrinho="abrircarrinho($event)"
    :novoProduto="novoProduto"
  ></Navbar>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <section class="compras-container">
    <div class="header-section">
      <h1 class="page-title">Minhas Compras</h1>
      <p class="page-subtitle">Histórico completo de suas aquisições</p>
    </div>

    <!-- Lista de compras organizadas -->
    <div class="compras-list" v-if="compras.length > 0">
      <div class="compra-card" v-for="compra in compras" :key="compra.id">
        <!-- Header da compra -->
        <div class="compra-header">
          <div class="compra-info">
            <h3 class="compra-title">Pedido #{{ compra.id.slice(-8) }}</h3>
            <p class="compra-date">
              {{ formatarData.formatarData(compra.dataCriado) }}
            </p>
          </div>
          <div class="compra-status">
            <span class="status-badge" :class="compra.status">
              {{
                statusTexto(compra.status) == "IN-PROCESS"
                  ? "em processamento"
                  : statusTexto(compra.status)
              }}
            </span>
            <p class="compra-total">
              R$ {{ formatarPreco(compra.valorCentavos) }}
            </p>
          </div>
        </div>

        <!-- Informações de pagamento -->
        <div class="payment-info">
          <div class="payment-method">
            <span class="method-icon">{{
              getPaymentIcon(compra.metodoPagamento)
            }}</span>
            <span class="method-text">{{
              formatarMetodoPagamento(compra.metodoPagamento)
            }}</span>
            <span class="installments-text" v-if="compra.parcelas > 1">
              • {{ compra.parcelas }}x de R$
              {{ formatarPreco(compra.valorCentavos / compra.parcelas) }}
            </span>
          </div>
        </div>

        <!-- Lista de itens da compra -->
        <div class="itens-container">
          <h4 class="itens-title">
            Itens do pedido ({{ compra.itens.length }})
          </h4>
          <div class="itens-grid">
            <div class="item-card" v-for="item in compra.itens" :key="item.id">
              <div class="item-image">
                <img
                  :src="item.imagem"
                  :alt="item.nomeProduto"
                  class="produto-img"
                />
              </div>
              <div class="item-details">
                <h5 class="item-name">{{ item.nomeProduto }}</h5>
                <p class="item-description">{{ item.descricao }}</p>
                <div class="item-pricing">
                  <span class="item-quantity">Qtd: {{ item.quantidade }}</span>
                  <span class="item-price"
                    >R$ {{ formatarPreco(item.precoUnitario) }}</span
                  >
                  <span class="item-subtotal"
                    >Total: R$ {{ formatarPreco(item.subtotal) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer da compra -->
        <div class="compra-footer">
          <button class="btn-details" @click="verDetalhes(compra.id)">
            Ver Mais Detalhes
          </button>
          <button
            class="btn-track"
            @click="rastrearPedido(compra.id)"
            v-if="compra.status === 'pago'"
          >
            Rastrear Pedido
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state caso não tenha compras -->
    <div class="empty-state" v-else>
      <div class="empty-icon">🛒</div>
      <h2>Nenhuma compra realizada</h2>
      <p>Você ainda não fez nenhuma compra. Explore nossos produtos!</p>
      <button class="btn-shop" @click="$router.push('/home')">
        Começar a Comprar
      </button>
    </div>
  </section>

  <Carrinho
    @removido="novoProduto = true"
    @fechar="abrir = !abrir"
    v-if="abrir === true"
  ></Carrinho>
  <Footer></Footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Carrinho from "../componentes/carrinho.vue";
import Navbar from "../componentes/navbar.vue";
import Footer from "../componentes/footer.vue";
import comprasService from "../../service/compras.js";
import formatarData from "../../utils/formatarData.js";
import conversao from "../../utils/conversao.js";

const compras = ref([]);
const novoProduto = ref(false);
const abrir = ref(false);

async function carregarCompras() {
  const response = await comprasService.getCompras();
  if (response.status >= 200 && response.status <= 300) {
    compras.value = response.data.compras;
    console.log("Compras carregadas:", compras.value);
  }
}

function abrircarrinho() {
  abrir.value = !abrir.value;
}

// Funções utilitárias

function formatarPreco(centavos) {
  return (centavos / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function statusTexto(status) {
  const statusMap = {
    pago: "Pago",
    pendente: "Pendente",
    cancelado: "Cancelado",
    approved: "Aprovado",
    pending: "Pendente",
    rejected: "Rejeitado",
  };
  return statusMap[status] || status;
}

function formatarMetodoPagamento(metodo) {
  const metodoMap = {
    credit_card: "Cartão de Crédito",
    debit_card: "Cartão de Débito",
    pix: "PIX",
    boleto: "Boleto",
    account_money: "Saldo Mercado Pago",
  };
  return metodoMap[metodo] || metodo;
}

function getPaymentIcon(metodo) {
  const iconMap = {
    credit_card: "💳",
    debit_card: "💳",
    pix: "⚡",
    boleto: "🧾",
    account_money: "💰",
  };
  return iconMap[metodo] || "💳";
}

function verDetalhes(compraId) {
  // Implementar navegação para detalhes
  console.log("Ver detalhes da compra:", compraId);
}

function rastrearPedido(compraId) {
  // Implementar rastreamento
  console.log("Rastrear pedido:", compraId);
}

onMounted(() => {
  carregarCompras();
});
</script>

<style scoped>
.compras-container {
  min-height: 100vh;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #c601d1 0%, #580557 50%, #4c0267 100%);
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 300;
}

.compras-list {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.compra-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.compra-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.compra-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.compra-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.compra-date {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}

.compra-status {
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.status-badge.pago,
.status-badge.approved {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.status-badge.pendente,
.status-badge.pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.status-badge.cancelado,
.status-badge.rejected {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.compra-total {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

.payment-info {
  padding: 1rem 1.5rem;
  background: rgba(99, 102, 241, 0.05);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4338ca;
  font-weight: 500;
  font-size: 0.9rem;
}

.method-icon {
  font-size: 1.1rem;
}

.installments-text {
  color: #64748b;
  font-weight: 400;
}

.itens-container {
  padding: 1.5rem;
}

.itens-title {
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.itens-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(249, 250, 251, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.2s ease;
}

.item-card:hover {
  background: rgba(243, 244, 246, 0.9);
  transform: translateX(5px);
}

.item-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.produto-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
}

.item-description {
  margin: 0 0 0.8rem 0;
  color: #6b7280;
  font-size: 0.85rem;
  line-height: 1.4;
}

.item-pricing {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.item-quantity {
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.item-price {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
}

.item-subtotal {
  color: #059669;
  font-weight: 700;
  font-size: 0.9rem;
}

.compra-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(248, 250, 252, 0.5);
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.btn-details,
.btn-track {
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  flex: 1;
}

.btn-details {
  background: linear-gradient(135deg, #aa2ee3, #2e0137);
  color: white;
}

.btn-details:hover {
  background: linear-gradient(135deg, #da04f2, #030014);
  transform: translateY(-1px);
}

.btn-track {
  background: rgba(99, 102, 241, 0.1);
  color: #4338ca;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.btn-track:hover {
  background: rgba(99, 102, 241, 0.15);
  transform: translateY(-1px);
}

.empty-state {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-state h2 {
  color: #1f2937;
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.empty-state p {
  color: #6b7280;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
}

.btn-shop {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-shop:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

@media (max-width: 768px) {
  .compras-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .compra-header {
    flex-direction: column;
    gap: 1rem;
  }

  .compra-status {
    text-align: left;
  }

  .item-card {
    flex-direction: column;
    text-align: center;
  }

  .item-image {
    align-self: center;
    width: 120px;
    height: 120px;
  }

  .item-pricing {
    justify-content: center;
  }

  .compra-footer {
    flex-direction: column;
  }

  .payment-method {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
}
</style>
