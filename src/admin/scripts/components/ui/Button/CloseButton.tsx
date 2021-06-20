import React from 'react';
import Close from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { buttonTrigger } from '../../../styles/mixins';

const StyledButton = styled.button`
	${buttonTrigger}
`;

interface CloseButtonProps {
	onClick?: Function;
	className?: string | string[];
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
	const { t } = useTranslation(['common']);

	return (
		<StyledButton
			type="button"
			onClick={onClick}
			className={['btn-close', className].join(' ')}
			title={t('btn.close')}
		>
			<Close />
		</StyledButton>
	);
};

export default CloseButton;
