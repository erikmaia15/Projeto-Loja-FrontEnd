import api from "../router/api";
export default {
  async getUsuarios(page, size) {
    try {
      const response = await api.get("/listar-usuarios", {
        params: {
          page: page,
          size: size,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
