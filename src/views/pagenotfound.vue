<template>
  <main>
    <div class="main">
      <div class="texto">
        <h4>pagina não encontrada</h4>
      </div>
      <div>
        <router-link to="/home">
          <input type="button" value="Voltar para home" />
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup></script>
<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
main {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
input {
  padding: 10px;
  color: white;
  background-color: #880093;
  border-radius: 20px;
  border-color: #880093;
}
</style>
