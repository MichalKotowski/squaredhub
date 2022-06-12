import { Outlet, Navigate } from 'react-router-dom'
import { userSelector } from '../store/slices/user'
import { useSelector } from 'react-redux'

export const PrivateRoute = () => {
	const { isLoggedIn } = useSelector(userSelector)

	return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />
}