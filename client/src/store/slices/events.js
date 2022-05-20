import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
	events: [],
	mergedEvents: [],
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