class TodosController {
    async getTodos(req, res) {
        try {
            res.send('GET: список задач');
        } catch (error) {
            res.status(400).json({ message: 'Ошибка при получении задач' });
        }
    }
    async addTodos(req, res) {
        try {
            
        } catch (error) {
            res.status(400).json({ message: 'Ошибка при добавлении задачи' });
        }
    }
    async deleteTodos(req, res) { 
        try {
            
        } catch (error) {
            res.status(400).json({ message: 'Ошибка при удалении задачи' });
        }
    }
}

module.exports = new TodosController();