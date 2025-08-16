<template>
  <Navbar :url="url"></Navbar>
  <br />
  <main>
    <section class="main">
      <div class="form">
        <h3>Cadastra-se</h3>
        <form @submit.prevent="dadosUser">
          <input
            type="text"
            v-model="inputName"
            placeholder="Digite seu nome:"
            required
          />
          <input
            type="email"
            v-model="inputEmail"
            placeholder="Digite seu email:"
            required
          />
          <input
            type="password"
            v-model="inputSenha"
            placeholder="Digite sua senha:"
            required
          />
          <input type="submit" value="Cadastrar" />
          <p style="color: white">{{ mensagem }}</p>
          <p style="color: aliceblue">
            Já tem cadastro?
            <span
              @click="cadastrado.push('/login')"
              style="text-decoration: underline; cursor: pointer"
              >Clique aqui</span
            >
            para fazer login
          </p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import Navbar from "../componentes/navbar.vue";
import autenticacao from "../../service/autenticacao.js";
import rotas from "../../router/rotas.js";
import { ref } from "vue";
const url = ref("cadastro");
const inputName = ref("");
const inputEmail = ref("");
const inputSenha = ref("");
const cadastrado = rotas;
const mensagem = ref("");

const user = ref({});
async function dadosUser(event) {
  event.preventDefault();
  user.value = {
    nome: inputName.value,
    email: inputEmail.value,
    senha: inputSenha.value,
  };
  console.log(user.value);
  try {
    const response = await autenticacao.cadastroUsuario(user.value);
    console.log(response);
    if (response.status >= 200 && response.status <= 300) {
      alert("Usuário cadastrado com sucesso, faça login!");
      rotas.push("/login");
    } else {
      mensagem.value = response.data.message;
    }
  } catch (error) {
    alert(error);
  }
  inputName.value = "";
  inputEmail.value = "";
  inputSenha.value = "";
}
</script>

<style scoped>
body {
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
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.main h3 {
  text-align: center;
  color: aliceblue;
}
.main form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
}
.main form input {
  background-color: #ac4db3;
  color: white;
  padding: 12px;
  border-radius: 20px;
}
.main form input::placeholder {
  color: white;
  opacity: 0.8;
}
</style>
