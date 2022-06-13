import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	activity: '',
	isActive: false,
}

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setActivity: (state, { payload }) => {
			state.activity = payload
		},
		setActive: (state, { payload }) => {
			state.isActive = payload
		},
		resetTimer: state => {
			state.timer = 0
			state.activity = ''
			state.timestamp = 0
			state.savedDuration = 0
		}
	}
})

export const { setActivity, setActive, resetTimer } = timerSlice.actions

export const timerSelector = state => state.timer

export default timerSlice.reducer