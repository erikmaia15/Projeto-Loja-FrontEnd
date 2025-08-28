import api from "../router/api";
export default {
  async getUsuarios() {
    try {
      const response = await api.get("/listar-usuarios");
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
