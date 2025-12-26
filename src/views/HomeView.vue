<script setup>
import { useData } from '../useData';

const { state } = useData();
</script>

<template>
    <div class="home-container">
        <div class="welcome-section">
            <h1>Добро пожаловать в PageLab</h1>
            <p class="subtitle">Ваш надежный партнер в мире книг и канцелярии</p>
        </div>

        <div class="features-section">
            <div class="feature-card">
                <h3>Богатый выбор</h3>
                <p>Более 30 наименований книг и канцелярских товаров</p>
            </div>
            <div class="feature-card">
                <h3>Удобный поиск</h3>
                <p>Быстрый доступ к нужным товарам через каталог</p>
            </div>
            <div class="feature-card">
                <h3>Безопасные покупки</h3>
                <p>Защищенная система оплаты и доставки</p>
            </div>
        </div>

        <div class="cta-section">
            <router-link to="/catalog" class="cta-button">Перейти в каталог</router-link>
            <router-link v-if="!state.activeUser" to="/login" class="cta-button secondary">Зарегистрироваться</router-link>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.welcome-section {
    text-align: center;
    margin-bottom: 60px;
}

h1 {
    color: var(--deep-purple);
    font-size: 2.5em;
    margin-bottom: 20px;
}

.subtitle {
    color: var(--text-dark);
    font-size: 1.2em;
    max-width: 600px;
    margin: 0 auto;
}

.features-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.feature-card {
    background: var(--white);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-card h3 {
    color: var(--deep-purple);
    margin-bottom: 15px;
    font-size: 1.3em;
}

.feature-card p {
    color: var(--text-dark);
    line-height: 1.5;
}

.cta-section {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
}

.cta-button {
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    text-align: center;
}

.cta-button:first-child {
    background: var(--deep-purple);
    color: var(--white);
}

.cta-button.secondary {
    background: var(--white);
    color: var(--deep-purple);
    border: 2px solid var(--deep-purple);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cta-button:first-child:hover {
    background: var(--terracotta);
}

.cta-button.secondary:hover {
    background: var(--light-lavender);
}

@media (max-width: 768px) {
    .home-container {
        padding: 20px;
    }

    h1 {
        font-size: 2em;
    }

    .features-section {
        grid-template-columns: 1fr;
    }

    .cta-section {
        flex-direction: column;
        align-items: center;
    }

    .cta-button {
        width: 100%;
        max-width: 300px;
    }
}
</style> 