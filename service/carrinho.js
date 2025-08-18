import api from "../router/api";
export default {
  async postCarrinho(produto) {
    try {
      const response = await api.post("/usuario-carrinho", {
        produtoId: produto.id,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  async getCarrinho() {
    try {
      const response = await api.get("/usuario-carrinho");
      return response;
    } catch (error) {
      return error.response;
    }
  },
  async updateCarrinho(produto) {
    try {
      const response = await api.put("/usuario-carrinho", {
        produtoId: produto.id,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
