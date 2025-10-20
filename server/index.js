const express = require('express')

const app = express()

const PORT = 3001

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port - ${PORT }`)) 
    } catch (e) {
        console.log(e)
    }
}

start( )