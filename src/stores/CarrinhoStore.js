import { defineStore } from "pinia";
import carrinhoService from "../../service/carrinho.js";
import { ref, computed } from "vue";

export const useCarrinhoStore = defineStore("carrinho", () => {
  //estados
  const carrinho = ref([]);

  //computed getters, no futuro calcular o preco do carrinho

  //actions

  async function getCarrinho() {
    const response = await carrinhoService.getCarrinho();
    if (response.status === 200) {
      carrinho.value = response.carrinho;
    } else {
      alert("Erro ao buscar carrinho");
    }
  }

  async function adicionarCarrinho(produto) {
    const response = await carrinhoService.postCarrinho(produto);
    if (response.status === 201) {
      carrinho.va;
    }
  }
});
