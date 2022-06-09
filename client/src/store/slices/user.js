import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	user: {},
	isLoggedIn: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.user = payload
			state.isLoggedIn = true
		},
		logout: state => {
			state.user = {}
			state.isLoggedIn = false
		},
	}
})

export const { login, logout } = userSlice.actions

export const userSelector = state => state.user

export default userSlice.reducer