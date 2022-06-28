import { useSelector } from 'react-redux'
import { eventsSelector } from '../../../store/slices/events.js'
import Chart from 'react-apexcharts'
import { prettifyTime, getDays } from '../../../utils'
import { Typography, Paper, Grid } from '@mui/material'
import moment from 'moment'
import { getOverall, secondsToHms } from '../../../utils'
import style from './style.module.scss'

const ChartWrapper = ({overall = false}) => {
	const { events, chartData, overallChartData } = useSelector(eventsSelector)

	const xAxisPeriod = () => {
		if (events.length === 1 && overall === true) return getDays(1, true).map(date => moment(date).format('Do of MMMM, YYYY'))

		return overall 
			? getOverall(events[events.length - 1], true).map(date => moment(date).format('Do of MMMM, YYYY')) 
			: getDays(6, true).map(date => moment(date).format('Do of MMMM, YYYY'))
	}

	const renderChart = () => (
		<Paper className={style.card}>
			<Grid container className={style.grid}>
				<Chart 
					options={{
						chart: {
							height: 500,
							type: 'area',
							background: '#1e1e1e'
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							curve: 'smooth'
						},
						xaxis: {
							type: 'date',
							categories: xAxisPeriod(),
							labels: {
								show: false,
								style: {
									fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
									fontWeight: '400'
								},
								offsetY: 2
							}
						},
						yaxis: {
							show: false
						},
						tooltip: {
							enabled: true,
							y: {
								formatter: time => {
									return time > 0 ? secondsToHms(time) : '0 seconds'
								}
							}
						},
						theme: {
							mode: 'dark'
						},
						grid: {
							padding: {
								bottom: 20
							}
						},
						legend: {

							fontSize: '16px',
							fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
							fontWeight: '400',
							markers: {
								width: 10,
								height: 10,
								offsetX: -7
							},
							itemMargin: {
								horizontal: 20,
								vertical: 5
							},
						}
					}}
					series={overall ? overallChartData : chartData}
					type='area'
					height={500}
				/>
			</Grid>
		</Paper>
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