<template>
  <nav class="navbar" :class="classenav">
    <div class="logo">
      <img src="../assets/Logo MS.png" height="80px" width="80px" alt="" srcset="" />
      <h3>Maia Store</h3>
    </div>

    <div v-if="!urls.includes(url)" class="itens">
      <!-- Menu hamburger para mobile -->
      <div
        class="menu-icon"
        v-if="tamTela <= 744"
        @click="toggleMenuResponsivo"
        :class="{ active: menuResponsivoAberto }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Menu normal para desktop -->
      <ul class="rotas-normal" v-if="tamTela > 744">
        <li @click="rotas.push('/home')" href="#">Home</li>
        <li @click="rotas.push('/sobre')">Sobre</li>
        <li @click="rotas.push('/area-do-administrador')" v-if="isAdmin">
          Área do Administrador
        </li>
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

    <!-- Menu responsivo que aparece abaixo -->
    <div
      class="menu-responsivo"
      v-if="tamTela <= 744 && menuResponsivoAberto && !urls.includes(url)"
      @click="fecharMenuResponsivo"
    >
      <ul class="rotas-responsiva">
        <li @click="navegarPara('/home')">
          <span class="menu-icon-item">🏠</span>
          Home
        </li>
        <li @click="navegarPara('/sobre')">
          <span class="menu-icon-item">ℹ️</span>
          Sobre
        </li>
        <li @click="navegarPara('/area-do-administrador')" v-if="isAdmin">
          <span class="menu-icon-item">⚙️</span>
          Área do Administrador
        </li>
        <li class="carrinho-mobile" @click="abrircarrinho">
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
          <span>Carrinho</span>
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
const isAdmin = ref(false);
const menuResponsivoAberto = ref(false);
const tamTela = ref(window.innerWidth);

const classenav = computed(() => {
  return urls.includes(url) ? "navEspecial" : "navbar-normal";
});

async function isAdminFunc() {
  const response = await userInfos.getUserInfos();
  if (response) {
    isAdmin.value = response.data.usuario.isAdmin;
  } else {
    alert("Erro ao buscar as informações do usuario!");
  }
}

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
  // Fechar menu responsivo ao abrir carrinho
  menuResponsivoAberto.value = false;
}

function toggleMenuResponsivo() {
  menuResponsivoAberto.value = !menuResponsivoAberto.value;
}

function fecharMenuResponsivo() {
  menuResponsivoAberto.value = false;
}

function navegarPara(rota) {
  rotas.push(rota);
  menuResponsivoAberto.value = false;
}

// Fechar menu ao redimensionar para desktop
watch(tamTela, (novoTamanho) => {
  if (novoTamanho > 744) {
    menuResponsivoAberto.value = false;
  }
});

onMounted(() => {
  getCarrinho();
  isAdminFunc();

  window.addEventListener("resize", () => {
    tamTela.value = window.innerWidth;
  });
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
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  padding: 0 20px;
  min-height: 80px;
}

.navEspecial {
  justify-content: center;
  position: relative !important;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: aliceblue;
}

.logo img {
  border-radius: 50%;
  padding: 4px;
}

.logo h3 {
  margin: 0;
  font-size: 1.5rem;
}

.itens {
  display: flex;
  align-items: center;
}

.rotas-normal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0;
  padding: 0;
  color: aliceblue;
}

.rotas-normal li {
  list-style: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.rotas-normal li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Menu Hamburger */
.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 7px;
  width: 50px;
  height: 50px;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.menu-icon span {
  display: block;
  height: 7px;
  width: 100%;
  background-color: aliceblue;
  border-radius: 2px;
  margin-bottom: 1px;
  transition: all 0.3s ease;
}

.menu-icon.active span:nth-child(1) {
  transform: rotate(45deg) translate(10px, 10px);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
}

.menu-icon.active span:nth-child(3) {
  transform: rotate(-45deg) translate(10px, -10px);
}

/* Menu Responsivo */
.menu-responsivo {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, #880093, #b953d8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease-out;
  z-index: 99;
}

.rotas-responsiva {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
}

.rotas-responsiva li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  color: aliceblue;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.rotas-responsiva li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  padding-left: 30px;
}

.rotas-responsiva li:last-child {
  border-bottom: none;
}

.menu-icon-item {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

/* Carrinho styles */
.carrinho,
.carrinho-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  gap: 8px;
}

.carrinho:hover,
.carrinho-mobile:hover {
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
  filter: invert();
  transition: transform 0.3s ease;
}

.carrinho:hover .carrinhodecompras,
.carrinho-mobile:hover .carrinhodecompras {
  transform: scale(1.1);
}

.carrinho-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
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

/* Animações */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Media Queries */
@media (max-width: 744px) {
  .menu-icon {
    display: flex;
  }

  .rotas-normal {
    display: none;
  }

  .navbar {
    padding: 0 15px;
  }

  .logo h3 {
    font-size: 1.2rem;
  }

  .logo img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .navbar {
    min-height: 70px;
    padding: 0 10px;
  }

  .logo img {
    width: 50px;
    height: 50px;
  }

  .logo h3 {
    font-size: 1.1rem;
  }

  .menu-responsivo {
    top: 70px;
  }

  .rotas-responsiva li {
    padding: 14px 15px;
    font-size: 1rem;
  }
}
</style>
