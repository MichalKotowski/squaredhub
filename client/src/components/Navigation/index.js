import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { UserContext } from '../../UserContext'
import style from './style.module.scss'

const Navigation = () => {
	const [anchorElNav, setAnchorElNav] = useState(null)
	const { user, setUser } = useContext(UserContext)

	const pages = [
		'Home', 'Activities', 'Charts', 'Register', 'Login'
	]
  
	const handleOpenNavMenu = event => {
	  setAnchorElNav(event.currentTarget)
	}
  
	const handleCloseNavMenu = () => {
	  setAnchorElNav(null)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{user && (
						<p>Hello, User</p>
					)}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="Navigation"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page} component={NavLink} onClick={handleCloseNavMenu} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
							<MenuItem key='logout' component={NavLink} onClick={() => {handleCloseNavMenu(); handleLogout()}} to=''>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button
								href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
						<Button
							key='logout'
							onClick={handleLogout}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Navigation