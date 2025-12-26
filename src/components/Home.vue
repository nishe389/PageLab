<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Добро пожаловать в наш книжный магазин</h1>
        <p>Откройте для себя мир литературы и канцелярских товаров</p>
        <router-link to="/catalog" class="cta-button">Перейти в каталог</router-link>
      </div>
      <div class="hero-image">
        <img src="/images/feature-books.jpg" alt="Книжный магазин" />
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <img src="/images/stationery.jpg" alt="Художественная литература" />
        <h3>Художественная литература</h3>
        <p>Широкий выбор книг для любителей чтения</p>
      </div>
      <div class="feature-card">
        <img src="/images/feature-textbooks.jpg" alt="Учебники" />
        <h3>Учебники</h3>
        <p>Все необходимое для учебы и образования</p>
      </div>
      <div class="feature-card">
        <img src="/images/feature-stationery.jpg" alt="Канцелярия" />
        <h3>Канцелярия</h3>
        <p>Качественные канцелярские товары</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToCategory = (category) => {
  router.push({ 
    path: '/catalog',
    query: { category: category }
  });
};
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
  background: var(--light-gray);
  border-radius: 12px;
  padding: 40px;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h1 {
  color: var(--deep-purple);
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  color: var(--text-dark);
  font-size: 1.2em;
  margin-bottom: 30px;
}

.cta-button {
  display: inline-block;
  background: var(--deep-purple);
  color: var(--white);
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.feature-card h3 {
  color: var(--deep-purple);
  padding: 20px 20px 10px;
  font-size: 1.3em;
}

.feature-card p {
  color: var(--text-dark);
  padding: 0 20px 20px;
  font-size: 1em;
  margin: 0;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: 20px;
  }

  .hero-content {
    text-align: center;
  }

  h1 {
    font-size: 2em;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style> 