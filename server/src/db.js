require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
})

pool.on('error', (error, client) => {
	console.error('Unexpected error on idle client', error)
	process.exit(-1)
})

module.exports = pool