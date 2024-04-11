/** @format */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Monitoring from './monitoring.jsx';
import { useState } from 'react';
import Analytics from './Analytics.jsx';
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [data, setData] = useState([]);
	const [userId, setUserId] = useState('1');

	function handleLogin() {
		setIsLoggedIn(true);
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login onLogIn={handleLogin} />} />
				<Route
					path='/monitoring'
					element={
						isLoggedIn ? (
							<Monitoring
								data={data}
								setData={setData}
								userId={userId}
								setUserId={setUserId}
							/>
						) : (
							<Navigate to='/' />
						)
					}
				/>
				<Route
					path='/analytics'
					element={
						isLoggedIn ? (
							<Analytics data={data} userId={userId} setUserId={setUserId} />
						) : (
							<Navigate to='/' />
						)
					}
				/>
				<Route path='*' element={<p> Page not found</p>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
