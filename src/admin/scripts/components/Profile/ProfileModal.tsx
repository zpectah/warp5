import React, { useEffect, useState } from 'react';

import ProfileForm from './ProfileForm';
import { Dialog } from '../ui';

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
			<Dialog.Wrapper
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				headerChildren={<>My Profile</>}
				customContent={<ProfileForm afterSubmit={() => setOpen(false)} />}
			/>
		</>
	);
};

export default ProfileModal;
