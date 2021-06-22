import React, { useEffect, useState } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';

interface BlankDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
	fullWidth?: boolean;
	onClose?: () => void;
}

const BlankDialog: React.FC<BlankDialogProps> = ({
	children,
	open,
	onToggle,
	size = 'md',
	fullWidth = true,
	onClose,
}) => {
	const [isOpen, setOpen] = useState(open);
	const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

	const closeHandler = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	useEffect(() => {
		setOpen(open);
	}, [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<Dialog
			open={open}
			onClose={closeHandler}
			scroll={scroll}
			maxWidth={size}
			fullWidth={fullWidth}
		>
			{children}
		</Dialog>
	);
};

export default BlankDialog;
