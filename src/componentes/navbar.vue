<script setup>
import { ref, computed, defineEmits } from "vue";

const props = defineProps({
  url: String,
});
const url = props.url;
const urls = ["login", "cadastro"];
const abrir = ref(false);
const classenav = computed(() => {
  return urls.includes(url) ? "navEspecial" : ".itens";
});
const emit = defineEmits(["carrinho"]);
function abrircarrinho() {
  if (abrir.value === false) {
    emit("carrinho", true);
    abrir.value = true;
  } else {
    emit("carrinho", false);
    abrir.value = false;
  }
}
</script>
<template>
  <nav class="navbar" :class="classenav">
    <div class="logo">
      <img src="../assets/logoLoja.jpg" height="80px" width="80px" alt="" srcset="" />

      <h3>Loja online</h3>
    </div>
    <div v-if="!urls.includes(url)" class="itens">
      <ul>
        <li>Home</li>
        <li>Contatos</li>
        <li>Sobre</li>
        <li @click="abrircarrinho">
          <img
            class="carrinhodecompras"
            src="../assets/carrinhodecompras.png"
            height="25px"
            width="25px"
            alt=""
            srcset=""
          />
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  background-color: #880093;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.navEspecial {
  display: flex;
  align-items: center;
  justify-content: center;
}
& .logo {
  display: flex;
  align-items: center;
  gap: 4px;
  color: aliceblue;
  & img {
    border-radius: 50%;
    padding: 8px;
  }
}

& .itens {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: aliceblue;
  gap: 10px;
  & ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & li {
      list-style: none;
      padding: 4px;
      cursor: pointer;
      & .carrinhodecompras {
        color: aliceblue;
        filter: invert();
      }
    }
  }
}
</style>
