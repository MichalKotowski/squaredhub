import { useState, useEffect } from 'react'
import Activity from './Activity'
import NewActivity from './NewActivity'
import { activitiesSelector } from '../../store/slices/activities.js'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import style from './style.module.scss'

const Activities = () => {
	const { activities, loading, hasErrors } = useSelector(activitiesSelector)
	const [ windowWidth, setWindowWidth ] = useState(window.innerWidth)

	const renderActivities = () => {
		if (loading) return <p>Loading activities...</p>
		if (hasErrors) return <p>Unable to display activities.</p>

		return (
			<div className={style.activitiesWrapper}>
				{activities.map(singleActivity => (
					<Activity key={singleActivity.id} data={singleActivity} windowWidth={windowWidth} />
				))}
			</div>
		)
	}

	const handleWindowResize = () => {
		setWindowWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	})

	return (
		<>
			<Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>Add new activity</Typography>
			<NewActivity windowWidth={windowWidth} />
			{activities.length 
				? <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginTop: '2em' }}>Activities</Typography>
				: null
			}
			{renderActivities()}
		</>
	)
}

export default Activities