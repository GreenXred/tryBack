const TodosModel = require('../models/todosModel');

class TodosController {
    async getTodo(req, res) {
        try {
            const result = await TodosModel.find({}, 'title').exec();

            res.status(200).json({ todos: result });
        } catch (error) {
            res.status(400).json({ message: 'Ошибка при получении задач' });
        }
    }

    async addTodo(req, res) {
        try {
            if (!req.body.title) {
                res.status(400).json({ message: 'Пожалуйста, добавьте заголовок!' });
            }

            const todoModel = new TodosModel({ title: req.body.title });
            await todoModel.save();

            res.status(200).json({ message: 'Задача успешно добавлена!' });
        } catch (error) {
            res.status(400).json({ message: 'Ошибка при добавлении задачи' });
        }
    }

    async deleteTodo(req, res) {
        try {
            const title = req.body && req.body.title;
            if (!title) {
                return res.status(400).json({ message: 'Пожалуйста, укажите заголовок!' });
            }

            const {  deletedCount } = await TodosModel.deleteOne({ title: req.body.title }).exec();

            if (deletedCount === 0) {
                return res.status(400).json({ message: 'Задача не найдена, проверьте заголовок!' });
            }

            res.status(200).json({ message: 'Задача успешно удалена!' });
        } catch (error) {
            res.status(400).json({ message: 'Ошибка при удалении задачи' });
        }
    }
}

module.exports = new TodosController();
