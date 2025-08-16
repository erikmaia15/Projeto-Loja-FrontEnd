import api from "../router/api";

export default {
  async cadastroUsuario(DadosUser) {
    try {
      const response = await api.post("/cadastro", {
        nome: DadosUser.nome,
        email: DadosUser.email,
        senha: DadosUser.senha,
      });

      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
  async loginUsuario(DadosUser) {
    try {
      const response = await api.post("/login", {
        email: DadosUser.email,
        senha: DadosUser.senha,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
