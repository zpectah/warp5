import React, { useEffect, useState } from 'react';

import ProfileForm from './ProfileForm';
import { Dialog } from '../ui';

interface ProfileModalProps {
	open: boolean;
	onToggle: (open: boolean) => void;
}

const ProfileDialog = ({ open, onToggle }: ProfileModalProps) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<>
			<Dialog.Blank
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				size={'sm'}
			>
				<ProfileForm afterSubmit={() => setOpen(false)} />
			</Dialog.Blank>
		</>
	);
};

export default ProfileDialog;
