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
import { MembersItemProps } from '../../../types/Members';
import Language from '../../Language';
import { useProfile, useSettings } from '../../../hooks/App';
import { useMembers } from '../../../hooks/Members';
import Picker from '../../Picker';
import { EMAIL_REGEX } from '../../../constants';
import checkDuplicates from '../checkDuplicates';
import { string } from '../../../../../libs/utils';

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface MembersFormProps {
	detailData: MembersItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: MembersItemProps) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const MembersForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: MembersFormProps) => {
	const { t } = useTranslation([
		'common',
		'component',
		'model',
		'input',
		'types',
		'messages',
	]);
	const [lang, setLang] = useState<string>(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [duplicates, setDuplicates] = useState<boolean>(false);
	const { Settings } = useSettings();
	const { Profile } = useProfile();
	const { Members } = useMembers();

	// Static variables
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

	// Check duplicates
	const checkDupes = (name: string) =>
		setDuplicates(checkDuplicates(Members, name, detailData.id, 'email'));

	return (
		<>
			<DialogTitle>
				{detailData.id == 'new' ? t('btn_new.Members') : detailData.email}
			</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="MembersForm">
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
							errors={duplicates ? [t('messages:error.emailInUse')] : []}
						>
							{(row) => (
								<TextField
									type="email"
									placeholder={t('input:email.placeholder')}
									id={row.id}
									value={row.value}
									onChange={(e) => {
										row.onChange(e.target.value);
										if (e.target.value.length > 2) checkDupes(e.target.value);
									}}
									onBlur={(e) => {
										row.onBlur(e.target.value);
										if (e.target.value.length > 2) checkDupes(e.target.value);
									}}
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
					<Section title={t('common:title.contact')} withBorder>
						<Form.RowController
							label={t('input:email.label')}
							name={'member_email'}
							control={control}
							defaultValue={detailData.member_email || []}
						>
							{(row) => (
								<Picker.Tag
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									rowStyle={{ width: '75%' }}
									inputType="email"
									inputPlaceholder={t('input:email.placeholder')}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:phone.label')}
							name={'member_phone'}
							control={control}
							defaultValue={detailData.member_phone || []}
						>
							{(row) => (
								<Picker.Tag
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									rowStyle={{ width: '75%' }}
									inputType="tel"
									inputPlaceholder={t('input:phone.placeholder')}
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.address')} withBorder>
						<Form.RowController
							label={t('input:country.label')}
							name={'member_country'}
							control={control}
							defaultValue={detailData.member_country || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:country.placeholder')}
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
							label={t('input:city.label')}
							name={'member_city'}
							control={control}
							defaultValue={detailData.member_city || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:city.placeholder')}
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
							label={t('input:address.label')}
							name={'member_address'}
							control={control}
							defaultValue={detailData.member_address || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:address.placeholder')}
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
							label={t('input:zip.label')}
							name={'member_zip'}
							control={control}
							defaultValue={detailData.member_zip || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:zip.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '50%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.descriptions')} withBorder>
						<Form.RowController
							label={t('input:description.label')}
							name={'description'}
							control={control}
							defaultValue={detailData.description || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:description.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
									multiline
									rows={3}
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.options')}>
						<Form.RowController
							label={t('input:group.label')}
							name={'member_group'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.member_group || 'none'}
						>
							{(row) => (
								<Form.Select
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									placeholder={t('input:group.placeholder')}
								>
									{config.OPTIONS.model.Members.group_list.map((opt) => (
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
					disabled={!formState.isValid || duplicates}
				>
					{detailData.id == 'new' ? t('btn.create') : t('btn.update')}
				</Button>
			</DialogActions>
		</>
	);
};
export default MembersForm;
