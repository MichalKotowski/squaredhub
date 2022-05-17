import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as style from './style.module.scss'

const Events = () => {
	const [ events, setEvents ] = useState([])

	const getEvents = async () => {
		const response = await axios.get('events')
		setEvents(response.data)
	}

	useEffect(() => {
		getEvents()
	}, [])

	// Check Redux in order to centralize application's state

	return (
		<ol>
			{events.map(event => (
				<li key={event.id}>You spent {event.time_spent} seconds doing {event.name}</li>
			))}
		</ol>
	)
}

export default Events