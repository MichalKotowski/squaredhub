require('dotenv').config()
const { Pool } = require('pg')

const developmentConfig = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
}

const productionConfig = {
	connectionString: process.env.DATABASE_URL
}

const pool = new Pool(
	process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig
)

pool.on('error', (error, client) => {
	console.error('Unexpected error on idle client', error)
	process.exit(-1)
})

module.exports = pool