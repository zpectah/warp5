import React from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Heading = styled.div`
	padding: 0.5rem 1rem;
`;
const Content = styled.div`
	padding: 0.5rem 1rem;
`;

interface DefaultBlockProps {
	title?: string;
}

const DefaultBlock: React.FC<DefaultBlockProps> = ({ children, title }) => {
	return (
		<Paper>
			{title && <Heading>{title}</Heading>}
			<Content>{children}</Content>
		</Paper>
	);
};

export default DefaultBlock;
