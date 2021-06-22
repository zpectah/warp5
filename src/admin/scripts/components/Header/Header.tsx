import React from 'react';
import styled from 'styled-components';

import { appProps, routeProps } from '../../types/types';
import Breadcrumbs from '../Breadcrumbs';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.header`
	padding-bottom: 2rem;
	display: flex;
	flex-direction: column;
`;

const Primary = styled.div`
	padding: 1rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const Secondary = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

interface HeaderProps {
	route: routeProps;
	titlePage?: string;
	app: appProps['app'];
}

const Header: React.FC<HeaderProps> = ({ children, route, titlePage, app }) => {
	return (
		<Wrapper>
			<Primary>
				<Breadcrumbs route={route} app={app} />
			</Primary>
			<Secondary>
				<div>
					{titlePage && (
						<Typography variant="h4" component="h1">
							{titlePage}
						</Typography>
					)}
				</div>
				<div>{children}</div>
			</Secondary>
		</Wrapper>
	);
};

export default Header;
