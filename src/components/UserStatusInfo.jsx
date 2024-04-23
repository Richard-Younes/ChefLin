/** @format */

import { usePosts } from '../contexts/PostProvider';

function UserStatusInfo({ userName, vitalSigns, user }) {
	const { setUserId } = usePosts();
	const heartRate = vitalSigns.map(sign => Math.round(sign.heart_rate));
	const bloodOxygenLevel = vitalSigns.map(sign => Math.round(sign.spo2));

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
						src='../public/person-swimming-solid.svg'
						alt='person swimming'
						className='user__status--icon'
					/>
					<p className='monitoring__name'>{userName}</p>
				</div>
				<div className='user__status--data-container'>
					<div className='flex'>
						<img
							className='heartRate__icon'
							src='../public/heartbeat.svg'
							alt='heartBeat'
						/>
						<p className='monitoring__p'>
							{heartRate[heartRate.length - 1]} <span className=''>BPM</span>
						</p>
					</div>

					<div className='flex'>
						<img
							className='heartRate__icon'
							src='../public/oxygen.svg'
							alt='heartBeat'
						/>
						<p className='monitoring__p'>
							{bloodOxygenLevel[bloodOxygenLevel.length - 1]} <span>%</span>
						</p>
					</div>
					<div className='flex'>
						<img
							className='heartRate__icon'
							src='../public/timer-bold.svg'
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

export default UserStatusInfo;
