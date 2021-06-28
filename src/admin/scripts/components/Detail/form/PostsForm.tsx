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
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import styled from 'styled-components';

import { string } from '../../../../../libs/utils';
import config from '../../../config';
import { Form, Section, Tabs, Wysiwyg } from '../../ui';
import { PostsItemProps } from '../../../types/App';
import Language from '../../Language';
import { useSettings, usePosts } from '../../../hooks/App';
import Picker from '../../Picker';
import checkDuplicates from '../checkDuplicates';

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface PostsFormProps {
	detailData: PostsItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: PostsItemProps) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const PostsForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: PostsFormProps) => {
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
	const { Posts } = usePosts();

	// Static variables
	const langList: string[] = Settings?.language_active;
	const DatePickerFormat = config.LOCALES.dateTimeFormat;

	// Form controller
	const { control, handleSubmit, formState, register, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	// Submit handler
	const onSubmitHandler = (data) => {
		const master = { ...data };

		master.authorized = getAuthorized(detailData.authorized);

		onSubmit(master);
	};

	// When language on content changed
	const onLanguageChange = (lang: string) => {
		setLang(lang);
	};

	// Check duplicates
	const checkDupes = (name: string) =>
		setDuplicates(checkDuplicates(Posts, name, detailData.id));

	// Is authorized
	const getAuthorized = (authorized) => {
		if (Settings.redactor_content_approval && authorId) {
			return 0;
		} else {
			return authorized ? 1 : 0;
		}
	};

	const watchType = watch('type');

	return (
		<>
			<DialogTitle>
				{detailData.id == 'new'
					? t('btn_new.Posts')
					: detailData.lang[lang].title}
			</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="PostsForm">
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
						<input
							type="hidden"
							name="author"
							ref={register()}
							defaultValue={detailData.author || authorId}
						/>
						<input
							type="hidden"
							name="post_options"
							ref={register()}
							defaultValue={detailData.post_options || ''}
						/>
						<input
							type="hidden"
							name="rating"
							ref={register()}
							defaultValue={detailData.rating || 0}
						/>
						{watchType !== 'event' && (
							<>
								<input
									type="hidden"
									name="event_start"
									ref={register()}
									defaultValue={detailData.event_start || ''}
								/>
								<input
									type="hidden"
									name="event_end"
									ref={register()}
									defaultValue={detailData.event_end || ''}
								/>
								<input
									type="hidden"
									name="event_location"
									ref={register()}
									defaultValue={detailData.event_location || []}
								/>
								<input
									type="hidden"
									name="event_address"
									ref={register()}
									defaultValue={detailData.event_address || ''}
								/>
								<input
									type="hidden"
									name="event_country"
									ref={register()}
									defaultValue={detailData.event_country || ''}
								/>
								<input
									type="hidden"
									name="event_city"
									ref={register()}
									defaultValue={detailData.event_city || ''}
								/>
								<input
									type="hidden"
									name="event_zip"
									ref={register()}
									defaultValue={detailData.event_zip || ''}
								/>
							</>
						)}
					</div>
					<Section withBorder>
						<Form.RowController
							label={t('input:name.label')}
							name={'name'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.name || ''}
							errors={duplicates ? [t('messages:error.nameInUse')] : []}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:name.placeholder')}
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
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:type.label')}
							name={'type'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={
								detailData.type || config.OPTIONS.model.Posts.type_default
							}
						>
							{(row) => (
								<Form.Select
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									placeholder={t('input:type.placeholder')}
								>
									{config.OPTIONS.model.Posts.type_list.map((opt) => (
										<MenuItem key={opt} value={opt}>
											{t(`types:${opt}`)}
										</MenuItem>
									))}
								</Form.Select>
							)}
						</Form.RowController>
					</Section>
					{watchType == 'event' && (
						<Section title={t('common:title.event')} withBorder>
							<Form.RowController
								label={t('input:eventStart.label')}
								name={'event_start'}
								control={control}
								defaultValue={detailData.event_start || new Date()}
							>
								{(row) => (
									<DateTimePicker
										id={row.id}
										value={row.value}
										onChange={(moment) => {
											row.onChange(moment.format());
										}}
										inputVariant="outlined"
										placeholder={t('input:eventStart.placeholder')}
										onBlur={row.onBlur}
										style={{ width: '50%' }}
										size="small"
									/>
								)}
							</Form.RowController>
							<Form.RowController
								label={t('input:eventEnd.label')}
								name={'event_end'}
								control={control}
								defaultValue={detailData.event_end || new Date()}
							>
								{(row) => (
									<DateTimePicker
										id={row.id}
										value={row.value}
										onChange={(moment) => {
											row.onChange(moment.format());
										}}
										inputVariant="outlined"
										placeholder={t('input:eventEnd.placeholder')}
										onBlur={row.onBlur}
										style={{ width: '50%' }}
										size="small"
									/>
								)}
							</Form.RowController>
							<Form.RowController
								label={t('input:address.label')}
								name={'event_address'}
								control={control}
								defaultValue={detailData.event_address || ''}
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
								label={t('input:country.label')}
								name={'event_country'}
								control={control}
								defaultValue={detailData.event_country || ''}
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
								name={'event_city'}
								control={control}
								defaultValue={detailData.event_city || ''}
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
								label={t('input:zip.label')}
								name={'event_zip'}
								control={control}
								defaultValue={detailData.event_zip || ''}
							>
								{(row) => (
									<TextField
										type="text"
										placeholder={t('input:zip.placeholder')}
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
								label={t('input:location.label')}
								name={'event_location'}
								control={control}
								defaultValue={detailData.event_location || [0, 0]}
							>
								{(row) => (
									<Picker.Location
										inputId={row.id}
										value={row.value}
										onChange={(value) => {
											console.log(row.value, value);

											row.onChange(value);
										}}
										rowStyle={{ width: '75%' }}
									/>
								)}
							</Form.RowController>
						</Section>
					)}
					<Section title={t('common:title.taxonomy')} withBorder>
						<Form.RowController
							label={t('input:category.label')}
							name={'category'}
							control={control}
							defaultValue={detailData.category || []}
						>
							{(row) => (
								<Picker.Categories
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									multiple
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:tags.label')}
							name={'tags'}
							control={control}
							defaultValue={detailData.tags || []}
						>
							{(row) => (
								<Picker.Tags
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									multiple
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.languageContent')} withBorder>
						{langList.length > 1 && (
							<Language.Tabs langList={langList} onChange={onLanguageChange} />
						)}
						{langList?.map((lng) => (
							<LanguageWrapperPanel key={lng} isActive={lng == lang}>
								<Form.RowController
									label={t('input:title.label')}
									control={control}
									name={`lang.${lng}.title`}
									rules={{ required: true }}
									required
									defaultValue={''}
								>
									{(row) => (
										<TextField
											type="text"
											placeholder={t('input:title.placeholder')}
											id={row.id}
											value={row.value}
											onChange={row.onChange}
											onBlur={row.onBlur}
											style={{ width: '100%' }}
											variant="outlined"
											size="small"
										/>
									)}
								</Form.RowController>
								<Form.RowController
									label={t('input:perex.label')}
									control={control}
									name={`lang.${lng}.perex`}
									defaultValue={''}
								>
									{(row) => (
										<TextField
											type="text"
											placeholder={t('input:perex.placeholder')}
											id={row.id}
											value={row.value}
											onChange={row.onChange}
											onBlur={row.onBlur}
											style={{ width: '100%' }}
											variant="outlined"
											size="small"
											multiline
											rows={4}
										/>
									)}
								</Form.RowController>
								<Form.RowController
									label={t('input:content.label')}
									control={control}
									name={`lang.${lng}.content`}
									defaultValue={
										(detailData?.lang && detailData?.lang[lng]?.content) || ''
									}
								>
									{(row) => (
										<Wysiwyg
											id={row.id}
											value={row.value}
											onChange={row.onChange}
											placeholder={t('input:content.placeholder')}
										/>
									)}
								</Form.RowController>
							</LanguageWrapperPanel>
						))}
					</Section>
					<Section title={t('common:title.media')} withBorder>
						<Form.RowController
							label={t('input:imgThumbnail.label')}
							control={control}
							name={`img_thumbnail`}
							defaultValue={detailData?.img_thumbnail || ''}
						>
							{(row) => (
								<Picker.Uploads
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									placeholder={t('input:imgThumbnail.placeholder')}
									mode={'image'}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:imgMain.label')}
							control={control}
							name={`img_main`}
							defaultValue={detailData?.img_main || ''}
						>
							{(row) => (
								<Picker.Uploads
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									placeholder={t('input:imgMain.placeholder')}
									mode={'image'}
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.extraMedia')} withBorder>
						<Form.RowController
							label={t('input:media.label')}
							control={control}
							name={`media`}
							defaultValue={detailData?.media || []}
						>
							{(row) => (
								<Picker.Uploads
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									placeholder={t('input:media.placeholder')}
									mode={'image'}
									multiple
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.attachments')} withBorder>
						<Form.RowController
							label={t('input:attachments.label')}
							control={control}
							name={`attachments`}
							defaultValue={detailData?.attachments || []}
						>
							{(row) => (
								<Picker.Uploads
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									placeholder={t('input:attachments.placeholder')}
									multiple
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.options')}>
						<Form.RowController
							label={t('input:published.label')}
							name={'published'}
							control={control}
							defaultValue={detailData.published || new Date()}
						>
							{(row) => (
								<DateTimePicker
									id={row.id}
									value={row.value}
									onChange={(moment) => {
										row.onChange(moment.format());
									}}
									inputVariant="outlined"
									placeholder={t('input:published.placeholder')}
									onBlur={row.onBlur}
									style={{ width: '50%' }}
									size="small"
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:authorized.label')}
							name={'authorized'}
							control={control}
							defaultValue={detailData.authorized || 1}
						>
							{(row) => (
								<Switch
									checked={row.value == 1}
									value={moment(row.value, DatePickerFormat)}
									onChange={(e) => row.onChange(e.target.checked ? 1 : 0)}
									name={row.name}
									color="primary"
									inputProps={{ 'aria-label': 'item active' }}
								/>
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
export default PostsForm;
