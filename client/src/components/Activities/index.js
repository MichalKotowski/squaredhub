import { useEffect, useState } from 'react'
import Activity from './Activity'
import axios from 'axios'
import style from './style.module.scss'
import { fetchActivities, activitiesSelector } from '../../store/slices/activities.js'
import { useDispatch, useSelector } from 'react-redux'

const Activities = () => {
	const dispatch = useDispatch()
	const { activities, loading, hasErrors } = useSelector(activitiesSelector)
	const [ activityName, setActivityName ] = useState('')

	const handleSubmit = async event => {
		event.preventDefault()

		await axios.post('activities', {
			name: activityName,
			date: new Date().toISOString().slice(0, 10),
			color: '#123123'
		}).then(response => {
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

	useEffect(() => {
		dispatch(fetchActivities)
	}, [dispatch])

	return (
		<>
			{renderActivities()}
			<form onSubmit={handleSubmit}>
				<label>
					Activity name:
					<input type='text' name='name' value={activityName} onChange={event => setActivityName(event.target.value)}/>
				</label>
				<input type='submit' value='Submit' />
			</form>
		</>
	)
}

export default Activities