import React, { useEffect, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../../store/slices/events.js'
import { activitiesSelector } from '../../../store/slices/activities.js'
import { timerSelector, setActivity, setActive, resetTimer } from '../../../store/slices/timer.js'
import { formatTime } from '../../../utils'
import { setDriftlessInterval, clearDriftless } from 'driftless'
import axios from 'axios'
import { Typography, Box, InputLabel, MenuItem, FormControl, Select, Button, ButtonGroup, Grid } from '@mui/material'
import { userSelector } from '../../../store/slices/user.js'
import { Link } from 'react-router-dom'
import { TimerContext } from '../../../TimerContext'
import style from './style.module.scss'

const Stopwatch = () => {
	const dispatch = useDispatch()
	const { activities, loading, hasErrors } = useSelector(activitiesSelector)
	const { activity, isActive } = useSelector(timerSelector)
	const { user } = useSelector(userSelector)
	const newTimerInterval = useRef(null)
	const { watchTime, setWatchTime } = useContext(TimerContext)

	const handleStart = () => {
		dispatch(setActive(true))
		handleLocalStorage('start')
	}

	const handlePause = () => {
		dispatch(setActive(false))
		handleLocalStorage('pause')
	}

	const handleSubmit = async () => {
		await axios.post('/events', {
			id: activity,
			date: new Date().toISOString().slice(0, 10),
			time: watchTime,
			userId: user.user_id
		}).then(response => {
			dispatch(setActive(false))
			dispatch(fetchEvents(user.user_id))
			dispatch(resetTimer())
			setWatchTime(0)
			handleLocalStorage('submit')
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const handleLocalStorage = action => {
		if (action === 'start') {
			localStorage.setItem('isActive', true)
			localStorage.setItem('timestamp', Date.now())
			localStorage.setItem('userId', user.user_id)
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
			localStorage.removeItem('userId')
		}
	}

	const handleCurrentActivity = event => {
		dispatch(setActivity(event.target.value))
		localStorage.setItem('activity', event.target.value)
	}

	const renderActivities = () => {
		if (loading) return <Typography variant="body1" gutterBottom>Loading activities...</Typography>
		if (hasErrors) return <Typography variant="body1" gutterBottom>Unable to display activities.</Typography>

		if (activities.length) {
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
		} else {
			return <Typography variant="body1" gutterBottom><Link to="/activities">Add a new activity</Link> before using a stopwatch</Typography>
		}
	}

	useEffect(() => {
		if (isActive) {
			newTimerInterval.current = setDriftlessInterval(() => {
				setWatchTime(watchTime => watchTime + 1)
			}, 1000)
			return () => clearDriftless(newTimerInterval.current)
		}
	}, [isActive])

	useEffect(() => {
		if (localStorage.getItem('timestamp') && !isActive && +localStorage.getItem('userId') === user.user_id) {
			if (localStorage.getItem('isActive') === 'true') {
				dispatch(setActivity(localStorage.getItem('activity')))

				if (localStorage.getItem('savedDuration')) {
					setWatchTime(+localStorage.getItem('savedDuration') + Math.floor((Date.now() - localStorage.getItem('timestamp')) / 1000))
				} else {
					setWatchTime(Math.floor((Date.now() - localStorage.getItem('timestamp')) / 1000))
				}

				dispatch(setActive(true))
			} else {
				setWatchTime(+localStorage.getItem('savedDuration'))
				dispatch(setActivity(localStorage.getItem('activity')))
			}
		}
	}, [])

	return (
		<>
			<Grid container spacing={0} justifyContent="center" alignItems="center" className={style.stopwatch}>
				<Grid item xs={12} md={4}>
					<Typography variant="h3" gutterBottom>{formatTime(watchTime)}</Typography>
				</Grid>
				<Grid item xs={12} md={8}>
					{renderActivities()}
					<ButtonGroup variant="contained" aria-label="Timer functionalities" className={style.buttons}>
						<Button onClick={handleStart} disabled={isActive || activity === ''}>Start</Button>
						<Button onClick={handlePause} disabled={!isActive}>Pause</Button>
						<Button onClick={handleSubmit} disabled={watchTime === 0}>Submit</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</>
	)
}

export default Stopwatch