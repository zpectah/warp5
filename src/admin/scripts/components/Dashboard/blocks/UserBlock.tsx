import React from 'react';

import BlockBase from '../BlockBase';

interface UserBlockProps {}

const UserBlock: React.FC<UserBlockProps> = ({}) => {
	return (
		<BlockBase title="User">
			<div>User block</div>
		</BlockBase>
	);
};

export default UserBlock;
