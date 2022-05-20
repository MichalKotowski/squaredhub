import Stopwatch from './components/Stopwatch'
import Events from './components/Events'
import Activities from './components/Activities'
import Squares from './components/Squares'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index path='/' element={<><Squares /><Events /><Stopwatch /></>} />
				<Route path='activities' element={<Activities />} />
				<Route path='*' element={<p>404</p>} />
			</Route>
		</Routes>
	)
}

export default App
