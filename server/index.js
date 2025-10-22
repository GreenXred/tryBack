const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3001 

app.get('/', (req, res) => { 
    res.send('Hello World!')
})

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        app.listen(PORT, () => console.log(`Server started on port - ${PORT}`)) 
    } catch (e) {
        console.log(e)
    }
}

start( )