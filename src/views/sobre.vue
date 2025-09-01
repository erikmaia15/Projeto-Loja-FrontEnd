<template>
  <Navbar
    url="contatos"
    @carrinho="abrircarrinho($event)"
    :novoProduto="novoProduto"
  ></Navbar>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">Sobre a Maia Store</h1>
        <p class="hero-subtitle">Sua loja de moda feminina em Jaguaruana, Ceará</p>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <section class="main-content">
    <div class="container">
      <!-- Nossa História -->
      <div class="story-section">
        <div class="content-card">
          <div class="card-icon">
            <div class="icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 class="card-title">Nossa História</h2>
          <p class="card-text">
            A Maia Store nasceu do sonho de oferecer moda feminina de qualidade e estilo
            único para as mulheres de Jaguaruana e região. Com muito amor e dedicação,
            nossa loja se tornou referência em peças que valorizam a beleza e
            personalidade de cada cliente.
          </p>
        </div>
      </div>

      <!-- Sobre Erika Maia -->
      <div class="founder-section">
        <div class="founder-card">
          <div class="founder-image">
            <div class="image-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div class="founder-info">
            <h2 class="founder-name">Erika Maia</h2>
            <p class="founder-role">Fundadora & CEO</p>
            <p class="founder-description">
              Apaixonada por moda e empreendedorismo, Erika Maia criou a Maia Store com o
              objetivo de democratizar o acesso à moda feminina de qualidade. Com olhar
              atento às tendências e às necessidades das clientes, ela cuida pessoalmente
              de cada detalhe da loja, desde a seleção das peças até o atendimento.
            </p>
          </div>
        </div>
      </div>

      <!-- Nossa Missão -->
      <div class="mission-section">
        <div class="mission-grid">
          <div class="mission-card">
            <div class="mission-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12l2 2 4-4"></path>
              </svg>
            </div>
            <h3 class="mission-title">Missão</h3>
            <p class="mission-text">
              Proporcionar às mulheres peças de moda que expressem sua personalidade e as
              façam se sentir confiantes e belas em qualquer ocasião.
            </p>
          </div>

          <div class="mission-card">
            <div class="mission-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 class="mission-title">Visão</h3>
            <p class="mission-text">
              Ser reconhecida como a principal referência em moda feminina no interior do
              Ceará, oferecendo sempre as melhores tendências com preços acessíveis.
            </p>
          </div>

          <div class="mission-card">
            <div class="mission-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 class="mission-title">Valores</h3>
            <p class="mission-text">
              Qualidade, autenticidade, atendimento personalizado e comprometimento com a
              satisfação das nossas clientes são os pilares da Maia Store.
            </p>
          </div>
        </div>
      </div>

      <!-- Localização -->
      <div class="location-section">
        <div class="location-card">
          <div class="location-content">
            <div class="location-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h2 class="location-title">Nossa Localização</h2>
            <p class="location-text">
              Estamos localizados no coração de
              <strong>Jaguaruana, Ceará</strong>, uma cidade acolhedora que nos permite
              estar próximas das nossas clientes e oferecer um atendimento personalizado e
              humanizado.
            </p>
            <div class="location-features">
              <div class="feature-item">
                <span class="feature-icon">👥</span>
                <span>Atendimento personalizado</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🚚</span>
                <span>Entrega local</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
    </div>
  </section>

  <Carrinho
    @removido="novoProduto = true"
    @fechar="abrir = !abrir"
    v-if="abrir === true"
  ></Carrinho>
  <Footer></Footer>
</template>

<script setup>
import Navbar from "../componentes/navbar.vue";
import userInfos from "../../utils/userInfos";
import { onMounted, ref } from "vue";
import rotas from "../../router/rotas";
import Carrinho from "../componentes/carrinho.vue";
import Footer from "../componentes/footer.vue";
const abrir = ref(false);
const isAdmin = ref(false);
const novoProduto = ref(false);
async function userIsAdmin() {
  const response = await userInfos.getUserInfos();
  if (response.status >= 200 && response.status <= 300) {
    isAdmin.value = response.data.usuario.isAdmin;
  } else {
    alert("Faça login, voce será redirecionado!");
    rotas.push("/login");
  }
}

function abrircarrinho(dados) {
  abrir.value = !abrir.value;
}
onMounted(() => {
  userIsAdmin();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Hero Section */
.hero-section {
  min-height: 60vh;
  background: linear-gradient(135deg, #8c06c1 0%, #b794c4 50%, #7c0682 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.3rem;
  font-weight: 300;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Main Content */
.main-content {
  padding: 80px 0;
  background: linear-gradient(180deg, #faf9fc 0%, #f7f4fb 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Story Section */
.story-section {
  margin-bottom: 80px;
}

.content-card {
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(139, 90, 159, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.content-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8b5a9f, #b794c4, #d6bcfa);
}

.card-icon {
  margin-bottom: 30px;
}

.icon-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8b5a9f, #b794c4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
}

.card-title {
  font-size: 2.2rem;
  color: #2d3748;
  margin-bottom: 20px;
  font-weight: 600;
}

.card-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto;
}

/* Founder Section */
.founder-section {
  margin-bottom: 80px;
}

.founder-card {
  background: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 10px 40px rgba(139, 90, 159, 0.1);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px;
  align-items: center;
}

.founder-image {
  text-align: center;
}

.image-placeholder {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #8b5a9f, #b794c4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto;
}

.founder-name {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 8px;
  font-weight: 700;
}

.founder-role {
  font-size: 1.1rem;
  color: #8b5a9f;
  margin-bottom: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.founder-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
}

/* Mission Section */
.mission-section {
  margin-bottom: 80px;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.mission-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(139, 90, 159, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(139, 90, 159, 0.15);
}

.mission-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8b5a9f, #b794c4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.mission-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 600;
}

.mission-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
}

/* Location Section */
.location-section {
  margin-bottom: 80px;
}

.location-card {
  background: linear-gradient(135deg, #6b0792, #b794c4);
  border-radius: 20px;
  padding: 50px;
  color: white;
  text-align: center;
}

.location-icon {
  margin-bottom: 20px;
}

.location-title {
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.location-text {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0.95;
}

.location-features {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
}

.feature-icon {
  font-size: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .container {
    padding: 0 15px;
  }

  .content-card,
  .founder-card,
  .location-card,
  .cta-content {
    padding: 30px 20px;
  }

  .founder-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }

  .mission-grid {
    grid-template-columns: 1fr;
  }

  .location-features {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .card-title,
  .location-title {
    font-size: 1.8rem;
  }

  .founder-name {
    font-size: 2rem;
  }
}
</style>
