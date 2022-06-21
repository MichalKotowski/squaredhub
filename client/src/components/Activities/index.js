import { useState } from 'react'
import Activity from './Activity'
import axios from 'axios'
import { fetchActivities, activitiesSelector } from '../../store/slices/activities.js'
import { useDispatch, useSelector } from 'react-redux'
import { CirclePicker } from 'react-color'
import { Box, TextField, Button, Typography } from '@mui/material'
import { userSelector } from '../../store/slices/user.js'
import style from './style.module.scss'

const Activities = () => {
	const dispatch = useDispatch()
	const { activities, loading, hasErrors } = useSelector(activitiesSelector)
	const { user } = useSelector(userSelector)
	const [ name, setName ] = useState('')
	const [ color, setColor ] = useState('')
	const [ isColorPickerVisible, setColorPickerVisibility ] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()

		await axios.post('activities', {
			name,
			date: new Date().toISOString().slice(0, 10),
			color,
			userId: user.user_id
		}).then(response => {
			setName('')
			setColor('')
			dispatch(fetchActivities(user.user_id))
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const renderActivities = () => {
		if (loading) return <p>Loading activities...</p>
		if (hasErrors) return <p>Unable to display activities.</p>

		return (
			<div className={style.activitiesWrapper}>
				{activities.map(singleActivity => (
					<Activity key={singleActivity.id} data={singleActivity} />
				))}
			</div>
		)
	}

	return (
		<>
			<Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>New activity</Typography>
			<form onSubmit={handleSubmit} className={style.activity}>
				<div className={style.activityColor} style={{backgroundColor: color}} onClick={() => setColorPickerVisibility(!isColorPickerVisible)}>
					{ isColorPickerVisible ?
						<>
							<div className={style.cover}></div>
							<div className={style.colorPicker}>
								<CirclePicker color={color} onChange={colorData => setColor(colorData.hex)} />
							</div>
						</> : null
					}
				</div>
				<Box
					noValidate
					autoComplete='off'
					className={style.input}
					>
					<TextField label='Name' variant='outlined' value={name} onChange={event => setName(event.target.value)} />
				</Box>
				<Button variant='contained' type='submit'>Submit</Button>
			</form>
			{activities.length > 0 &&
				<Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginTop: '2em' }}>Activities</Typography>
			}
			{renderActivities()}
		</>
	)
}

export default Activities