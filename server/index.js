require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const db = require('./src/queries')

const app = express()

const port = process.env.PGPORT || 4000

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')))
}

console.log(path.join(__dirname, '../client/build'))

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

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, () => {
	console.log(`listening to port: ${port}`);
})