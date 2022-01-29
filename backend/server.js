require('dotenv').config()
const express = require('express')
const router = require('./routes/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Cors Options
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
}

// Express
const app = express()

// PORT
const PORT = process.env.PORT || 5000

// Set static folder
app.use('/storage', express.static('storage'))

// Cookie Parser
app.use(cookieParser())

// CORS
app.use(cors(corsOptions))

// DB
require('./db/connection')

// Limit file size
app.use(express.json({ limit: '8mb' }))

// ROUTERS
app.use(router)

// Main Route
app.get('/', (req, res) => {
  res.send('hello World')
})

// Listening on port
app.listen(PORT, (req, res) => {
  console.log(`Server Started on port ${PORT}`)
})
