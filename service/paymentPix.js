import api from "../router/api";

export default {
  async realizarPagamentoPix(preco, compras) {
    try {
      console.log(preco);
      console.log(compras);
      const response = await api.post("/pagamento-pix", {
        preco,
        compras,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async consultarCompraPix(id) {
    try {
      const response = await api.get(`/pagamento-pix/consultar-compra/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
