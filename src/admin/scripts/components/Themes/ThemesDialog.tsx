import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ThemesDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onCancel?: Function;
}

const ThemesDialog = ({ open, onToggle, onCancel }: ThemesDialogProps) => {
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
			aria-labelledby="themes-dialog-title"
			open={open}
			onClose={closeHandler}
			fullWidth
		>
			<DialogTitle id="themes-dialog-title">Select theme</DialogTitle>
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

export default ThemesDialog;
