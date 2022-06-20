import { useSelector } from 'react-redux'
import { eventsSelector } from '../../../store/slices/events.js'
import { Paper, Grid } from '@mui/material'
import style from './style.module.scss'

const Squares = () => {
	const { mergedEvents } = useSelector(eventsSelector)

	const renderSquares = () => {
		// 60 for a minute, 3600 for an hour
		const timePerBox = 3600

		return mergedEvents.map(event => {
			let amountOfBoxes = Math.floor(event.time_spent / timePerBox)

			return [...Array(amountOfBoxes)].map((element, index) => <Grid item xs='auto' key={`${event.activity_id}${index}`}><div style={{backgroundColor: event.color}} className={style.square}></div></Grid>)
		})
	}

	return (
		<Paper className={style.card}>
			<Grid container spacing={1.5} className={style.grid}>
				{renderSquares()}
			</Grid>
		</Paper>
	)
}

export default Squares