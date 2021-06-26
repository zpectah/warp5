import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from 'styled-components';

import { useUploads } from '../../hooks/App';
import { Dialog } from '../ui';

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
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tmpSelected, setSelected] = useState([]);

	const { Uploads } = useUploads();

	useEffect(() => {
		if (value) {
			// if string

			// if array

			console.log('value', typeof value, value);

			if (typeof value == 'string') {
				setSelected([value]);
			} else {
				setSelected([...value]);
			}
		}
	}, [value]);

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

	const onDialogClose = () => {
		setDialogOpen(false);
	};

	const onDialogOpen = () => {
		setDialogOpen(true);
	};

	const onResetHandler = () => {
		setSelected([]);
		onChange('');
	};

	const onSelectedConfirm = () => {
		console.log('confirm selected ...');

		setDialogOpen(false);
	};

	return (
		<>
			<ActionsWrapper>
				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button onClick={onDialogOpen}>{t('btn.select')}</Button>
					<Button onClick={onResetHandler} disabled={!value} color="secondary">
						{t('btn.clear')}
					</Button>
				</ButtonGroup>
			</ActionsWrapper>
			<SelectedWrapper>
				{tmpSelected.map((item) => (
					<div key={item}>{item}</div>
				))}
			</SelectedWrapper>
			<Dialog.Base
				open={dialogOpen}
				onToggle={(open) => setDialogOpen(open)}
				headerChildren={<>Select uploads</>}
				footerChildren={
					<>
						<Button onClick={onDialogClose}>{t('btn.cancel')}</Button>
						<Button onClick={onSelectedConfirm} color="primary" autoFocus>
							{t('btn.confirm')}
						</Button>
					</>
				}
				customContent={
					<>
						<div>list of uploads by type ...</div>
					</>
				}
			/>
		</>
	);
};

export default UploadsPicker;
