import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import {
	layoutBase,
	layoutContainerBase,
	layoutContentBase,
} from '../../styles/mixins';
import config from '../../config';
import { appProps, routeProps } from '../../types/types';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
	${layoutBase}
`;
const Container = styled.div<{ open: boolean }>`
	${layoutContainerBase}

	top: 0;
	width: ${(props) =>
		props.open
			? `calc(100% - (${props.theme.sidebar.bar.width} + ${props.theme.sidebar.panel.width}))`
			: `calc(100% - ${props.theme.sidebar.bar.width})`};
	left: ${(props) =>
		props.open
			? `calc(${props.theme.sidebar.panel.width} + ${props.theme.sidebar.bar.width})`
			: props.theme.sidebar.bar.width};

	transition: width ${(props) => props.theme.sidebar.transitionDuration}
			ease-in-out 0s,
		left ${(props) => props.theme.sidebar.transitionDuration} ease-in-out 0s;
`;
const Content = styled.main`
	${layoutContentBase}

	flex: 1;
`;

interface DefaultLayoutProps {
	route: routeProps;
	app?: appProps['app'];
	titleMeta?: string;
	titlePage?: string;
	headerChildren?: React.ReactElement | React.ReactElement[];
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
	children,
	route,
	app = 'App',
	titleMeta,
	titlePage,
	headerChildren,
}) => {
	const store = useSelector((store: any) => store);

	const [sidebarOpen, setSidebarOpen] = useState<boolean>(store.ui.sideBarOpen);

	useEffect(() => {
		setSidebarOpen(store.ui.sideBarOpen);
	}, [store.ui.sideBarOpen]);

	return (
		<>
			<Helmet>
				<title>
					{config.GLOBAL.CMS.META.name}
					{titleMeta ? ` | ${titleMeta}` : ''}
				</title>
			</Helmet>
			<Wrapper>
				<Container open={sidebarOpen}>
					<Header
						route={route}
						app={app}
						titlePage={titlePage}
						children={headerChildren}
					/>
					<Content>{children}</Content>
					<Footer />
				</Container>
				<Sidebar />
			</Wrapper>
		</>
	);
};

export default DefaultLayout;
