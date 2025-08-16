<template>
  <div class="CardExpandido" v-if="showCard">
    <div class="carde">
      <div class="css">
        <div class="card-itens">
          <img :src="produto.imagem" alt="" srcset="" />
          <div class="text">
            <p class="prod-nome">{{ produto.nome }}</p>
            <p class="descricao">{{ produto.descricao }}</p>
          </div>
          <div>
            <p class="btn" @click="fecharCard">X</p>
          </div>
        </div>
        <div class="btn">
          <input
            type="button"
            @click="adicionarcarrinho(produto)"
            value="Adicionar Produto"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
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
  const response = await axios.get("http://localhost:3001/usuarios");
}
</script>
<style scoped>
.btn {
  cursor: pointer;
  color: aliceblue;
}
.css {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}
.CardExpandido {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
  & .carde {
    color: aliceblue;
    position: absolute;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    width: 50vw;
    border-radius: 20px;
    background-color: #94199e;
    box-shadow: #54065a 100px 100px 200px;
    & .card-itens {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: #54065a;
      color: aliceblue;
      border-radius: 20px;
      width: 100%;
    }
    & img {
      border-radius: 20px;
      width: 250px;
      height: 300px;
    }
    & .text {
      word-break: break-word;
      text-align: center;
    }
  }
}
input {
  padding: 15px;
  border-radius: 20px;
  background-color: #54065a;
  color: aliceblue;
}
</style>
