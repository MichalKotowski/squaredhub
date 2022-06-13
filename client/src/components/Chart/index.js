import { useSelector } from 'react-redux'
import { eventsSelector } from '../../store/slices/events.js'
import Chart from 'react-apexcharts'
import { prettifyTime, getDays } from '../../utils'
import { Typography } from '@mui/material'

const ChartWrapper = () => {
	const { chartData } = useSelector(eventsSelector)

	const renderChart = () => (
		<Chart 
			options={{
				chart: {
					height: 500,
					type: 'area',
				},
				dataLabels: {
					enabled: true,
					formatter: time => {
						return prettifyTime(time)
					}
				},
				stroke: {
					curve: 'smooth'
				},
				xaxis: {
					type: 'date',
					categories: getDays()
				},
				yaxis: {
					labels: {
						formatter: time => {
							return `${time / 60} mins`
						}
					}
				},
				tooltip: {
					enabled: false,
					x: {
						format: 'dd-MM-yy'
					}
				},
				colors: []
			}}
			series={chartData}
			type='area'
			height={500}
		/>
	)

	return (
		<div>
			{chartData.length
				? renderChart()
				: <Typography variant="body1" gutterBottom>There's no data to display yet</Typography>
			}
		</div>
	)
}

export default ChartWrapper