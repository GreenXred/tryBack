const { Router } = require('express');
const todosController = require('../controllers/todosController');

const todosRoutes = new Router(); // Новый роутер для работы с задачами

// Получить все задачи
todosRoutes.get('/list', todosController.getTodo);

// Добавить новую задачу
todosRoutes.post('/add', todosController.addTodo);

// Удалить задачу
todosRoutes.delete('/delete', todosController.deleteTodo);

module.exports = todosRoutes;