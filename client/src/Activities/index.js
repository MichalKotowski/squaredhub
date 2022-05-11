import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as style from './style.module.scss'

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

	const handleRemoval = async (event, id) => {
		event.preventDefault()

		await axios.delete(`activities/${id}`).then(response => {
			getActivities()
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	return (
		<>
			<div>
				<ol>
					{activities.map(singleActivity => (
						<li key={singleActivity.activity_id}>
							<p>{singleActivity.name}</p>
							<button onClick={event => handleRemoval(event, singleActivity.activity_id)}>Remove</button>
						</li>
					))}
				</ol>
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