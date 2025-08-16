<template>
  <div class="product-form">
    <button @click="toggleForm" class="toggle-btn">
      {{ showForm ? "Cancelar" : "Adicionar Produto" }}
    </button>

    <form v-if="showForm" @submit.prevent="handleSubmit" class="form-container">
      <div class="form-group">
        <label for="productName">Nome do Produto*</label>
        <input
          type="text"
          id="productName"
          v-model.trim="formData.tituloProduto"
          required
          placeholder="Ex: Notebook Dell"
        />
      </div>

      <div class="form-group">
        <label for="productDescription">Descrição*</label>
        <textarea
          id="productDescription"
          v-model.trim="formData.descricao"
          required
          placeholder="Descreva o produto..."
          rows="3"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="productPrice">Preço (R$)*</label>
          <input
            type="number"
            id="productPrice"
            v-model.number="formData.preco"
            min="0"
            step="0.01"
            required
            placeholder="0,00"
          />
        </div>

        <div class="form-group">
          <label for="productQuantity">Quantidade*</label>
          <input
            type="number"
            id="productQuantity"
            v-model.number="formData.QtdEstoque"
            min="0"
            required
            placeholder="0"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="productImage">Imagem do Produto</label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          @change="handleImageUpload"
          ref="fileInput"
        />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Pré-visualização" />
          <button type="button" @click="removeImage" class="remove-btn">
            Remover
          </button>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" @click="enviarDados" class="submit-btn">
          Salvar Dados
        </button>
        <button type="button" @click="resetForm" class="reset-btn">
          Limpar Formulário
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import produtos from "../../service/produtos.js";
import { defineEmits } from "vue";

// Estado do formulário
const showForm = ref(false);

// Dados do formulário
const formData = ref({
  tituloProduto: "",
  descricao: "",
  preco: 0,
  QtdEstoque: 0,
  imagem: null,
});
const emit = defineEmits("ProdutoNovo");
// Referências para o input de arquivo e pré-visualização
const fileInput = ref(null);
const imagePreview = ref(null);
async function enviarDados() {
  try {
    const response = await produtos.cadastrarProduto(formData.value);
    if (response.status >= 200 && response.status <= 300) {
      alert("Produto cadastrado com sucesso!");
      showForm.value = false;
      resetForm();
      emit("ProdutoNovo");
    } else {
      alert(`Produto não adicionado, tente novamente${response.data.message}`);
    }
  } catch (error) {
    console.log(error);
  }
}
// Alternar visibilidade do formulário
const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) {
    resetForm();
  }
};

// Manipular upload de imagem
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.imagem = file;

    // Criar pré-visualização
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Remover imagem selecionada
const removeImage = () => {
  formData.value.imagem = null;
  imagePreview.value = null;
  fileInput.value.value = "";
};

// Resetar formulário
const resetForm = () => {
  formData.value = {
    tituloProduto: "",
    descricao: "",
    preco: 0,
    QtdEstoque: 0,
    imagem: null,
  };
  removeImage();
};
</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.toggle-btn {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.form-container {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.image-preview {
  margin-top: 1rem;
  position: relative;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn {
  background-color: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn {
  background-color: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.debug-info {
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
}
</style>
