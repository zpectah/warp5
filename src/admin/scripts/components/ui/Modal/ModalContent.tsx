import React from 'react';
import styled from 'styled-components';

import Scrollable from '../Scrollable';

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	flex: 1;
`;
const Inner = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

interface ModalContentProps {}

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
	return (
		<Wrapper className="modal-content">
			<Inner>{children}</Inner>
		</Wrapper>
	);
};

export default ModalContent;
