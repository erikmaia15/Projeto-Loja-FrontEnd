<template>
  <Navbar :url="url"></Navbar>
  <br />
  <section class="mainall">
    <section class="main">
      <div class="form">
        <h3>Login</h3>
        <form @submit.prevent="validarUser">
          <input
            type="email"
            v-model="email"
            placeholder="Digite seu email:"
            required
          />
          <div>
            <input
              :type="mostrarSenha ? 'text' : 'password'"
              v-model="senha"
              placeholder="Digite sua senha:"
              required
            />
            <label id="img-password">
              <img
                :src="imgPassword"
                width="25px"
                height="25px"
                alt="Mostrar senha"
                @click="showPassword"
                style="cursor: pointer"
              />
            </label>
          </div>
          <input type="submit" value="Login" />
        </form>
        <p style="text-align: center">{{ mensagem }}</p>
      </div>
      <p>
        Não possui cadastro?
        <span
          style="text-decoration: underline"
          @click="router.push('/cadastro')"
          >clique aqui</span
        >
      </p>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../componentes/navbar.vue";
import autenticacao from "../../service/autenticacao";
import rotas from "../../router/rotas.js";
import router from "../../router/rotas.js";
import imgView from "../assets/view.png";
import imgHidden from "../assets/hidden.png";

const url = ref("login");
const email = ref("");
const senha = ref("");
const mensagem = ref("");
const mostrarSenha = ref(true);
const imgPassword = ref(imgView);
console.log(imgPassword.value);

function showPassword() {
  mostrarSenha.value = !mostrarSenha.value;
  imgPassword.value = mostrarSenha.value == true ? imgHidden : imgView;
}

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
onMounted(() => {
  showPassword();
});
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
#img-password {
  filter: invert();
  margin-left: -35px;
}
p {
  margin-top: 10px;
  color: white;
  font-weight: bold;
}
</style>
