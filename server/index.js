require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const db = require('./src/queries')

const app = express()

const port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/activities', db.getActivities)
app.get('/api/activities/:id', db.getActivityById)
app.post('/api/activities', db.createActivity)
app.put('/api/activities/:id', db.updateActivity)
app.delete('/api/activities/:id', db.removeActivity)

app.get('/api/events', db.getEvents)
app.post('/api/events', db.submitEvent)

app.post('/api/login', db.loginUser)
app.post('/api/register', db.registerUser)

app.get('/api/*', (request, response) => {
	if (process.env.NODE_ENV === 'production') {
		response.sendFile(path.join(__dirname, '../client/build/index.html'))
	}
})

app.listen(port, () => {
	console.log(`listening to port: ${port}`);
}).on('error', err => {
    console.log(err)
})