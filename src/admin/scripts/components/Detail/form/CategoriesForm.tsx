import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Form } from '../../ui';
import { CategoriesItemProps } from '../../../types/App';

interface CategoriesFormProps {
	detailData: CategoriesItemProps;
	onDelete?: (ids: any[]) => void;
	onSubmit?: (data: any) => void;
	onCancel?: () => void;
	allowDelete?: boolean;
}

const CategoriesForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
}: CategoriesFormProps) => {
	const { t } = useTranslation(['common', 'model']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
	});

	const onSubmitHandler = (data) => onSubmit(data);

	return (
		<>
			{detailData && (
				<>
					<DialogTitle>
						{detailData.id == 'new'
							? t('btn_new.Categories')
							: detailData.lang['en'].title}
					</DialogTitle>
					<DialogContent dividers>
						<Form.Base name="CategoriesForm">
							...CategoriesForm elements...
							<br />
							{JSON.stringify(detailData)} ...
						</Form.Base>
					</DialogContent>
					<DialogActions>
						<Button onClick={onCancel} color="primary">
							Cancel
						</Button>
						{detailData?.id !== 'new' && (
							<Button
								onClick={() => onDelete([detailData?.id])}
								color="primary"
							>
								Delete
							</Button>
						)}
						<Button
							onClick={handleSubmit(onSubmitHandler)}
							color="primary"
							autoFocus
						>
							Submit
						</Button>
					</DialogActions>
				</>
			)}
		</>
	);
};

export default CategoriesForm;
