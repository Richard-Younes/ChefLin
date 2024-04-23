/** @format */
import '../css/monitoring.css';

import { useEffect, useState } from 'react';
import { usePosts } from '../contexts/PostProvider.jsx';

import NavBar from '../components/Navbar.jsx';
import Map from '../components/Map.jsx';
import UserInfo from '../components/UserInfo.jsx';
import UserStatus from '../components/UserStatus.jsx';

export default function Monitoring() {
	const { data, setData, userId } = usePosts();
	const [isLoading, setIsLoading] = useState(false);

	const userSelected = data ? data.find(user => user.id === userId) : null;

	useEffect(
		function () {
			async function fetchData() {
				try {
					setIsLoading(true);
					const response = await fetch(
						'https://fyp-aquaguard-django.onrender.com/aquaguard/api/fetch-all-visitors-detailed'
					);
					const jsonData = await response.json();
					setData(jsonData);
				} catch (error) {
					console.error('Error fetching data:', error);
				} finally {
					setIsLoading(false);
				}
			}

			fetchData();
		},
		[setData]
	);

	return (
		<div className='location-container'>
			<NavBar />
			{/* <img src={logo} alt='logo image' className='location__logo' /> */}

			<div className='location__body-container'>
				<Map />
				<UserStatus isLoading={isLoading} />
				<UserInfo userSelected={userSelected} />
			</div>
		</div>
	);
}
