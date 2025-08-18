<template>
  <div class="CardExpandido" v-if="showCard" @click="fecharCard">
    <div class="modal-overlay">
      <div class="carde" @click.stop>
        <div class="card-header">
          <button class="btn-fechar" @click="fecharCard">
            <span>&times;</span>
          </button>
        </div>

        <div class="card-content">
          <div class="produto-imagem">
            <img :src="produto?.imagem" :alt="produto?.nome" />
            <div class="image-overlay">
              <span class="zoom-hint">🔍 Clique para ampliar</span>
            </div>
          </div>

          <div class="produto-info">
            <div class="produto-badge">
              <span class="badge-destaque">✨ Produto em Destaque</span>
            </div>

            <h2 class="produto-nome">
              {{ produto?.tituloProduto || produto?.nome }}
            </h2>

            <div class="produto-preco-container">
              <span class="produto-preco">R$ {{ produto?.preco }},00</span>
              <span class="produto-parcelas"
                >ou 12x de R$ {{ Math.ceil(produto?.preco / 12) }},00</span
              >
            </div>

            <div class="produto-disponibilidade">
              <div class="estoque-info">
                <span class="estoque-icon">📦</span>
                <span>{{ produto?.QtdEstoque }} unidades disponíveis</span>
              </div>
              <div class="entrega-info">
                <span class="entrega-icon">🚚</span>
                <span>Entrega rápida em até 3 dias úteis</span>
              </div>
            </div>

            <div class="descricao-container">
              <h3 class="descricao-titulo">Descrição do Produto</h3>
              <p class="produto-descricao">{{ produto?.descricao }}</p>
            </div>

            <div class="produto-caracteristicas">
              <h4>Características:</h4>
              <ul class="lista-caracteristicas">
                <li>✅ Produto original e com garantia</li>
                <li>✅ Qualidade premium testada</li>
                <li>✅ Suporte técnico especializado</li>
                <li>✅ Satisfação garantida</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-favoritar" title="Adicionar aos favoritos">
            <span class="heart-icon">🤍</span>
            Favoritar
          </button>

          <button class="btn-adicionar-carrinho" @click="adicionarcarrinho(produto)">
            <span class="cart-icon">🛒</span>
            Adicionar ao Carrinho
          </button>

          <button class="btn-comprar-agora">
            <span class="lightning-icon">⚡</span>
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import carrinho from "../../service/carrinho";
import { ref, watch } from "vue";

const produto = ref(null);
const props = defineProps({
  dados: {
    type: Object,
    default: () => null,
  },
});
const showCard = ref(true);

watch(
  () => props.dados,
  (newVal) => {
    produto.value = newVal;
    console.log(newVal);
    fecharCard();
  },
  { immediate: true }
);

function fecharCard() {
  if (showCard.value === true) {
    showCard.value = false;
  } else {
    showCard.value = true;
  }
}

async function adicionarcarrinho(produto) {
  try {
    const response = await carrinho.postCarrinho(produto);
    if (response.status >= 200 && response.status <= 300) {
      alert("Produto adicionado no carrinho!");
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.CardExpandido {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.carde {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 24px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(136, 0, 147, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes slideUp {
  from {
    transform: translateY(50px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.card-header {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
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

.card-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 30px;
  align-items: start;
}

.produto-imagem {
  position: relative;
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
}

.produto-imagem img {
  width: 100%;
  max-width: 350px;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.produto-imagem:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(136, 0, 147, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(10px);
}

.produto-imagem:hover .image-overlay {
  opacity: 1;
}

.produto-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #333;
}

.produto-badge {
  display: flex;
  justify-content: flex-start;
}

.badge-destaque {
  background: linear-gradient(135deg, #880093, #aa1bb8);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.produto-nome {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.3;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.produto-preco-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.produto-preco {
  font-size: 32px;
  font-weight: 800;
  color: #880093;
}

.produto-parcelas {
  font-size: 14px;
  color: #28a745;
  font-weight: 600;
}

.produto-disponibilidade {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  border-radius: 12px;
  border-left: 4px solid #880093;
}

.estoque-info,
.entrega-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.estoque-icon,
.entrega-icon {
  font-size: 18px;
}

.descricao-container {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.descricao-titulo {
  color: #880093;
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
}

.produto-descricao {
  color: #555;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
}

.produto-caracteristicas {
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  padding: 20px;
  border-radius: 12px;
}

.produto-caracteristicas h4 {
  color: #880093;
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
}

.lista-caracteristicas {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lista-caracteristicas li {
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-actions {
  display: flex;
  gap: 15px;
  padding: 30px;
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  border-radius: 0 0 24px 24px;
  border-top: 1px solid #eee;
}

.btn-favoritar {
  flex: 1;
  background: white;
  border: 2px solid #ddd;
  color: #666;
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-favoritar:hover {
  border-color: #880093;
  color: #880093;
  transform: translateY(-2px);
}

.btn-adicionar-carrinho {
  flex: 2;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  border: none;
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-adicionar-carrinho:hover {
  background: linear-gradient(135deg, #aa1bb8, #cc44d1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(136, 0, 147, 0.4);
}

.btn-comprar-agora {
  flex: 2;
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-comprar-agora:hover {
  background: linear-gradient(135deg, #20c997, #17a2b8);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
}

/* Scrollbar customizada */
.carde::-webkit-scrollbar {
  width: 8px;
}

.carde::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.carde::-webkit-scrollbar-thumb {
  background: #880093;
  border-radius: 4px;
}

.carde::-webkit-scrollbar-thumb:hover {
  background: #aa1bb8;
}

/* Responsividade */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .card-content {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }

  .produto-imagem img {
    height: 250px;
  }

  .produto-nome {
    font-size: 24px;
  }

  .produto-preco {
    font-size: 28px;
  }

  .card-actions {
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }

  .btn-favoritar,
  .btn-adicionar-carrinho,
  .btn-comprar-agora {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .carde {
    margin: 10px;
    max-height: 95vh;
  }

  .produto-nome {
    font-size: 20px;
  }

  .produto-preco {
    font-size: 24px;
  }
}
</style>
