import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getDays, getOverall } from '../../utils'

export const initialState = {
	events: [],
	mergedEvents: [],
	chartData: [],
	overallChartData: [],
	loading: false,
	hasErrors: false,
}

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		getEvents: state => {
			state.loading = true
		},
		getEventsSuccess: (state, { payload }) => {
			state.events = payload.reverse()
			state.mergedEvents = mergeEvents(payload)
			state.chartData = mergeEventsByDate(payload)
			state.overallChartData = mergeEventsByDate(payload, true)
			state.loading = false
			state.hasErrors = false
		},
		getEventsFailure: state => {
			state.loading = false
			state.hasErrors = false
		},
	}
})

const mergeEvents = payload => {
	let mergedDurations = []
	const uniqueIds = [...new Set(payload.map(event => event.activity_id))]
	
	for (let id of uniqueIds) {
		let timeSpent = 0
		let color = ''
		for (let event of payload) {
			if (id === event.activity_id) {
				timeSpent += event.time_spent
				if (color === '') {
					color = event.color
				}
			}
		}

		mergedDurations.push({activity_id: id, time_spent: timeSpent, color: color})
	}

	return mergedDurations
}

const mergeEventsByDate = (payload, overall = false) => {
	let mergedDurations = []
	let days = overall ? getOverall(payload[payload.length - 1]) : getDays()
	const uniqueIds = new Set(payload.map(event => event.activity_id))

	for (let id of uniqueIds) {
		let eventsWithCurrentId = []

		for (let event of payload) {
			if (id === event.activity_id) {
				eventsWithCurrentId.push(event)
			}
		}
		
		const uniqueDates = [...new Set(eventsWithCurrentId.map(event => event.date_logged))]
		let durationsLogged = []

		for (let date of uniqueDates) {
			let timeSpent = eventsWithCurrentId.reduce((totalTime, event) => date === event.date_logged ? totalTime + event.time_spent : totalTime + 0, 0)
			durationsLogged.push({date: date.slice(0, 10), time: timeSpent})
		}

		let timeline = []

		if (days.length === 1) {
			const additionalPrecedingDay = new Date(new Date(uniqueDates[0]) - 86400000).toISOString().slice(0, 10)
			days.unshift(additionalPrecedingDay)
		}

		for (let day of days) {
			let appended = false

			for (let duration of durationsLogged) {
				if (day === duration.date) {
					timeline.push(duration.time)
					appended = true
				}
			}

			if (!appended) {
				timeline.push(0)
			}
		}

		mergedDurations.push({name: eventsWithCurrentId[0].name, color: eventsWithCurrentId[0].color, data: timeline})
	}

	return mergedDurations
}

export const { getEvents, getEventsSuccess, getEventsFailure } = eventsSlice.actions

export const eventsSelector = state => state.events

export default eventsSlice.reducer

export function fetchEvents(userId) {
	return async dispatch => {
		dispatch(getEvents())

		try {
			const response = await axios.get('/api/events', {
				params: {
					userId
				}
			})
			const data = response.data

			dispatch(getEventsSuccess(data))
		} catch (error) {
			dispatch(getEventsFailure())
		}
	}
}