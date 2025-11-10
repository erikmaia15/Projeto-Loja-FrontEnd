import api from "../router/api";
import conversao from "../utils/conversao";

export default {
  async cadastrarProduto(formProduto) {
    try {
      // 1. Criar objeto FormData
      const formData = new FormData();

      // 2. Adicionar campos ao FormData
      formData.append("tituloProduto", formProduto.tituloProduto);
      formData.append("descricao", formProduto.descricao);
      formData.append(
        "precoCentavos",
        conversao.reaisParaCentavos(formProduto.precoCentavos)
      );
      formData.append("QtdEstoque", formProduto.QtdEstoque);
      formData.append("categoriaId", formProduto.categoria.id);

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
      return error.response;
    }
  },
  async updateProduto(formProduto) {
    try {
      console.log(formProduto);
      // 1. Criar objeto FormData
      const formData = new FormData();

      // 2. Adicionar campos ao FormData
      formData.append("id", formProduto.id);
      formData.append("tituloProduto", formProduto.tituloProduto);
      formData.append("descricao", formProduto.descricao);
      formData.append(
        "precoCentavos",
        conversao.reaisParaCentavos(formProduto.precoCentavos)
      );
      formData.append("QtdEstoque", formProduto.QtdEstoque);
      formData.append("categoriaId", formProduto.categoria.id);

      // 3. Adicionar a imagem (se existir)
      if (formProduto.imagem) {
        formData.append("imagem", formProduto.imagem);
      } else {
        console.warn("Nenhuma imagem foi fornecida");
      }
      const response = await api.put("/produtos", formData);
      return response;
    } catch (error) {
      return error;
    }
  },
  async deletarProdutos(arrayIdsProdutos) {
    console.log(arrayIdsProdutos);
    try {
      const response = await api.delete("/produtos", {
        data: {
          array: arrayIdsProdutos,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  async getAllProdutos(page, size) {
    try {
      console.log(page);
      console.log(size);
      const response = await api.get("/produtos", {
        params: {
          page: page,
          size: size,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
