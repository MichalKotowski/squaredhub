import Stopwatch from './Stopwatch'
import Events from './Events'
import { useEffect, useState } from 'react'

function App() {
	const [greeting, setGreeting] = useState('')

	useEffect(() => {
		const getGreeting = async() => {
			const response = await fetch('http://localhost:4000')
			const data = await response.json()

			setGreeting(data[0].greeting)
		}

		getGreeting()
	}, [])

	return (
		<div>
			{greeting}
			<Events />
			<Stopwatch />
		</div>
	)
}

export default App
