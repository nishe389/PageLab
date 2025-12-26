<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProductModal from './ProductModal.vue';

const props = defineProps({
    products: Array,
    activeUser: Number
})

const emit = defineEmits(['addToCart'])

const selectedCategory = ref('all')
const searchQuery = ref('')
const router = useRouter();
const showModal = ref(false)
const selectedProduct = ref(null)

const filteredProducts = computed(() => {
    let filtered = props.products

    if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory.value)
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) ||
            (product.author && product.author.toLowerCase().includes(query))
        )
    }

    return filtered
})

const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'fiction', name: 'Художественная литература' },
    { id: 'textbooks', name: 'Учебники' },
    { id: 'reference', name: 'Справочники' },
    { id: 'stationery', name: 'Канцелярия' }
]

function addToCart(product) {
    if (props.activeUser) {
        emit('addToCart', product)
    } else {
        router.push('/login')
    }
}
// Я КЛЯНУСЬ Я НЕ ЗНАЮ ПОЧЕМУ STATIONERY.ЖПЖ НЕ ВЫВОДИТ
function getProductImage(product) {
    const categoryImages = {
        fiction: '/images/fiction.jpg',
        textbooks: '/images/textbooks.jpg',
        fiction: '/fiction-default.jpg',
        textbooks: '/textbooks-default.jpg',
        reference: '/reference-default.jpg',
        stationery: '/stationery-default.jpg'
    }
    
    // Если у товара есть свое изображение, используем его
    if (product.image) {
        return product.image
    }
    
    // Иначе используем изображение по умолчанию для категории(да вот затычка чтобы оно использовалось, то о чем я говорил в эбауте, на самом деле мне просто лень)
    return categoryImages[product.category] || '/default-product.jpg'
}

function openModal(product) {
  selectedProduct.value = product
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  selectedProduct.value = null
}
function addToCartFromModal(product) {
  addToCart(product)
  closeModal()
}
</script>

<template>
    <div class="catalog">
        <div class="filters">
            <div class="search">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="Поиск по названию или автору"
                    class="search-input"
                >
            </div>
            
            <div class="categories">
                <button 
                    v-for="category in categories" 
                    :key="category.id"
                    @click="selectedCategory = category.id"
                    :class="{ active: selectedCategory === category.id }"
                    class="category-btn"
                >
                    {{ category.name }}
                </button>
            </div>
        </div>

        <div class="products-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="openModal(product)">
                <div class="product-image">
                    <img :src="getProductImage(product)" :alt="product.name" />
                </div>
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p v-if="product.author" class="author">Автор: {{ product.author }}</p>
                    <p class="price">{{ product.price }} ₽</p>
                    <p class="description">{{ product.description }}</p>
                </div>
            </div>
        </div>
        <ProductModal v-if="showModal" :product="selectedProduct" @close="closeModal" @add-to-cart="addToCartFromModal" />
    </div>
</template>

<style scoped>
.catalog {
    width: 100%;
    padding: 0;
}

.filters {
    margin-bottom: 30px;
    background: var(--white);
    padding: 30px;
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
}

.search {
    max-width: 600px;
    margin: 0 auto 20px;
}

.search-input {
    width: 100%;
    padding: 15px;
    border: 2px solid var(--light-lavender);
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: var(--deep-purple);
    box-shadow: 0 0 0 2px var(--light-lavender);
}

.categories {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
}

.category-btn {
    padding: 12px 24px;
    border: 2px solid var(--deep-purple);
    background: var(--white);
    color: var(--deep-purple);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 1em;
}

.category-btn:hover {
    background: var(--light-lavender);
    transform: translateY(-2px);
}

.category-btn.active {
    background: var(--deep-purple);
    color: var(--white);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    padding: 30px;
    max-width: 1600px;
    margin: 0 auto;
}

.product-card {
    background: var(--white);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.05);
}

.product-info {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.product-info h3 {
    color: var(--deep-purple);
    margin-bottom: 10px;
    font-size: 1.2em;
}

.author {
    color: var(--text-dark);
    font-style: italic;
    margin-bottom: 12px;
    font-size: 1em;
}

.price {
    color: var(--terracotta);
    font-size: 1.3em;
    font-weight: 600;
    margin-bottom: 10px;
}

.description {
    color: var(--text-dark);
    margin-bottom: 20px;
    flex-grow: 1;
}

.add-to-cart-btn {
    background: var(--deep-purple);
    color: var(--white);
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;
    width: 100%;
}

.add-to-cart-btn:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .filters {
        padding: 20px;
    }

    .products-grid {
        padding: 20px;
        gap: 20px;
    }

    .category-btn {
        padding: 10px 20px;
        font-size: 0.9em;
    }

    .product-image {
        height: 180px;
    }

    .product-info {
        padding: 15px;
    }

    .product-info h3 {
        font-size: 1.1em;
    }

    .price {
        font-size: 1.2em;
    }

    .add-to-cart-btn {
        padding: 10px 20px;
        font-size: 1em;
    }
}
</style> 