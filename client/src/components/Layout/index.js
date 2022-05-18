import { Outlet } from 'react-router-dom'
import Navigation from '../Navigation'
import style from './style.module.scss'

const Layout = () => {
	return (
		<>
			<Navigation />
			<main className={style.body}>
				<Outlet />
			</main>
		</>
	)
}

export default Layout