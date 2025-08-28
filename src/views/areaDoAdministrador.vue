<template>
  <Navbar url="contatos" @carrinho="abrircarrinho($event)"></Navbar>
  <br />
  <br />
  <br />
  <br />
  <br />
  <Carrinho
    @removido="true"
    @fechar="abrir = false"
    v-if="abrir === true"
  ></Carrinho>

  <section class="usuarios-container">
    <div class="header-section">
      <h1 class="page-title">
        <span class="title-icon">👥</span>
        Clientes do E-commerce
      </h1>
      <p class="page-subtitle">
        Gerencie e visualize informações dos seus clientes
      </p>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">👤</div>
        <div class="stat-content">
          <span class="stat-number">{{ usuariosArray?.length || 0 }}</span>
          <span class="stat-label">Total de Clientes</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🛒</div>
        <div class="stat-content">
          <span class="stat-number">{{ totalCompras }}</span>
          <span class="stat-label">Total de Compras</span>
        </div>
      </div>
    </div>

    <section class="usuarios-table">
      <div class="table-header">
        <h2 class="table-title">
          <span class="table-icon">📊</span>
          Lista de Clientes
        </h2>
        <div class="table-actions">
          <div class="search-container">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Buscar cliente..."
              class="search-input"
            />
            <span class="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header-row">
          <div class="column-header">
            <span class="header-icon">👤</span>
            Nome do Cliente
          </div>
          <div class="column-header">
            <span class="header-icon">📧</span>
            Email
          </div>
          <div class="column-header">
            <span class="header-icon">🛒</span>
            Compras
          </div>
        </div>

        <div
          class="user-row"
          v-for="usuario in filteredUsers"
          :key="usuario.id"
          @click="selectUser(usuario)"
          :class="{ selected: selectedUser?.id === usuario.id }"
        >
          <div class="user-cell user-nome">
            <div class="user-avatar">
              {{ usuario.nome.charAt(0).toUpperCase() }}
            </div>
            <div class="user-info">
              <span class="user-name">{{ usuario.nome }}</span>
            </div>
          </div>

          <div class="user-cell user-email">
            <span class="email-text">{{ usuario.email }}</span>
          </div>

          <div class="user-cell user-compras">
            <div class="compras-badge">
              <span class="compras-number">{{ usuario.qtdCompras || 2 }}</span>
              <span class="compras-label">compras</span>
            </div>
          </div>
        </div>

        <div v-if="filteredUsers.length === 0" class="empty-state">
          <div class="empty-icon">😔</div>
          <h3>Nenhum cliente encontrado</h3>
          <p>Tente ajustar os filtros de busca</p>
        </div>
      </div>
    </section>
  </section>
  <Footer></Footer>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import userInfos from "../../utils/userInfos";
import usuarios from "../../service/usuarios";
import Navbar from "../componentes/navbar.vue";
import Carrinho from "../componentes/carrinho.vue";
import Footer from "../componentes/footer.vue";

const isAdmin = ref(false);
const usuariosArray = ref([]);
const abrir = ref(false);
const searchTerm = ref("");
const selectedUser = ref(null);

function abrircarrinho(dados) {
  abrir.value = dados;
  console.log(abrir.value);
}

// Computed properties
const filteredUsers = computed(() => {
  if (!searchTerm.value) return usuariosArray.value || [];

  return usuariosArray.value.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const totalCompras = computed(() => {
  return (
    usuariosArray.value?.reduce(
      (total, user) => total + (user.qtdCompras || 2),
      0
    ) || 0
  );
});

// Funções utilitárias

const selectUser = (user) => {
  selectedUser.value = user;
};

async function verifyAdmin() {
  const response = await userInfos.getUserInfos();
  if (response.status === 200) {
    isAdmin.value = response.data.usuario.isAdmin;
  }
  const responseUsers = await usuarios.getUsuarios();
  if (responseUsers.status >= 200 && responseUsers.status <= 300) {
    usuariosArray.value = responseUsers.data.users;
  }
}

onMounted(() => {
  verifyAdmin();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.usuarios-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f4ff 0%, #e8d5ff 100%);
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #880093, #880093);
  border-radius: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(106, 13, 173, 0.3);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 3rem;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 8px 25px rgba(106, 13, 173, 0.1);
  border: 2px solid rgba(106, 13, 173, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(106, 13, 173, 0.2);
  border-color: rgba(106, 13, 173, 0.3);
}

.stat-icon {
  font-size: 3rem;
  background: linear-gradient(135deg, #6a0dad, #8b5fbf);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #6a0dad;
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

.usuarios-table {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(106, 13, 173, 0.1);
  overflow: hidden;
}

.table-header {
  background: linear-gradient(135deg, #b707df, #5a086a);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-title {
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.table-icon {
  font-size: 2rem;
}

.table-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
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

.table-container {
  padding: 0;
}

.table-header-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1.5fr;
  background: #f8f4ff;
  padding: 1.5rem 2rem;
  font-weight: 600;
  color: #7f048a;
  border-bottom: 2px solid #e8d5ff;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.header-icon {
  font-size: 1.2rem;
}

.user-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1.5fr;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-row:hover {
  background: linear-gradient(90deg, #f8f4ff, #ffffff);
  transform: translateX(5px);
}

.user-row.selected {
  background: linear-gradient(90deg, #e8d5ff, #f8f4ff);
  border-left: 4px solid #6a0dad;
}

.user-cell {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

.user-nome {
  gap: 1rem;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a0dad, #8b5fbf);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.email-text {
  color: #666;
  font-size: 0.9rem;
}

.compras-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: linear-gradient(135deg, #6a0dad, #4c0753);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.compras-number {
  font-weight: 700;
  font-size: 1.1rem;
}

.compras-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

.acesso-text {
  color: #666;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

/* Responsividade */
@media (max-width: 1024px) {
  .table-header-row,
  .user-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .user-row {
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 0.5rem;
  }

  .column-header {
    display: none;
  }
}

@media (max-width: 768px) {
  .usuarios-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .table-header {
    flex-direction: column;
    text-align: center;
  }

  .search-input {
    width: 100%;
  }
}
</style>
