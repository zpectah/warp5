import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from 'styled-components';

import { useUploads } from '../../hooks/App';

const ActionsWrapper = styled.div``;
const SelectedWrapper = styled.div``;

interface UploadsPickerProps {
	id: string;
	value: string | string[];
	onChange: (value: string | string[]) => void;
	multiple?: boolean;
	ignoredId?: any[];
	mode?: 'all' | 'image' | 'audio' | 'video' | 'document' | 'archive';
}

const UploadsPicker = ({
	id,
	value,
	onChange,
	multiple,
	ignoredId,
	mode = 'all',
}: UploadsPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const { Uploads } = useUploads();

	const getPickerOptions = () => {
		let opts = [];

		if (ignoredId.length > 0) {
			let fo = [];

			opts.map((oi) => {
				ignoredId.map((ignoredId) => {
					if (oi.value !== ignoredId) fo.push(oi);
				});
			});

			opts = fo;
		}

		return opts;
	};

	const onDialogOpen = () => {};

	const onResetHandler = () => {
		onChange('');
	};

	return (
		<>
			<ActionsWrapper>
				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button onClick={onDialogOpen}>Select</Button>
					<Button onClick={onResetHandler} disabled={!value} color="secondary">
						Reset
					</Button>
				</ButtonGroup>
			</ActionsWrapper>
			<SelectedWrapper>uploads list ...</SelectedWrapper>
		</>
	);
};

export default UploadsPicker;
