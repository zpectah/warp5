import React from 'react';
import styled from 'styled-components';

import media from '../../styles/responsive';
import { Scrollable } from '../ui';
import Navbar from './Navbar';

const Wrapper = styled.div<{ open: boolean }>`
	width: 100vw;
	height: calc(100vh - ${(props) => props.theme.sidebar.bar.width});
	position: absolute;
	top: ${(props) => props.theme.sidebar.bar.width};
	left: ${(props) => (props.open ? 0 : `-100vw`)};

	color: ${(props) => props.theme.sidebar.color};
	background-color: ${(props) => props.theme.sidebar.bg};
	z-index: ${(props) => props.theme.sidebar.zIndex};
	transition: left ${(props) => props.theme.sidebar.transitionDuration}
		ease-in-out 0s;

	${media.min.sm} {
		width: ${(props) => props.theme.sidebar.panel.width};
		height: 100%;
		top: 0;
		left: ${(props) =>
			props.open
				? props.theme.sidebar.bar.width
				: `calc((${props.theme.sidebar.panel.width} + ${props.theme.sidebar.bar.width}) * -1)`};
	}
`;
const Inner = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const Block = styled.div``;

interface PanelProps {
	open: boolean;
	sidebarClose: Function;
}

const Panel: React.FC<PanelProps> = ({ children, open, sidebarClose }) => {
	return (
		<Wrapper open={open}>
			<Scrollable>
				<Inner>
					<Block>
						<Navbar sidebarClose={sidebarClose} />
					</Block>
					{children && <Block>{children}</Block>}
				</Inner>
			</Scrollable>
		</Wrapper>
	);
};

export default Panel;
