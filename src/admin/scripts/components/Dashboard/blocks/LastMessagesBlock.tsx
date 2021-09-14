import React from 'react';

import BlockBase from '../BlockBase';

interface LastMessagesBlockProps {}

const LastMessagesBlock: React.FC<LastMessagesBlockProps> = ({}) => {
	return (
		<BlockBase title="User">
			<div>LastMessages Block</div>
		</BlockBase>
	);
};

export default LastMessagesBlock;
