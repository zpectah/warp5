import React from 'react';
import Button from '@material-ui/core/Button';

interface ProfileFormProps {
	afterSubmit?: () => void;
}

const ProfileForm = ({ afterSubmit }: ProfileFormProps) => {
	const cancelHandler = () => {
		if (afterSubmit) afterSubmit();
	};

	const submitHandler = () => {
		if (afterSubmit) afterSubmit();
	};

	return (
		<>
			<form>
				<div>...ProfileForm...</div>
			</form>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginLeft: '-1rem',
					marginRight: '-1rem',
				}}
			>
				<Button onClick={cancelHandler} color="primary">
					Cancel
				</Button>
				<Button onClick={submitHandler} color="primary" autoFocus>
					Submit
				</Button>
			</div>
		</>
	);
};

export default ProfileForm;
