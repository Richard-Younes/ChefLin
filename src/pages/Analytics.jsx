/** @format */
import '../css/analytics.css';

import { usePosts } from '../contexts/PostProvider.jsx';

import NavBar from '../components/Navbar.jsx';
import Graph from '../components/Graph.jsx';
import Users from '../components/Users.jsx';

function Analytics() {
	return (
		<div className='location-container'>
			<NavBar />
			<div className='analytics-container'>
				<Users />
				<Graph />
			</div>
		</div>
	);
}

export default Analytics;
