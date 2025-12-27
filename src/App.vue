<script setup>
import { reactive } from 'vue';
import { useData } from './useData';
import modal from './components/modal.vue';
import Footer from './components/Footer.vue';
import logo from './assets/logo.png';

const { state, logoutUser, addToCart } = useData();

const local = reactive({
    users: [{
        name: 'name',
        gender: 'gender',
        age: 'age',
        cart: [],
        orders: []
    }],
    activeUser: null,
    products: [
        // Художественная литература (8)
        {
            id: 1,
            name: 'Война и мир',
            category: 'fiction',
            price: 1200,
            author: 'Лев Толстой',
            description: 'Классический роман о войне 1812 года',
            image: './images/feature-books.jpg'
        },
        {
            id: 2,
            name: 'Преступление и наказание',
            category: 'fiction',
            price: 850,
            author: 'Федор Достоевский',
            description: 'Психологический роман о преступлении и его последствиях',
            image: './images/feature-books.jpg'
        },
        {
            id: 3,
            name: 'Мастер и Маргарита',
            category: 'fiction',
            price: 950,
            author: 'Михаил Булгаков',
            description: 'Мистический роман о добре и зле',
            image: './images/feature-books.jpg'
        },
        {
            id: 4,
            name: 'Евгений Онегин',
            category: 'fiction',
            price: 750,
            author: 'Александр Пушкин',
            description: 'Роман в стихах о любви и жизни',
            image: './images/feature-books.jpg'
        },
        {
            id: 5,
            name: 'Герой нашего времени',
            category: 'fiction',
            price: 680,
            author: 'Михаил Лермонтов',
            description: 'Психологический роман о судьбе поколения',
            image: './images/feature-books.jpg'
        },
        {
            id: 6,
            name: 'Идиот',
            category: 'fiction',
            price: 890,
            author: 'Федор Достоевский',
            description: 'Роман о доброте и чистоте души',
            image: './images/feature-books.jpg'
        },
        {
            id: 7,
            name: 'Анна Каренина',
            category: 'fiction',
            price: 1100,
            author: 'Лев Толстой',
            description: 'Роман о любви и семейных ценностях',
            image: './images/feature-books.jpg'
        },
        {
            id: 8,
            name: 'Братья Карамазовы',
            category: 'fiction',
            price: 1300,
            author: 'Федор Достоевский',
            description: 'Философский роман о вере и морали',
            image: './images/feature-books.jpg'
        },
        // Учебники (9)
        {
            id: 9,
            name: 'Математика 10 класс',
            category: 'textbooks',
            price: 800,
            author: 'Иванов И.И.',
            description: 'Учебник по математике для 10 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 10,
            name: 'Физика 9 класс',
            category: 'textbooks',
            price: 750,
            author: 'Петров П.П.',
            description: 'Учебник по физике для 9 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 11,
            name: 'Химия 11 класс',
            category: 'textbooks',
            price: 850,
            author: 'Сидоров С.С.',
            description: 'Учебник по химии для 11 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 12,
            name: 'Биология 8 класс',
            category: 'textbooks',
            price: 700,
            author: 'Козлова К.К.',
            description: 'Учебник по биологии для 8 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 13,
            name: 'История России 10 класс',
            category: 'textbooks',
            price: 900,
            author: 'Смирнов С.С.',
            description: 'Учебник по истории России для 10 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 14,
            name: 'Английский язык 9 класс',
            category: 'textbooks',
            price: 780,
            author: 'Борисова Б.Б.',
            description: 'Учебник по английскому языку для 9 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 15,
            name: 'Литература 11 класс',
            category: 'textbooks',
            price: 820,
            author: 'Николаева Н.Н.',
            description: 'Учебник по литературе для 11 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 16,
            name: 'География 8 класс',
            category: 'textbooks',
            price: 730,
            author: 'Морозов М.М.',
            description: 'Учебник по географии для 8 класса',
            image: './images/feature-textbooks.jpg'
        },
        {
            id: 17,
            name: 'Обществознание 10 класс',
            category: 'textbooks',
            price: 790,
            author: 'Волков В.В.',
            description: 'Учебник по обществознанию для 10 класса',
            image: './images/feature-textbooks.jpg'
        },
        // Справочники (7)
        {
            id: 18,
            name: 'Большой энциклопедический словарь',
            category: 'reference',
            price: 2500,
            author: 'Издательство "Знание"',
            description: 'Энциклопедический словарь в 2 томах',
            image: './images/feature-books.jpg'
        },
        {
            id: 19,
            name: 'Медицинский справочник',
            category: 'reference',
            price: 1800,
            author: 'Доктор Медицинских Наук',
            description: 'Справочник по оказанию первой помощи',
            image: './images/feature-books.jpg'
        },
        {
            id: 20,
            name: 'Юридический справочник',
            category: 'reference',
            price: 2200,
            author: 'Юридическое издательство',
            description: 'Справочник по гражданскому праву',
            image: './images/feature-books.jpg'
        },
        {
            id: 21,
            name: 'Словарь синонимов',
            category: 'reference',
            price: 950,
            author: 'Лингвистический институт',
            description: 'Словарь русских синонимов',
            image: './images/feature-books.jpg'
        },
        {
            id: 22,
            name: 'Атлас мира',
            category: 'reference',
            price: 1500,
            author: 'Географическое общество',
            description: 'Подробный атлас мира с картами',
            image: '/images/feature-books.jpg'
        },
        {
            id: 23,
            name: 'Справочник по ремонту',
            category: 'reference',
            price: 1200,
            author: 'Мастер-класс',
            description: 'Справочник по ремонту бытовой техники',
            image: './images/feature-books.jpg'
        },
        {
            id: 24,
            name: 'Кулинарный справочник',
            category: 'reference',
            price: 1100,
            author: 'Шеф-повар',
            description: 'Справочник по приготовлению блюд',
            image: './images/feature-books.jpg'
        },
        // Канцелярия (10)
        {
            id: 25,
            name: 'Набор ручек',
            category: 'stationery',
            price: 300,
            description: 'Набор из 5 гелевых ручек',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 26,
            name: 'Блокнот А5',
            category: 'stationery',
            price: 250,
            description: 'Блокнот в твердой обложке, 96 листов',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 27,
            name: 'Набор карандашей',
            category: 'stationery',
            price: 280,
            description: 'Набор из 12 цветных карандашей',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 28,
            name: 'Папка для документов',
            category: 'stationery',
            price: 350,
            description: 'Папка-скоросшиватель А4',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 29,
            name: 'Степлер',
            category: 'stationery',
            price: 450,
            description: 'Металлический степлер на 20 листов',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 30,
            name: 'Набор маркеров',
            category: 'stationery',
            price: 320,
            description: 'Набор из 6 маркеров для выделения текста',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 31,
            name: 'Линейка',
            category: 'stationery',
            price: 150,
            description: 'Пластиковая линейка 30 см',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 32,
            name: 'Скотч',
            category: 'stationery',
            price: 180,
            description: 'Канцелярский скотч 10м',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 33,
            name: 'Калькулятор',
            category: 'stationery',
            price: 550,
            description: 'Научный калькулятор с солнечной батареей',
            image: './images/feature-stationery.jpg'
        },
        {
            id: 34,
            name: 'Набор стикеров',
            category: 'stationery',
            price: 220,
            description: 'Набор из 5 блоков стикеров разных цветов',
            image: './images/feature-stationery.jpg'
        }
    ]
})

const modalW = reactive({
    modalText: '',
    modalShow: false
});

function handleLogout() {
    const result = logoutUser();
    modalW.modalText = result.message;
    modalW.modalShow = true;
}

function handleAddToCart(product) {
    const result = addToCart(product);
    modalW.modalText = result.message;
    modalW.modalShow = true;
}
</script>

<template>
    <div class="app-container">
        <nav class="menu">
            <div class="menu-content">
                <div class="logo">
                    <router-link to="/" class="logo-link">
                        <img :src="logo" alt="PageLab Logo" class="site-logo" />
                        <span class="logo-text">PageLab</span>
                    </router-link>
                </div>
                <div class="nav-links">
                    <router-link to="/" class="nav-link">Главная</router-link>
                    <router-link to="/catalog" class="nav-link">Каталог</router-link>
                    <router-link to="/information" class="nav-link">Личный кабинет</router-link>
                    <router-link to="/about" class="nav-link">О нас</router-link>
                    <router-link v-if="!state.activeUser" to="/login" class="nav-link">Войти</router-link>
                    <a v-else @click="handleLogout" class="nav-link logout-link">Выход</a>
                </div>
            </div>
        </nav>

        <main class="main-content">
            <router-view 
                :users="state.users" 
                :activeUser="state.activeUser" 
                :products="local.products"
                @addToCart="handleAddToCart"
            />
        </main>

        <Footer />
        <modal v-if="modalW.modalShow" :modelText="modalW.modalText" @closeModel="modalW.modalShow=false"/>
    </div>
</template>

<style scoped>
.app-container {
    min-height: 100vh;
    width: 100%;
    min-width: 320px;
    background-color: var(--light-gray);
    display: flex;
    flex-direction: column;
}

.menu {
    background-color: var(--white);
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
}

.menu-content {
    max-width: 1400px;
    min-width: 320px;
    margin: 0 auto;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.logo {
    font-size: 1.5em;
    font-weight: 600;
    white-space: nowrap;
    flex: 0 0 auto;
}

.logo-link {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--deep-purple);
    text-decoration: none;
    transition: color 0.3s ease;
}

.site-logo {
    height: 40px;
    width: auto;
    display: block;
}

.logo-text {
    font-size: 1.5em;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--deep-purple);
}

.nav-links {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    gap: 30px;
    margin: 0 40px;
}

.nav-link {
    text-decoration: none;
    color: var(--deep-purple);
    font-weight: 500;
    font-size: 1.1em;
    transition: all 0.3s ease;
    position: relative;
    padding: 5px 0;
    cursor: pointer;
    white-space: nowrap;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--terracotta);
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: var(--terracotta);
}

.nav-link:hover::after {
    width: 100%;
}

.nav-link.router-link-active {
    color: var(--deep-purple);
    font-weight: 600;
}

.nav-link.router-link-active::after {
    width: 100%;
    background-color: var(--deep-purple);
}

.logout-link {
    color: var(--terracotta);
    position: absolute;
    right: 30px;
    padding-left: 30px;
    border-left: 1px solid var(--light-lavender);
}

.logout-link:hover {
    color: var(--deep-purple);
}

.main-content {
    flex: 1;
    width: 100%;
    min-width: 320px;
    padding: 30px;
    background-color: var(--light-gray);
}

@media (max-width: 1024px) {
    .menu-content {
        padding: 15px 20px;
    }

    .nav-links {
        gap: 25px;
        margin: 0 30px;
    }

    .nav-link {
        font-size: 1em;
    }

    .logout-link {
        right: 20px;
        padding-left: 20px;
    }
}

@media (max-width: 768px) {
    .menu-content {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
    }

    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin: 0;
    }

    .logout-link {
        position: static;
        margin: 15px 0 0 0;
        padding: 15px 0 0 0;
        border-left: none;
        border-top: 1px solid var(--light-lavender);
        width: 100%;
        text-align: center;
    }
}

.cart-note {
    font-size: 0.8em;
    color: #666;
    margin-top: 5px;
}
</style>
