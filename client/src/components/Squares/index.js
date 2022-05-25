import { useSelector } from 'react-redux'
import { eventsSelector } from '../../store/slices/events.js'
import style from './style.module.scss'

const Squares = () => {
	const { mergedEvents } = useSelector(eventsSelector)

	const renderSquares = () => {
		// 60 for a minute, 3600 for an hour
		const timePerBox = 60

		return mergedEvents.map(event => {
			let amountOfBoxes = Math.floor(event.time_spent / timePerBox)

			return [...Array(amountOfBoxes)].map((element, index) => <div key={`${event.activity_id}${index}`} style={{backgroundColor: event.color}} className={style.square}></div>)
		})
	}

	return (
		<div>
			{renderSquares()}
		</div>
	)
}

export default Squares