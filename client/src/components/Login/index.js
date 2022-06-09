import { useState } from 'react'
import { Typography, Grid, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login } from '../../store/slices/user'
import { useDispatch } from 'react-redux'

const Login = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const onSubmitForm = async event => {
		event.preventDefault()

		try {
			const response = await axios.post('/login', {
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
		<Grid item xs={12} md={4}>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				<Grid item xs={12}>
					<Typography variant='h4' gutterBottom component='div'>Login</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						label="Email"
						fullWidth
						id="email"
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
						fullWidth
						required
						type="password"
						variant="outlined"
						autoComplete="off"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						fullWidth
						color="primary"
						onClick={event => onSubmitForm(event)}
					>
						Login
					</Button>
				</Grid>
				<Grid item xs={12}>
					Need an account? <Link to="/register">Register</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Login