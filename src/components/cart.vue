<template>
    <div class="cart-container">
        <h2>Корзина</h2>
        <div v-if="!currentUser" class="empty-cart">
            <p>Для просмотра корзины необходимо войти в систему</p>
            <router-link to="/registration" class="login-btn">Войти</router-link>
        </div>
        <div v-else-if="cartItems.length === 0" class="empty-cart">
            <p>Ваша корзина пуста</p>
        </div>
        <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <div class="item-details">
                    <h3>{{ item.name }}</h3>
                    <p class="item-price">{{ item.price }} ₽</p>
                </div>
                <div class="item-quantity">
                    <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
                    <span>{{ item.quantity || 1 }}</span>
                    <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
                </div>
                <button @click="removeItem(item)" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="cart-summary">
                <p class="total">Итого: {{ totalPrice }} ₽</p>
                <button @click="checkout" class="checkout-btn">Оформить заказ</button>
            </div>
        </div>

        <!-- Модальное окно оплаты -->
        <modal 
            v-if="showPaymentModal" 
            modelText="Оформление заказа"
            @closeModel="showPaymentModal = false"
        >
            <div class="payment-form">
                <div class="form-group">
                    <label>Номер карты</label>
                    <input 
                        type="text" 
                        v-model="paymentData.cardNumber"
                        @input="handleCardNumberInput"
                        placeholder="0000 0000 0000 0000"
                        maxlength="19"
                    >
                </div>
                <div class="form-group">
                    <label>Срок действия карты</label>
                    <input 
                        type="text" 
                        v-model="paymentData.expiryDate"
                        @input="handleExpiryDateInput"
                        placeholder="MM/YY"
                        maxlength="5"
                    >
                </div>
                <div class="form-group">
                    <label>CVV/CVC</label>
                    <input 
                        type="password" 
                        v-model="paymentData.cvv"
                        placeholder="123"
                        maxlength="3"
                    >
                </div>
                <div class="form-group">
                    <label>Email для чека</label>
                    <input 
                        type="email" 
                        v-model="paymentData.email"
                        placeholder="your@email.com"
                    >
                </div>
                <div class="payment-actions">
                    <button @click="processPayment" class="pay-btn">Оплатить</button>
                    <button @click="showPaymentModal = false" class="cancel-btn">Отмена</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import modal from './modal.vue';

const props = defineProps({
    users: Array,
    activeUser: Number
});

const showPaymentModal = ref(false);
const paymentData = ref({
    cardNumber: '',
    email: '',
    cvv: '',
    expiryDate: ''
});

const currentUser = computed(() => {
    if (props.activeUser !== null && props.users[props.activeUser]) {
        return props.users[props.activeUser];
    }
    return null;
});

const cartItems = computed(() => {
    return currentUser.value ? currentUser.value.cart : [];
});

const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
});

const increaseQuantity = (item) => {
    if (!item.quantity) item.quantity = 1;
    item.quantity++;
};

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
    }
};

const removeItem = (item) => {
    const index = cartItems.value.indexOf(item);
    if (index > -1) {
        cartItems.value.splice(index, 1);
    }
};

const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
};

const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
        return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
};

const handleCardNumberInput = (event) => {
    paymentData.value.cardNumber = formatCardNumber(event.target.value);
};

const handleExpiryDateInput = (event) => {
    paymentData.value.expiryDate = formatExpiryDate(event.target.value);
};

const validatePaymentData = () => {
    if (!paymentData.value.cardNumber || paymentData.value.cardNumber.length !== 19) {
        alert('Пожалуйста, введите корректный номер карты');
        return false;
    }
    if (!paymentData.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.value.email)) {
        alert('Пожалуйста, введите корректный email');
        return false;
    }
    if (!paymentData.value.cvv || paymentData.value.cvv.length !== 3) {
        alert('Пожалуйста, введите корректный CVV/CVC код');
        return false;
    }
    if (!paymentData.value.expiryDate || paymentData.value.expiryDate.length !== 5) {
        alert('Пожалуйста, введите корректную дату окончания действия карты');
        return false;
    }
    return true;
};

const processPayment = () => {
    if (validatePaymentData()) {
        // Перемещаем товары из корзины в заказы
        currentUser.value.orders.push(...cartItems.value);
        // Очищаем корзину
        cartItems.value.length = 0;
        // Закрываем модальное окно
        showPaymentModal.value = false;
        // Очищаем данные формы
        paymentData.value = {
            cardNumber: '',
            email: '',
            cvv: '',
            expiryDate: ''
        };
        alert('Заказ успешно оформлен! Чек отправлен на указанный email.');
    }
};

const checkout = () => {
    if (cartItems.value.length > 0) {
        showPaymentModal.value = true;
    }
};
</script>

<style scoped>
.cart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
}

h2 {
    color: var(--deep-purple);
    margin-bottom: 30px;
    text-align: center;
    font-size: 2em;
}

.empty-cart {
    text-align: center;
    padding: 40px;
    color: #666;
}

.login-btn {
    display: inline-block;
    background: var(--deep-purple);
    color: var(--white);
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-top: 20px;
}

.login-btn:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cart-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: var(--light-gray);
    border-radius: 8px;
    gap: 20px;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    color: var(--deep-purple);
    margin-bottom: 8px;
    font-size: 1.2em;
}

.item-price {
    color: var(--text-dark);
    font-size: 1.1em;
    font-weight: 500;
}

.item-quantity {
    display: flex;
    align-items: center;
    gap: 12px;
}

.quantity-btn {
    background: var(--white);
    color: var(--deep-purple);
    border: 2px solid var(--deep-purple);
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--deep-purple);
    color: var(--white);
}

.remove-btn {
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
    padding: 8px;
    transition: color 0.3s ease;
}

.remove-btn:hover {
    color: #cc0000;
}

.cart-summary {
    margin-top: 30px;
    padding: 20px;
    background: var(--light-gray);
    border-radius: 8px;
    text-align: right;
}

.total {
    font-size: 1.3em;
    font-weight: bold;
    color: var(--deep-purple);
    margin-bottom: 15px;
}

.checkout-btn {
    background: var(--deep-purple);
    color: var(--white);
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;
}

.checkout-btn:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .cart-container {
        padding: 20px;
    }

    .cart-item {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

    .item-quantity {
        justify-content: center;
    }

    .remove-btn {
        margin-top: 10px;
    }
}

.payment-modal {
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
}

.payment-modal h3 {
    color: var(--deep-purple);
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5em;
}

.payment-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-group label {
    color: var(--deep-purple);
    font-weight: 500;
}

.form-group input {
    padding: 10px;
    border: 2px solid var(--light-lavender);
    border-radius: 8px;
    font-size: 1em;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--deep-purple);
    box-shadow: 0 0 0 2px var(--light-lavender);
}

.payment-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.pay-btn {
    flex: 1;
    background: var(--deep-purple);
    color: var(--white);
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;
}

.pay-btn:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}

.cancel-btn {
    flex: 1;
    background: var(--light-gray);
    color: var(--deep-purple);
    border: 2px solid var(--deep-purple);
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;
}

.cancel-btn:hover {
    background: var(--deep-purple);
    color: var(--white);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .payment-modal {
        padding: 15px;
    }

    .payment-actions {
        flex-direction: column;
    }

    .pay-btn, .cancel-btn {
        width: 100%;
    }
}
</style> 