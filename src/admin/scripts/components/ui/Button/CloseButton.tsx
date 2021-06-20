import React from 'react';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';

import { buttonTrigger } from '../../../styles/mixins';

const StyledButton = styled.button`
	${buttonTrigger}
`;

interface CloseButtonProps {
	onClick?: Function;
	className?: string | string[];
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
	return (
		<StyledButton
			type="button"
			onClick={onClick}
			className={['btn-close', className].join(' ')}
		>
			<Close />
		</StyledButton>
	);
};

export default CloseButton;
