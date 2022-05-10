const app = require('express')()
const cors = require('cors')
require('dotenv').config()
const { Client } = require('pg')

const PORT = 4000

app.use(cors())

app.get('/', async (req, res) => {
	const client = new Client()
	await client.connect()
	const data = await client.query('SELECT * from devices;')
	res.send(data.rows)
	await client.end()
})

app.listen(PORT, () => {
	console.log("listening to port: " + PORT);
})