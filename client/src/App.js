import Stopwatch from './Stopwatch'
import Events from './Events'
import Activities from './Activities'

import Layout from './Layout'
import { Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index path='/' element={<><Events /><Stopwatch /></>} />
				<Route path='activities' element={<Activities />} />
				<Route path='*' element={<p>404</p>} />
			</Route>
		</Routes>
	)
}

export default App
