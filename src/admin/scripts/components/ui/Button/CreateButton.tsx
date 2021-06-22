import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

import { ROUTE_PATH_SUFFIX_DETAIL } from '../../../constants';

interface CreateButtonProps {
	onClick?: Function;
	href?: string;
	newDetailSuffix?: boolean;
}

const CreateButton: React.FC<CreateButtonProps> = ({
	children,
	onClick,
	href,
	newDetailSuffix = false,
}) => {
	const history = useHistory();

	const callback = () => {
		if (onClick) {
			onClick();
		} else if (href) {
			let path = href;
			if (newDetailSuffix) path = path + ROUTE_PATH_SUFFIX_DETAIL + '/new';
			history.push(path);
		}
	};

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				children={children}
				onClick={callback}
			/>
		</>
	);
};

export default CreateButton;
