import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Form, Section } from '../../ui';
import { CategoriesItemProps } from '../../../types/App';

interface CategoriesFormProps {
	detailData: CategoriesItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: any) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
}

const CategoriesForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
}: CategoriesFormProps) => {
	const { t } = useTranslation(['common', 'model']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
	});

	const onSubmitHandler = (data) => onSubmit(data);

	return (
		<>
			{processing && <>...processing preloader...</>}
			{detailData && (
				<>
					<DialogTitle>
						{detailData.id == 'new'
							? t('btn_new.Categories')
							: detailData.lang['en'].title}
					</DialogTitle>
					<DialogContent dividers>
						<Form.Base name="CategoriesForm">
							<div>
								<input
									type="hidden"
									name="id"
									ref={register({ required: true })}
									defaultValue={detailData.id}
								/>
							</div>
							<Section>... Categories Form elements ...</Section>
							<Section>... {JSON.stringify(detailData)} ...</Section>
						</Form.Base>
					</DialogContent>
					<DialogActions>
						<Button onClick={onCancel} color="primary">
							{t('btn.cancel')}
						</Button>
						{detailData.id !== 'new' && allowDelete && (
							<Button onClick={() => onDelete([detailData.id])} color="primary">
								{t('btn.delete')}
							</Button>
						)}
						<Button
							onClick={handleSubmit(onSubmitHandler)}
							color="primary"
							autoFocus
						>
							{detailData.id == 'new' ? t('btn.create') : t('btn.update')}
						</Button>
					</DialogActions>
				</>
			)}
		</>
	);
};
export default CategoriesForm;
