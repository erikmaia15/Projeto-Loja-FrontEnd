import api from "../router/api";

export default {
  async realizarPagamento(dados, dadosProdutos) {
    try {
      console.log(dados.body);
      console.log(dadosProdutos);
      const response = await api.post("/pagamento", { dados, dadosProdutos });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
