import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText'; // TODO -> as error message to row under input ...
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';

import config from '../../../config';
import { Form, Section, Tabs } from '../../ui';
import { CategoriesItemProps } from '../../../types/App';
import Language from '../../Language';
import { useSettings } from '../../../hooks/App';
import setLanguageModel from '../setLanguageModel';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface CategoriesFormProps {
	detailData: CategoriesItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: CategoriesItemProps) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const CategoriesForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: CategoriesFormProps) => {
	const { t } = useTranslation([
		'common',
		'component',
		'model',
		'input',
		'types',
	]);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const { Settings } = useSettings();

	// Static variables
	const langDefault: string = Settings?.language_default;
	const langList: string[] = Settings?.language_active;

	// Form controller
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
				perex: '',
				content: '',
			}),
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
				{detailData.id == 'new'
					? t('btn_new.Categories')
					: detailData.lang[lang].title}
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
					<Section withBorder>
						<Form.RowController
							label={t('input:name.label')}
							name={'name'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.name || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:name.placeholder')}
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
							label={t('input:type.label')}
							name={'type'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.type || 'default'}
						>
							{(row) => (
								<>
									<Form.Select
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										onBlur={row.onBlur}
										placeholder={t('input:type.placeholder')}
									>
										{config.OPTIONS.model.Categories.type_list.map((opt) => (
											<MenuItem key={opt} value={opt}>
												{t(`types:${opt}`)}
											</MenuItem>
										))}
									</Form.Select>
								</>
							)}
						</Form.RowController>
						<Form.Row label={t('input:parent.label')}>
							parent TODO: picker
						</Form.Row>
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
								<Form.Row label={t('input:content.label')}>
									wysiwyg content TODO: wysiwyg
								</Form.Row>
							</LanguageWrapperPanel>
						))}
					</Section>
					<Section title={t('common:title.media')} withBorder>
						<Form.Row label={t('input:imgMain.label')}>
							main image TODO: uploads picker
						</Form.Row>
						<Form.Row label={t('input:imgThumbnail.label')}>
							thumbnail TODO: uploads picker
						</Form.Row>
					</Section>
					<Section title={t('common:title.options')}>
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
				<Button onClick={handleSubmit(onSubmitHandler)} color="primary">
					{detailData.id == 'new' ? t('btn.create') : t('btn.update')}
				</Button>
			</DialogActions>
		</>
	);
};
export default CategoriesForm;
