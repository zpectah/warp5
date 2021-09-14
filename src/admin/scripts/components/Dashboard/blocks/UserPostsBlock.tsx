import React from 'react';

import BlockBase from '../BlockBase';

interface UserPostsBlockProps {}

const UserPostsBlock: React.FC<UserPostsBlockProps> = ({}) => {
	return (
		<BlockBase title="User">
			<div>UserPosts Block</div>
		</BlockBase>
	);
};

export default UserPostsBlock;
