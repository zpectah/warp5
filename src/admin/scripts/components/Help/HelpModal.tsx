import React, { useEffect, useState } from 'react';

import { Modal } from '../ui';

interface HelpModalProps {
	open: boolean;
	onToggle: (open: boolean) => void;
}

const HelpModal = ({ open, onToggle }: HelpModalProps) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<>
			<Modal.Wrapper open={isOpen} onToggle={(open) => setOpen(open)}>
				<Modal.Header>header</Modal.Header>
				<Modal.Content>content</Modal.Content>
			</Modal.Wrapper>
		</>
	);
};

export default HelpModal;
