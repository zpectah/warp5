import React from 'react';

import BlockBase from '../BlockBase';

interface PublishPostsBlockProps {}

const PublishPostsBlock: React.FC<PublishPostsBlockProps> = ({}) => {
	return (
		<BlockBase title="User">
			<div>PublishPosts Block</div>
		</BlockBase>
	);
};

export default PublishPostsBlock;
