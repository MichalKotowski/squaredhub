import { configureStore } from '@reduxjs/toolkit'
import eventsSlice from './slices/events.js'
import activitiesSlice from './slices/activities.js'
import timerSlice from './slices/timer.js'
import userSlice from './slices/user.js'
 
export default configureStore({
	reducer: {
		events: eventsSlice,
		activities: activitiesSlice,
		timer: timerSlice,
		user: userSlice,
	}
})