/** @format */

function UserInfo({ userSelected }) {
	if (!userSelected) {
		return (
			<div
				className='user__info'
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<h2 className='user__header' style={{ marginTop: '4rem' }}>
					Select a user to see the vital signs
				</h2>
			</div>
		);
	}

	const userInfo = {
		firstName: userSelected?.full_name.split(' ')[0],
		lastName: userSelected?.full_name.split(' ')[1],
		medicalConditions: userSelected?.medicalConditions
			? userSelected.medicalConditions
			: 'None',
		age: userSelected?.age,
		heartRate: Math.round(
			userSelected?.vital_signs[userSelected?.vital_signs.length - 1].heart_rate
		),
		bloodOxygenLevel: Math.round(
			userSelected?.vital_signs[userSelected?.vital_signs.length - 1].spo2
		),
	};

	return (
		<div className='user__info'>
			<div className='vital__signs'>
				<h2 className='user__header'>Vital signs</h2>
				<div className='flex'>
					<p className='monitoring__p'>Heart rate</p>
					<img
						className='heartRate__icon'
						src='../public/heartbeat.svg'
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
						src='../public/oxygen.svg'
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

export default UserInfo;
