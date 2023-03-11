const express = require('express')
const cors = require('cors')

const userRouter = require('./controllers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)

module.exports = app
