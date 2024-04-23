/** @format */

import { usePosts } from '../contexts/PostProvider';

import User from './User';

function Users() {
	const { data, setUserId } = usePosts();

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

export default Users;
