import React from 'react';

import BlockBase from '../BlockBase';

interface LastRequestsBlockProps {}

const LastRequestsBlock: React.FC<LastRequestsBlockProps> = ({}) => {
	return (
		<BlockBase title="User">
			<div>LastRequests Block</div>
		</BlockBase>
	);
};

export default LastRequestsBlock;
