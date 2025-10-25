const {  Schema, model } = require ('mongoose')

// Создание схемы для модели задач. Схема определяет структуру документов в коллекции базы данных. 
// В данном случае, каждый документ будет представлять собой задачу с полем 'title', 
// которое является строкой и обязательно для заполнения.
const TodosSchema = new Schema({ 
title: { type: String, required: true } 
})

module.exports = model('Todos', TodosSchema) 