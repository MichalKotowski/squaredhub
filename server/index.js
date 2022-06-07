require('dotenv').config()

const express = require('express')
const cors = require('cors')
const db = require('./src/queries')

const app = express()

const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/activities', db.getActivities)
app.get('/activities/:id', db.getActivityById)
app.post('/activities', db.createActivity)
app.put('/activities/:id', db.updateActivity)
app.delete('/activities/:id', db.removeActivity)

app.get('/events', db.getEvents)
app.post('/events', db.submitEvent)

app.post('/login', db.loginUser)
app.post('/register', db.registerUser)

app.listen(port, () => {
	console.log(`listening to port: ${port}`);
})