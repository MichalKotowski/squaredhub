import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { eventsSelector } from '../../store/slices/events.js'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination } from '@mui/material'
import moment from 'moment'
import { secondsToHms } from '../../utils'
import style from './style.module.scss'

const Events = () => {
	const { events, loading, hasErrors } = useSelector(eventsSelector)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const renderTable = () => (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 600 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Activity</TableCell>
						<TableCell align='right'>Date</TableCell>
						<TableCell align='right'>Time spent</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{events
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map(event => (
							<TableRow
								key={event.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									<span className={style.circle} style={{ backgroundColor: event.color }}></span>{event.name}
								</TableCell>
								<TableCell align='right' width='30%'>{moment(event.date).format('Do of MMMM, YYYY')}</TableCell>
								<TableCell align='right' width='40%'>{secondsToHms(event.time_spent)}</TableCell>
							</TableRow>
						))
					}
					{emptyRows > 0 && (
						<TableRow
							style={{
								height: (53 * emptyRows) - 1
							}}
						>
							<TableCell colSpan={12} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[10, 25, 50]}
							count={events.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)

	const renderEvents = () => {
		if (loading) return <Typography variant='body1' gutterBottom>Loading events...</Typography>
		if (hasErrors) return <Typography variant='body1' gutterBottom>Unable to display events.</Typography>
		if (!events.length) return <Typography variant='body1' gutterBottom>There's no data to display yet</Typography>
		return renderTable()
	}

	return (
		<>
			{renderEvents()}
		</>
	)
}

export default Events