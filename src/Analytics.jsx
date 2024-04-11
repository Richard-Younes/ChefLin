/** @format */
import './css/analytics.css';
import NavBar from './navbar';
import { Chart } from 'react-google-charts';

function Analytics({ data, userId, setUserId }) {
	console.log(data);
	return (
		<div className='location-container'>
			<NavBar />
			<div className='analytics-container'>
				<Users data={data} userId={userId} setUserId={setUserId} />
				<Graph userId={userId} data={data} />
			</div>
		</div>
	);
}

function Users({ data, setUserId }) {
	return (
		<div className='users-container'>
			<h2>Users</h2>
			<div className='user-container'>
				{data?.map(user => (
					<User key={user.id} user={user} setUserId={setUserId} />
				))}
			</div>
		</div>
	);
}

function User({ user, setUserId }) {
	return (
		<div
			className='user__status-container user__status--analytics'
			onClick={() => {
				setUserId(() => user?.id);
			}}>
			<div className='user-status-left'></div>
			<div className='user-status-right '>
				<div className='user__status--name-container user-status-name--analytics'>
					<p className='monitoring__name monitoring__name--analytics username'>
						Name: &ensp;{user.name}
					</p>
					<p className='monitoring__name monitoring__name--analytics age'>
						Age: &ensp;{user.age}
					</p>
					<p className='monitoring__name monitoring__name--analytics gender'>
						Gender: &ensp;{user.gender}
					</p>
				</div>
			</div>
		</div>
	);
}

function Graph({ userId, data }) {
	const options1 = {
		title: 'Heart Rate vs Time',
		curveType: 'function',
		legend: { position: 'bottom' },
		backgroundColor: '#ccc',
		colors: ['#112c4d'],
	};
	const options2 = {
		title: 'Blood Oxygen Level vs Time',
		curveType: 'function',
		legend: { position: 'bottom' },
		backgroundColor: '#ccc',
		colors: ['#112c4d'],
	};

	const user = data?.find(user => user.id === userId);

	const heartRate = user?.heartRate.map((rate, index) => [index, rate]);
	const bloodOxygenLevel = user?.bloodOxygenLevel.map((rate, index) => [
		index,
		rate,
	]);

	let heartRateData = [];
	let bloodOxygenLevelData = [];
	if (heartRate) {
		heartRateData = [['time', 'heart rate'], ...heartRate];
	}
	if (bloodOxygenLevel) {
		bloodOxygenLevelData = [
			['time', 'Blood Oxygen Level'],
			...bloodOxygenLevel,
		];
	}

	return (
		<div className='graph-container'>
			<div className='chart-container'>
				<Chart
					chartType='LineChart'
					data={heartRateData}
					height='400px'
					width='100%'
					legendToggle
					options={options1}
				/>
				<Chart
					chartType='LineChart'
					data={bloodOxygenLevelData}
					height='400px'
					width='100%'
					options={options2}
					legendToggle
				/>
			</div>
		</div>
	);
}

export default Analytics;
