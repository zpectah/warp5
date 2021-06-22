import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface LocalesDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onCancel?: Function;
}

const LocalesDialog = ({ open, onToggle, onCancel }: LocalesDialogProps) => {
	const [isOpen, setOpen] = useState(open);

	const closeHandler = () => {
		setOpen(false);
		if (onCancel) onCancel();
	};

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<Dialog
			maxWidth="xs"
			aria-labelledby="locales-dialog-title"
			open={open}
			onClose={closeHandler}
			fullWidth
		>
			<DialogTitle id="locales-dialog-title">Select language</DialogTitle>
			<DialogContent dividers>
				radio group ... or click to change ...
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={closeHandler} color="primary">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LocalesDialog;
