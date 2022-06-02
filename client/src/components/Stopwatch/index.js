import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../store/slices/events.js'
import { fetchActivities, activitiesSelector } from '../../store/slices/activities.js'
import { timerSelector, setActivity, tick, setActive, setTimer, resetTimer } from '../../store/slices/timer.js'
import { formatTime } from '../../utils'
import { setDriftlessInterval, clearDriftless } from 'driftless'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
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
			dispatch(setActivity(''))
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
		if (loading) return <Typography variant="body1" gutterBottom>Loading activities...</Typography>
		if (hasErrors) return <Typography variant="body1" gutterBottom>Unable to display activities.</Typography>
		return (
			<Box sx={{ minWidth: 120 }}>
				<FormControl fullWidth>
					<InputLabel id="activityLabel">Activity</InputLabel>
					<Select
						labelId="activityLabel"
						id="activity"
						value={activity}
						label="Activity"
						onChange={handleCurrentActivity}
					>
						{activities.map(singleActivity => (
							<MenuItem key={singleActivity.id} value={singleActivity.id}>{singleActivity.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		)
	}

	return (
		<>
			<div>
				<div>{formatTime(timer)}</div>
				<div>
					{renderActivities()}
					<ButtonGroup variant="contained" aria-label="Timer functionalities">
						<Button onClick={handleStart} disabled={isActive || activity === ''}>Start</Button>
						<Button onClick={handlePause} disabled={!isActive}>Pause</Button>
						<Button onClick={handleSubmit} disabled={timer === 0}>Submit</Button>
					</ButtonGroup>
				</div>
			</div>
		</>
	)
}

export default Stopwatch