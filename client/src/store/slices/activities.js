import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
	activities: [],
	loading: false,
	hasErrors: false,
}

const activitiesSlice = createSlice({
	name: 'activities',
	initialState,
	reducers: {
		getActivities: state => {
			state.loading = true
		},
		getActivitiesSuccess: (state, { payload }) => {
			state.activities = payload
			state.loading = false
			state.hasErrors = false
		},
		getActivitiesFailure: state => {
			state.loading = false
			state.hasErrors = false
		}
	}
})

export const { getActivities, getActivitiesSuccess, getActivitiesFailure } = activitiesSlice.actions

export const activitiesSelector = state => state.activities

export default activitiesSlice.reducer

export function fetchActivities() {
	return async dispatch => {
		dispatch(getActivities())

		try {
			const response = await axios.get('activities', {
				params: {
					userId: 1
				}
			})
			const data = response.data

			dispatch(getActivitiesSuccess(data))
		} catch (error) {
			dispatch(getActivitiesFailure())
		}
	}
}