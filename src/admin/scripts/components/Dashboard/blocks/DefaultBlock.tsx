import React from 'react';

import BlockBase from '../BlockBase';

interface DefaultBlockProps {
	title?: string;
}

const DefaultBlock: React.FC<DefaultBlockProps> = ({ children, title }) => {
	return (
		<BlockBase title={title}>
			<div>{children}</div>
		</BlockBase>
	);
};

export default DefaultBlock;
