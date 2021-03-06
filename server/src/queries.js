const pool = require('./db')
const utilities = require('./utils')

const getActivities = async (request, response) => {
	const { userId } = request.query

	try {
		const { rows } = await pool.query('SELECT * FROM activities WHERE user_id = $1 ORDER BY id ASC', [userId])
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
	const { name, date, color, userId } = request.body

	await pool.query('INSERT INTO activities (user_id, name, date_created, color) VALUES ($1, $2, $3, $4) RETURNING id', [userId, name, date, color], (error, result) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Added activity with id: ${result.rows[0].id}`)
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
		await pool.query('DELETE FROM activities WHERE id = $1; ', [id])
		await pool.query('DELETE FROM activities_log WHERE activity_id = $1', [id])
		response.status(200).send(`Activity with id: ${id} and all its corresponding logged times were removed`)
	} catch (error) {
		throw error
	}
}

const getEvents = async (request, response) => {
	const { userId } = request.query

	try {
		const { rows } = await pool.query('SELECT activities_log.id, activities_log.activity_id, activities_log.time_spent, activities_log.date_logged, activities.name, activities.color from activities_log, activities WHERE activities_log.activity_id = activities.id AND activities_log.user_id = $1 ORDER BY activities_log.id ASC', [userId])
		response.status(200).json(rows)
	} catch (error) {
		throw error
	}
}

const submitEvent = async (request, response) => {
	const { id, date, time, userId } = request.body

	await pool.query('INSERT INTO activities_log (user_id, activity_id, date_logged, time_spent) VALUES ($1, $2, $3, $4) RETURNING id', [userId, id, date, time], (error, result) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Logged activity with id: ${result.rows[0].id}`)
	})
}

const registerUser = async (request, response) => {
	const { firstName, lastName, email, password } = request.body

	try {
		const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])

		if (existingUser.rows.length > 0) {
			response.status(400).send('User already exists')
		} else {
			const hashedPassword = await utilities.hashPassword(password)
			const newUser = await pool.query(
				'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email',
				[firstName, lastName, email, hashedPassword]
			)

			const tokenObject = await utilities.issueJWT(newUser.rows[0])

			response.status(201).json({
				user: newUser.rows[0],
				success: true,
				token: tokenObject.token,
				expiresIn: tokenObject.expires,
			})
		}
	} catch (error) {
		console.log(error)
	}
}

const loginUser = async (request, response) => {
	try {
		const user = await pool.query('SELECT * FROM users WHERE email = $1', [request.body.email])

		if (user.rowCount === 0) {
			response.status(401).send('Could not find user')
		} else {
			const isValid = await utilities.validPassword(
				request.body.password,
				user.rows[0].password
			)

			if (isValid) {
				const tokenObject = await utilities.issueJWT(user.rows[0])

				delete user.rows[0]['password']

				response.status(200).json({
					user: user.rows[0],
					success: true,
					token: tokenObject.token,
					expiresIn: tokenObject.expires,
				})
			} else {
				response.status(401).send('You entered the wrong password')
			}
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getActivities,
	getActivityById,
	createActivity,
	updateActivity,
	removeActivity,
	getEvents,
	submitEvent,
	registerUser,
	loginUser,
}