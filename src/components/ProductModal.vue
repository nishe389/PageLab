<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <img :src="product.image" :alt="product.name" class="product-img" />
        <div class="info">
          <h2>{{ product.name }}</h2>
          <p v-if="product.author" class="author">Автор: {{ product.author }}</p>
          <p class="price">{{ product.price }} ₽</p>
          <p class="description">{{ product.description }}</p>
          <button class="add-btn" @click="$emit('add-to-cart', product)">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-window {
  background: var(--white);
  border-radius: 16px;
  max-width: 600px;
  width: 95vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  padding: 32px 24px 24px 24px;
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.modal-content {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}
.product-img {
  width: 180px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(58,45,79,0.08);
  background: #f3f3f3;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
h2 {
  color: var(--deep-purple);
  margin-bottom: 8px;
}
.author {
  color: var(--text-dark);
  font-style: italic;
  margin-bottom: 8px;
}
.price {
  color: var(--terracotta);
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 8px;
}
.description {
  color: var(--text-dark);
  margin-bottom: 16px;
}
.add-btn {
  background: var(--deep-purple);
  color: var(--white);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 500;
  transition: all 0.3s;
}
.add-btn:hover {
  background: var(--terracotta);
}
@media (max-width: 600px) {
  .modal-content {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .product-img {
    width: 100%;
    height: 180px;
  }
}
</style> 