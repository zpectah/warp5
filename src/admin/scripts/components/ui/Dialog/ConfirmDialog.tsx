import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { string } from '../../../../../libs/utils';

interface DialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	title?: string;
	id?: string;
	onConfirm?: Function;
	onCancel?: Function;
}

const UiDialog: React.FC<DialogProps> = ({
	children,
	open,
	onToggle,
	title = 'Confirm',
	id = string.getToken(3, ''),
	onConfirm,
	onCancel,
}) => {
	const [isOpen, setOpen] = useState(open);

	const closeHandler = () => {
		setOpen(false);
	};

	const confirmHandler = () => {
		setOpen(false);
		if (onConfirm) onConfirm();
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
		>
			<DialogTitle id={`${id}_title`}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id={`${id}_description`}>
					{children}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelHandler} color="primary">
					Cancel
				</Button>
				<Button onClick={confirmHandler} color="primary" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UiDialog;
