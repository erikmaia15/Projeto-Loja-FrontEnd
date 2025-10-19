import api from "../router/api.js";
import token from "../utils/userInfos.js";
export default {
  async getCompras() {
    try {
      const response = await api.get("/compras");
      return response;
    } catch (error) {
      return error.response;
    }
  },
  async getComprasCliente(clienteId) {
    try {
      const response = await api.get(`/compras-cliente${clienteId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
