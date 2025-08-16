import axios from "axios";
import rotas from "./rotas.js"; // importe seu rotas

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para adicionar o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respostas (ajustado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Verifica se não está já na página de login
      if (rotas.currentRoute.path !== "/login") {
        localStorage.removeItem("authToken");
        rotas.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
