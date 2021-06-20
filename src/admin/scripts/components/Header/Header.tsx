import React from 'react';
import styled from 'styled-components';

import { appProps, routeProps } from '../../types/types';
import Breadcrumbs from '../Breadcrumbs';

const Wrapper = styled.header``;

interface HeaderProps {
	route: routeProps;
	titlePage?: string;
	app: appProps['app'];
}

const Header: React.FC<HeaderProps> = ({ children, route, titlePage, app }) => {
	return (
		<Wrapper>
			<Breadcrumbs route={route} app={app} />
			<div>
				<div>{titlePage && <div>{titlePage}</div>}</div>
				<div>{children}</div>
			</div>
		</Wrapper>
	);
};

export default Header;
