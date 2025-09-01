import api from "../router/api";

export default {
  async realizarPagamento(dados, dadosProdutos) {
    try {
      console.log(dadosProdutos);
      const response = await api.post("/pagamento", { dados, dadosProdutos });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
