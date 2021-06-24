import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

// IMPORTANT : Outer wrapper must be `position: relative;`

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.preloader.block.color};
	background-color: ${(props) => props.theme.preloader.block.bg};
`;

interface PagePreloaderProps {}

const PagePreloader = ({}: PagePreloaderProps) => {
	return (
		<Wrapper>
			<CircularProgress color="inherit" />
		</Wrapper>
	);
};

export default PagePreloader;
