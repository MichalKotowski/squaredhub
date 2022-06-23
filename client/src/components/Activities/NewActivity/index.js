import { useState } from 'react'
import axios from 'axios'
import { fetchActivities } from '../../../store/slices/activities.js'
import { useDispatch, useSelector } from 'react-redux'
import { CirclePicker } from 'react-color'
import { Box, TextField, Button, IconButton } from '@mui/material'
import { userSelector } from '../../../store/slices/user.js'
import AddIcon from '@mui/icons-material/AddBox'
import style from './style.module.scss'

const NewActivity = ({ windowWidth }) => {
	const dispatch = useDispatch()
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

	return (
		<>
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
				{windowWidth <= 500
					? <IconButton color='primary' aria-label='Add activity' component='span' type='submit'><AddIcon /></IconButton>
					: <Button variant='contained' type='submit'>Submit</Button>
				}
				
			</form>
		</>
	)
}

export default NewActivity