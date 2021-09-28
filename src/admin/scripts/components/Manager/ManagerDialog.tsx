import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Dialog, Preloader } from '../ui';

interface ManagerDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onCancel?: () => void;
	// detailData: any;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ManagerDialog: React.FC<ManagerDialogProps> = ({
	open,
	onToggle,
	onCancel,
	size = 'md',
	children,
}) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<>
			<Dialog.Blank
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				size={size}
				onClose={onCancel}
				children={children}
			/>
		</>
	);
};

export default ManagerDialog;
