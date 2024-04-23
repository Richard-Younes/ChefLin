/** @format */

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
						Name: &ensp;{user.full_name}
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

export default User;
