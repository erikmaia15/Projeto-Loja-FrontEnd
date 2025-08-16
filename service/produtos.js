import api from "../router/api";

export default {
  async cadastrarProduto(formProduto) {
    try {
      // 1. Criar objeto FormData
      const formData = new FormData();

      // 2. Adicionar campos ao FormData
      formData.append("tituloProduto", formProduto.tituloProduto);
      formData.append("descricao", formProduto.descricao);
      formData.append("preco", formProduto.preco);
      formData.append("QtdEstoque", formProduto.QtdEstoque);

      // 3. Adicionar a imagem (se existir)
      if (formProduto.imagem) {
        formData.append("imagem", formProduto.imagem);
      } else {
        console.warn("Nenhuma imagem foi fornecida");
      }

      // 4. Enviar com headers corretos
      const response = await api.post("/produtos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      console.error("Erro no cadastro:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
  async getAllProdutos() {
    try {
      const response = await api.get("/produtos");
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
