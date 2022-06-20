import React from 'react'
import { useSelector } from 'react-redux'
import { eventsSelector } from '../../store/slices/events.js'
import Typography from '@mui/material/Typography'
import * as style from './style.module.scss'

const Events = () => {
	const { events, loading, hasErrors } = useSelector(eventsSelector)

	const renderEvents = () => {
		if (loading) return <Typography variant="body1" gutterBottom>Loading events...</Typography>
		if (hasErrors) return <Typography variant="body1" gutterBottom>Unable to display events.</Typography>
		return events.map(event => <Typography variant="body1" gutterBottom key={event.id}>You spent {event.time_spent} seconds doing {event.name}</Typography>)
	}

	return (
		<>
			<Typography variant='h4' gutterBottom component='div'>Events log</Typography>
			{renderEvents()}
		</>
	)
}

export default Events