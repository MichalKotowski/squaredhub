import { useEffect, useState } from 'react'
import Stopwatch from './components/Stopwatch'
import Events from './components/Events'
import Activities from './components/Activities'
import Squares from './components/Squares'
import ChartWrapper from './components/Chart'
import Layout from './components/Layout'
import Register from './components/Register'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchEvents } from './store/slices/events.js'
import { fetchActivities } from './store/slices/activities.js'
import { UserContext } from './UserContext'
import { PrivateRoute } from './utils'

const App = () => {
	const dispatch = useDispatch()
	const [user, setUser] = useState(null)

	useEffect(() => {
		dispatch(fetchEvents())
		dispatch(fetchActivities())
	}, [dispatch])

	useEffect(() => {
		const existingUser = localStorage.getItem('user')
		if (existingUser) {
			setUser(existingUser)
		}
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Routes>
				<Route element={<Layout />}>
					<Route index path='/' element={<><p>Homepage</p></>} />
					<Route element={<PrivateRoute />}>
						<Route path='hub' element={<><Squares /><Events /><Stopwatch /></>} />
						<Route path='activities' element={<Activities />} />
						<Route path='charts' element={<ChartWrapper />} />
					</Route>
					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
					<Route path='*' element={<p>404</p>} />
				</Route>
			</Routes>
		</UserContext.Provider>
	)
}

export default App
