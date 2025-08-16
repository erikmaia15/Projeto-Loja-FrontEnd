import api from "../router/api.js";

export default {
  async getUserInfos() {
    const response = await api.get("/usuarios");
    return response;
  },
};
