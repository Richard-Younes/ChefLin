/** @format */

import Chart from 'react-google-charts';
import { usePosts } from '../contexts/PostProvider';

function Graph() {
	const { data, userId } = usePosts();

	const options1 = {
		title: 'Heart Rate vs Time',
		curveType: 'function',
		legend: { position: 'bottom' },
		colors: ['#112c4d'],
		hAxis: { title: 'Time' },
		vAxis: { title: 'Heart Rate' },
	};
	const options2 = {
		title: 'Blood Oxygen Level vs Time',
		curveType: 'function',
		legend: { position: 'bottom' },
		colors: ['#112c4d'],
		hAxis: { title: 'Time' },
		vAxis: { title: 'Blood Oxygen Level' },
	};

	function getHours(params) {
		const parsedDate = new Date(params);
		const hours = parsedDate.getHours();
		return hours;
	}

	const user = data?.find(user => user.id === userId);
	const vitalSigns = user?.vital_signs;
	const heartRate = vitalSigns?.map(sign => [
		getHours(sign.datetime_sampled),
		Math.round(sign.heart_rate),
	]);
	const bloodOxygenLevel = vitalSigns?.map(sign => [
		getHours(sign.datetime_sampled),
		Math.round(sign.spo2),
	]);
	console.log(heartRate);

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
					width='98%'
					legendToggle
					options={options1}
				/>
				<Chart
					chartType='LineChart'
					data={bloodOxygenLevelData}
					height='400px'
					width='98%'
					options={options2}
					legendToggle
				/>
			</div>
		</div>
	);
}

export default Graph;
