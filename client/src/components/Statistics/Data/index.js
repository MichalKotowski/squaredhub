import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { eventsSelector } from '../../../store/slices/events.js'
import { secondsToHms } from '../../../utils'
import style from './style.module.scss'

const Data = ({overall = false}) => {
	const { chartData, overallChartData } = useSelector(eventsSelector)

	return (
		<div className={style.wrapper}>
			<Typography variant='h6' gutterBottom>How are you doing so far?</Typography>
			{overall
				? overallChartData.map(activity => {
					let totalWeekTime = activity.data.reduce((total, time) => total + time, 0)
	
					return (
						<Typography variant='body1' key={activity.name} gutterBottom>
							<span className={style.circle} style={{ backgroundColor: activity.color }}></span>
							<strong>{activity.name}:</strong> {totalWeekTime === 0 ? '0 seconds' : secondsToHms(totalWeekTime)
						}</Typography>
					)
				})
				: chartData.map(activity => {
					let totalWeekTime = activity.data.reduce((total, time) => total + time, 0)
	
					return (
						<Typography variant='body1' key={activity.name} gutterBottom>
							<span className={style.circle} style={{ backgroundColor: activity.color }}></span>
							<strong>{activity.name}:</strong> {totalWeekTime === 0 ? '0 seconds' : secondsToHms(totalWeekTime)
						}</Typography>
					)
				})
			}
		</div>
	)
}

export default Data