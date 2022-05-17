import React from 'react'
import * as style from './style.module.scss'
import axios from 'axios'

class Stopwatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activity: '',
			isActive: false,
			timer: 0,
			activities: []
		}

		this.countRef = React.createRef()
	}

	handleStart = () => {
		this.countRef.current = setInterval(() => {
			this.setState({
				timer: this.state.timer + 1
			})
		}, 1000)
		this.setState({
			isActive: true
		})
	}

	handlePause = () => {
		clearInterval(this.countRef.current)
		this.setState({
			isActive: false
		})
	}

	handleSubmit = async () => {
		clearInterval(this.countRef.current)

		await axios.post('/events', {
			id: this.state.activity,
			date: new Date().toISOString().slice(0, 10),
			time: this.state.timer
		}).then(response => {
			this.setState({
				activity: '',
				isActive: false,
				timer: 0
			})
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	handleCurrentActivity = event => {
		this.setState({
			activity: event.target.value
		})
	}

	formatTime = () => {
		let currentTime = this.state.timer

		const getSeconds = `0${(currentTime % 60)}`.slice(-2)
		const minutes = `${Math.floor(currentTime / 60)}`
		const getMinutes = `0${minutes % 60}`.slice(-2)
		const getHours = `0${Math.floor(currentTime / 3600)}`.slice(-2)
	
		return `${getHours} : ${getMinutes} : ${getSeconds}`
	}

	getActivities = async () => {
		const response = await axios.get('activities')
		this.setState({
			activities: response.data
		})
	}

	componentDidMount() {
		this.getActivities()
	}

	render() {
		const { activity, isActive, timer, activities } = this.state

		return (
			<>

				<div>
					<div>{this.formatTime()}</div>
					<div>
						<select value={activity} onChange={this.handleCurrentActivity}>
							<option value='' default></option>
							{activities.map(singleActivity => (
								<option key={singleActivity.id} value={singleActivity.id}>{singleActivity.name}</option>
							))}
						</select>
						<button onClick={this.handleStart} disabled={isActive}>Start</button>
						<button onClick={this.handlePause} disabled={!isActive}>Pause</button>
						<button onClick={this.handleSubmit} disabled={timer === 0}>Submit</button>
					</div>
				</div>
			</>
		)
	}
}

export default Stopwatch