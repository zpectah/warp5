import React, { useEffect, useState } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { string } from '../../../../../libs/utils';

interface UiDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
	headerChildren?: React.ReactElement | React.ReactElement[];
	footerChildren?: React.ReactElement | React.ReactElement[];
	customContent?: React.ReactElement;
	id?: string;
	fullWidth?: boolean;
}

const UiDialog: React.FC<UiDialogProps> = ({
	children,
	open,
	onToggle,
	size = 'md',
	headerChildren,
	footerChildren,
	customContent,
	id = string.getToken(3, ''),
	fullWidth = true,
}) => {
	const [isOpen, setOpen] = useState(open);
	const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

	const closeHandler = () => {
		setOpen(false);
	};

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<Dialog
			open={open}
			onClose={closeHandler}
			aria-labelledby={`${id}_title`}
			aria-describedby={`${id}_description`}
			scroll={scroll}
			maxWidth={size}
			fullWidth={fullWidth}
		>
			{headerChildren && (
				<DialogTitle id={`${id}_title`}>{headerChildren}</DialogTitle>
			)}
			<>
				{customContent ? (
					<DialogContent>{customContent}</DialogContent>
				) : (
					<DialogContent>
						<DialogContentText id={`${id}_description`}>
							{children}
						</DialogContentText>
					</DialogContent>
				)}
			</>
			{footerChildren && <DialogActions>{footerChildren}</DialogActions>}
		</Dialog>
	);
};

export default UiDialog;
