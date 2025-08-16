export default {
  // Obtém o token do localStorage
  async getToken() {
    return localStorage.getItem("authToken");
  },

  // Armazena o token no localStorage e atualiza o axios
  async setToken(token) {
    localStorage.setItem("authToken", token);
    return token;
  },

  // Remove o token
  async removeToken() {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
  },

  // Verifica se existe token
  async hasToken() {
    return !!localStorage.getItem("authToken");
  },
};
