import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding-top: 2rem;
`;

interface PanelProps {}

const Panel: React.FC<PanelProps> = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

export default Panel;
