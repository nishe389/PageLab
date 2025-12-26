<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useData } from '../useData';

const router = useRouter();
const { loginUser, registerUser } = useData();

const local = reactive({
    isLogin: true, // Переключатель между входом и регистрацией
    // Поля для входа
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    generalError: '',
    // Поля для регистрации
    username: '',
    gender: '',
    age: '',
    confirmPassword: '',
    usernameError: '',
    genderError: '',
    ageError: '',
    confirmPasswordError: ''
});

function handleLogin() {
    let pass = true;
    
    // Проверка email
    if (!local.email) {
        local.emailError = "Введите email";
        pass = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email)) {
        local.emailError = "Введите корректный email";
        pass = false;
    } else {
        local.emailError = "";
    }

    // Проверка пароля
    if (!local.password) {
        local.passwordError = "Введите пароль";
        pass = false;
    } else {
        local.passwordError = "";
    }

    if (pass) {
        const result = loginUser(local.email, local.password);
        
        if (result.success) {
            // Очищаем форму
            local.email = '';
            local.password = '';
            local.generalError = '';
            
            router.replace('/');
        } else {
            local.generalError = result.message;
        }
    }
}

function handleRegister() {
    let pass = true;
    
    // Проверка имени
    if (/^[А-Я][а-я]+$/.test(local.username)) {
        local.usernameError = "";
    } else {
        local.usernameError = "Имя должно начинаться с заглавной буквы и содержать только русские буквы";
        pass = false;
    }

    // Проверка пола
    if (local.gender === '') {
        local.genderError = "Выберите пол";
        pass = false;
    } else {
        local.genderError = "";
    }

    // Проверка возраста
    if (local.age > 99 || local.age < 18) {
        local.ageError = "Возраст должен быть от 18 до 99 лет";
        pass = false;
    } else {
        local.ageError = "";
    }

    // Проверка email
    if (!local.email) {
        local.emailError = "Введите email";
        pass = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email)) {
        local.emailError = "Введите корректный email";
        pass = false;
    } else {
        local.emailError = "";
    }

    // Проверка пароля
    if (local.password.length < 6) {
        local.passwordError = "Пароль должен содержать минимум 6 символов";
        pass = false;
    } else {
        local.passwordError = "";
    }

    // Проверка подтверждения пароля
    if (local.password !== local.confirmPassword) {
        local.confirmPasswordError = "Пароли не совпадают";
        pass = false;
    } else {
        local.confirmPasswordError = "";
    }

    if (pass) {
        const result = registerUser({
            name: local.username,
            gender: local.gender,
            age: local.age,
            email: local.email,
            password: local.password
        });

        if (result.success) {
            // Очищаем форму
            local.username = '';
            local.gender = '';
            local.age = '';
            local.email = '';
            local.password = '';
            local.confirmPassword = '';
            local.generalError = '';
            
            router.replace('/');
        } else {
            local.generalError = result.message;
        }
    }
}

function toggleMode() {
    local.isLogin = !local.isLogin;
    // Очищаем все поля и ошибки при переключении
    local.email = '';
    local.password = '';
    local.username = '';
    local.gender = '';
    local.age = '';
    local.confirmPassword = '';
    local.emailError = '';
    local.passwordError = '';
    local.usernameError = '';
    local.genderError = '';
    local.ageError = '';
    local.confirmPasswordError = '';
    local.generalError = '';
}
</script>

<template>
    <div class="auth-container">
        <div class="auth-form">
            <h2>{{ local.isLogin ? 'Вход в систему' : 'Регистрация' }}</h2>

            <div v-if="local.generalError" class="general-error">
                {{ local.generalError }}
            </div>

            <!-- Форма входа -->
            <div v-if="local.isLogin">
                <div class="form-group">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        v-model="local.email"
                        :class="{ 'error-input': local.emailError || local.generalError }"
                    >
                    <div class="error">{{ local.emailError }}</div>
                </div>

                <div class="form-group">
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        v-model="local.password"
                        :class="{ 'error-input': local.passwordError || local.generalError }"
                    >
                    <div class="error">{{ local.passwordError }}</div>
                </div>

                <button @click="handleLogin" class="submit-btn">Войти</button>
            </div>

            <!-- Форма регистрации -->
            <div v-else>
                <div class="form-group">
                    <input 
                        type="text" 
                        placeholder="Имя" 
                        v-model="local.username"
                        :class="{ 'error-input': local.usernameError }"
                    >
                    <div class="error">{{ local.usernameError }}</div>
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
                    <div class="error">{{ local.genderError }}</div>
                </div>

                <div class="form-group">
                    <input 
                        type="number" 
                        placeholder="Возраст" 
                        v-model="local.age"
                        :class="{ 'error-input': local.ageError }"
                    >
                    <div class="error">{{ local.ageError }}</div>
                </div>

                <div class="form-group">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        v-model="local.email"
                        :class="{ 'error-input': local.emailError }"
                    >
                    <div class="error">{{ local.emailError }}</div>
                </div>

                <div class="form-group">
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        v-model="local.password"
                        :class="{ 'error-input': local.passwordError }"
                    >
                    <div class="error">{{ local.passwordError }}</div>
                </div>

                <div class="form-group">
                    <input 
                        type="password" 
                        placeholder="Подтвердите пароль" 
                        v-model="local.confirmPassword"
                        :class="{ 'error-input': local.confirmPasswordError }"
                    >
                    <div class="error">{{ local.confirmPasswordError }}</div>
                </div>

                <button @click="handleRegister" class="submit-btn">Зарегистрироваться</button>
            </div>

            <div class="toggle-link">
                {{ local.isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
                <a @click="toggleMode" class="toggle-btn">
                    {{ local.isLogin ? 'Зарегистрироваться' : 'Войти' }}
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.auth-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(58, 45, 79, 0.1);
}

.auth-form {
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 35px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h2 {
    color: var(--deep-purple);
    margin-bottom: 30px;
    text-align: center;
    font-size: 2em;
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

.error-input {
    border-color: #dc3545;
}

.error {
    color: #dc3545;
    font-size: 0.9em;
    margin-top: 6px;
    padding-left: 4px;
}

.general-error {
    color: #dc3545;
    font-size: 0.9em;
    text-align: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: rgba(220, 53, 69, 0.1);
    border-radius: 4px;
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

.submit-btn {
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

.submit-btn:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
}

.toggle-link {
    text-align: center;
    margin-top: 20px;
    color: var(--text-dark);
}

.toggle-btn {
    color: var(--deep-purple);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease;
    margin-left: 5px;
}

.toggle-btn:hover {
    color: var(--terracotta);
}

@media (max-width: 768px) {
    .auth-container {
        padding: 20px;
    }

    .auth-form {
        padding: 25px;
    }

    h2 {
        font-size: 1.8em;
    }

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
</style> 