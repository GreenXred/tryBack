const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const todosRoutes = require('./routes/todosRoutes')

require('dotenv').config()

const app = express() 

app.use(cors()) // Разрешение CORS

app.use(express.json()) // Для парсинга JSON в теле запросов
app.use('/api/todos', todosRoutes)  // Подключение роутов для работы с задачами

const PORT = process.env.PORT || 3001 // Порт сервера

//----- Функция для старта сервера и подключения к базе данных -----//
const start = async () => { 
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        app.listen(PORT, () => console.log(`Server started on port - ${PORT}`)) 
    } catch (e) {
        console.log(e)
    }
}

start()