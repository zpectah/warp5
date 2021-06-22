import React, { useState } from 'react';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import styled from 'styled-components';

import { buttonTrigger } from '../../styles/mixins';
import LogoutConfirm from './LogoutConfirm';

const Button = styled.button`
	${buttonTrigger}
`;

interface LogoutTriggerProps {
	onClick?: Function;
}

const LogoutTrigger = ({ onClick }: LogoutTriggerProps) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const clickHandler = () => {
		setConfirmOpen(true);
		if (onClick) onClick();
	};

	return (
		<>
			<Button onClick={clickHandler} type="button">
				<PowerSettingsNewIcon />
			</Button>
			<LogoutConfirm
				open={confirmOpen}
				onToggle={(open) => setConfirmOpen(open)}
			/>
		</>
	);
};

export default LogoutTrigger;
