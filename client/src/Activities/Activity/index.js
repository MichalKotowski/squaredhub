import axios from 'axios'
import style from './style.module.scss'

const Activity = ({ data: data }, getActivities) => {
	const handleRemoval = async (event, id) => {
		event.preventDefault()

		await axios.delete(`activities/${id}`).then(response => {
			getActivities()
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	const handleEdit = async (event, singleActivity) => {
		console.log(event.target.value, singleActivity)
	}

	return (
		<div key={data.id} className={style.activity}>
		<div className={style.activityColor}>
			
		</div>
		<div className={style.activityInput}>
			<input type='text' value={data.name} onBlur={event => handleEdit(event, data)}/>
		</div>
		<div className={style.activityRemove} onClick={event => handleRemoval(event, data.id)}>
			<span></span>
		</div>
	</div>
	)
}

export default Activity