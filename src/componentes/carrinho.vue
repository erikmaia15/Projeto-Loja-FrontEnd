<template>
  <section class="carrinho-overlay" @click="fecharCarrinho">
    <div class="carrinho-container" @click.stop>
      <!-- Header do Carrinho -->
      <div class="carrinho-header">
        <h2 class="carrinho-title">
          <span class="cart-icon">🛒</span>
          Meu Carrinho
        </h2>
        <button class="btn-fechar" @click="fecharCarrinho">
          <span>&times;</span>
        </button>
      </div>

      <!-- Conteúdo do Carrinho -->
      <div class="carrinho-content">
        <!-- Se carrinho vazio -->
        <div v-if="carBuy.length === 0" class="carrinho-vazio">
          <div class="empty-cart-icon">🛒</div>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione alguns produtos incríveis à sua lista!</p>
        </div>

        <!-- Lista de produtos -->
        <div v-else class="produtos-lista">
          <div v-for="produto in carBuy" :key="produto.id" class="produto-item">
            <div class="produto-imagem">
              <img :src="produto.imagem" :alt="produto.tituloProduto" />
            </div>

            <div class="produto-info">
              <h4 class="produto-titulo">{{ produto.tituloProduto }}</h4>
              <p class="produto-descricao">{{ produto.descricao }}</p>
              <div class="produto-preco-container">
                <span class="produto-preco">R$ {{ produto.precoCentavos }}</span>
              </div>
            </div>

            <div class="produto-controles">
              <div class="quantidade-controles">
                <button
                  class="btn-quantidade"
                  @click="diminuirQuantidade(produto)"
                  :disabled="getQuantidade(produto.id) <= 1"
                >
                  -
                </button>
                <span class="quantidade">{{ getQuantidade(produto) }}</span>
                <button class="btn-quantidade" @click="aumentarQuantidade(produto)">
                  +
                </button>
              </div>

              <button
                class="btn-remover"
                @click="removerProduto(produto)"
                title="Remover produto"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer com resumo e ações -->
      <div v-if="carBuy.length > 0" class="carrinho-footer">
        <div class="resumo-pedido">
          <div class="linha-resumo">
            <span>Subtotal ({{ totalItens }} itens):</span>
            <span class="valor-total">R$ {{ valorTotal }}</span>
          </div>
          <div class="linha-resumo">
            <span>Frete:</span>
            <span class="valor-frete">Grátis</span>
          </div>
          <div class="linha-resumo total">
            <span>Total:</span>
            <span class="valor-final">R$ {{ valorTotal }}</span>
          </div>
        </div>

        <div class="acoes-carrinho">
          <button class="btn-continuar" @click="continuarComprando">
            Continuar Comprando
          </button>
          <button class="btn-finalizar" @click="finalizarPedido">Finalizar Pedido</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import carrinho from "../../service/carrinho";
const emit = defineEmits(["fechar"]);
const carBuy = ref([]);
const quantidades = ref({});

// Computed para calcular o total de itens
const totalItens = computed(() => {
  return Object.values(quantidades.value).reduce(
    (total, quantidade) => total + quantidade,
    0
  );
});

// Computed para calcular o valor total
const valorTotal = computed(() => {
  let total = 0;
  carBuy.value.forEach((produto) => {
    const quantidade = quantidades.value[produto.id] || 0;
    total += produto.precoCentavos * quantidade;
  });
  return total;
});

async function getCarrinho() {
  try {
    const response = await carrinho.getCarrinho();
    if (response) {
      carBuy.value = response;
      carBuy.value.map((produto) => {
        if (!quantidades.value[produto.id]) {
          quantidades.value[produto.id] = 1;
        }
      });
    } else {
      alert("Deu algum erro, tente novamente!");
    }
  } catch (error) {
    console.log(error);
  }
}

function getQuantidade(produto) {
  return quantidades.value[produto.id];
}

function aumentarQuantidade(produto) {
  if (quantidades.value[produto.id] < produto.QtdEstoque) {
    quantidades.value[produto.id] += 1;
  }
}

function diminuirQuantidade(produto) {
  if (quantidades.value[produto.id] > 1) {
    quantidades.value[produto.id] -= 1;
  }
}

async function removerProduto(produto) {
  const response = await carrinho.updateCarrinho(produto);
  if (response.status >= 200 && response.status <= 300) {
    alert(`Produto ${produto.tituloProduto} removido do carrinho!`);
    await getCarrinho();
  } else {
    alert(`${response.data.message}`);
  }
}

function fecharCarrinho() {
  emit("fechar");
}

function continuarComprando() {
  fecharCarrinho();
}

function finalizarPedido() {
  alert(`Pedido finalizado! Total: R$ ${valorTotal.value}`);
  // Aqui você pode implementar a lógica de finalização do pedido
}

onMounted(() => {
  getCarrinho();
});
</script>

<style scoped>
.carrinho-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(5px);
}

.carrinho-container {
  width: 450px;
  max-width: 90vw;
  height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.carrinho-header {
  background: linear-gradient(135deg, #880093, #aa1bb8);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.carrinho-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-icon {
  font-size: 24px;
}

.btn-fechar {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.btn-fechar:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.carrinho-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.carrinho-vazio {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-cart-icon {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.3;
}

.carrinho-vazio h3 {
  margin: 0 0 10px 0;
  color: #880093;
  font-size: 24px;
}

.produtos-lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.produto-item {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 15px;
  transition: transform 0.2s ease;
}

.produto-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(136, 0, 147, 0.15);
}

.produto-imagem {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.produto-imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.produto-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.produto-titulo {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.produto-descricao {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.produto-preco {
  font-size: 18px;
  font-weight: 700;
  color: #880093;
}

.produto-controles {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.quantidade-controles {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 4px;
}

.btn-quantidade {
  width: 30px;
  height: 30px;
  border: none;
  background: #880093;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-quantidade:hover:not(:disabled) {
  background: #aa1bb8;
  transform: scale(1.1);
}

.btn-quantidade:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.quantidade {
  padding: 0 15px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.btn-remover {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.btn-remover:hover {
  background-color: #ffe6e6;
}

.carrinho-footer {
  background: white;
  border-top: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.resumo-pedido {
  margin-bottom: 20px;
}

.linha-resumo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.linha-resumo.total {
  font-size: 16px;
  font-weight: bold;
  padding-top: 8px;
  border-top: 1px solid #eee;
  margin-top: 8px;
}

.valor-total,
.valor-final {
  color: #880093;
  font-weight: bold;
}

.valor-frete {
  color: #28a745;
  font-weight: 600;
}

.acoes-carrinho {
  display: flex;
  gap: 10px;
}

.btn-continuar {
  flex: 1;
  background: transparent;
  border: 2px solid #880093;
  color: #880093;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-continuar:hover {
  background: #880093;
  color: white;
}

.btn-finalizar {
  flex: 1;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-finalizar:hover {
  background: linear-gradient(135deg, #aa1bb8, #cc44d1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(136, 0, 147, 0.4);
}

/* Scrollbar customizada */
.carrinho-content::-webkit-scrollbar {
  width: 6px;
}

.carrinho-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.carrinho-content::-webkit-scrollbar-thumb {
  background: #880093;
  border-radius: 3px;
}

.carrinho-content::-webkit-scrollbar-thumb:hover {
  background: #aa1bb8;
}

/* Responsividade */
@media (max-width: 480px) {
  .carrinho-container {
    width: 100vw;
  }

  .produto-item {
    flex-direction: column;
    gap: 10px;
  }

  .produto-imagem {
    width: 100%;
    height: 150px;
  }

  .produto-controles {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .acoes-carrinho {
    flex-direction: column;
  }
}
</style>
