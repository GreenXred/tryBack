const { Router } = require('express');
const todosController = require('../controllers/todosController');

const todosRoutes = new Router(); // Новый роутер для работы с задачами

// Получить все задачи
todosRoutes.get('/list', todosController.getTodos);

// Добавить новую задачу
todosRoutes.post('/add', todosController.addTodos);

// Удалить задачу
todosRoutes.delete('/delete', todosController.deleteTodos);
module.exports = todosRoutes;