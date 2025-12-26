<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useData } from '../useData';

const router = useRouter();
const { registerUser } = useData();

const props = defineProps({
    users: Array
})

const emit = defineEmits([
    'addUsers'
])

const local = reactive({
    username: '',
    gender: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    usernameError: '',
    genderError: '',
    ageError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
})

function check() {
    let pass = true
    if (/^[А-Я][а-я]+$/.test(local.username)) {
        local.usernameError = ""
    } else {
        local.usernameError = "Имя должно начинаться с заглавной буквы и содержать только русские буквы"
        pass = false
    }
    if (local.gender === '') {
        local.genderError = "Выберите пол"
        pass = false
    } else {
        local.genderError = ""
    }
    if (local.age > 99 || local.age < 18) {
        local.ageError = "Возраст должен быть от 18 до 99 лет"
        pass = false
    } else {
        local.ageError = ""
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email)) {
        local.emailError = ""
    } else {
        local.emailError = "Введите корректный email"
        pass = false
    }
    if (local.password.length < 6) {
        local.passwordError = "Пароль должен содержать минимум 6 символов"
        pass = false
    } else {
        local.passwordError = ""
    }
    if (local.password !== local.confirmPassword) {
        local.confirmPasswordError = "Пароли не совпадают"
        pass = false
    } else {
        local.confirmPasswordError = ""
    }

    if (pass) {
        const result = registerUser({
            name: local.username,
            gender: local.gender,
            age: local.age,
            email: local.email,
            password: local.password
        })

        if (result.success) {
            local.username = ''
            local.gender = ''
            local.age = ''
            local.email = ''
            local.password = ''
            local.confirmPassword = ''
            router.replace('/')
        } else {
            local.emailError = result.message
        }
    }
}
</script>

<template>
    <div class="reg-container">
        <h2>Регистрация</h2>
    <div class="reg">
            <div class="form-group">
                <input type="text" placeholder="Имя" v-model="local.username">
        <div class="error"> {{ local.usernameError }} </div>
            </div>

            <div class="form-group">
                <label>Пол:</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="gender" v-model="local.gender" value="Мужской" class="radio-input">
                        Мужской
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="gender" v-model="local.gender" value="Женский" class="radio-input">
                        Женский
                    </label>
                </div>
        <div class="error"> {{ local.genderError }} </div>
            </div>

            <div class="form-group">
                <input type="number" placeholder="Возраст" v-model="local.age">
        <div class="error"> {{ local.ageError }} </div>
            </div>

            <div class="form-group">
                <input type="email" placeholder="Email" v-model="local.email">
                <div class="error"> {{ local.emailError }} </div>
            </div>

            <div class="form-group">
                <input type="password" placeholder="Пароль" v-model="local.password">
                <div class="error"> {{ local.passwordError }} </div>
            </div>

            <div class="form-group">
                <input type="password" placeholder="Подтвердите пароль" v-model="local.confirmPassword">
                <div class="error"> {{ local.confirmPasswordError }} </div>
            </div>

            <button @click="check" class="submit-btn">Зарегистрироваться</button>
        </div>
    </div>
</template>

<style scoped>
.reg-container {
    max-width: 600px;
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

.reg {
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 35px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    color: var(--deep-purple);
    font-weight: 500;
}

input {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--light-lavender);
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    border-color: var(--deep-purple);
    box-shadow: 0 0 0 2px var(--light-lavender);
}

.radio-group {
    display: flex;
    gap: 15px;
    margin-top: 5px;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: var(--text-dark);
    font-size: 0.95em;
    transition: color 0.3s ease;
}

.radio-label:hover {
    color: var(--deep-purple);
}

.radio-input {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border: 1.5px solid var(--deep-purple);
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    margin: 0;
}

.radio-input:checked {
    border-color: var(--deep-purple);
    background-color: var(--white);
}

.radio-input:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: var(--deep-purple);
    border-radius: 50%;
    transition: all 0.2s ease;
}

.radio-input:hover {
    border-color: var(--terracotta);
}

.radio-input:checked:hover {
    border-color: var(--terracotta);
}

.radio-input:checked:hover::after {
    background-color: var(--terracotta);
}

@media (max-width: 768px) {
    .radio-group {
        gap: 12px;
    }

    .radio-label {
        font-size: 0.9em;
    }

    .radio-input {
        width: 14px;
        height: 14px;
    }

    .radio-input:checked::after {
        width: 6px;
        height: 6px;
    }
}

.error {
    color: #dc3545;
    font-size: 0.9em;
    margin-top: 6px;
    padding-left: 4px;
}

button {
    width: 100%;
    padding: 14px;
    background: var(--deep-purple);
    color: var(--white);
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--light-lavender);
}
</style>