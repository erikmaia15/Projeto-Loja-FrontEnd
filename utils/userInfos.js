import api from "../router/api.js";

export default {
  async getUserInfos() {
    try {
      const response = await api.get("/usuarios");
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
