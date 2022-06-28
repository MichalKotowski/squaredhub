import { PrivateRoute } from './routes'
export { PrivateRoute }

export const formatTime = time => {
	const getSeconds = `0${(time % 60)}`.slice(-2)
	const minutes = `${Math.floor(time / 60)}`
	const getMinutes = `0${minutes % 60}`.slice(-2)
	const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

	return `${getHours}:${getMinutes}:${getSeconds}`
}

export const prettifyTime = duration => {
	let hours = ~~(duration / 3600)
	let minutes = ~~((duration % 3600) / 60)
	let seconds = ~~duration % 60
	let time = ''

	if (hours > 0) {
		time += `${hours}h `
	}

	time += `${minutes}m `
	time += `${seconds}s`

	return time
}

export const getDays = (periodInDays, entireDate = false) => {
	let period = []
	let days = periodInDays ?? 6

	while (days) {
		let day = new Date()

		day.setDate(day.getDate() - days)
		day = day.toISOString().slice(0, 10)

		period.push(day)

		days--
	}

	entireDate === false ? period.push(new Date().toISOString().slice(0, 10)) : period.push(new Date())

	return period
}

export const secondsToHms = time => {
	const hours = Math.floor(+time / 3600)
	const minutes = Math.floor(+time % 3600 / 60)
	const seconds = Math.floor(+time % 3600 % 60)

	const secondsDisplay = makeHumanReadable(seconds, 'second');
	const minutesDisplay = makeHumanReadable(minutes, 'minute');
	const hoursDisplay = makeHumanReadable(hours, 'hour');

	function makeHumanReadable(num, singular) {
		return num > 0
			? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
			: ''
	}

	return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`.replace(/,\s*$/, '')
}

export const getOverall = (firstLoggedEvent, entireDate = false) => {
	const oneDay = 24 * 60 * 60 * 1000
	let firstDate = new Date(firstLoggedEvent.date_logged)
	const secondDate = Date.now()
	const differenceInDays = Math.round(Math.abs((firstDate.valueOf() - secondDate.valueOf()) / oneDay))

	return getDays(differenceInDays, entireDate)
}