/** @format */

import { usePosts } from '../contexts/PostProvider';
import Spinner from './Spinner';
import UserStatusInfo from './UserStatusInfo';

function UserStatus() {
	const { data, isLoading } = usePosts();

	return (
		<div className='user__status'>
			<h2 className='user__header'>User status</h2>
			{!isLoading ? (
				data.map(function (user) {
					return (
						<UserStatusInfo
							key={user.id}
							userName={user.full_name}
							vitalSigns={user.vital_signs}
							user={user}
						/>
					);
				})
			) : (
				<Spinner />
			)}
		</div>
	);
}
export default UserStatus;
