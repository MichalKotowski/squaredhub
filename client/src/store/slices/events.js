import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
	events: [],
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
			state.loading = false
			state.hasErrors = false
		},
		getEventsFailure: state => {
			state.loading = false
			state.hasErrors = false
		}
	}
})

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