import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { Modal } from '../ui';

interface ConfirmModalProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onConfirm?: Function;
	onCancel?: Function;
	title?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	children,
	open,
	onToggle,
	onConfirm,
	onCancel,
	title,
}) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	const confirmHandler = () => {
		setOpen(false);
		if (onConfirm) onConfirm();
	};

	const cancelHandler = () => {
		setOpen(false);
		if (onCancel) onCancel();
	};

	return (
		<>
			<Modal.Wrapper open={isOpen} onToggle={(open) => setOpen(open)}>
				{title && <Modal.Header>{title}</Modal.Header>}
				<Modal.Content>
					<div>{children}</div>
				</Modal.Content>
				<Modal.Footer>
					<Button
						type="button"
						onClick={confirmHandler}
						variant="contained"
						color="primary"
					>
						confirm
					</Button>
					<Button type="button" onClick={cancelHandler} variant="contained">
						cancel
					</Button>
				</Modal.Footer>
			</Modal.Wrapper>
		</>
	);
};

export default ConfirmModal;
