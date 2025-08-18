<template>
  <nav class="navbar" :class="classenav">
    <div class="logo">
      <img src="../assets/logoLoja.jpg" height="80px" width="80px" alt="" srcset="" />

      <h3>Loja online</h3>
    </div>
    <div v-if="!urls.includes(url)" class="itens">
      <ul>
        <li @click="rotas.push('/home')" href="#">Home</li>
        <li @click="rotas.push('/contatos')">Contatos</li>
        <li @click="rotas.push('/sobre')">Sobre</li>
        <li class="carrinho" @click="abrircarrinho">
          <div class="carrinho-container">
            <img
              class="carrinhodecompras"
              src="../assets/carrinhodecompras.png"
              height="25px"
              width="25px"
              alt=""
              srcset=""
            />
            <div class="carrinho-badge" v-if="carTam > 0">
              <span class="carrinho-numero">{{ carTam > 99 ? "99+" : carTam }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, watch } from "vue";
import userInfos from "../../utils/userInfos";
import rotas from "../../router/rotas";

const props = defineProps({
  url: String,
  novoProduto: Boolean,
});
const url = props.url;
const urls = ["login", "cadastro"];
const abrir = ref(false);
const carTam = ref(0);
const classenav = computed(() => {
  return urls.includes(url) ? "navEspecial" : ".itens";
});
const emit = defineEmits(["carrinho"]);

async function getCarrinho() {
  const response = await userInfos.getUserInfos();
  if (response.status == 200) {
    carTam.value = response.data.usuario.carrinho.length;
  }
}
function abrircarrinho() {
  if (abrir.value === false) {
    emit("carrinho", true);
    abrir.value = true;
  } else {
    emit("carrinho", false);
    abrir.value = false;
  }
}
onMounted(() => {
  getCarrinho();
});
watch(
  () => props.novoProduto,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log("Novo produto adicionado:", newValue);
      try {
        await getCarrinho();
      } catch (error) {
        console.error("Erro ao atualizar carrinho:", error);
      }
    }
  }
);
</script>

<style scoped>
.navbar {
  background-color: #880093;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
}
.navEspecial {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative !important;
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

.carrinho {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.carrinho:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.carrinho-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carrinhodecompras {
  color: aliceblue;
  filter: invert();
  transition: transform 0.3s ease;
}

.carrinho:hover .carrinhodecompras {
  transform: scale(1.1);
}

.carrinho-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #b953d8, #9d00f8);
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(18, 10, 10, 0.4);
  animation: pulse 2s infinite;
  border: 2px solid white;
}

.carrinho-numero {
  color: white;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  padding: 0 2px;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
  50% {
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.6), 0 0 0 4px rgba(255, 71, 87, 0.1);
  }
  100% {
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
}

/* Animação quando o número muda */
.carrinho-badge {
  animation: pulse 2s infinite, fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .carrinho-badge {
    top: -6px;
    right: -6px;
    min-width: 18px;
    height: 18px;
  }

  .carrinho-numero {
    font-size: 10px;
  }
}
</style>
