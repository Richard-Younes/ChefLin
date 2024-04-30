/** @format */

import { createContext, useContext, useEffect, useState } from 'react';

// 1) CREATE A NEW CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
	const [data, setData] = useState([]);
	const [userId, setUserId] = useState('1');
	const [isLoading, setIsLoading] = useState(false);

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
		// 2) PROVIDE VALUE TO CHILD COMPONENTS

		<PostContext.Provider
			value={{
				data,
				setData,
				userId,
				setUserId,
				isLoading,
			}}>
			{children}
		</PostContext.Provider>
	);
}

function usePosts() {
	const context = useContext(PostContext);

	if (context === undefined) {
		throw new Error('PostContext was used outside of the PostProvider');
	}

	return context;
}

export { PostProvider, usePosts };
