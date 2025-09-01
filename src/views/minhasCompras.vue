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

    <div class="compras-grid">
      <!-- Card de exemplo 1 -->
      <div class="card-pay">
        <div class="card-status approved">
          <span class="status-badge">Aprovado</span>
          <span class="purchase-date">15 Ago 2024</span>
        </div>

        <div class="header-pay">
          <div class="img-container">
            <img
              src="../assets/controleProduto.png"
              class="img-pay"
              alt="Produto"
            />
          </div>
          <div class="pay-informations">
            <h3 class="pay-description-product">
              Controle PlayStation 4 Wireless
            </h3>
            <div class="pay-details">
              <p class="pay-price">R$ 299,90</p>
              <p class="pay-installments">3x de R$ 99,97</p>
            </div>
            <div class="payment-method">
              <span class="method-icon">💳</span>
              <span class="method-text">Mastercard •••• 1234</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button class="btn-details">Ver Detalhes</button>
        </div>
      </div>

      <!-- Card de exemplo 2 -->
      <div class="card-pay">
        <div class="card-status pending">
          <span class="status-badge">Processando</span>
          <span class="purchase-date">20 Ago 2024</span>
        </div>

        <div class="header-pay">
          <div class="img-container">
            <img
              src="https://via.placeholder.com/120x120/880093/ffffff?text=Produto"
              class="img-pay"
              alt="Produto"
            />
          </div>
          <div class="pay-informations">
            <h3 class="pay-description-product">Calcinha Pala Alta Premium</h3>
            <div class="pay-details">
              <p class="pay-price">R$ 52,22</p>
              <p class="pay-installments">À vista</p>
            </div>
            <div class="payment-method">
              <span class="method-icon">💳</span>
              <span class="method-text">Visa •••• 5678</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button class="btn-details">Ver Detalhes</button>
        </div>
      </div>

      <!-- Card de exemplo 3 -->
      <div class="card-pay">
        <div class="card-status rejected">
          <span class="status-badge">Rejeitado</span>
          <span class="purchase-date">10 Ago 2024</span>
        </div>

        <div class="header-pay">
          <div class="img-container">
            <img
              src="https://via.placeholder.com/120x120/880093/ffffff?text=Produto"
              class="img-pay"
              alt="Produto"
            />
          </div>
          <div class="pay-informations">
            <h3 class="pay-description-product">Smartphone Galaxy A54</h3>
            <div class="pay-details">
              <p class="pay-price">R$ 1.299,00</p>
              <p class="pay-installments">12x de R$ 108,25</p>
            </div>
            <div class="payment-method">
              <span class="method-icon">💳</span>
              <span class="method-text">Mastercard •••• 9012</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button class="btn-details">Ver Detalhes</button>
        </div>
      </div>
    </div>

    <!-- Empty state caso não tenha compras -->
    <div class="empty-state" v-if="false">
      <div class="empty-icon">🛒</div>
      <h2>Nenhuma compra realizada</h2>
      <p>Você ainda não fez nenhuma compra. Explore nossos produtos!</p>
      <button class="btn-shop">Começar a Comprar</button>
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
import { ref } from "vue";
import Carrinho from "../componentes/carrinho.vue";
import Navbar from "../componentes/navbar.vue";
import Footer from "../componentes/footer.vue";

const novoProduto = ref(false);
const abrir = ref(false);

function abrircarrinho() {
  abrir.value = !abrir.value;
}
</script>

<style scoped>
.compras-container {
  min-height: 100vh;

  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
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

.compras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card-pay {
  background: linear-gradient(135deg, #4f0754 0%, #a3009e 50%, #860775 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(136, 0, 147, 0.15);
  border: 1px solid rgba(136, 0, 147, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;
}

.card-pay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #880093, #a3009e, #c100a8);
}

.card-pay:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(136, 0, 147, 0.25);
}

.card-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.approved .status-badge {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.pending .status-badge {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.rejected .status-badge {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.purchase-date {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.header-pay {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: center;
}

.img-container {
  flex-shrink: 0;
  position: relative;
  border-radius: 20px;
  background-color: white;
  object-fit: cover;
  width: 100%;
  max-width: 14vw;
  max-height: 20vh;
}

.img-pay {
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(136, 0, 147, 0.1);
  width: 100%;
  height: 100%;
}

.pay-informations {
  flex: 1;
  min-width: 0;
}

.pay-description-product {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.8rem 0;
  line-height: 1.4;
}

.pay-details {
  margin-bottom: 0.8rem;
}

.pay-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.2rem 0;
}

.pay-installments {
  font-size: 0.9rem;
  color: white;
  margin: 0;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  color: white;
  border-radius: 8px;
  border: 1px solid rgba(136, 0, 147, 0.1);
}

.method-icon {
  font-size: 1rem;
}

.method-text {
  font-size: 0.85rem;
  color: white;
  font-weight: 500;
}

.card-footer {
  display: flex;
  gap: 0.8rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(136, 0, 147, 0.1);
  color: white;
}

.btn-details {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  color: white;
  flex: 1;
}

.btn-details {
  background-color: #4f0754;
  color: white;
  border: 1px solid rgba(136, 0, 147, 0.2);
}

.btn-details:hover {
  background: rgba(56, 2, 59, 0.15);
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
  border: 1px solid rgba(136, 0, 147, 0.1);
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
  background: linear-gradient(135deg, #880093, #a3009e);
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
  box-shadow: 0 10px 25px rgba(136, 0, 147, 0.3);
}

@media (max-width: 768px) {
  .compras-container {
    padding: 1rem;
  }

  .compras-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .header-pay {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    text-align: center;
  }

  .card-footer {
    flex-direction: column;
  }

  .img-container {
    flex-shrink: 0;
    position: relative;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    object-fit: cover;
    max-width: 50vw;
    max-height: 50vw;
    width: 100%;
    height: 100%;
  }

  .img-pay {
    border-radius: 12px;
    object-fit: cover;
    border: 2px solid rgba(136, 0, 147, 0.1);
    width: 100%;
    height: 100%;
  }
}
</style>
