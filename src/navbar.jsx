/** @format */
import './css/navbar.css';
import profileIcon from './assets/person-circle-icon.svg';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function NavBar() {
	return (
		<nav className='navbar'>
			<Links />
			<Profile />
		</nav>
	);
}

function Links() {
	const currentPath = window.location.pathname;

	return (
		<div className='navbar__links'>
			<p to='#' className='navbar__link navbar__logo'>
				AquaGuard
			</p>
			<Link
				to='/monitoring'
				className={`link navbar__link ${
					currentPath === '/monitoring' ? 'navbar__link--active' : ''
				}`}>
				Monitoring
			</Link>
			<Link
				to='/analytics'
				className={`link navbar__link ${
					currentPath === '/analytics' ? 'navbar__link--active' : ''
				}`}>
				Analytics
			</Link>
			<Link
				to='/camera-feed'
				className={`link navbar__link ${
					currentPath === '/camera-feed' ? 'navbar__link--active' : ''
				}`}>
				Camera Feed
			</Link>
			<Link
				to='/help'
				className={`link navbar__link ${
					currentPath === '/help' ? 'navbar__link--active' : ''
				}`}>
				Help
			</Link>
		</div>
	);
}

function Profile() {
	function handleLogOut() {
		async function logOut() {
			try {
				const response = await fetch(
					'https://fyp-aquaguard-django.onrender.com/aquaguard/api/logout/',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({}),
					}
				);
				if (response.status === 200) {
					localStorage.removeItem('credentials');
					window.location.replace('/');
				}
			} catch (error) {
				console.error(error);
			}
		}

		logOut();
	}

	return (
		<div className='navbar__profile'>
			<p>Baywatch</p>
			<Popup
				trigger={
					<img src={profileIcon} alt='profile icon' className='profile-icon' />
				}
				position={['top center', 'bottom right', 'bottom left']}
				closeOnDocumentClick>
				<div className='profile-popup'>
					<p className='log-out-text' onClick={handleLogOut}>
						Logout
					</p>
				</div>
			</Popup>
		</div>
	);
}
