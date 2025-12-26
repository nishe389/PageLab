<script setup>
import { computed, ref } from 'vue';
import modal from './modal.vue';

const props = defineProps({
  users: Array,
  activeUser: Number
})

const showModal = ref(false)

const currentUser = computed(() => {
  if (props.activeUser !== null && props.users[props.activeUser]) {
    return props.users[props.activeUser]
  }
  return null
})

function handlePurchase() {
  showModal.value = true
}
</script>

<template>
  <div class="profile">
    <div v-if="currentUser" class="user-info">
      <h2>Личный кабинет</h2>
      <div class="info-section">
        <h3>Информация о пользователе</h3>
        <p><strong>Имя:</strong> {{ currentUser.name }}</p>
        <p><strong>Пол:</strong> {{ currentUser.gender }}</p>
        <p><strong>Возраст:</strong> {{ currentUser.age }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
      </div>

      <div class="cart-section">
        <h3>Оформление заказа</h3>
        <router-link to="/cart" class="view-cart-btn">Перейти к оформлению</router-link>
      </div>

      <div class="orders-section">
        <h3>Заказы</h3>
        <div v-if="currentUser.orders.length > 0" class="orders-list">
          <div v-for="(order, index) in currentUser.orders" :key="index" class="order-item">
            <p>{{ order.name }} - {{ order.price }} ₽</p>
          </div>
        </div>
        <p v-else class="empty-message">Нет заказов</p>
      </div>
    </div>
    <div v-else class="no-user">
      <h2>Пожалуйста, войдите в систему</h2>
      <p>Для просмотра личного кабинета необходимо войти в систему</p>
    </div>

    <modal v-if="showModal" modelText="Заказ пока не может быть совершен" @closeModel="showModal = false"/>
  </div>
</template>

<style scoped>
.profile {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

h2 {
  color: var(--deep-purple);
  margin-bottom: 30px;
  text-align: center;
  font-size: 2em;
}

h3 {
  color: var(--deep-purple);
  margin-bottom: 15px;
  font-size: 1.3em;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.info-section, .cart-section, .orders-section {
  background: var(--light-gray);
  padding: 20px;
  border-radius: 8px;
}

p {
  color: var(--text-dark);
  margin: 8px 0;
  font-size: 1.1em;
}

strong {
  color: var(--deep-purple);
  font-weight: 600;
}

.cart-items, .orders-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item, .order-item {
  background: var(--white);
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(58, 45, 79, 0.1);
}

.empty-message {
  color: var(--text-dark);
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.purchase-btn {
  background: var(--deep-purple);
  color: var(--white);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 20px;
  align-self: center;
}

.purchase-btn:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

.no-user {
  text-align: center;
  padding: 40px 20px;
  background: var(--light-gray);
  border-radius: 8px;
}

.no-user h2 {
  color: var(--deep-purple);
  margin-bottom: 15px;
}

.no-user p {
  color: var(--text-dark);
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .profile {
    padding: 20px;
    min-height: calc(100vh - 160px);
  }

  .user-info {
    gap: 20px;
  }

  h2 {
    font-size: 1.8em;
  }

  h3 {
    font-size: 1.2em;
  }

  .info-section, .cart-section, .orders-section {
    padding: 15px;
  }
}

.view-cart-btn {
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
    text-align: center;
}

.view-cart-btn:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}
</style>