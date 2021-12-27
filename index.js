'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { 
  PORT,
  LOG_LEVEL,
  MONGODB_URI,
} = require('dotenv').config().parsed
const Task = require('./models/Task')


const app = express()
app.set('view engine', 'ejs')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan(LOG_LEVEL))

// routes
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.render('index', { tasks })
  } catch (err) {
    res.status(404).json({ msg: 'no tasks found' })
  }
})

app.post('/task/add', async (req, res) => {
  const task = new Task({ name: req.body.name })

  try {
    const newTask = await task.save()
    console.log(newTask)
    res.redirect('/')
  } catch (err) {
    res.status(500).json({ msg: 'server error' })
  }
})

// data layer connect
app.listen(PORT, () => {
  mongoose.connect(
    MONGODB_URI, 
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
})

const db = mongoose.connection

db.on('error', err => console.log(err))
db.once('open', () => console.log(`server running on ${PORT}`))