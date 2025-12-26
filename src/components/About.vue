<script setup>
// ну тут вроде нихуя не надо, вообще у меня есть баг с картинкой у справочников, она не отображается, вместо неё другая стоит
</script>

<template>
    <div class="about-container">
        <h1 class="title">О нашей компании</h1>

        <div class="info-section">
            <div class="contact-info">
                <h2>Контактная информация</h2>
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>Адрес: г. Москва, ул. Книжная, д. 42</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <p>Телефон: +7 (495) 123-45-67</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <p>Email: pageLab@gmail.com</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <p>Режим работы: Пн-Вс 10:00 - 20:00</p>
                </div>
            </div>

            <div class="map-container">
                <h2>Как нас найти</h2>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.772477458538!2d37.6156!3d55.7522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzA3LjkiTiAzN8KwMzYnNTYuMiJF!5e0!3m2!1sru!2sru!4v1234567890"
                    width="100%" 
                    height="450" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    class="map"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.title {
    color: var(--deep-purple);
    font-size: 2.5em;
    margin-bottom: 40px;
    text-align: center;
}

.info-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    background: var(--white);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
}

.contact-info {
    padding: 20px;
}

.contact-info h2 {
    color: var(--deep-purple);
    margin-bottom: 25px;
    font-size: 1.8em;
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.1em;
    color: var(--text-dark);
}

.info-item i {
    color: var(--deep-purple);
    margin-right: 15px;
    font-size: 1.2em;
}

.map-container {
    padding: 20px;
}

.map-container h2 {
    color: var(--deep-purple);
    margin-bottom: 25px;
    font-size: 1.8em;
}

.map {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
}

@media (max-width: 768px) {
    .info-section {
        grid-template-columns: 1fr;
    }

    .title {
        font-size: 2em;
    }

    .contact-info h2,
    .map-container h2 {
        font-size: 1.5em;
    }

    .info-item {
        font-size: 1em;
    }
}
</style> 