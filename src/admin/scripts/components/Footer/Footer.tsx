import React from 'react';
import styled from 'styled-components';

import config from '../../config';

const Wrapper = styled.footer`
	width: auto;
	padding: 1rem 0;
	display: flex;
	justify-content: space-between;
`;

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ children }) => {
	return (
		<Wrapper>
			<div>
				<p>
					&copy; {new Date().getFullYear()}{' '}
					{config.GLOBAL['@COPYRIGHT'].cms_name} | Developed by&nbsp;
					<a href={config.GLOBAL['@COPYRIGHT'].author_url} target="_blank">
						{config.GLOBAL['@COPYRIGHT'].author_name}
					</a>
				</p>
			</div>
			{children && <div>{children}</div>}
		</Wrapper>
	);
};

export default Footer;
