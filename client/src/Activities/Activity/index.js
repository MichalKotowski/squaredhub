import { useState } from 'react'
import axios from 'axios'
import style from './style.module.scss'
import { CirclePicker } from 'react-color'

const Activity = ({ data, getActivities }) => {
	const [ activityName, setActivityName ] = useState(data.name)
	const [ color, setColor] = useState(data.color)
	const [ isColorPickerVisible, setColorPickerVisibility ] = useState(false)

	const handleRemoval = async (event, id) => {
		event.preventDefault()

		await axios.delete(`activities/${id}`).then(response => {
			getActivities()
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const handleNameEdit = async (event, activity) => {
		if (event.target.value !== activity.name) {
			await axios.put(`activities/${activity.id}`, {
				color: color,
				name: event.target.value
			}).then(response => {
				setActivityName(event.target.value)
				getActivities()
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
		}
	}

	const handleColorEdit = async (colorHex, id) => {
		if (color !== colorHex) {
			await axios.put(`activities/${id}`, {
				color: colorHex,
				name: activityName
			}).then(response => {
				setColor(colorHex)
				getActivities()
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
		}
	}

	return (
		<div key={data.id} className={style.activity}>
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
			<div className={style.activityInput}>
				<input type='text' value={activityName} onChange={event => setActivityName(event.target.value)} onBlur={event => handleNameEdit(event, data)}/>
			</div>
			<div className={style.activityRemove} onClick={event => handleRemoval(event, data.id)}>
				<span></span>
			</div>
		</div>
	)
}

export default Activity