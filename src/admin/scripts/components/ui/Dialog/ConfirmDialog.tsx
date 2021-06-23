import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { string } from '../../../../../libs/utils';

const ItemsWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

interface DialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	title?: string;
	id?: string;
	onConfirm?: (ids?: number[]) => void;
	onCancel?: Function;
	items?: any[];
}

const UiDialog: React.FC<DialogProps> = ({
	children,
	open,
	onToggle,
	title = 'Confirm',
	id = string.getToken(3, ''),
	onConfirm,
	onCancel,
	items,
}) => {
	const { t } = useTranslation(['common']);
	const [isOpen, setOpen] = useState(open);

	const closeHandler = () => {
		setOpen(false);
	};

	const confirmHandler = () => {
		setOpen(false);
		if (onConfirm) onConfirm(items);
	};

	const cancelHandler = () => {
		setOpen(false);
		if (onCancel) onCancel();
	};

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<Dialog
			open={open}
			onClose={closeHandler}
			aria-labelledby={`${id}_title`}
			aria-describedby={`${id}_description`}
			maxWidth={'xs'}
			fullWidth
		>
			<DialogTitle id={`${id}_title`}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id={`${id}_description`}>
					{children}
				</DialogContentText>
				{items && (
					<ItemsWrapper>
						{items.map((item) => (
							<Chip key={item} label={`# ${item}`} color="primary" />
						))}
					</ItemsWrapper>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelHandler}>{t('btn.cancel')}</Button>
				<Button onClick={confirmHandler} color="primary">
					{t('btn.confirm')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UiDialog;
