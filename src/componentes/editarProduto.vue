<template>
  <div class="product-edit-form">
    <div class="form-wrapper">
      <div class="form-backdrop" @click="fecharForm"></div>
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-header">
          <button type="button" class="btn-fechar" @click="fecharForm">
            <span>&times;</span>
          </button>
          <h2 class="form-title">
            <span class="title-icon">✏️</span>
            Editar Produto
          </h2>
          <p class="form-subtitle">Atualize as informações do produto</p>
        </div>

        <div class="form-content">
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">📝</span>
              Informações Básicas
            </h3>

            <div class="form-group">
              <label for="editProductName" class="form-label">
                <span class="label-text">Nome do Produto</span>
                <span class="required-asterisk">*</span>
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  id="editProductName"
                  v-model.trim="formData.tituloProduto"
                  required
                  class="form-input"
                />
                <span class="input-icon">🏷️</span>
              </div>
            </div>

            <div class="form-group">
              <label for="editProductDescription" class="form-label">
                <span class="label-text">Descrição</span>
                <span class="required-asterisk">*</span>
              </label>
              <div class="input-wrapper">
                <textarea
                  id="editProductDescription"
                  v-model.trim="formData.descricao"
                  required
                  rows="3"
                  class="form-textarea"
                ></textarea>
                <span class="textarea-icon">📄</span>
              </div>
            </div>
          </div>
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">💰</span>
              Preço e Estoque
            </h3>

            <div class="form-row">
              <div class="form-group">
                <label for="editProductPrice" class="form-label">
                  <span class="label-text">Preço (R$)</span>
                  <span class="required-asterisk">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="editProductPrice"
                    v-model="formData.precoCentavos"
                    @input="formatarPrecoFunc($event)"
                    required
                    class="form-input"
                  />
                  <span class="input-icon">💵</span>
                </div>
              </div>

              <div class="form-group">
                <label for="editProductQuantity" class="form-label">
                  <span class="label-text">Quantidade em Estoque</span>
                  <span class="required-asterisk">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    id="editProductQuantity"
                    v-model.number="formData.QtdEstoque"
                    min="0"
                    required
                    class="form-input"
                  />
                  <span class="input-icon">📦</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Nova seção para upload de imagem -->
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">🖼️</span>
              Imagem do Produto
            </h3>

            <div class="form-group">
              <label for="productImage" class="form-label">
                <span class="label-text">Selecionar Imagem</span>
              </label>

              <div class="image-upload-container">
                <input
                  type="file"
                  id="productImage"
                  ref="fileInput"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="image-input"
                />

                <div
                  v-if="!imagePreview"
                  class="upload-area"
                  @click="$refs.fileInput.click()"
                >
                  <div class="upload-content">
                    <span class="upload-icon">📷</span>
                    <p class="upload-text">Clique para selecionar uma imagem</p>
                    <p class="upload-subtext">PNG, JPG ou JPEG até 5MB</p>
                  </div>
                </div>

                <div v-if="imagePreview" class="image-preview-container">
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="image-preview"
                  />
                  <div class="image-actions">
                    <button
                      type="button"
                      @click="removeImage"
                      class="remove-image-btn"
                    >
                      <span>🗑️</span>
                      Remover
                    </button>
                    <button
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="change-image-btn"
                    >
                      <span>🔄</span>
                      Alterar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-footer">
          <div class="form-actions">
            <button type="button" @click="fecharForm" class="cancel-btn">
              <span class="btn-icon">❌</span>
              <span>Cancelar</span>
            </button>
            <button type="submit" class="update-btn">
              <span class="btn-icon">💾</span>
              <span>Atualizar Produto</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import produtos from "../../service/produtos";
import formatarPreco from "../../utils/formatarPreco";

// Props
const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(["fechar", "produto-atualizado"]);

// Dados do formulário
const formData = ref({
  id: "",
  tituloProduto: "",
  descricao: "",
  precoCentavos: "0,0",
  QtdEstoque: 0,
});
function formatarPrecoFunc(event) {
  const precoFormatado = formatarPreco.formatPrice(event);
  formData.value.precoCentavos = precoFormatado;
}
// Estados para upload de imagem
const imagePreview = ref(null);
const selectedFile = ref(null);
const fileInput = ref(null);

// Watchers para sincronizar com as props
watch(
  () => props.produto,
  (newProduto) => {
    if (newProduto) {
      formData.value = {
        id: newProduto.id,
        tituloProduto: newProduto.tituloProduto || "",
        descricao: newProduto.descricao || "",
        precoCentavos: newProduto.precoCentavos || "0,0",
        QtdEstoque: newProduto.QtdEstoque || 0,
      };

      // Se o produto tem uma imagem existente, define como preview
      if (newProduto.imagemUrl) {
        imagePreview.value = newProduto.imagemUrl;
      } else {
        imagePreview.value = null;
        selectedFile.value = null;
      }
    }
  },
  { immediate: true }
);

// Função para lidar com o upload da imagem
const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  // Validar tipo de arquivo
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!validTypes.includes(file.type)) {
    alert("Por favor, selecione apenas arquivos PNG, JPG ou JPEG.");
    return;
  }

  // Validar tamanho do arquivo (5MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    alert("A imagem deve ter no máximo 5MB.");
    return;
  }

  selectedFile.value = file;

  // Criar preview da imagem
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Função para remover a imagem
const removeImage = () => {
  imagePreview.value = null;
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Função para fechar o formulário
const fecharForm = () => {
  emit("fechar");
};

// Manipular submit
const handleSubmit = async () => {
  // Calcular precoCentavos a partir do preço em reais
  const dadosParaEnvio = {
    ...formData.value, // Converte R$ para centavos
    imagem: selectedFile.value, // Arquivo da imagem para upload
  };
  const response = await produtos.updateProduto(dadosParaEnvio);
  if (response.status >= 200 && response.status <= 300) {
    console.log(response);
    alert("Produto atualizado");
    emit("produto-atualizado", dadosParaEnvio);
  } else {
    alert("deu errro");
    console.log(response);
  }
  fecharForm();
};
</script>

<style scoped>
.product-edit-form {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn {
  background: linear-gradient(135deg, #17a2b8, #138496);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(23, 162, 184, 0.3);
}

.toggle-btn:hover {
  background: linear-gradient(135deg, #138496, #117a8b);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.4);
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
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(23, 162, 184, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: scale(0.95) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.form-header {
  background: linear-gradient(135deg, #ae11c3, #540354);
  color: white;
  padding: 25px;
  border-radius: 16px 16px 0 0;
  text-align: center;
  position: relative;
}

.btn-fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-fechar:hover {
  background: rgba(255, 255, 255, 0.3);
}

.form-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.form-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
}

.form-content {
  padding: 25px;
}

.form-section {
  margin-bottom: 25px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(23, 162, 184, 0.1);
}

.section-title {
  color: #a900bf;
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(23, 162, 184, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 13px;
}

.required-asterisk {
  color: #e74c3c;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #9601c7;
  box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.1);
  background: white;
}

.input-icon,
.textarea-icon {
  position: absolute;
  right: 12px;
  font-size: 16px;
  color: #a600de;
  pointer-events: none;
}

.textarea-icon {
  top: 12px;
}

/* Estilos para upload de imagem */
.image-upload-container {
  margin-top: 8px;
}

.image-input {
  display: none;
}

.upload-area {
  border: 2px dashed #de00ee;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: linear-gradient(145deg, #f8fdff, #ffffff);
  transition: all 0.3s ease;
  position: relative;
}

.upload-area:hover {
  border-color: #530263;
  background: linear-gradient(145deg, #f0fcff, #f8fdff);
  transform: translateY(-2px);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: #d107e8;
  margin: 0;
}

.upload-subtext {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.image-preview-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.image-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 15px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.remove-image-btn,
.change-image-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-image-btn {
  color: #dc3545;
}

.remove-image-btn:hover {
  background: #dc3545;
  color: white;
}

.change-image-btn {
  color: #17a2b8;
}

.change-image-btn:hover {
  background: #17a2b8;
  color: white;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-footer {
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  padding: 20px 25px;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid #eee;
}

.form-actions {
  display: flex;
  gap: 12px;
}

.cancel-btn,
.update-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.cancel-btn {
  background: white;
  color: #666;
  border: 2px solid #ddd;
}

.cancel-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
}

.update-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
}

.update-btn:hover {
  background: linear-gradient(135deg, #20c997, #17a2b8);
  transform: translateY(-1px);
}

/* Responsividade */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 10px;
  }

  .form-container {
    max-height: 90vh;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .form-actions {
    flex-direction: column;
  }

  .upload-area {
    padding: 30px 15px;
  }

  .upload-icon {
    font-size: 36px;
  }

  .image-preview {
    height: 150px;
  }
}
</style>
