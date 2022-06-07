import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
	const { user } = useContext(UserContext)

	return user != null ? <Outlet /> : <Navigate to='login' />
}