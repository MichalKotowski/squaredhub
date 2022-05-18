import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, eventsSelector } from '../../store/slices/events.js'
import * as style from './style.module.scss'

const Events = () => {
	const dispatch = useDispatch()
	const { events, loading, hasErrors } = useSelector(eventsSelector)

	useEffect(() => {
		dispatch(fetchEvents())
	}, [dispatch])

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