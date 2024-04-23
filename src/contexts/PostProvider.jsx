/** @format */

import { createContext, useContext, useState } from 'react';

// 1) CREATE A NEW CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
	const [data, setData] = useState([]);
	const [userId, setUserId] = useState('1');

	return (
		// 2) PROVIDE VALUE TO CHILD COMPONENTS

		<PostContext.Provider
			value={{
				data,
				setData,
				userId,
				setUserId,
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
