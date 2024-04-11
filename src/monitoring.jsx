/** @format */
import './css/monitoring.css';

import NavBar from './navbar.jsx';
import logo from './assets/Logo.png';

import 'leaflet/dist/leaflet.css';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ImageOverlay,
} from 'react-leaflet';
import { useEffect, useState } from 'react';

export default function Monitoring({ data, setData, userId, setUserId }) {
	const userSelected = data ? data.find(user => user.id === userId) : null;

	useEffect(
		function () {
			async function fetchData() {
				try {
					const response = await fetch('http://localhost:8000/users');
					const jsonData = await response.json();
					setData(jsonData);
				} catch (error) {
					console.error('Error fetching data:', error);
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
				<MapView />
				<UserStatus data={data} setUserId={setUserId} />
				<UserInfo userSelected={userSelected} />
			</div>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function UserStatus({ data, setUserId }) {
	return (
		<div className='user__status'>
			<h2 className='user__header'>User status</h2>
			{data ? (
				data.map(function (user) {
					return (
						<UserStatusInfo
							key={user.id}
							userName={user.name}
							bloodOxygenLevel={Math.round(user.bloodOxygenLevel[0])}
							heartRate={user.heartRate[0]}
							setUserId={setUserId}
							user={user}
						/>
					);
				})
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function UserStatusInfo({
	userName,
	bloodOxygenLevel,
	heartRate,
	setUserId,
	user,
}) {
	return (
		<div
			className='user__status-container'
			onClick={() => {
				setUserId(() => user?.id);
			}}>
			<div className='user-status-left'></div>
			<div className='user-status-right'>
				<div className='user__status--name-container'>
					<img
						src='../public/images/person-swimming-solid.svg'
						alt='person swimming'
						className='user__status--icon'
					/>
					<p className='monitoring__name'>{userName}</p>
				</div>
				<div className='user__status--data-container'>
					<div className='flex'>
						<img
							className='heartRate__icon'
							src='../public/images/heartbeat.svg'
							alt='heartBeat'
						/>
						<p className='monitoring__p'>
							{heartRate} <span className=''>BPM</span>
						</p>
					</div>

					<div className='flex'>
						<img
							className='heartRate__icon'
							src='../public/images/oxygen.svg'
							alt='heartBeat'
						/>
						<p className='monitoring__p'>
							{bloodOxygenLevel} <span>%</span>
						</p>
					</div>
					<div className='flex'>
						<img
							className='heartRate__icon'
							src='../public/images/timer-bold.svg'
							alt='heartBeat'
						/>
						<p className='monitoring__p'>
							30 <span>min</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function UserInfo({ userSelected }) {
	if (userSelected === null) return null;

	const userInfo = {
		firstName: userSelected?.name.split(' ')[0],
		lastName: userSelected?.name.split(' ')[1],
		medicalConditions: userSelected?.medicalConditions,
		age: userSelected?.age,
		heartRate: userSelected?.heartRate[0],
		bloodOxygenLevel: userSelected?.bloodOxygenLevel[0],
	};

	return (
		<div className='user__info'>
			<div className='vital__signs'>
				<h2 className='user__header'>Vital signs</h2>
				<div className='flex'>
					<p className='monitoring__p'>Heart rate</p>
					<img
						className='heartRate__icon'
						src='../public/images/heartbeat.svg'
						alt='heartBeat'
					/>
				</div>
				<p className='monitoring__value'>
					{userInfo.heartRate} <span className='monitoring__unit'>BPM</span>
				</p>
				<div className='progress-bar'>
					<div
						className='progress-bar__fill'
						style={{ width: `${userInfo.heartRate / 2}%` }}
					/>
				</div>
				<div className='flex'>
					<p className='monitoring__p'>Blood oxygen level</p>
					<img
						className='heartRate__icon'
						src='../public/images/oxygen.svg'
						alt='heartBeat'
					/>
				</div>{' '}
				<p className='monitoring__value'>
					{userInfo.bloodOxygenLevel}{' '}
					<span className='monitoring__unit'>%</span>
				</p>
				<div className='progress-bar'>
					<div
						className='progress-bar__fill'
						style={{
							width: `${userInfo.bloodOxygenLevel}%`,
							backgroundColor:
								userInfo.bloodOxygenLevel < 92
									? userInfo.bloodOxygenLevel <= 88
										? '#EB442C'
										: '#F2E318'
									: '#32CD32',
						}}
					/>
				</div>
			</div>
			<div className='more__info'>
				<h2 className='user__header'>User Info</h2>
				<div className='user__indo-container'>
					<div className='monitoring__data-container'>
						<p className='monitoring__p'>First Name : </p>
						<p className='monitoring__data'>{userInfo.firstName}</p>
					</div>
					<div className='monitoring__data-container'>
						<p className='monitoring__p'>Last Name :</p>
						<p className='monitoring__data'>{userInfo.lastName}</p>
					</div>
					<div className='monitoring__data-container'>
						<p className='monitoring__p'>Medical Conditions :</p>
						<p className='monitoring__data'>{userInfo.medicalConditions}</p>
					</div>
					<div className='monitoring__data-container'>
						<p className='monitoring__p'>Age :</p>
						<p className='monitoring__data'>{userInfo.age}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function MapView() {
	const mapOptions = {
		zoomControl: false, // Disable zoom control
		dragging: false, // Disable dragging/panning
		touchZoom: false, // Disable touch zoom
		doubleClickZoom: false, // Disable double click zoom
		scrollWheelZoom: false, // Disable scroll wheel zoom
		boxZoom: false, // Disable box zoom
	};

	return (
		<MapContainer
			center={[0, 0]}
			zoom={13}
			scrollWheelZoom={false}
			{...mapOptions}>
			<ImageOverlay
				bounds={[
					[-0.035, 0.09],
					[0.035, -0.09],
				]}
				url='../public/pool.jpg'
			/>
			<Marker position={[0, 0]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}
