const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

async function hashPassword(password) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		return hashedPassword
	} catch (error) {
		console.log(error)
	}
}

async function issueJWT(user) {
	const userId = user.user_id
	const expiresIn = '1d'

	const payload = {
		sub: userId
	}

	const signedToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn
	})

	return {
		token: `Bearer ${signedToken}`,
		expires: expiresIn
	}
}

async function validPassword(password, savedPassword) {
	const isMatch = await bcrypt.compare(password, savedPassword)
	return isMatch
}

module.exports.hashPassword = hashPassword
module.exports.issueJWT = issueJWT
module.exports.validPassword = validPassword