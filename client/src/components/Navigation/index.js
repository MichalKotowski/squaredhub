import { NavLink } from 'react-router-dom'
import style from './style.module.scss'

const Navigation = () => {
	return (
		<nav className={style.navigation}>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/activities'>Activities</NavLink>
		</nav>
	)
}

export default Navigation