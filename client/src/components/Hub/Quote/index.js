import React, { useState, useEffect } from 'react'
import quotes from './quotes.js'
import { Typography } from '@mui/material'
import style from './style.module.scss'

const Quote = () => {
	const [quoteNumber, setQuoteNumber] = useState(null)

	const renderQuotes = () => {
		if (quoteNumber === null) {
			return (
				<Typography variant="body1" gutterBottom>Loading...</Typography>
			)
		}

		return (
			<Typography variant="body1" gutterBottom>
				{quotes[quoteNumber].quote}<br />
				<cite>— {quotes[quoteNumber].author}</cite>
			</Typography>
		)
	}

	useEffect(() => {
		setQuoteNumber(Math.floor((Math.random() * quotes.length)))
	}, [])

	return (
		<div className={style.quotes}>
			{renderQuotes()}
		</div>
	)
}

export default Quote