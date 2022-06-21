import React, { useState } from 'react'
import ChartWrapper from './Chart'
import Data from './Data'
import { Typography, Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const Statistics = () => {
	const [value, setValue] = useState('1')

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<>
			<Box>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label='Statistics tabs'>
							<Tab label='Weekly' value='1' />
							<Tab label='Overall' value='2' />
						</TabList>
					</Box>
					<TabPanel value='1'>
						<Data />
						<ChartWrapper />
					</TabPanel>
					<TabPanel value='2'>
						<Data overall={true} />
						<ChartWrapper overall={true} />
					</TabPanel>
				</TabContext>
			</Box>
		</>
	)
}

export default Statistics