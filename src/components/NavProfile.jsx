/** @format */
import Popup from 'reactjs-popup';
import styles from './NavProfile.module.css';

function NavProfile() {
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
		<div className={styles.navbar__profile}>
			<p>Baywatch</p>
			<Popup
				trigger={
					<img
						src='./public/person-circle-icon.svg'
						alt='profile icon'
						className={styles['profile-icon']}
					/>
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

export default NavProfile;
