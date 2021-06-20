import React from 'react';
import Helmet from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import {
	layoutBase,
	layoutContainerBase,
	layoutContentBase,
} from '../../styles/mixins';
import { appProps, routeProps } from '../../types/types';
import Footer from '../Footer';
import config from '../../config';

const Wrapper = styled.div`
	${layoutBase}
`;
const Container = styled.div`
	${layoutContainerBase}

	align-items: center;
	justify-content: center;
`;
const Content = styled.main`
	${layoutContentBase}

	width: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

interface MinimalLayoutProps {
	route: routeProps;
	app?: appProps['app'];
	titleMeta?: string;
	titlePage?: string;
	noFooter?: boolean;
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({
	children,
	route,
	app = 'App',
	titleMeta,
	titlePage,
	noFooter = false,
}) => {
	return (
		<>
			<Helmet>
				<title>
					{config.GLOBAL.CMS.META.name}
					{titleMeta ? ` | ${titleMeta}` : ''}
				</title>
			</Helmet>
			<Wrapper>
				<Container>
					<Content>
						{titlePage && (
							<Typography variant="h4" component="h1">
								{titlePage}
							</Typography>
						)}
						{children}
					</Content>
					{!noFooter && <Footer />}
				</Container>
			</Wrapper>
		</>
	);
};

export default MinimalLayout;
