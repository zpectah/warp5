import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import media from '../../styles/responsive';
import Bar from './Bar';
import Panel from './Panel';

const Wrapper = styled.aside<{ open: boolean }>`
	width: 100vw;
	height: ${(props) => props.theme.sidebar.bar.width};
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${(props) => props.theme.sidebar.zIndex};

	${media.min.sm} {
		width: ${(props) => props.theme.sidebar.bar.width};
		height: 100vh;
	}
`;

const Sidebar = () => {
	const store = useSelector((store: any) => store);

	const [sidebarOpen, setSidebarOpen] = useState(store.ui.sideBarOpen);

	useEffect(() => {
		setSidebarOpen(store.ui.sideBarOpen);
	}, [store.ui.sideBarOpen]);

	return (
		<Wrapper open={sidebarOpen}>
			<Panel open={sidebarOpen} sidebarClose={() => setSidebarOpen(false)} />
			<Bar open={sidebarOpen} />
		</Wrapper>
	);
};

export default Sidebar;
