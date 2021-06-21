import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
	width: auto;
	padding: 1rem 0;
	display: flex;
	justify-content: space-between;
`;

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
	return (
		<Wrapper>
			<div>Footer</div>
			<div>Footer</div>
		</Wrapper>
	);
};

export default Footer;
