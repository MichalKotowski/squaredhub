const pool = require('./db')

const getActivities = async (request, response) => {
	try {
		const { rows } = await pool.query('SELECT * FROM activities ORDER BY id ASC')
		response.status(200).json(rows)
	} catch (error) {
		throw error
	}
}

const getActivityById = async (request, response) => {
	const id = parseInt(request.params.id)

	try {
		const { rows } = await pool.query('SELECT * FROM activities WHERE id = $1', [id])
		response.status(200).json(rows)
	} catch (error) {
		throw error
	}
}

const createActivity = async (request, response) => {
	const { name, date, color } = request.body

	await pool.query('INSERT INTO activities (user_id, name, date_created, color) VALUES (1, $1, $2, $3) RETURNING id', [name, date, color], (error, result) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Added device with id: ${result.rows[0].id}`)
	})
}

const updateActivity = async (request, response) => {
	const id = parseInt(request.params.id)
	const { name, color } = request.body

	try {
		await pool.query('UPDATE activities SET name = $1, color = $2 WHERE id = $3', [name, color, id])
		response.status(200).send(`Activity with id: ${id} was updated`)
	} catch (error) {
		throw error
	}
}

const removeActivity = async (request, response) => {
	const id = parseInt(request.params.id)

	try {
		await pool.query('DELETE FROM activities WHERE id = $1', [id])
		response.status(200).send(`Activity with id: ${id} was removed`)
	} catch (error) {
		throw error
	}
}

module.exports = {
	getActivities,
	getActivityById,
	createActivity,
	updateActivity,
	removeActivity
}