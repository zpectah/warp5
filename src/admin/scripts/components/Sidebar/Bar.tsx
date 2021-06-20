import React from 'react';
import styled from 'styled-components';

import SidebarToggle from './SidebarToggle';
import ProfileMenu from '../Profile/ProfileMenu';

const Wrapper = styled.div`
	width: ${(props) => props.theme.sidebar.bar.width};
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: ${(props) => props.theme.sidebar.zIndex};
	color: ${(props) => props.theme.sidebar.color};
	background-color: ${(props) => props.theme.sidebar.bg};
`;
const Inner = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const Block = styled.div``;

interface BarProps {
	open: boolean;
}

const Bar: React.FC<BarProps> = ({ open }) => {
	return (
		<Wrapper>
			<Inner>
				<Block>
					<SidebarToggle />
				</Block>
				<Block>
					<ProfileMenu />
				</Block>
			</Inner>
		</Wrapper>
	);
};

export default Bar;
