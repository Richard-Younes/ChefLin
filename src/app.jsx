/** @format */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Monitoring from './pages/monitoring.jsx';
import { useEffect, useState } from 'react';
import Analytics from './pages/Analytics.jsx';
import { PostProvider } from './contexts/PostProvider.jsx';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<PostProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
					<Route
						path='/monitoring'
						element={isLoggedIn ? <Monitoring /> : <Navigate to='/' />}
					/>
					<Route
						path='/analytics'
						element={isLoggedIn ? <Analytics /> : <Navigate to='/' />}
					/>
					<Route path='*' element={<p> Page not found</p>} />
				</Routes>
			</BrowserRouter>{' '}
		</PostProvider>
	);
}

export default App;
