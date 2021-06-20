import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { modalBase } from '../../../styles/mixins';
import Button from '../Button';

const Wrapper = styled(Modal)`
	${modalBase}
`;
const ModalContainer = styled(Paper)<{ size: ModalProps['size'] }>`
	//
	width: 50vw;

	min-height: 50px;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 5%;

	.btn-close {
		position: absolute;
		top: 0;
		right: 0;
	}
`;

interface ModalProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const UiModal: React.FC<ModalProps> = ({
	children,
	open,
	onToggle,
	size = 'md',
}) => {
	const [isOpen, setOpen] = useState(open);

	const closeHandler = () => {
		setOpen(false);
	};

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<Wrapper
			open={isOpen}
			onClose={closeHandler}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			style={{ overflow: 'scroll' }}
			children={
				<Fade in={isOpen}>
					<ModalContainer size={size}>
						{children}
						<Button.Close onClick={() => setOpen(false)} />
					</ModalContainer>
				</Fade>
			}
		/>
	);
};

export default UiModal;
