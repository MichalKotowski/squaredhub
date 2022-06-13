import { Outlet, Navigate } from 'react-router-dom'
import { userSelector } from '../store/slices/user'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({ isLoading }) => {
	const { isLoggedIn } = useSelector(userSelector)

	if (isLoading) {
		return <p>Loading...</p>
	} else if (!isLoading && isLoggedIn) {
		return <Outlet />
	} else {
		return <Navigate to='/login' replace />
	}
}