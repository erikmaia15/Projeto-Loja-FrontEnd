<template>
  <div class="product-form">
    <div class="form-trigger">
      <button @click="toggleForm" class="toggle-btn">
        <span class="btn-icon">{{ showForm ? "✕" : "+" }}</span>
        <span class="btn-text">{{ showForm ? "Cancelar" : "Adicionar Produto" }}</span>
      </button>
    </div>

    <div v-if="showForm" class="form-wrapper">
      <div class="form-backdrop" @click="toggleForm"></div>
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-header">
          <button class="btn-fechar" @click="showForm = false">
            <span>&times;</span>
          </button>
          <h2 class="form-title">
            <span class="title-icon">📦</span>
            Adicionar Novo Produto
          </h2>
          <p class="form-subtitle">
            Preencha os dados do produto para adicionar ao catálogo
          </p>
        </div>

        <div class="form-content">
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">📝</span>
              Informações Básicas
            </h3>

            <div class="form-group">
              <label for="productName" class="form-label">
                <span class="label-text">Nome do Produto</span>
                <span class="required-asterisk">*</span>
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  id="productName"
                  v-model.trim="formData.tituloProduto"
                  required
                  placeholder="Ex: Notebook Dell Inspiron 15"
                  class="form-input"
                />
                <span class="input-icon">🏷️</span>
              </div>
            </div>

            <div class="form-group">
              <label for="productDescription" class="form-label">
                <span class="label-text">Descrição</span>
                <span class="required-asterisk">*</span>
              </label>
              <div class="input-wrapper">
                <textarea
                  id="productDescription"
                  v-model.trim="formData.descricao"
                  required
                  placeholder="Descreva as principais características do produto..."
                  rows="4"
                  class="form-textarea"
                ></textarea>
                <span class="textarea-icon">📄</span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">💰</span>
              Preço, numeração e estoque
            </h3>

            <div class="form-row">
              <div class="form-group">
                <label for="productPrice" class="form-label">
                  <span class="label-text">Preço (R$)</span>
                  <span class="required-asterisk">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="productPrice"
                    v-model="formData.precoCentavos"
                    @input="formatarPrecoFunc($event)"
                    placeholder="0,00"
                    required
                    class="form-input"
                  />
                  <span class="input-icon">💵</span>
                </div>
              </div>

              <div class="form-group">
                <label for="productQuantity" class="form-label">
                  <span class="label-text">Quantidade em Estoque</span>
                  <span class="required-asterisk">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    id="productQuantity"
                    v-model.number="formData.QtdEstoque"
                    min="0"
                    required
                    placeholder="0"
                    class="form-input"
                  />
                  <span class="input-icon">📦</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">🖼️</span>
              Imagem do Produto
            </h3>

            <div class="form-group">
              <label for="productImage" class="form-label">
                <span class="label-text">Selecionar Imagem</span>
                <span class="required-asterisk">*</span>
              </label>

              <div class="file-upload-area">
                <input
                  type="file"
                  id="productImage"
                  accept="image/*"
                  @change="handleImageUpload"
                  ref="fileInput"
                  required
                  class="file-input"
                />
                <div class="file-upload-content">
                  <div class="upload-icon">📸</div>
                  <div class="upload-text">
                    <span class="upload-title">Clique para selecionar uma imagem</span>
                    <span class="upload-subtitle">PNG, JPG ou JPEG até 5MB</span>
                  </div>
                </div>
              </div>

              <div v-if="imagePreview" class="image-preview-container">
                <div class="image-preview">
                  <img :src="imagePreview" alt="Pré-visualização do produto" />
                  <div class="preview-overlay">
                    <button type="button" @click="removeImage" class="remove-image-btn">
                      <span>🗑️</span>
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-footer">
          <div class="form-actions">
            <button type="button" @click="resetForm" class="reset-btn">
              <span class="btn-icon">🔄</span>
              <span>Limpar Formulário</span>
            </button>
            <button type="submit" @click="enviarDados" class="submit-btn">
              <span class="btn-icon">✅</span>
              <span>Adicionar Produto</span>
            </button>
          </div>

          <div class="form-info">
            <p>
              <span class="info-icon">ℹ️</span>
              Os campos marcados com <span class="asterisk">*</span> são obrigatórios
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import produtos from "../../service/produtos.js";
import { defineEmits } from "vue";
import formatarPreco from "../../utils/formatarPreco.js";

// Estado do formulário
const showForm = ref(false);
function formatarPrecoFunc(event) {
  const numeroFormatado = formatarPreco.formatPrice(event);
  formData.value.precoCentavos = numeroFormatado;
}
// Dados do formulário
const formData = ref({
  tituloProduto: "",
  descricao: "",
  precoCentavos: "0,0",
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
      alert("Produto adicionado com sucesso!");
      resetForm();
      showForm.value = false;
      emit("ProdutoNovo");
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
    precoCentavos: "0,0",
    QtdEstoque: 0,
    imagem: null,
  };
  removeImage();
};
</script>

<style scoped>
.product-form {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn {
  background: linear-gradient(135deg, #880093, #aa1bb8);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(136, 0, 147, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.toggle-btn:hover {
  background: linear-gradient(135deg, #aa1bb8, #cc44d1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(136, 0, 147, 0.4);
}

.btn-icon {
  font-size: 20px;
  font-weight: bold;
}

.form-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.form-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}

.form-container {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(136, 0, 147, 0.3);
  animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes slideIn {
  from {
    transform: scale(0.9) translateY(50px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.form-header {
  background: linear-gradient(135deg, #880093, #aa1bb8);
  color: white;
  padding: 30px;
  border-radius: 20px 20px 0 0;
  text-align: center;
  position: relative;
}
.btn-fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  right: 0;
}

.btn-fechar:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.form-title {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.title-icon {
  font-size: 32px;
}

.form-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 16px;
}

.form-content {
  padding: 30px;
}

.form-section {
  margin-bottom: 35px;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(136, 0, 147, 0.1);
}

.section-title {
  color: #880093;
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(136, 0, 147, 0.1);
}

.section-icon {
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.required-asterisk {
  color: #e74c3c;
  font-weight: bold;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 15px 50px 15px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #880093;
  box-shadow: 0 0 0 3px rgba(136, 0, 147, 0.1);
  background: white;
}

.input-icon,
.textarea-icon {
  position: absolute;
  right: 15px;
  font-size: 20px;
  color: #880093;
  pointer-events: none;
}

.textarea-icon {
  top: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.file-upload-area {
  position: relative;
  border: 2px dashed #880093;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  background: linear-gradient(145deg, #fafafa, #ffffff);
  transition: all 0.3s ease;
  cursor: pointer;
}

.file-upload-area:hover {
  border-color: #aa1bb8;
  background: linear-gradient(145deg, #f0f0f0, #fafafa);
  transform: translateY(-2px);
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 15px;
  color: #880093;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.upload-title {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.upload-subtitle {
  color: #666;
  font-size: 14px;
}

.image-preview-container {
  margin-top: 20px;
}

.image-preview {
  position: relative;
  display: inline-block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .preview-overlay {
  opacity: 1;
}

.remove-image-btn {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.remove-image-btn:hover {
  background: linear-gradient(135deg, #c0392b, #a93226);
  transform: scale(1.05);
}

.form-footer {
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  padding: 25px 30px;
  border-radius: 0 0 20px 20px;
  border-top: 1px solid #eee;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.reset-btn,
.submit-btn {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.reset-btn {
  background: white;
  color: #666;
  border: 2px solid #ddd;
}

.reset-btn:hover {
  border-color: #880093;
  color: #880093;
  transform: translateY(-2px);
}

.submit-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #20c997, #17a2b8);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
}

.form-info {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.info-icon {
  margin-right: 5px;
}

.asterisk {
  color: #e74c3c;
  font-weight: bold;
}

/* Scrollbar customizada */
.form-container::-webkit-scrollbar {
  width: 8px;
}

.form-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb {
  background: #880093;
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb:hover {
  background: #aa1bb8;
}

/* Responsividade */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 10px;
  }

  .form-container {
    max-height: 95vh;
  }

  .form-header,
  .form-content,
  .form-footer {
    padding: 20px;
  }

  .form-section {
    padding: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-title {
    font-size: 24px;
  }

  .file-upload-area {
    padding: 20px;
  }

  .upload-icon {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .toggle-btn {
    padding: 12px 20px;
    font-size: 14px;
  }

  .btn-text {
    display: none;
  }

  .form-input,
  .form-textarea {
    font-size: 14px;
    padding: 12px 40px 12px 12px;
  }
}
</style>
