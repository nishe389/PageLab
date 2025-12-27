<script setup>
// Здесь можно добавить необходимые импорты и логику
import logo from '../../dist/assets/logo-BdjrIryl.png';
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <div class="footer-logo-row">
                    <img :src="logo" alt="PageLab Logo" class="footer-logo" />
                    <h3>PageLab</h3>
                </div>
                <p class="company-description">
                    Ваш надежный выбор в мире книг и канцелярии
                </p>
                <div class="company-social-links">
                    <a href="https://vk.com" class="company-social-link">
                        <i class="fab fa-vk"></i>
                    </a>
                    <a href="https://telegram.org" class="company-social-link">
                        <i class="fab fa-telegram"></i>
                    </a>
                    <a href="https://instagram.com" class="company-social-link">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com" class="company-social-link">
                        <i class="fab fa-x-twitter"></i>
                    </a>
                </div>
            </div>

            <div class="footer-section">
                <h4>Контакты</h4>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <p>+7 (495) 123-45-67</p>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <p>pageLab@gmail.com</p>
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>г. Москва, ул. Книжная, д. 42</p>
                </div>
            </div>

            <div class="footer-section">
                <h4>Режим работы</h4>
                <div class="working-hours">
                    <div class="working-hours-item">
                        <i class="fas fa-clock"></i>
                        <div class="hours-info">
                            <p class="days">Понедельник - Пятница</p>
                            <p class="time">10:00 - 20:00</p>
                        </div>
                    </div>
                    <div class="working-hours-item">
                        <i class="fas fa-clock"></i>
                        <div class="hours-info">
                            <p class="days">Суббота - Воскресенье</p>
                            <p class="time">10:00 - 20:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2025 PageLab. Все права защищены.</p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: var(--white);
    padding: 40px 0 0 0;
    margin-top: auto;
    box-shadow: 0 -2px 4px rgba(58, 45, 79, 0.1);
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}

.footer-section h3 {
    color: var(--deep-purple);
    font-size: 1.8em;
    margin-bottom: 15px;
}

.footer-section h4 {
    color: var(--deep-purple);
    font-size: 1.3em;
    margin-bottom: 20px;
}

.company-description {
    color: var(--text-dark);
    line-height: 1.6;
    margin-bottom: 20px;
}

.company-social-links {
    display: flex;
    gap: 20px;
}

.company-social-link {
    color: var(--deep-purple);
    font-size: 1.8em;
    transition: all 0.3s ease;
}

.company-social-link:hover {
    color: var(--terracotta);
    transform: translateY(-2px);
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: var(--text-dark);
}

.contact-item i {
    color: var(--deep-purple);
    margin-right: 10px;
    font-size: 1.2em;
}

.working-hours {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.working-hours-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.working-hours-item i {
    color: var(--deep-purple);
    font-size: 1.2em;
    margin-top: 3px;
}

.hours-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.hours-info .days {
    color: var(--text-dark);
    font-weight: 500;
}

.hours-info .time {
    color: var(--text-dark);
    opacity: 0.8;
}

.footer-bottom {
    margin-top: 40px;
    padding: 20px;
    text-align: center;
    border-top: 1px solid var(--light-lavender);
}

.footer-bottom p {
    color: var(--text-dark);
    font-size: 0.9em;
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .contact-item {
        justify-content: center;
    }

    .company-social-links {
        justify-content: center;
    }

    .working-hours-item {
        justify-content: center;
    }
}

.footer-logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
}

.footer-logo {
    height: 36px;
    width: auto;
    display: block;
}
</style> 