import React from 'react'
import { useSelector } from 'react-redux'
import { eventsSelector } from '../../store/slices/events.js'
import * as style from './style.module.scss'

const Events = () => {
	const { events, loading, hasErrors } = useSelector(eventsSelector)

	const renderEvents = () => {
		if (loading) return <p>Loading events...</p>
		if (hasErrors) return <p>Unable to display events.</p>
		return events.map(event => <li key={event.id}>You spent {event.time_spent} seconds doing {event.name}</li>)
	}

	return (
		<>
			<h1>Events</h1>
			{renderEvents()}
		</>
	)
}

export default Events