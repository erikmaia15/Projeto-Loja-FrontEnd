import api from "../router/api";
import produtos from "./produtos.js";
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
      const carrinho = [];
      const produtosRemovidos = [];
      const response = await api.get("/usuario-carrinho");
      if (response.status >= 200 && response.status <= 300) {
        const produtosArray = await produtos.getAllProdutos(1, 100000);
        produtosArray.data.produtos.map((produto) => {
          if (response.data.carrinhoIds.includes(produto.id)) {
            carrinho.push(produto);
          }
        });
        response.data.carrinhoIds.map((produtoId) => {
          const produtoExiste = produtosArray.data.produtos.some(
            (produto) => produto.id === produtoId
          );

          if (!produtoExiste) {
            produtosRemovidos.push(produtoId);
          }
        });
        if (produtosRemovidos.length > 0) {
          const response = await this.produtosRemovidosFunc(produtosRemovidos);
          return carrinho;
        }
        return carrinho;
      } else {
        console.log(response);
        return response.data.message;
      }
    } catch (error) {
      return error.response;
    }
  },
  async produtosRemovidosFunc(produtos) {
    try {
      const response = await api.put("/produtosRemovidosBanco", {
        produtos: produtos,
      });
      return response.data.user.carrinho;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  },
  async updateCarrinho(produto) {
    try {
      console.log(produto);
      const response = await api.put("/usuario-carrinho", {
        produtoId: produto.id,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
