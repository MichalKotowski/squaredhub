import { Outlet } from 'react-router-dom'
import Navigation from '../Navigation'
import { Helmet } from 'react-helmet'
import Container from '@mui/material/Container'
import style from './style.module.scss'

const Layout = () => {
	return (
		<>
			<Helmet>
				<title>Squared Hub</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Helmet>
			<Navigation />
			<Container maxWidth='md' sx={{ margin: '4em auto' }}>
				<Outlet />
			</Container>
		</>
	)
}

export default Layout