import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section<{ withBorder: boolean }>`
	width: 100%;
	height: auto;
	padding-bottom: ${({ withBorder }) => (withBorder ? '1rem' : '0')};
	margin-bottom: 1rem;
	border-bottom: ${(props) =>
		props.withBorder ? props.theme.section.border : '0'};

	&:last-of-type {
		margin-bottom: 0;
	}
`;
const Heading = styled.div`
	padding-bottom: 1rem;
	color: ${(props) => props.theme.section.heading.color};
`;
const Content = styled.div``;

interface SectionProps {
	context?: 'page' | 'section' | 'block';
	title?: string;
	withBorder?: boolean;
}

const Section: React.FC<SectionProps> = ({
	children,
	context = 'page',
	title,
	withBorder,
}) => {
	return (
		<Wrapper className="section" withBorder={withBorder} context={context}>
			{title && <Heading className="section-heading">{title}</Heading>}
			<Content className="section-content">{children}</Content>
		</Wrapper>
	);
};

export default Section;
