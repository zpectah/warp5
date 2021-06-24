import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 1rem;
`;

interface PanelProps {}

const Panel: React.FC<PanelProps> = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

export default Panel;
