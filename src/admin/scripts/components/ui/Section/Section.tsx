import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section<{
	withBorder: boolean;
	context: SectionProps['context'];
}>``;
const Heading = styled.div``;
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
