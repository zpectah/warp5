import React from 'react';

import BlockBase from '../BlockBase';

interface LastUploadsBlockProps {}

const LastUploadsBlock: React.FC<LastUploadsBlockProps> = ({}) => {
	return (
		<BlockBase title="User">
			<div>LastUploads Block</div>
		</BlockBase>
	);
};

export default LastUploadsBlock;
