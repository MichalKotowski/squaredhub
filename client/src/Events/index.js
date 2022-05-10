import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'

const Events = () => {
	const [ events, setEvents ] = useState([])

	const listStoredEvents = () => {
		let events = []
		let keys = Object.keys(localStorage).sort((a, b) => b > a)

		keys.forEach(key => {
			let eventData = localStorage.getItem(key)
			events.push(JSON.parse(eventData))
		})

		return events
	}

	useEffect(() => {
		setEvents(listStoredEvents())

		window.addEventListener('storage', () => {
			setEvents(listStoredEvents())
		})
	}, [])


	return (
		<div>
			{events.map(el => <p>You spent {el.time} seconds doing {el.name}</p>)}
		</div>
	)
}

export default Events