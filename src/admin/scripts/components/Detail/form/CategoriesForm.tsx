import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Form } from '../../ui';

interface CategoriesFormProps {
	detailData: any;
	onDelete?: (ids: number[]) => void;
	onSubmit?: (data: any) => void;
	onCancel?: () => void;
}

const CategoriesForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
}: CategoriesFormProps) => {
	return (
		<>
			<DialogTitle>title</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="CategoriesForm">
					...CategoriesForm elements...
				</Form.Base>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color="primary">
					Cancel
				</Button>
				<Button onClick={() => onDelete([detailData.id])} color="primary">
					Delete
				</Button>
				<Button onClick={onSubmit} color="primary" autoFocus>
					Submit
				</Button>
			</DialogActions>
		</>
	);
};

export default CategoriesForm;
