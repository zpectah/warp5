import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';

import config from '../../../config';
import { Form, Section, Tabs, Wysiwyg } from '../../ui';
import { UsersItemProps } from '../../../types/App';
import Language from '../../Language';
import { useProfile, useSettings } from '../../../hooks/App';
import Picker from '../../Picker';
import { EMAIL_REGEX, USER_LEVEL } from '../../../constants';

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface UsersFormProps {
	detailData: UsersItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: UsersItemProps) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const UsersForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: UsersFormProps) => {
	const { t } = useTranslation([
		'common',
		'component',
		'model',
		'input',
		'types',
	]);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const { Settings } = useSettings();
	const { Profile } = useProfile();

	// Static variables
	const langDefault: string = Settings?.language_default;
	const langList: string[] = Settings?.language_active;

	// Form controller
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	// Submit handler
	const onSubmitHandler = (data) => onSubmit(data);

	// When language on content changed
	const onLanguageChange = (lang: string) => {
		setLang(lang);
	};

	return (
		<>
			<DialogTitle>
				{detailData.id == 'new' ? t('btn_new.Users') : detailData.email}
			</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="UsersForm">
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
						<input
							type="hidden"
							name="img_avatar"
							ref={register()}
							defaultValue={detailData.img_avatar}
						/>
					</div>
					<Section withBorder>
						<Form.RowController
							label={t('input:email.label')}
							name={'email'}
							control={control}
							rules={{ required: true, pattern: EMAIL_REGEX }}
							required
							defaultValue={detailData.email || ''}
						>
							{(row) => (
								<TextField
									type="email"
									placeholder={t('input:email.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
									disabled={detailData.id !== 'new'}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:password.label')}
							name={'password'}
							control={control}
							rules={{ required: detailData.id == 'new' }}
							required={detailData.id == 'new'}
							defaultValue={detailData.password || ''}
						>
							{(row) => (
								<TextField
									type="password"
									placeholder={t('input:password.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:nickname.label')}
							name={'nickname'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.nickname || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:nickname.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.credentials')} withBorder>
						<Form.RowController
							label={t('input:firstName.label')}
							name={'first_name'}
							control={control}
							defaultValue={detailData.first_name || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:firstName.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:middleName.label')}
							name={'middle_name'}
							control={control}
							defaultValue={detailData.middle_name || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:middleName.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:lastName.label')}
							name={'last_name'}
							control={control}
							defaultValue={detailData.last_name || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:lastName.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.options')}>
						<Form.RowController
							label={t('input:level.label')}
							name={'user_level'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.user_level || 0}
						>
							{(row) => (
								<Form.Select
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									placeholder={t('input:level.placeholder')}
								>
									{config.OPTIONS.model.Users.level_list.map((opt) => (
										<MenuItem
											key={opt}
											value={USER_LEVEL[opt].id}
											disabled={USER_LEVEL[opt].id > Profile?.user_level}
										>
											{t(`types:${opt}`)}
										</MenuItem>
									))}
								</Form.Select>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:group.label')}
							name={'user_group'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.user_group || 'default'}
						>
							{(row) => (
								<Form.Select
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									placeholder={t('input:group.placeholder')}
								>
									{config.OPTIONS.model.Users.group_list.map((opt) => (
										<MenuItem key={opt} value={opt}>
											{t(`types:${opt}`)}
										</MenuItem>
									))}
								</Form.Select>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:active.label')}
							name={'active'}
							control={control}
							defaultValue={detailData.active || 1}
						>
							{(row) => (
								<Switch
									checked={row.value == 1}
									value={row.value}
									onChange={(e) => row.onChange(e.target.checked ? 1 : 0)}
									name={row.name}
									color="primary"
									inputProps={{ 'aria-label': 'item active' }}
								/>
							)}
						</Form.RowController>
					</Section>
				</Form.Base>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>{t('btn.cancel')}</Button>
				{detailData.id !== 'new' && allowDelete && (
					<Button onClick={() => onDelete([detailData.id])} color="secondary">
						{t('btn.delete')}
					</Button>
				)}
				<Button
					onClick={handleSubmit(onSubmitHandler)}
					color="primary"
					disabled={!formState.isValid}
				>
					{detailData.id == 'new' ? t('btn.create') : t('btn.update')}
				</Button>
			</DialogActions>
		</>
	);
};
export default UsersForm;
