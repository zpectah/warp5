import React from 'react';
import Helmet from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
const WrapperContainer = styled.div`
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
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({
	children,
	route,
	app = 'App',
	titleMeta,
	titlePage,
	noFooter = false,
	maxWidth = 'md',
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
				<WrapperContainer>
					<Container maxWidth={maxWidth}>
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
				</WrapperContainer>
			</Wrapper>
		</>
	);
};

export default MinimalLayout;
