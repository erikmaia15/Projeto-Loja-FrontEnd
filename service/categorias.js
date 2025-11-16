import api from "../router/api";

export default {
  async postCategoria(categoria) {
    if (categoria == "" || categoria == null || categoria == undefined) {
      alert("Digite alguma categoria!");
      return;
    }
    try {
      const response = await api.post("/categoriasPrivate", {
        categoria: categoria,
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  async getCategorias() {
    try {
      const response = await api.get("/categorias");
      return response;
    } catch (error) {
      return error;
    }
  },
  async getCategoriaById(id) {
    if (id == null || id == undefined || id == "") {
      alert("Selecione uma categoria!");
      return;
    }
    try {
      console.log(id);
      const response = await api.get(`categorias/categoriaById/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  async getProdutosComCategorias(id) {
    if (id == "" || id == null || id == undefined) {
      alert("Selecione uma categoria!");
      return;
    }
    try {
      const response = await api.get(`categorias/produtos-categorias/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  async putCategoria(categoriaNome, id) {
    try {
      console.log(categoriaNome);
      const response = await api.put("/categoriasPrivate", {
        categoria: {
          nome: categoriaNome,
          id: id,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
};
