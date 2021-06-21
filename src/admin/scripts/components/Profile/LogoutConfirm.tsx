import React, { useEffect, useState } from 'react';

import { ROUTES } from '../../constants';
import { Dialog } from '../ui';
import { useProfile } from '../../hooks/App';
import { useHistory } from 'react-router-dom';

interface LogoutConfirmProps {
	open: boolean;
	onToggle: (open: boolean) => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ open, onToggle }) => {
	const [modalOpen, setModalOpen] = useState(open);
	const { userLogout } = useProfile();
	const history = useHistory();

	useEffect(() => setModalOpen(open), [open]);
	useEffect(() => onToggle(modalOpen), [modalOpen]);

	const logoutHandler = () => {
		setModalOpen(false);

		userLogout({}).then(() => {
			history.push(ROUTES.app.login.path);
		});
	};

	return (
		<>
			<Dialog.Confirm
				open={modalOpen}
				onToggle={(open) => setModalOpen(open)}
				onConfirm={logoutHandler}
				onCancel={() => {
					setModalOpen(false);
				}}
				title="Are you sure want to logout?"
			/>
		</>
	);
};

export default LogoutConfirm;
