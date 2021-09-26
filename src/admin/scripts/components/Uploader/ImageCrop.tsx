import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';
// import { message, Radio, Slider } from 'antd';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { IMAGE_CROP_OPTIONS } from '../../constants';
import getCroppedImg from './cropImage';
import media from '../../styles/responsive';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;

	${media.min.md} {
		flex-direction: row;
	}
`;
const CropperSource = styled.div`
	width: 100%;
	min-height: 250px;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: rgba(25, 25, 25, 0.9);

	${media.min.md} {
		width: 50%;
		min-height: 50vh;
	}
`;
const CropperOutput = styled.div`
	width: 100%;
	height: 250px;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;

	${media.min.md} {
		width: 50%;
		height: 50vh;
	}
`;
const CropperMeta = styled.div`
	width: 100%;
	min-height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;

	& small {
		padding: 0.5rem;
		background-color: rgb(250, 250, 250);
	}
`;
const CropperControls = styled.div`
	width: 100%;
	min-height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	left: 0;
	flex-direction: column;
`;
const ControlBlock = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const CropperThumbnail = styled.div<{ process: boolean }>`
	width: auto;
	height: auto;
	max-height: 80%;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	position: relative;
	overflow: hidden;
	opacity: ${(props) => (props.process ? '0.25' : '1')};

	img {
		width: auto;
		max-width: 80%;
		height: auto;
		max-height: 80%;
		display: block;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none;
		pointer-events: none;
	}
`;
const CropperPreloader = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(250, 250, 250, 0.5);
`;

interface ImageCropProps {
	onChange: (
		blob: any, // TODO
	) => void;
	src: any; // TODO
	aspect?: number;
}

const ImageCrop: React.FC<ImageCropProps> = ({ onChange, src, aspect }) => {
	const [crop, setCrop] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [rotation, setRotation] = useState(0);
	const [croppedImage, setCroppedImage] = useState(null);
	const [area, setArea] = useState({ width: 0, height: 0 });
	const [tmpSrc, setTmpSrc] = useState(null);
	const [tmpAspect, setTmpAspect] = useState(4 / 3);
	const [process, setProcess] = useState(false);
	const [mediaDimensions, setMediaDimensions] = useState({ w: 0, h: 0 });

	const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
		setProcess(true);
		setArea({
			width: croppedAreaPixels.width,
			height: croppedAreaPixels.height,
		});
		try {
			const croppedImage = await getCroppedImg(
				src,
				croppedAreaPixels,
				rotation,
			);

			setCroppedImage(croppedImage);
			onChange(croppedImage);
			setProcess(false);
		} catch (e) {
			setProcess(false);
			// message.error(e, 5);
			console.warn(e);
		}
	}, []);

	const onImageLoad = useCallback((mediaSize) => {
		setMediaDimensions({
			w: mediaSize.width,
			h: mediaSize.height,
		});
		if (aspect) {
			setTmpAspect(aspect);
		} else {
			setTmpAspect(mediaSize.width / mediaSize.height);
		}
	}, []);

	const getRatioOptions = () => {
		let original = mediaDimensions.w / mediaDimensions.h;

		let options = [...IMAGE_CROP_OPTIONS];

		if (original)
			options.push({
				label: 'Original',
				value: original,
			});

		return options;
	};

	function valuetext(value: number) {
		return `${value}`;
	}

	const zoomHandleChange = (event: any, newValue: number) => setZoom(newValue);

	/*
	const angleHandleChange = (event: any, newValue: number) => {
		setZoom(newValue);
	};
	*/

	useEffect(() => setTmpSrc(src), [src]);

	return (
		<Wrapper>
			<CropperSource>
				<Cropper
					image={tmpSrc}
					crop={crop}
					zoom={zoom}
					rotation={rotation}
					aspect={tmpAspect}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
					zoomWithScroll={false}
					onMediaLoaded={onImageLoad}
				/>
			</CropperSource>
			<CropperOutput>
				{process && <CropperPreloader>Processing</CropperPreloader>}
				<CropperThumbnail process={process}>
					{croppedImage && <img src={croppedImage} alt={'cropped image'} />}
				</CropperThumbnail>
				<CropperMeta>
					<small>
						{area.width} x {area.height}
					</small>
				</CropperMeta>
				<CropperControls>
					<ControlBlock>
						<>
							<Typography id="zoom-slider" gutterBottom>
								Zoom
							</Typography>
							<Slider
								getAriaValueText={valuetext}
								aria-labelledby="zoom-slider"
								valueLabelDisplay="auto"
								marks
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={zoomHandleChange}
								style={{ width: '50%' }}
							/>
						</>
						{/*
						<>
							<Typography id="discrete-slider" gutterBottom>
								Angle
							</Typography>
							<Slider
								// defaultValue={zoom}
								getAriaValueText={valuetext}
								aria-labelledby="discrete-slider"
								valueLabelDisplay="auto"
								marks
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={angleHandleChange}
								style={{ width: '50%' }}
							/>
						</>
						*/}
					</ControlBlock>
					<ControlBlock>
						{!aspect && (
							<>
								<Typography id="aspect-select" gutterBottom>
									Aspect ratio
								</Typography>
								<ButtonGroup
									size="small"
									aria-label="small outlined button group"
									color="primary"
									aria-labelledby="aspect-select"
								>
									{getRatioOptions().map((item) => (
										<Button
											key={item.label}
											onClick={() => setTmpAspect(item.value)}
											variant={
												Number(tmpAspect) == item.value
													? 'contained'
													: 'outlined'
											}
										>
											{item.label}
										</Button>
									))}
								</ButtonGroup>
							</>
						)}
					</ControlBlock>
				</CropperControls>
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCrop;
