import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Container from '@material-ui/core/Container';
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
const WrapperContainer = styled.div<{ open: boolean }>`
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
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	overrideMaxWidthDefault?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
	children,
	route,
	app = 'App',
	titleMeta,
	titlePage,
	headerChildren,
	maxWidth = 'lg',
	overrideMaxWidthDefault = 'lg',
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
				<WrapperContainer open={sidebarOpen}>
					<Container maxWidth={overrideMaxWidthDefault}>
						<Header
							route={route}
							app={app}
							titlePage={titlePage}
							children={headerChildren}
						/>
					</Container>
					<Container maxWidth={maxWidth}>
						<Content>{children}</Content>
					</Container>
					<Container maxWidth={overrideMaxWidthDefault}>
						<Footer />
					</Container>
				</WrapperContainer>
				<Sidebar />
			</Wrapper>
		</>
	);
};

export default DefaultLayout;
