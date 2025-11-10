<template>
  <Navbar :url="url"></Navbar>
  <br />
  <main>
    <section class="main">
      <div class="form">
        <h3>Cadastre-se</h3>
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

          <div style="position: relative">
            <input
              :type="mostrarSenha ? 'text' : 'password'"
              v-model="inputSenha"
              placeholder="Digite sua senha:"
              required
            />
            <img
              id="img-password"
              :src="imgPassword"
              width="25px"
              height="25px"
              alt="Mostrar senha"
              @click="showPassword"
            />
          </div>

          <input type="submit" value="Cadastrar" />
          <p style="color: white">{{ mensagem }}</p>

          <p style="color: aliceblue">
            Já tem cadastro?
            <span
              @click="rotas.push('/login')"
              style="text-decoration: underline; cursor: pointer"
            >
              Clique aqui
            </span>
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

// Import correto das imagens
import imgView from "../assets/view.png";
import imgHidden from "../assets/hidden.png";

const url = ref("cadastro");
const inputName = ref("");
const inputEmail = ref("");
const inputSenha = ref("");
const mensagem = ref("");

// Estado da senha
const mostrarSenha = ref(false);
const imgPassword = ref(imgView);

function showPassword() {
  mostrarSenha.value = !mostrarSenha.value;
  imgPassword.value = mostrarSenha.value ? imgHidden : imgView;
}

async function dadosUser() {
  const user = {
    nome: inputName.value,
    email: inputEmail.value,
    senha: inputSenha.value,
  };

  try {
    const response = await autenticacao.cadastroUsuario(user);
    if (response.status >= 200 && response.status <= 300) {
      alert("Usuário cadastrado com sucesso, faça login!");
      rotas.push("/login");
    } else {
      mensagem.value = response.data.message;
    }
  } catch (error) {
    alert("Erro ao cadastrar usuário");
    console.error(error);
  }

  // Limpar campos
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
#img-password {
  filter: invert();
  margin-left: -35px;
}
</style>
