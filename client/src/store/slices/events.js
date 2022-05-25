import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getDays } from '../../utils'

export const initialState = {
	events: [],
	mergedEvents: [],
	chartData: [],
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
			state.events = payload
			state.mergedEvents = mergeEvents(payload)
			state.chartData = mergeEventsByDate(payload)
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
	
	uniqueIds.forEach(id => {
		let timeSpent = 0
		let color = ''
		payload.forEach(event => {
			if (id === event.activity_id) {
				timeSpent += event.time_spent
				if (color === '') {
					color = event.color
				}
			}
		})
		mergedDurations.push({activity_id: id, time_spent: timeSpent, color: color})
	})

	return mergedDurations
}

const mergeEventsByDate = payload => {
	let mergedDurations = []
	let days = getDays()
	const uniqueIds = [...new Set(payload.map(event => event.activity_id))]

	uniqueIds.forEach(id => {
		let eventsWithCurrentId = []
		payload.forEach(event => {
			if (id === event.activity_id) {
				eventsWithCurrentId.push(event)
			}
		})
		
		const uniqueDates = [...new Set(eventsWithCurrentId.map(event => event.date_logged))]
		let durationsLogged = []
		uniqueDates.forEach(date => {
			let timeSpent = 0

			eventsWithCurrentId.forEach(event => {
				if (date === event.date_logged) {
					timeSpent += event.time_spent
				}
			})

			durationsLogged.push({date: date.slice(0, 10), time: timeSpent})
		})

		let timeline = []
		days.forEach(day => {
			let appended = false

			durationsLogged.forEach(duration => {
				if (day === duration.date) {
					timeline.push(duration.time)
					appended = true
				}
			})

			if (appended === false) {
				timeline.push(0)
			}
		})

		mergedDurations.push({name: eventsWithCurrentId[0].name, color: eventsWithCurrentId[0].color, data: timeline})
	})

	return mergedDurations
}

export const { getEvents, getEventsSuccess, getEventsFailure } = eventsSlice.actions

export const eventsSelector = state => state.events

export default eventsSlice.reducer

export function fetchEvents() {
	return async dispatch => {
		dispatch(getEvents())

		try {
			const response = await axios.get('events')
			const data = response.data

			dispatch(getEventsSuccess(data))
		} catch (error) {
			dispatch(getEventsFailure())
		}
	}
}