<script setup>
const props = defineProps({
    modelText: String
})
const emit = defineEmits(['closeModel'])

const [mainText, subText] = props.modelText.split('\n')
</script>
<template>
    <div class="modal-overlay" @click="$emit('closeModel')">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <button class="close-btn" @click="$emit('closeModel')">&times;</button>
            </div>
            <div class="modal-body">
                <p class="main-text">{{ mainText }}</p>
                <p v-if="subText" class="sub-text">{{ subText }}</p>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(58, 45, 79, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
}

.modal-content {
    background: var(--white);
    border-radius: 12px;
    padding: 0;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(58, 45, 79, 0.2);
    animation: modalAppear 0.3s ease;
}

.modal-header {
    background: var(--deep-purple);
    color: var(--white);
    padding: 15px;
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.close-btn {
    background: none;
    border: none;
    color: var(--white);
    font-size: 1.8em;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
}

.modal-body {
    padding: 25px;
    color: var(--text-dark);
    text-align: center;
}

.main-text {
    font-size: 1.1em;
    line-height: 1.5;
    margin-bottom: 10px;
}

.sub-text {
    font-size: 0.8em;
    color: #666;
    line-height: 1.5;
    margin: 0;
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
    }

    .modal-header {
        padding: 15px;
    }

    .modal-body {
        padding: 20px;
    }

    .main-text {
        font-size: 1em;
    }

    .sub-text {
        font-size: 0.75em;
    }
}
</style>