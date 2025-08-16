<template>
  <Navbar :url="url"></Navbar>
  <br />
  <section class="mainall">
    <section class="main">
      <div class="form">
        <h3>Login</h3>
        <form @submit.prevent="validarUser">
          <input type="email" v-model="email" placeholder="Digite seu email:" required />
          <input
            type="password"
            v-model="senha"
            placeholder="Digite sua senha:"
            required
          />
          <input type="submit" value="Login" />
        </form>
        <p style="text-align: center">{{ mensagem }}</p>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../componentes/navbar.vue";
import autenticacao from "../../service/autenticacao";
import rotas from "../../router/rotas.js";

const url = ref("login");
const email = ref("");
const senha = ref("");
const mensagem = ref("");

async function validarUser() {
  try {
    const user = {
      email: email.value,
      senha: senha.value,
    };
    const response = await autenticacao.loginUsuario(user);
    if (response.status >= 200 && response.status <= 300) {
      window.localStorage.clear();
      window.localStorage.setItem("authToken", response.data);
      rotas.push("/home");
    } else {
      mensagem.value = response.data.message;
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.mainall {
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #880093;
  flex-direction: column;
  width: fit-content;
  padding: 40px;
  border-radius: 20px;
}
h3 {
  text-align: center;
  color: aliceblue;
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
}
form input {
  background-color: #ac4db3;
  color: white;
  padding: 12px;
  border-radius: 20px;
}
form input::placeholder {
  color: white;
  opacity: 0.8;
}
p {
  margin-top: 10px;
  color: white;
  font-weight: bold;
}
</style>
