import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isDesktop } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { file as fileUtils } from '../../../../libs/utils';
import getFileType from '../../utils/getFileType';
import ImageCrop from './ImageCrop';

const Wrapper = styled.div`
	position: relative;
`;

const DraggableLayer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	color: white;
	background-color: rgba(25, 25, 25, 0.75);
`;

const DropArea = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const DropAreaDescription = styled.div`
	padding-top: 1rem;
`;

const Label = styled.label`
	width: calc(100% - 10px);
	height: calc(100% - 10px);
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	color: inherit;
	background-color: transparent;
	border: 5px dashed rgba(200, 200, 200, 0.75);
	border-radius: 1rem;
`;
const Input = styled.input`
	width: 1px;
	height: 1px;
	display: block;
	position: absolute;
	bottom: 0;
	right: 0;
	opacity: 0;
`;

const InputOuterWrapper = styled.div`
	width: 100%;
	height: auto;
	padding: 1rem 0;
	min-height: 100px;
	position: relative;
`;

const ContentOptions = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 1rem 0 0 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;

	& .block {
	}
`;

interface UploaderBaseProps {
	onChange: (
		blob: any, // TODO
		name: string,
		ext: string,
		mime: string,
		size: number,
		type: string,
		cropped?: any, // TODO
	) => void;
	height?: number;
	onReset?: () => void;
	accept?: string;
	aspect?: number;
}

const UploaderBase: React.FC<UploaderBaseProps> = ({
	onChange,
	accept,
	onReset,
	height = 250,
	aspect,
}) => {
	const { t } = useTranslation(['common', 'component', 'message']);
	const [dragOver, setDragOver] = useState(false);
	const [file, setFile] = useState(null);
	const [src, setSrc] = useState(null);
	const [fileType, setFileType] = useState('unknown');

	const dragEvents = {
		onDrop: (e) => {
			e.stopPropagation();
			e.preventDefault();

			let file;

			if (e.dataTransfer.items) {
				file = e.dataTransfer.items[0].getAsFile();
			} else {
				file = e.dataTransfer.files[0];
			}

			setDragOver(false);
			setFile(null);
			setFileType('unknown');
			setSrc(null);

			if (file) return setBlobSource(file);
		},
		onDragOver: (e) => {
			e.stopPropagation();
			e.preventDefault();

			return false;
		},
		onDragEnter: (e) => {
			e.stopPropagation();
			e.preventDefault();

			setDragOver(true);

			return false;
		},
		onDragLeave: (e) => {
			e.stopPropagation();
			e.preventDefault();

			setDragOver(false);

			return false;
		},
	};
	const inputEvents = {
		onChange: (e) => {
			let file = e.target?.files[0];

			setFile(null);
			setFileType('unknown');
			setSrc(null);

			if (file) return setBlobSource(file);
		},
	};

	const setBlobSource = async (file) => {
		const blob = await fileUtils.toBase64(file);
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);
		setFileType(type);

		if (accept) {
			if (file.type.includes(accept.replace('*', ''))) {
				setFile({
					blob: blob,
					name: file.name,
					extension: ext,
					mime: file.type,
					size: file.size,
					type: type,
				});
				if (type == 'image') {
					setSrc(blob);
				}
			} else {
				// message.warn(t('message:fileNotAccepted'), 5);
				console.warn(t('message:error.fileNotAccepted'));
			}
		} else {
			setFile({
				blob: blob,
				name: file.name,
				extension: ext,
				mime: file.type,
				size: file.size,
				type: type,
			});
			if (type == 'image') {
				setSrc(blob);
			}
		}

		onChange(blob, file.name, ext, file.type, file.size, type);
	};
	const resetHandler = () => {
		setFile(null);
		setFileType('unknown');
		if (onReset) onReset();
	};
	const cropChangeHandler = (blob) =>
		onChange(blob, file.name, file.extension, file.mime, file.size, file.type);
	const onInit = () => {
		window.addEventListener('mouseup', dragEvents.onDragLeave);
		window.addEventListener('dragover', dragEvents.onDragOver);
		window.addEventListener('dragenter', dragEvents.onDragEnter);
		window.addEventListener('drop', dragEvents.onDrop);
	};
	const onDestroy = () => {
		window.removeEventListener('mouseup', dragEvents.onDragLeave);
		window.removeEventListener('dragover', dragEvents.onDragOver);
		window.removeEventListener('dragenter', dragEvents.onDragEnter);
		window.removeEventListener('drop', dragEvents.onDrop);
	};

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	return (
		<>
			{dragOver && (
				<DraggableLayer onDragLeave={dragEvents.onDragLeave}>
					<DropArea>
						<AddIcon fontSize="large" />
						<DropAreaDescription>{t('title.dropYourFile')}</DropAreaDescription>
					</DropArea>
				</DraggableLayer>
			)}
			<Wrapper>
				<>
					{file ? (
						<>
							{fileType == 'image' && src ? (
								<ImageCrop
									src={src}
									onChange={cropChangeHandler}
									aspect={aspect}
								/>
							) : (
								<>file thumb</>
							)}
						</>
					) : (
						<InputOuterWrapper>
							<Label>
								<Input
									type="file"
									name="FileUploader"
									accept={accept}
									{...inputEvents}
								/>
								<DropArea>
									<CloudUpload fontSize="large" />
									<DropAreaDescription>
										{t('title.dropOrSelectYourFile')}
									</DropAreaDescription>
								</DropArea>
							</Label>
						</InputOuterWrapper>
					)}
				</>
				<>
					{file && (
						<>
							<ContentOptions>
								<div>
									<Button
										variant="contained"
										color="secondary"
										onClick={resetHandler}
										startIcon={<DeleteIcon />}
									>
										{t('btn.clear')}
									</Button>
								</div>
								<div></div>
							</ContentOptions>
						</>
					)}
				</>
			</Wrapper>
		</>
	);
};

export default UploaderBase;
