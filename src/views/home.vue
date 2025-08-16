<template>
  <Navbar :url="url" @carrinho="abrircarrinho($event)"></Navbar>
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
    <p class="text-descricao">
      Seja bem-vindo à nossa loja online, um espaço criado com dedicação por
      Erik, apaixonado por tecnologia e inovação! Aqui, você encontra uma ampla
      variedade de produtos eletrônicos, desde os mais essenciais até os mais
      modernos lançamentos do mercado. Trabalhamos para oferecer qualidade,
      confiança e praticidade em cada compra. Nosso objetivo é facilitar sua
      vida com tecnologia acessível, com um atendimento rápido e um site simples
      e seguro de navegar. 🚀 Por que escolher a nossa loja? Produtos
      eletrônicos de alta qualidade 💡 Preços competitivos 💰 Entrega rápida 📦
      Suporte atencioso e dedicado 🤝 A loja do Erik é o lugar certo para quem
      busca praticidade e tecnologia no dia a dia.
    </p>
  </section>

  <br />
  <section class="cards">
    <div
      v-for="produto in produtos"
      :key="produto.id"
      class="card"
      style="width: 18rem"
      @click="expandir(produto)"
    >
      <img :src="produto.imagem" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ produto.tituloProduto }}</h5>
        <p
          class="card-text"
          style="text-align: justify; max-width: fit-content"
        >
          Descriçao:
          {{
            produto.descricao.length > 30
              ? produto.descricao.slice(0, 26) + "..."
              : produto.descricao
          }}
        </p>
        <p class="card-text">Preço: {{ produto.preco }}</p>
        <p class="card-text">Estoque: {{ produto.QtdEstoque }}</p>
      </div>
    </div>
    <AdicionarProduto
      v-if="isAdmin"
      @ProdutoNovo="carregarCards"
      :novoProduto="produtos"
    ></AdicionarProduto>
  </section>
  <section>
    <CardExpandido
      v-if="Object.keys(dadosProduto).length > 0"
      :dados="dadosProduto"
    ></CardExpandido>
    <Carrinho v-if="abrir === true"></Carrinho>
    <br />
    <br />
    <br />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../componentes/navbar.vue";
import CardExpandido from "../componentes/cardExpandido.vue";
import AdicionarProduto from "../componentes/adicionarProduto.vue";
import Carrinho from "../componentes/carrinho.vue";
import ProdutosService from "../../service/produtos.js";
import userInfos from "../../utils/userInfos.js";
const url = ref("home");
const dadosProduto = ref({});
const produtos = ref();
const abrir = ref(false);
const isAdmin = ref(false);

async function informacoesUsuarios() {
  const userInfo = await userInfos.getUserInfos();
  isAdmin.value = userInfo.data.usuario.isAdmin;
  console.log(isAdmin.value);
}

async function carregarCards() {
  try {
    const response = await ProdutosService.getAllProdutos();
    if (response.status >= 200 && response.status <= 300) {
      produtos.value = response.data.produtos;
    } else {
      alert(response.data.message);
    }
  } catch (erro) {
    console.log(erro);
  }
}
function adicionarCarrinho(produto) {
  console.log(produto);
}
function expandir(produto) {
  dadosProduto.value = produto;
}
function abrircarrinho(dados) {
  abrir.value = dados;
  console.log(abrir.value);
}
onMounted(() => {
  informacoesUsuarios();
  carregarCards();
});
</script>

<style scoped>
li {
  list-style-type: none;
}
body {
  background-color: #dbb3df;
  & .slide {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    background-color: #880093;
    width: fit-content;
    border-radius: 20px;
    margin: 5px;
    & .carousel {
      height: 70vh;
      width: 50vw;
      & img {
        border-radius: 20px;
        padding: 10px;
      }
    }
  }
}
.cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  & .card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 390px;
    cursor: pointer;
    & .card-body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex-wrap: wrap;
    }
    & img {
      height: 50%;
    }
  }
}

.text-descricao {
  color: aliceblue;
  text-align: justify;
  width: 30%;
}
input {
  padding: 7px;
  color: white;
  background-color: #880093;
  border-radius: 13px;
  border-color: #880093;
  bottom: 0;
}
</style>
