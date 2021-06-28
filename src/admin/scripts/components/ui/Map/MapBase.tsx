import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components';

import { MAPBOX } from '../../../constants';

const Wrapper = styled.div<{ height: string }>`
	width: 100%;
	height: ${(props) => props.height};
`;

interface MapProps {
	height?: string;
	longitude?: number | string;
	latitude?: number | string;
	zoom?: number;
	onClick?: (e: any) => void;
}

const Map: React.FC<MapProps> = ({
	children,
	height = '350px',
	zoom = MAPBOX.defaultLocation.zoom,
	longitude = MAPBOX.defaultLocation.longitude,
	latitude = MAPBOX.defaultLocation.latitude,
	onClick,
}) => {
	const [viewport, setViewport] = useState({
		longitude: Number(longitude),
		latitude: Number(latitude),
		zoom: zoom,
	});

	return (
		<>
			<Wrapper height={height}>
				<ReactMapGL
					{...viewport}
					width="100%"
					height="100%"
					onViewportChange={(viewport) => setViewport(viewport)}
					mapboxApiAccessToken={MAPBOX.token}
					onClick={onClick}
					children={children}
				/>
			</Wrapper>
		</>
	);
};

export default Map;
