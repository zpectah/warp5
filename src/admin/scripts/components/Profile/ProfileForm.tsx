import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Form } from '../ui';

interface ProfileFormProps {
	afterSubmit: (method: string) => void;
}

const ProfileForm = ({ afterSubmit }: ProfileFormProps) => {
	const cancelHandler = () => {
		afterSubmit('cancel');
	};

	const submitHandler = () => {
		afterSubmit('submit');
	};

	return (
		<>
			<DialogTitle>title</DialogTitle>
			<DialogContent dividers>
				<Form.Base>...ProfileForm elements...</Form.Base>
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelHandler} color="primary">
					Cancel
				</Button>
				<Button onClick={submitHandler} color="primary" autoFocus>
					Submit
				</Button>
			</DialogActions>
		</>
	);
};

export default ProfileForm;
