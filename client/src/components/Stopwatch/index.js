import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../store/slices/events.js'
import { fetchActivities, activitiesSelector } from '../../store/slices/activities.js'
import { timerSelector, setActivity, tick, setActive, setTimer, resetTimer } from '../../store/slices/timer.js'
import { formatTime } from '../../utils'
import { setDriftlessInterval, clearDriftless } from 'driftless'
import axios from 'axios'
import * as style from './style.module.scss'

let timerInterval

const Stopwatch = () => {
	const dispatch = useDispatch()
	const { activities, loading, hasErrors } = useSelector(activitiesSelector)
	const { activity, timer, isActive } = useSelector(timerSelector)

	const handleStart = () => {
		handleLocalStorage('start')
		dispatch(setActive(true))
		timerInterval = setDriftlessInterval(() => {
			dispatch(tick())
		}, 1000)
	}

	const handlePause = () => {
		handleLocalStorage('pause')
		dispatch(setActive(false))
		clearDriftless(timerInterval)
	}

	const handleSubmit = async () => {
		await axios.post('/events', {
			id: activity,
			date: new Date().toISOString().slice(0, 10),
			time: timer
		}).then(response => {
			handleLocalStorage('submit')
			dispatch(fetchEvents())
			dispatch(setActive(false))
			clearDriftless(timerInterval)
			dispatch(resetTimer())
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const handleLocalStorage = action => {
		if (action === 'start') {
			localStorage.setItem('isActive', true)
			localStorage.setItem('timestamp', Date.now())
		} else if (action === 'pause') {
			localStorage.setItem('isActive', false)
			if (localStorage.getItem('savedDuration')) {
				localStorage.setItem('savedDuration', +localStorage.getItem('savedDuration') + Math.floor((Date.now() - localStorage.getItem('timestamp')) / 1000))
			} else {
				localStorage.setItem('savedDuration', Math.floor((Date.now() - localStorage.getItem('timestamp')) / 1000))
			}
		} else if (action === 'submit') {
			localStorage.removeItem('isActive')
			localStorage.removeItem('timestamp')
			localStorage.removeItem('activity')
			localStorage.removeItem('savedDuration')
		}
	}

	const handleCurrentActivity = event => {
		dispatch(setActivity(event.target.value))
		localStorage.setItem('activity', event.target.value)
	}

	useEffect(() => {
		if (localStorage.getItem('timestamp') && isActive === false) {
			if (localStorage.getItem('isActive') === 'true') {
				dispatch(setActive(true))
				dispatch(setActivity(localStorage.getItem('activity')))
				if (localStorage.getItem('savedDuration')) {
					dispatch(setTimer(+localStorage.getItem('savedDuration') + Math.floor((Date.now() - localStorage.getItem('timestamp')) / 1000)))
				} else {
					dispatch(setTimer(Math.floor((Date.now() - localStorage.getItem('timestamp')) / 1000)))
				}
				timerInterval = setDriftlessInterval(() => {
					dispatch(tick())
				}, 1000)
			} else {
				dispatch(setTimer(localStorage.getItem('savedDuration')))
				dispatch(setActivity(localStorage.getItem('activity')))
			}
		}
	}, [])

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
				<div>{formatTime(timer)}</div>
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