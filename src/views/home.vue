<template>
  <Navbar
    :url="url"
    :novoProduto="novoProduto"
    class="nav"
    @carrinho="abrircarrinho($event)"
  ></Navbar>

  <br />
  <br />
  <br />
  <br />
  <br />

  <section class="slide">
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/controleProduto.png"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/controleProduto.png"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/controleProduto.png"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="description-container">
      <p class="text-descricao">
        Seja bem-vindo à nossa loja online, um espaço criado com dedicação por
        Erik, apaixonado por tecnologia e inovação! Aqui, você encontra uma
        ampla variedade de produtos eletrônicos, desde os mais essenciais até os
        mais modernos lançamentos do mercado. Trabalhamos para oferecer
        qualidade, confiança e praticidade em cada compra. Nosso objetivo é
        facilitar sua vida com tecnologia acessível, com um atendimento rápido e
        um site simples e seguro de navegar. 🚀 Por que escolher a nossa loja?
        Produtos eletrônicos de alta qualidade 💡 Preços competitivos 💰 Entrega
        rápida 📦 Suporte atencioso e dedicado 🤝 A loja do Erik é o lugar certo
        para quem busca praticidade e tecnologia no dia a dia.
      </p>
    </div>
  </section>

  <br />
  <div class="table-actions">
    <div class="search-container">
      <input
        type="text"
        v-model="barraPesquisa"
        placeholder="buscar produto..."
        class="search-input"
      />
      <span class="search-icon">🔍</span>
    </div>
  </div>

  <section class="cards-section">
    <div class="cards-container">
      <div
        v-for="produto in produtos"
        :key="produto.id"
        class="product-card"
        :class="{
          'card-selecionado-remocao': isProdutoSelecionadoRemocao(produto.id),
        }"
      >
        <div class="card-header">
          <h5 class="card-title">
            {{ produto.tituloProduto }}
          </h5>
          <button
            type="button"
            class="btn-fechar"
            :class="{
              'btn-selecionado': isProdutoSelecionadoRemocao(produto.id),
            }"
            @click="toggleRemoverProduto(produto)"
          >
            <span>&times;</span>
          </button>
        </div>
        <div class="card-image" @click="expandir(produto)">
          <img
            :src="produto.imagem"
            class="product-image"
            alt="Imagem do produto"
          />
        </div>
        <div class="card-body">
          <div class="card-info" @click="expandir(produto)">
            <p class="card-description">
              <strong>Descrição:</strong>
              {{
                produto.descricao.length > 30
                  ? produto.descricao.slice(0, 26) + "..."
                  : produto.descricao
              }}
            </p>
            <div class="price-stock-container">
              <p class="card-price">R$ {{ produto.precoCentavos }}</p>
              <p class="card-stock">Estoque: {{ produto.QtdEstoque }}</p>
            </div>
          </div>
          <button class="btn-add-cart" @click="adicionarCarrinho(produto)">
            Adicionar ao carrinho
          </button>
          <br />
          <div class="editAdmin">
            <button
              class="btn-add-cart"
              v-if="isAdmin"
              @click="editarProduto(produto)"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
      <AdicionarProduto
        v-if="isAdmin"
        @ProdutoNovo="carregarCards"
        :novoProduto="produtos"
      ></AdicionarProduto>
    </div>

    <!-- Botão para confirmar remoção dos produtos selecionados -->
    <div v-if="produtosParaRemover.length > 0" class="remocao-actions">
      <button @click="confirmarRemocaoProdutos" class="btn-confirmar-remocao">
        Confirmar remoção ({{ produtosParaRemover.length }} produtos)
      </button>
      <button @click="cancelarRemocao" class="btn-cancelar-remocao">
        Cancelar
      </button>
    </div>
  </section>

  <section>
    <CardExpandido
      @fechar="cardExpandido = false"
      @novoproduto="novoProduto = true"
      v-if="Object.keys(dadosProduto).length > 0 && cardExpandido == true"
      :dados="dadosProduto"
    ></CardExpandido>
    <Carrinho
      @removido="true"
      @fechar="abrir = false"
      v-if="abrir === true"
    ></Carrinho>
    <EditarProduto
      @fechar="produtoEditar = null"
      v-if="produtoEditar != null"
      :produto="produtoEditar"
    ></EditarProduto>

    <br />
    <br />
    <br />
  </section>
  <Footer></Footer>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Navbar from "../componentes/navbar.vue";
import CardExpandido from "../componentes/cardExpandido.vue";
import AdicionarProduto from "../componentes/adicionarProduto.vue";
import Carrinho from "../componentes/carrinho.vue";
import ProdutosService from "../../service/produtos.js";
import userInfos from "../../utils/userInfos.js";
import carrinho from "../../service/carrinho.js";
import rotas from "../../router/rotas.js";
import EditarProduto from "../componentes/editarProduto.vue";
import Footer from "../componentes/footer.vue";
const url = ref("home");
const dadosProduto = ref({});
const produtos = ref();
const abrir = ref(false);
const isAdmin = ref(false);
const novoProduto = ref(false);
const cardExpandido = ref(false);
const produtoEditar = ref(null);
const barraPesquisa = ref("");
const produtosOriginais = ref([]);
const produtosParaRemover = ref([]);
async function informacoesUsuarios() {
  const userInfo = await userInfos.getUserInfos();

  if (userInfo.status >= 200 && userInfo.status <= 300) {
    isAdmin.value = userInfo.data.usuario.isAdmin;
  } else {
    alert("Precisa de login, você será redirecionado para tela de login!");
    rotas.push("/login");
  }
}
// Função para verificar se o produto está selecionado para remoção
function isProdutoSelecionadoRemocao(produtoId) {
  return produtosParaRemover.value.includes(produtoId);
}

// Função para toggle (adicionar/remover) produto da lista de remoção
function toggleRemoverProduto(produto) {
  const index = produtosParaRemover.value.indexOf(produto.id);

  if (index === -1) {
    // Se não está na lista, adiciona
    produtosParaRemover.value.push(produto.id);
  } else {
    // Se já está na lista, remove
    produtosParaRemover.value.splice(index, 1);
  }
}

// Função para cancelar toda a seleção de remoção
function cancelarRemocao() {
  produtosParaRemover.value = [];
}

// Função para confirmar a remoção dos produtos selecionados
async function confirmarRemocaoProdutos() {
  if (produtosParaRemover.value.length === 0) return;

  const confirmar = confirm(
    `Tem certeza que deseja remover ${produtosParaRemover.value.length} produto(s)?`
  );

  if (!confirmar) return;
  const idsComoString = produtosParaRemover.value.map((id) => String(id));
  console.log(idsComoString);
  const response = await ProdutosService.deletarProdutos(idsComoString);
  if (response.status === 200) {
    alert("Produtos removidos com sucesso");
    produtosParaRemover.value = [];
    await carregarCards();
  } else {
    alert("Ouve algum erro para remover!");
  }
}
function editarProduto(produto) {
  produtoEditar.value = produto;
}
async function carregarCards() {
  try {
    const response = await ProdutosService.getAllProdutos();
    if (response.status >= 200 && response.status <= 300) {
      produtos.value = response.data.produtos;
      produtosOriginais.value = produtos.value;
    } else {
      alert(response.data.message);
    }
  } catch (erro) {
    console.log(erro);
  }
}
async function adicionarCarrinho(produto) {
  const response = await carrinho.postCarrinho(produto);
  if ((response.status >= 200) & (response.status <= 300)) {
    alert("Produto adicionado ao carrinho!");
    novoProduto.value += 1;
  } else {
    alert(response.data.message);
  }
}
function expandir(produto) {
  dadosProduto.value = produto;
  cardExpandido.value = true;
}
function abrircarrinho(dados) {
  abrir.value = dados;
  console.log(abrir.value);
}

watch(barraPesquisa, (newValue) => {
  if (newValue && newValue.trim()) {
    produtos.value = produtosOriginais.value.filter((produto) =>
      produto.tituloProduto.toLowerCase().includes(newValue.toLowerCase())
    );
  } else {
    produtos.value = [...produtosOriginais.value];
  }
});
onMounted(async () => {
  await informacoesUsuarios();
  carregarCards();
});
</script>

<style scoped>
/* Reset e configurações gerais */
* {
  box-sizing: border-box;
}

li {
  list-style-type: none;
}

body {
  background-color: #dbb3df;
}
/* card button fechar */
.btn-fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

/* parte para remoção de produto */
.card-selecionado-remocao {
  background-color: #f5f5f5 !important;
  opacity: 0.7;
  border: 2px solid #dc3545;
  transition: all 0.3s ease;
}

.card-selecionado-remocao .product-image {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.card-selecionado-remocao .card-title,
.card-selecionado-remocao .card-description,
.card-selecionado-remocao .card-price,
.card-selecionado-remocao .card-stock {
  color: #6c757d !important;
}

.btn-fechar.btn-selecionado {
  background-color: #dc3545;
  color: white;
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

/* Estilos para os botões de ação de remoção */
.remocao-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.btn-confirmar-remocao {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-confirmar-remocao:hover {
  background-color: #c82333;
}

.btn-cancelar-remocao {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-cancelar-remocao:hover {
  background-color: #5a6268;
}

/* barra de pesquisa */
.table-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.search-container {
  position: relative;
}

.search-input {
  padding: 0.8rem 3rem 0.8rem 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  width: 300px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: black;
}

.search-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #6a0dad;
}
/* Seção do slide */
.slide {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin: 20px;
  padding: 20px;
  background-color: #880093;
  border-radius: 20px;
}

.carousel {
  height: 70vh;
  width: 60%;
}

.carousel img {
  border-radius: 15px;
  padding: 10px;
  max-width: 100%;
  object-fit: cover;
}

.description-container {
  width: 35%;
  display: flex;
  align-items: center;
}

.text-descricao {
  color: aliceblue;
  text-align: justify;
  line-height: 1.6;
  font-size: 16px;
  margin: 0;
}

/* Seção dos cards */
.cards-section {
  padding: 20px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(136, 0, 147, 0.3);
}

.card-header {
  padding: 15px;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.card-image {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.card-body {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-info {
  flex-grow: 1;
}

.card-description {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.card-description strong {
  color: #880093;
}

.price-stock-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-price {
  font-size: 20px;
  font-weight: bold;
  color: #880093;
  margin: 0;
}

.card-stock {
  font-size: 14px;
  color: #666;
  margin: 0;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
}

.btn-add-cart {
  width: 100%;
  background: linear-gradient(135deg, #880093, #aa1bb8);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-add-cart:hover {
  background: linear-gradient(135deg, #aa1bb8, #cc44d1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(136, 0, 147, 0.4);
}

.btn-add-cart:active {
  transform: translateY(0);
}

/* Inputs */
input {
  padding: 10px 15px;
  color: white;
  background-color: #880093;
  border-radius: 8px;
  border: 2px solid #880093;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #aa1bb8;
  box-shadow: 0 0 0 3px rgba(136, 0, 147, 0.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .slide {
    flex-direction: column;
    margin: 10px;
    padding: 15px;
  }

  .carousel {
    width: 100%;
    height: 50vh;
  }

  .description-container {
    width: 100%;
  }

  .cards-container {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 10px;
  }

  .product-card {
    min-height: auto;
  }

  .card-image {
    height: 180px;
  }

  .price-stock-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 40vh;
  }

  .text-descricao {
    font-size: 14px;
  }

  .card-title {
    font-size: 16px;
  }
  .cards-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
