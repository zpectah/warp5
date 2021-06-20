import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

interface ModalFooterProps {}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
	return <Wrapper className="modal-footer">{children}</Wrapper>;
};

export default ModalFooter;
