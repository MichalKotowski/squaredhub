import { useState } from 'react'
import { Typography, Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/slices/user'
import { useDispatch } from 'react-redux'

const Register = () => {
	const dispatch = useDispatch()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const navigate = useNavigate()

	const onSubmitForm = async event => {
		event.preventDefault()

		try {
			const response = await axios.post('/api/register', {
				firstName,
				lastName,
				email,
				password,
			})

			localStorage.setItem('token', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))
			dispatch(login(response.data.user))

			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Grid item xs={12} md={4}>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<Grid item xs={12}>
						<Typography variant='h4' gutterBottom component='div'>Register</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							required
							label="First name"
							id="firstname"
							fullWidth
							variant="outlined"
							autoComplete="off"
							value={firstName}
							onChange={event => setFirstName(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							required
							label="Last name"
							id="lastname"
							fullWidth
							variant="outlined"
							autoComplete="off"
							value={lastName}
							onChange={event => setLastName(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							label="Email address"
							id="email"
							fullWidth
							variant="outlined"
							autoComplete="off"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id="password"
							label="Password"
							type="password"
							fullWidth
							required
							variant="outlined"
							autoComplete="off"
							value={password}
							onChange={event => setPassword(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id="confirmPassword"
							label="Confirm password"
							variant="outlined"
							fullWidth
							type="password"
							required
							autoComplete="off"
							value={confirmPassword}
							onChange={event => setConfirmPassword(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={event => onSubmitForm(event)}
						>
							Register
						</Button>
					</Grid>
					<Grid item xs={12}>
						Already have an account? <Link to="/login">Log in</Link>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default Register