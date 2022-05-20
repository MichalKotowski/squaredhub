import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../store/slices/events.js'
import { fetchActivities, activitiesSelector } from '../../store/slices/activities.js'
import axios from 'axios'
import * as style from './style.module.scss'

const Stopwatch = () => {
	const dispatch = useDispatch()
	const [ activity, setActivity ] = useState('')
	const [ isActive, setActive ] = useState(false)
	const [ timer, setTimer ] = useState(0)
	const { activities, loading, hasErrors } = useSelector(activitiesSelector)
	const countRef = useRef(null)

	const handleStart = () => {
		countRef.current = setInterval(() => {
			setTimer(timer => timer + 1)
		}, 1000)
		setActive(true)
	}

	const handlePause = () => {
		clearInterval(countRef.current)
		setActive(false)
	}

	const handleSubmit = async () => {
		clearInterval(countRef.current)

		await axios.post('/events', {
			id: activity,
			date: new Date().toISOString().slice(0, 10),
			time: timer
		}).then(response => {
			setActivity('')
			setActive(false)
			setTimer(0)
			dispatch(fetchEvents())
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const handleCurrentActivity = event => {
		setActivity(event.target.value)
	}

	const formatTime = () => {
		let currentTime = timer

		const getSeconds = `0${(currentTime % 60)}`.slice(-2)
		const minutes = `${Math.floor(currentTime / 60)}`
		const getMinutes = `0${minutes % 60}`.slice(-2)
		const getHours = `0${Math.floor(currentTime / 3600)}`.slice(-2)
	
		return `${getHours} : ${getMinutes} : ${getSeconds}`
	}

	useEffect(() => {
		dispatch(fetchActivities())
	}, [dispatch])

	const renderActivities = () => {
		if (loading) return <p>Loading activities...</p>
		if (hasErrors) return <p>Unable to display activities.</p>
		return (
			<select value={activity} onChange={handleCurrentActivity}>
				<option value='' default></option>
				{activities.map(singleActivity => (
					<option key={singleActivity.id} value={singleActivity.id}>{singleActivity.name}</option>
				))}
			</select>
		)
	}

	return (
		<>
			<div>
				<div>{formatTime()}</div>
				<div>
					{renderActivities()}
					<button onClick={handleStart} disabled={isActive || activity === ''}>Start</button>
					<button onClick={handlePause} disabled={!isActive}>Pause</button>
					<button onClick={handleSubmit} disabled={timer === 0}>Submit</button>
				</div>
			</div>
		</>
	)
}

export default Stopwatch