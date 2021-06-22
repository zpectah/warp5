import React from 'react';
import styled from 'styled-components';

import media from '../../styles/responsive';
import SidebarToggle from './SidebarToggle';
import ProfileMenu from '../Profile/ProfileMenu';
import CreateMenu from '../Create/CreateMenu';
import LogoutTrigger from '../Profile/LogoutTrigger';

const Wrapper = styled.div`
	width: 100vw;
	height: ${(props) => props.theme.sidebar.bar.width};
	position: absolute;
	top: 0;
	left: 0;
	z-index: ${(props) => props.theme.sidebar.zIndex};
	color: ${(props) => props.theme.sidebar.color};
	background-color: ${(props) => props.theme.sidebar.bg};

	${media.min.sm} {
		width: ${(props) => props.theme.sidebar.bar.width};
		height: 100%;
	}
`;
const Inner = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	${media.min.sm} {
		flex-direction: column;
	}
`;
const Block = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	${media.min.sm} {
		flex-direction: column;
	}
`;

interface BarProps {
	open: boolean;
}

const Bar: React.FC<BarProps> = ({ open }) => {
	return (
		<Wrapper>
			<Inner>
				<Block>
					<SidebarToggle />
					<CreateMenu />
				</Block>
				<Block>
					<ProfileMenu />
					<LogoutTrigger />
				</Block>
			</Inner>
		</Wrapper>
	);
};

export default Bar;
