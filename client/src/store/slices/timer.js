import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	activity: '',
	timer: 0,
	isActive: false
}

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setActivity: (state, { payload }) => {
			state.activity = payload
		},
		tick: state => {
			state.timer = state.timer + 1
		},
		setActive: (state, { payload }) => {
			state.isActive = payload
		},
		resetTimer: state => {
			state.timer = 0
		}
	}
})

export const { setActivity, tick, setActive, resetTimer } = timerSlice.actions

export const timerSelector = state => state.timer

export default timerSlice.reducer