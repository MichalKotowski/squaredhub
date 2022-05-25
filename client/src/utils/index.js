export const formatTime = time => {
	const getSeconds = `0${(time % 60)}`.slice(-2)
	const minutes = `${Math.floor(time / 60)}`
	const getMinutes = `0${minutes % 60}`.slice(-2)
	const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

	return `${getHours} : ${getMinutes} : ${getSeconds}`
}

export const prettifyTime = duration => {   
    let hours = ~~(duration / 3600)
    let minutes = ~~((duration % 3600) / 60)
    let seconds = ~~duration % 60
	let time = ""

    if (hours > 0) {
        time += `${hours}h `
    }

    time += `${minutes}m `
    time += `${seconds}s`

    return time
}

export const getDays = periodInDays => {
	let weekDays = []
	let days = periodInDays ?? 6

	while (days) {
		let day = new Date()

		day.setDate(day.getDate() - days)
		day = day.toISOString().slice(0, 10)

		weekDays.push(day)

		days--
	}

	weekDays.push(new Date().toISOString().slice(0, 10))

	return weekDays
}