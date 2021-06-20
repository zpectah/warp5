import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

interface ModalHeaderProps {}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
	return <Wrapper className="modal-header">{children}</Wrapper>;
};

export default ModalHeader;
