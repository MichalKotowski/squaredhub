import { useEffect } from 'react'
import Stopwatch from './components/Stopwatch'
import Events from './components/Events'
import Activities from './components/Activities'
import Squares from './components/Squares'
import ChartWrapper from './components/Chart'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchEvents } from './store/slices/events.js'
import { fetchActivities } from './store/slices/activities.js'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchEvents())
		dispatch(fetchActivities())
	}, [dispatch])

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index path='/' element={<><Squares /><Events /><Stopwatch /></>} />
				<Route path='activities' element={<Activities />} />
				<Route path='charts' element={<ChartWrapper />} />
				<Route path='*' element={<p>404</p>} />
			</Route>
		</Routes>
	)
}

export default App
