import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

interface CreateButtonProps {
	onClick: Function;
}

const CreateButton: React.FC<CreateButtonProps> = ({ children, onClick }) => {
	return (
		<>
			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				children={children}
				onClick={() => onClick()}
			/>
		</>
	);
};

export default CreateButton;
