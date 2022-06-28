import { useState } from 'react'
import axios from 'axios'
import { CirclePicker } from 'react-color'
import { fetchActivities } from '../../../store/slices/activities.js'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../store/slices/user.js'
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './style.module.scss'

const Activity = ({ data, windowWidth }) => {
	const dispatch = useDispatch()
	const [ name, setName ] = useState(data.name)
	const [ color, setColor ] = useState(data.color)
	const [ isColorPickerVisible, setColorPickerVisibility ] = useState(false)
	const { user } = useSelector(userSelector)

	const handleRemoval = async (event, id) => {
		event.preventDefault()

		await axios.delete(`/api/activities/${id}`).then(response => {
			dispatch(fetchActivities(user.user_id))
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const handleNameEdit = async (event, activity) => {
		if (event.target.value !== activity.name && event.target.value !== '') {
			await axios.put(`/api/activities/${activity.id}`, {
				color,
				name: event.target.value
			}).then(response => {
				dispatch(fetchActivities(user.user_id))
				setName(event.target.value)
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
		} else {
			setName(activity.name)
		}
	}

	const handleColorEdit = async (colorHex, id) => {
		if (color !== colorHex) {
			await axios.put(`/api/activities/${id}`, {
				color: colorHex,
				name
			}).then(response => {
				dispatch(fetchActivities(user.user_id))
				setColor(colorHex)
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
		}
	}

	return (
		<div className={style.activity}>
			<div className={style.activityColor} style={{backgroundColor: color}} onClick={() => setColorPickerVisibility(!isColorPickerVisible)}>
				{ isColorPickerVisible ?
					<>
						<div className={style.cover}></div>
						<div className={style.colorPicker}>
							<CirclePicker color={color} onChange={colorData => handleColorEdit(colorData.hex, data.id)} />
						</div>
					</> : null
				}
			</div>
			<Box
				noValidate
				autoComplete='off'
				className={style.input}
				>
				<TextField label='Name' variant='outlined' value={name} onChange={event => setName(event.target.value)} onBlur={event => handleNameEdit(event, data)} />
			</Box>
			{windowWidth <= 500
				? <IconButton color='primary' aria-label='Remove activity' component='span' onClick={event => handleRemoval(event, data.id)}><DeleteIcon /></IconButton>
				: <Button variant='outlined' startIcon={<DeleteIcon />} onClick={event => handleRemoval(event, data.id)}>Remove</Button>
			}
		</div>
	)
}

export default Activity