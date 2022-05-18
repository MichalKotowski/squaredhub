import { configureStore } from '@reduxjs/toolkit'
import eventsSlice from './slices/events.js'
import activitiesSlice from './slices/activities.js'
 
export default configureStore({
	reducer: {
		events: eventsSlice,
		activities: activitiesSlice
	}
})