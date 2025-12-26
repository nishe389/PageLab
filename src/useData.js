import { reactive } from 'vue';

// Инициализация данных из localStorage или создание новых
const initializeData = () => {
    const storedUsers = localStorage.getItem('users');
    const storedActiveUser = localStorage.getItem('activeUser');
    
    return {
        users: storedUsers ? JSON.parse(storedUsers) : [{
            name: 'name',
            gender: 'gender',
            age: 'age',
            email: 'email',
            password: 'password',
            cart: [],
            orders: []
        }],
        activeUser: storedActiveUser ? JSON.parse(storedActiveUser) : null
    };
};

// Создаем реактивное состояние
const state = reactive(initializeData());

// Функции для работы с данными
export const useData = () => {
    // Сохранение данных в localStorage
    const saveToStorage = () => {
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('activeUser', JSON.stringify(state.activeUser));
    };

    // Регистрация нового пользователя
    const registerUser = (userData) => {
        // Проверяем, не существует ли уже пользователь с таким email
        const existingUser = state.users.find(user => user.email === userData.email);
        if (existingUser) {
            return { success: false, message: 'Пользователь с таким email уже существует' };
        }

        // Добавляем нового пользователя
        state.users.push({
            ...userData,
            cart: [],
            orders: []
        });

        // Устанавливаем нового пользователя как активного
        state.activeUser = state.users.length - 1;
        
        // Сохраняем в localStorage
        saveToStorage();
        
        return { success: true, message: 'Регистрация успешно завершена' };
    };

    // Вход в аккаунт
    const loginUser = (email, password) => {
        const userIndex = state.users.findIndex(
            user => user.email === email && user.password === password
        );

        if (userIndex === -1) {
            return { success: false, message: 'Неверный email или пароль' };
        }

        state.activeUser = userIndex;
        saveToStorage();
        
        return { success: true, message: 'Вход выполнен успешно' };
    };

    // Выход из аккаунта
    const logoutUser = () => {
        state.activeUser = null;
        saveToStorage();
        return { success: true, message: 'Выход выполнен успешно' };
    };

    // Добавление товара в корзину
    const addToCart = (product) => {
        if (state.activeUser === null) {
            return { success: false, message: 'Для добавления товара в корзину необходимо войти в систему' };
        }

        state.users[state.activeUser].cart.push(product);
        saveToStorage();
        
        return { success: true, message: 'Товар успешно добавлен в корзину' };
    };

    // Оформление заказа
    const checkout = (paymentData) => {
        if (state.activeUser === null) {
            return { success: false, message: 'Для оформления заказа необходимо войти в систему' };
        }

        const user = state.users[state.activeUser];
        if (user.cart.length === 0) {
            return { success: false, message: 'Корзина пуста' };
        }

        // Перемещаем товары из корзины в заказы
        user.orders.push(...user.cart);
        // Очищаем корзину
        user.cart = [];
        
        saveToStorage();
        
        return { 
            success: true, 
            message: 'Заказ успешно оформлен! Чек отправлен на указанный email.',
            email: paymentData.email
        };
    };

    return {
        state,
        registerUser,
        loginUser,
        logoutUser,
        addToCart,
        checkout
    };
}; 