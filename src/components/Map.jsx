/** @format */

import { usePosts } from '../contexts/PostProvider';
import styles from './Map.module.css';

import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import Spinner from './Spinner';

function Map() {
	const mapOptions = {
		zoomControl: false, // Disable zoom control
		dragging: false, // Disable dragging/panning
		touchZoom: false, // Disable touch zoom
		doubleClickZoom: false, // Disable double click zoom
		scrollWheelZoom: false, // Disable scroll wheel zoom
		boxZoom: false, // Disable box zoom
	};

	const { data } = usePosts();
	console.log(data);

	// const fakeLocation = [
	// 	[0.01, 0.02],
	// 	[-0.01, -0.01],
	// ];

	if (!data) {
		return <Spinner />;
	}

	return (
		<MapContainer
			center={[0, 0]}
			zoom={13}
			scrollWheelZoom={false}
			{...mapOptions}>
			<ImageOverlay
				bounds={[
					[-0.035, 0.09],
					[0.035, -0.09],
				]}
				url='../public/pool.jpg'
			/>
			{data.map(user => (
				<Marker position={[user.latitude, user.longitude]} key={user.id}>
					<Popup>{user.full_name}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}

export default Map;
