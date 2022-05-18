import { useEffect, useState } from 'react'
import Activity from './Activity'
import axios from 'axios'
import style from './style.module.scss'

const Activities = () => {
	const [ activities, setActivities ] = useState([])
	const [ activity, setActivity ] = useState('')

	const getActivities = async () => {
		const response = await axios.get('activities')
		setActivities(response.data)
	}

	useEffect(() => {
		getActivities()
	}, [])

	const handleSubmit = async event => {
		event.preventDefault()

		await axios.post('activities', {
			name: activity,
			date: new Date().toISOString().slice(0, 10),
			color: '#123123'
		}).then(response => {
			getActivities()
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	return (
		<>
			<div className={style.activitiesWrapper}>
				{activities.map(singleActivity => (
					<Activity key={singleActivity.id} data={singleActivity} getActivities={getActivities}/>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					Activity name:
					<input type='text' name='name' value={activity} onChange={event => setActivity(event.target.value)}/>
				</label>
				<input type='submit' value='Submit' />
			</form>
		</>
	)
}

export default Activities