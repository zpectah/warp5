import React, { useEffect, useState } from 'react';

import { Modal } from '../ui';
import ProfileForm from './ProfileForm';

interface ProfileModalProps {
	open: boolean;
	onToggle: (open: boolean) => void;
}

const ProfileModal = ({ open, onToggle }: ProfileModalProps) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<>
			<Modal.Wrapper open={isOpen} onToggle={(open) => setOpen(open)}>
				<Modal.Header>header</Modal.Header>
				<Modal.Content>
					<ProfileForm />
				</Modal.Content>
			</Modal.Wrapper>
		</>
	);
};

export default ProfileModal;
