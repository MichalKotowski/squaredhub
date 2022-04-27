import React from 'react'
import * as style from './style.module.scss'

class Stopwatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			task: '',
			isActive: false,
			timer: 0
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

	handleSubmit = () => {
		clearInterval(this.countRef.current)

		let finishedTask = {
			'name': this.state.task,
			'time': this.state.timer
		}

		localStorage.setItem(Date.now(), JSON.stringify(finishedTask))
		window.dispatchEvent(new Event('storage'))

		this.setState({
			task: '',
			isActive: false,
			timer: 0
		})
	}

	updateTaskName = event => {
		this.setState({
			task: event.target.value
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

	render() {
		const { task, isActive, timer } = this.state

		return (
			<>

				<div>
					<div>{this.formatTime()}</div>
					<div>
						<input type='text' placeholder='Task' value={task} onChange={event => this.updateTaskName(event)} />
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