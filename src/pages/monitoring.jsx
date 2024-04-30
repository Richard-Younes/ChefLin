/** @format */
import '../css/monitoring.css';

import { useEffect, useState } from 'react';
import { usePosts } from '../contexts/PostProvider.jsx';

import NavBar from '../components/Navbar.jsx';
import Map from '../components/Map.jsx';
import UserInfo from '../components/UserInfo.jsx';
import UserStatus from '../components/UserStatus.jsx';

export default function Monitoring() {
	const { data, userId } = usePosts();

	const userSelected = data ? data.find(user => user.id === userId) : null;

	return (
		<div className='location-container'>
			<NavBar />
			{/* <img src={logo} alt='logo image' className='location__logo' /> */}

			<div className='location__body-container'>
				<Map />
				<UserStatus />
				<UserInfo userSelected={userSelected} />
			</div>
		</div>
	);
}
