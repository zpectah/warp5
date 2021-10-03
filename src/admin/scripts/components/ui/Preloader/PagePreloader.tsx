import React from 'react';
import styled from 'styled-components';

import PreloaderBase from './PreloaderBase';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: inherit;
	color: ${(props) => props.theme.preloader.page.color};
	background-color: ${(props) => props.theme.preloader.page.bg};
	z-index: ${(props) => props.theme.preloader.page.zIndex};
`;
const Block = styled.div`
	width: auto;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Label = styled.div``;

interface PagePreloaderProps {
	label?: string;
}

const PagePreloader = ({ label }: PagePreloaderProps) => {
	return (
		<Wrapper>
			<Block>
				<PreloaderBase width="100px" height="100px" />
				{label && <Label>{label}</Label>}
			</Block>
		</Wrapper>
	);
};

export default PagePreloader;
