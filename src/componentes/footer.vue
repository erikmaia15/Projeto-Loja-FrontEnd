<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Seção Principal -->
      <div class="footer-main">
        <div class="footer-section company-info">
          <div class="company-logo">
            <h2 class="logo-text">
              <span class="logo-icon">🛍️</span>
              Maia Store
            </h2>
            <p class="company-slogan">Sua loja online de confiança</p>
          </div>

          <div class="company-description">
            <p>
              Na Maia Store, oferecemos os melhores produtos com qualidade
              garantida e atendimento excepcional. Sua satisfação é nossa
              prioridade.
            </p>
          </div>

          <div class="social-links">
            <h4>Nos siga nas redes sociais</h4>
            <div class="social-icons">
              <a
                href="https://www.instagram.com/ms.maiastoree/?utm_source=ig_web_button_share_sheet"
                class="social-link instagram"
                title="Instagram"
              >
                <span
                  ><img
                    src="../assets/instagram.png"
                    width="50px"
                    height="50px"
                    alt=""
                    srcset=""
                /></span>
              </a>
              <a
                href="https://w.app/decd4q"
                class="social-link whatsapp"
                title="WhatsApp"
              >
                <span
                  ><img
                    src="../assets/whatsapp.png"
                    width="50px"
                    height="50px"
                    alt=""
                    srcset=""
                /></span>
              </a>
            </div>
          </div>
        </div>

        <!-- Links Rápidos -->
        <div class="footer-section quick-links">
          <h3>Links Rápidos</h3>
          <ul class="links-list">
            <li><a href="#">🏠 Início</a></li>
            <li><a href="/home">🛒 Produtos</a></li>
            <li><a href="https://w.app/decd4q">📞 Contato</a></li>
            <li><a href="/sobre">ℹ️ Sobre Nós</a></li>
          </ul>
        </div>

        <!-- Atendimento -->
        <div class="footer-section customer-service">
          <h3>Atendimento</h3>
          <div class="service-info">
            <div class="service-item">
              <span class="service-icon">📞</span>
              <div class="service-details">
                <strong>Telefone</strong>
                <p>(88) 99493-6831</p>
              </div>
            </div>

            <div class="service-item">
              <span class="service-icon">✉️</span>
              <div class="service-details">
                <strong>Email</strong>
                <p>maiastore555@gmail.com</p>
              </div>
            </div>

            <div class="service-item">
              <span class="service-icon">🕒</span>
              <div class="service-details">
                <strong>Horário</strong>
                <p>Seg - Sex: 8h às 18h<br />Sáb: 8h às 14h</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Localização -->
        <div class="footer-section location-info">
          <h3>Nossa Localização</h3>
          <div class="location-details">
            <div class="address">
              <span class="location-icon">📍</span>
              <div class="address-text">
                <strong>Maia Store</strong>
                <p>Rua João Francisco Rodrigues, 1147</p>
                <p>Jaguaruana - CE</p>
                <p>CEP: 62800-000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rodapé Final -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>
              &copy; {{ currentYear }} Maia Store. Todos os direitos reservados.
            </p>
          </div>

          <div class="developer-credit">
            <p>Desenvolvido com 💜 por <strong>Erik Maia</strong></p>
          </div>

          <div class="legal-links">
            <a href="https://w.app/decd4q">Trocas e Devoluções</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2d1b69, #7a0487);
  color: white;
  margin-top: auto;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.02)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.02)"/><circle cx="50" cy="10" r="1" fill="rgba(255,255,255,0.03)"/><circle cx="10" cy="60" r="1" fill="rgba(255,255,255,0.02)"/><circle cx="90" cy="40" r="1" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grain)"/></svg>');
  opacity: 0.5;
  pointer-events: none;
}

.footer-content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 0;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.footer-section h3::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  border-radius: 2px;
}

/* Company Info Section */
.company-logo {
  margin-bottom: 1.5rem;
}

.logo-text {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(45deg, #fff, #e0c3fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.company-slogan {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-style: italic;
}

.company-description {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.social-links h4 {
  color: #ffffff;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link:hover {
  transform: translateY(-3px) scale(1.1);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.social-link.instagram:hover {
  background: linear-gradient(45deg, #e4405f, #c13584);
}
.social-link.facebook:hover {
  background: linear-gradient(45deg, #3b5998, #8b9dc3);
}
.social-link.whatsapp:hover {
  background: linear-gradient(45deg, #25d366, #128c7e);
}
.social-link.email:hover {
  background: linear-gradient(45deg, #ea4335, #fbbc05);
}

/* Quick Links */
.links-list {
  list-style: none;
  padding: 0;
}

.links-list li {
  margin-bottom: 0.8rem;
}

.links-list a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.3rem 0;
}

.links-list a:hover {
  color: #ffffff;
  transform: translateX(5px);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Customer Service */
.service-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.service-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-icon {
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.service-details strong {
  color: #ffffff;
  display: block;
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.service-details p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Location Info */
.address {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.location-icon {
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.address-text strong {
  color: #ffffff;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.address-text p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

/* Footer Bottom */
.footer-bottom {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem 0;
  border-radius: 20px 20px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  text-align: left;
}

.copyright p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

.company-cnpj {
  font-size: 0.8rem !important;
  opacity: 0.7;
}

.developer-credit {
  text-align: center;
}

.developer-credit p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 0;
}

.developer-credit strong {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.legal-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.separator {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

/* Responsividade */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: 3rem 1rem 0;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .legal-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.8rem;
  }

  .service-item,
  .address {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
}
</style>
