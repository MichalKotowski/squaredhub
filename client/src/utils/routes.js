import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoute = children => {
	const { user } = useContext(UserContext)

	return user ? <Outlet /> : <Navigate to='/login' replace />
}