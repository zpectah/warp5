import React from 'react';
import styled from 'styled-components';

import { Scrollable } from '../ui';
import Navbar from './Navbar';

const Wrapper = styled.div<{ open: boolean }>`
	width: ${(props) => props.theme.sidebar.panel.width};
	height: 100%;
	position: absolute;
	top: 0;
	left: ${(props) =>
		props.open
			? props.theme.sidebar.bar.width
			: `calc((${props.theme.sidebar.panel.width} + ${props.theme.sidebar.bar.width}) * -1)`};

	color: ${(props) => props.theme.sidebar.color};
	background-color: ${(props) => props.theme.sidebar.bg};
	z-index: ${(props) => props.theme.sidebar.zIndex};
	transition: left ${(props) => props.theme.sidebar.transitionDuration}
		ease-in-out 0s;
`;
const Inner = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const Block = styled.div``;

interface PanelProps {
	open: boolean;
	sidebarToggle: Function;
}

const Panel: React.FC<PanelProps> = ({ children, open, sidebarToggle }) => {
	return (
		<Wrapper open={open}>
			<Scrollable>
				<Inner>
					<Block>
						<Navbar sidebarToggle={sidebarToggle} />
					</Block>
					{children && <Block>{children}</Block>}
				</Inner>
			</Scrollable>
		</Wrapper>
	);
};

export default Panel;
