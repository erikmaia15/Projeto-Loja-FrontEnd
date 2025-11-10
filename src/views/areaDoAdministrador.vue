<template>
  <Navbar
    url="contatos"
    @carrinho="abrircarrinho($event)"
    :novo-produto="novoProduto"
  ></Navbar>
  <br />
  <br />
  <br />
  <br />
  <br />
  <Carrinho
    @removido="novoProduto = true"
    @fechar="abrir = !abrir"
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

    <!-- Seção de Estatísticas -->
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

      <!-- Nova Estatística de Categorias -->
      <div class="stat-card" v-if="isAdmin">
        <div class="stat-icon">📂</div>
        <div class="stat-content">
          <span class="stat-number">{{ categorias?.length || 0 }}</span>
          <span class="stat-label">Categorias</span>
        </div>
      </div>
    </div>

    <!-- Seção de Gerenciamento de Categorias (Admin) -->
    <section class="categorias-section" v-if="isAdmin">
      <div class="section-header">
        <h2 class="section-title">
          <span class="section-icon">📂</span>
          Gerenciar Categorias
        </h2>
        <button class="btn-primary" @click="showNovaCategoria = true">
          <span class="btn-icon">+</span>
          Nova Categoria
        </button>
      </div>

      <div class="categorias-grid">
        <div
          v-for="categoria in categorias"
          :key="categoria.id"
          class="categoria-card"
        >
          <div class="categoria-header">
            <h3 class="categoria-nome">{{ categoria.nome }}</h3>
            <div class="categoria-actions">
              <button
                class="btn-edit"
                @click="editarCategoria(categoria)"
                title="Editar categoria"
              >
                ✏️
              </button>
              <button
                class="btn-delete"
                @click="confirmarExclusaoCategoria(categoria)"
                title="Excluir categoria"
              >
                🗑️
              </button>
            </div>
          </div>
          <div class="categoria-info">
            <span class="categoria-produtos">
              {{ categoria.quantidadeProdutos }} produtos
            </span>
          </div>
        </div>
      </div>

      <!-- Modal Nova Categoria -->
      <div v-if="showNovaCategoria" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ categoriaEditando ? "Editar" : "Nova" }} Categoria</h3>
            <button class="btn-close" @click="fecharModal">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="nomeCategoria">Nome da Categoria:</label>
              <input
                type="text"
                id="nomeCategoria"
                v-model="novaCategoria.nome"
                placeholder="Digite o nome da categoria"
                class="form-input"
                maxlength="50"
              />
              <span class="char-count">{{ novaCategoria.nome.length }}/50</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" @click="fecharModal">Cancelar</button>
            <button
              class="btn-primary"
              @click="salvarCategoria"
              :disabled="!novaCategoria.nome.trim()"
            >
              {{ categoriaEditando ? "Atualizar" : "Salvar" }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Lista de Clientes -->
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
              <span class="compras-number">{{
                usuario.compras.length || 0
              }}</span>
              <span class="compras-label">compras</span>
            </div>
          </div>

          <!-- Área expandida para mostrar as compras -->
          <div
            class="compras-expandable"
            v-if="selectedUser?.id === usuario.id"
          >
            <div class="compras-container">
              <div class="compras-header">
                <h3 class="compras-title">
                  <span class="compras-icon">📦</span>
                  Compras de {{ usuario.nome }}
                </h3>
                <div class="compras-count">
                  {{ comprasCliente.length }} pedido(s)
                </div>
              </div>

              <div v-if="comprasCliente.length > 0" class="compras-grid">
                <div
                  v-for="compra in comprasCliente"
                  class="compra-card"
                  :key="compra.id"
                >
                  <div class="compra-header">
                    <div class="compra-info">
                      <span class="compra-id"
                        >Pedido #{{ compra.id.slice(0, 8) }}</span
                      >
                      <span class="compra-date" v-if="compra.data">{{
                        formatDate(compra.data)
                      }}</span>
                    </div>
                    <div
                      class="compra-status"
                      :class="getStatusClass(compra.status)"
                    >
                      {{ getStatusText(compra.status) }}
                    </div>
                  </div>

                  <div class="compra-content">
                    <div class="itens-container">
                      <div
                        v-for="item in compra.itens"
                        :key="item.id"
                        class="item-card"
                      >
                        <div class="item-image">
                          <img :src="item.imagem" :alt="item.nomeProduto" />
                        </div>
                        <div class="item-details">
                          <h4 class="item-name">{{ item.nomeProduto }}</h4>
                          <p class="item-description">{{ item.descricao }}</p>
                          <div class="item-quantity-price">
                            <span class="item-quantity"
                              >Quantidade: {{ item.quantidade || 1 }}</span
                            >
                            <span class="item-price"
                              >R$ {{ formatPrice(item.precoUnitario) }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="compra-footer">
                      <div class="total-section">
                        <span class="total-label">Total:</span>
                        <span class="total-value"
                          >R$ {{ calculateTotal(compra.itens) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="empty-compras">
                <div class="empty-icon">🛒</div>
                <h3>Nenhuma compra realizada</h3>
                <p>Este cliente ainda não fez nenhum pedido</p>
              </div>
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
import compras from "../../service/compras.js";
import conversao from "../../utils/conversao.js";
import categoriasService from "../../service/categorias.js";

// Variáveis existentes
const isAdmin = ref(false);
const usuariosArray = ref([]);
const abrir = ref(false);
const searchTerm = ref("");
const selectedUser = ref(null);
const novoProduto = ref(false);
const comprasCliente = ref([]);

// Novas variáveis para categorias
const categorias = ref([]);
const showNovaCategoria = ref(false);
const categoriaEditando = ref(null);
const novaCategoria = ref({
  nome: "",
  id: "",
});

const categoriasComQuantidade = ref([]);

const carregarCategorias = async () => {
  const response = await categoriasService.getCategorias();
  categorias.value = response.data.categorias;
  for (const categoria of categorias.value) {
    const response = await categoriasService.getProdutosComCategorias(
      categoria.id
    );
    categoriasComQuantidade.value.push({
      ...categoria,
      quantidadeProdutos: response.data.data.produtos.length,
    });
  }
  categorias.value = categoriasComQuantidade.value;
};

// Computed properties existentes
const filteredUsers = computed(() => {
  if (!searchTerm.value) return usuariosArray.value || [];
  return usuariosArray.value.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const totalCompras = computed(() => {
  let qtdCompras = 0;
  usuariosArray.value.map((user) => {
    qtdCompras += user.compras.length;
  });
  return qtdCompras;
});

// Funções para categorias

const editarCategoria = (categoria) => {
  categoriaEditando.value = categoria;
  novaCategoria.value.nome = categoria.nome;
  novaCategoria.value.id = categoria.id;
  showNovaCategoria.value = true;
};

const salvarCategoria = async () => {
  if (categoriaEditando.value != null) {
    const response = await categoriasService.putCategoria(
      novaCategoria.value.nome,
      novaCategoria.value.id
    );
    if (response.status == 200) {
      alert(response.data.message);
    } else {
      console.log(response);
    }
  } else {
    const response = await categoriasService.postCategoria(
      novaCategoria.value.nome
    );
    if (response.status == 201) {
      alert("Nova categoria cadastrada!");
    }
  }
};

const confirmarExclusaoCategoria = (categoria) => {
  if (
    confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"?`)
  ) {
    excluirCategoria(categoria.id);
  }
};

const excluirCategoria = async (categoriaId) => {
  try {
    const response = await fetch(`/api/categorias/${categoriaId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await carregarCategorias();
    } else {
      alert("Erro ao excluir categoria");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao excluir categoria");
  }
};

const fecharModal = () => {
  showNovaCategoria.value = false;
  categoriaEditando.value = null;
  novaCategoria.value.nome = "";
};

// Funções existentes
function abrircarrinho(dados) {
  abrir.value = !abrir.value;
}

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2).replace(".", ",");
};

const formatDate = (dateString) => {
  if (!dateString) return "Data não disponível";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const calculateTotal = (itens) => {
  const total = itens.reduce((sum, item) => {
    const quantity = item.quantidade || 1;
    return sum + parseFloat(item.precoUnitario) * quantity;
  }, 0);
  return formatPrice(total);
};

const getStatusClass = (status) => {
  const statusMap = {
    approved: "status-approved",
    rejected: "status-rejected",
    pending: "status-pending",
    processing: "status-processing",
    shipped: "status-shipped",
    delivered: "status-delivered",
    cancelled: "status-cancelled",
    refunded: "status-refunded",
  };
  return statusMap[status?.toLowerCase()] || "status-default";
};

const getStatusText = (status) => {
  const statusMap = {
    approved: "Aprovado",
    rejected: "Rejeitado",
    pending: "Pendente",
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
  };
  return statusMap[status?.toLowerCase()] || status || "Desconhecido";
};

const selectUser = async (user) => {
  if (selectedUser.value?.id == user?.id) {
    selectedUser.value = "";
  } else {
    selectedUser.value = user;
    const response = await compras.getComprasCliente(selectedUser.value.id);
    if (response.status >= 200 && response.status < 300) {
      comprasCliente.value = response.data.userCompras;
      comprasCliente.value.map((compra) => {
        compra.itens.map((item) => {
          const response = conversao.centavosParaReais(item.precoUnitario);
          item.precoUnitario = response;
        });
      });
    } else {
      alert("Erro ao buscar compras do usuário!");
    }
  }
};

async function verifyAdmin() {
  const response = await userInfos.getUserInfos();
  if (response.status === 200) {
    isAdmin.value = response.data.usuario.isAdmin;
    if (isAdmin.value) {
      await carregarCategorias();
    }
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
/* Seção de Categorias */
.categorias-section {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(106, 13, 173, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #6a0dad;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6a0dad, #8b5fbf);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 13, 173, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1.2rem;
}

.categorias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.categoria-card {
  background: #f8f4ff;
  border: 2px solid #e8d5ff;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.categoria-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(106, 13, 173, 0.15);
  border-color: #6a0dad;
}

.categoria-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.categoria-nome {
  font-size: 1.3rem;
  font-weight: 600;
  color: #6a0dad;
  margin: 0;
}

.categoria-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: rgba(106, 13, 173, 0.1);
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.1);
}

.categoria-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
}

.categoria-produtos {
  background: #6a0dad;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e8d5ff;
}

.modal-header h3 {
  margin: 0;
  color: #6a0dad;
  font-size: 1.5rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;
}

.btn-close:hover {
  color: #6a0dad;
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e8d5ff;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #6a0dad;
}

.char-count {
  display: block;
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.3rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e8d5ff;
}

.btn-secondary {
  background: #f8f4ff;
  color: #6a0dad;
  border: 2px solid #e8d5ff;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #e8d5ff;
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    text-align: center;
  }

  .categorias-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
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
  grid-template-columns: 2fr 2fr 1fr;
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
  grid-template-columns: 2fr 2fr 1fr;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
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

/* Nova seção de compras expandida */
.compras-expandable {
  grid-column: 1 / -1;
  margin-top: 1.5rem;
  animation: slideDown 0.3s ease-out;
}

.compras-container {
  background: #f9f7ff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e8d5ff;
}

.compras-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8d5ff;
}

.compras-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6a0dad;
  font-size: 1.3rem;
}

.compras-icon {
  font-size: 1.5rem;
}

.compras-count {
  background: #6a0dad;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.compras-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.compra-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(106, 13, 173, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.compra-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(106, 13, 173, 0.15);
}

.compra-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(90deg, #f8f4ff, #ffffff);
  border-bottom: 1px solid #e8d5ff;
}

.compra-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.compra-id {
  font-weight: 600;
  color: #333;
}

.compra-date {
  font-size: 0.85rem;
  color: #666;
}

.compra-status {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Cores melhoradas para os status */
.status-approved {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-color: #047857;
}

.status-rejected {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border-color: #b91c1c;
}

.status-pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-color: #b45309;
}

.status-processing {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-color: #1d4ed8;
}

.status-shipped {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border-color: #6d28d9;
}

.status-delivered {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  color: white;
  border-color: #0e7490;
}

.status-cancelled {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
  border-color: #374151;
}

.status-refunded {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  border-color: #c2410c;
}

.status-default {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: white;
  border-color: #4b5563;
}

.compra-content {
  padding: 1.5rem;
}

.itens-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.item-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 3px solid #6a0dad;
}

.item-image {
  flex-shrink: 0;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  font-weight: 600;
  color: #333;
  margin: 0;
}

.item-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-quantity-price {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.item-quantity {
  font-size: 0.85rem;
  color: #888;
}

.item-price {
  font-weight: 600;
  color: #6a0dad;
}

.compra-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px dashed #e8d5ff;
}

.total-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
}

.total-label {
  color: #666;
}

.total-value {
  font-size: 1.2rem;
  color: #6a0dad;
}

.empty-compras {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}

.empty-compras .empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.empty-compras h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-compras p {
  font-size: 1rem;
  margin: 0;
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

/* Animações */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 1000px;
  }
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

  .compra-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .item-card {
    flex-direction: column;
  }

  .item-image {
    align-self: center;
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

  .compras-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .item-quantity-price {
    flex-direction: column;
    gap: 0.5rem;
  }

  .compra-footer {
    justify-content: center;
  }

  .total-section {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
