import React, { useEffect, useMemo, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';

import { MAPBOX } from '../../constants';
import { Map, Dialog } from '../ui';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;
const ButtonRow = styled.div`
	width: 100%;
	height: auto;
	display: flex;

	& .input {
		flex: 1;
	}
	& .button {
		margin-left: 0.5rem;
		flex: 0;
	}
`;
const StyledMarker = styled(Marker)`
	width: 50px;
	height: 50px;
	background-color: transparent;
	border-radius: 50px;
	font-size: 2rem;
`;

interface LocationPickerProps {
	inputId?: string;
	value: [number | string, number | string];
	onChange: (value: any) => void;
	zoom?: number;
	rowStyle?: any;
}

const LocationPicker = ({
	inputId = 'inputId',
	value,
	onChange,
	zoom,
	rowStyle,
}: LocationPickerProps) => {
	const { t } = useTranslation(['common']);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [locationChanged, setLocationChanged] = useState(false);
	const [tmpLocation, setTmpLocation] = useState<
		[number | string, number | string]
	>([MAPBOX.defaultLocation.longitude, MAPBOX.defaultLocation.latitude]);
	const [markerVisible, setMarkerVisible] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const onSelectHandler = (e) => {
		setLocationChanged(true);
		setMarkerVisible(true);
		setTmpLocation([e.lngLat[0], e.lngLat[1]]);
	};

	const onConfirmLocation = () => {
		if (onChange) onChange([...tmpLocation]);

		onCancelHandler();
	};

	const onCancelHandler = () => {
		setTmpLocation([...value]);
		setLocationChanged(false);
		setDialogOpen(false);
	};

	const resetLocationHandler = () => {
		setLocationChanged(true);
		setMarkerVisible(false);
		setTmpLocation([0, 0]);
	};

	useEffect(() => {
		if (value && value[0] && value[1]) setTmpLocation([...value]);
	}, [value]);

	const Markers = useMemo(() => {
		if (value[0] == 0 && value[1] == 0) {
			setMarkerVisible(false);
		} else {
			setMarkerVisible(true);
		}

		return (
			<>
				{markerVisible && (
					<>
						<StyledMarker
							longitude={Number(tmpLocation[0])}
							latitude={Number(tmpLocation[1])}
							offsetLeft={-25}
							offsetTop={-25}
						>
							<LocationOnIcon fontSize="inherit" />
						</StyledMarker>
					</>
				)}
			</>
		);
	}, [tmpLocation]);

	return (
		<>
			<Wrapper>
				<ButtonRow style={rowStyle}>
					<TextField
						type="text"
						placeholder={'Set location'}
						id={inputId}
						value={value}
						variant="outlined"
						size="small"
						className="input"
						onClick={toggleDialog}
						aria-readonly="true"
						disabled
					/>
					<IconButton
						color="primary"
						className="button"
						onClick={toggleDialog}
						size="small"
					>
						<ExploreIcon />
					</IconButton>
				</ButtonRow>
			</Wrapper>
			<Dialog.Blank
				open={dialogOpen}
				onToggle={(open) => setDialogOpen(open)}
				size={'md'}
			>
				<Map
					zoom={zoom}
					longitude={Number(value[0]) || MAPBOX.defaultLocation.longitude}
					latitude={Number(value[1] || MAPBOX.defaultLocation.latitude)}
					height={'50vh'}
					onClick={onSelectHandler}
				>
					{Markers}
				</Map>
				<DialogActions>
					<Button onClick={onCancelHandler}>{t('btn.cancel')}</Button>
					<Button onClick={resetLocationHandler} color="secondary">
						{t('btn.reset')}
					</Button>
					<Button
						onClick={onConfirmLocation}
						color="primary"
						disabled={!locationChanged}
					>
						{t('btn.confirm')}
					</Button>
				</DialogActions>
			</Dialog.Blank>
		</>
	);
};

export default LocationPicker;
