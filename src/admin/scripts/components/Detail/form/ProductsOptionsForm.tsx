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
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';

import { string } from '../../../../../libs/utils';
import config from '../../../config';
import { DEFAULT_UNITS } from '../../../constants';
import { Form, Section, Tabs, Wysiwyg } from '../../ui';
import { ProductsOptionsItemProps } from '../../../types/Market';
import Language from '../../Language';
import { useSettings } from '../../../hooks/App';
import { useProductsOptions } from '../../../hooks/Market';
import Picker from '../../Picker';
import checkDuplicates from '../checkDuplicates';

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface ProductsOptionsFormProps {
	detailData: ProductsOptionsItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: ProductsOptionsItemProps) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const ProductsOptionsForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: ProductsOptionsFormProps) => {
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
	const { ProductsOptions } = useProductsOptions();

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
		setDuplicates(checkDuplicates(ProductsOptions, name, detailData.id));

	return (
		<>
			<DialogTitle>
				{detailData.id == 'new'
					? t('btn_new.ProductsOptions')
					: detailData.lang[lang].title}
			</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="ProductsOptionsForm">
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
								detailData.type ||
								config.OPTIONS.model.ProductsOptions.type_default
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
									{config.OPTIONS.model.ProductsOptions.type_list.map((opt) => (
										<MenuItem key={opt} value={opt}>
											{t(`types:${opt}`)}
										</MenuItem>
									))}
								</Form.Select>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.data')} withBorder>
						<Form.RowController
							label={t('input:value.label')}
							name={'value'}
							control={control}
							defaultValue={detailData.value || ''}
						>
							{(row) => (
								<TextField
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:value.placeholder')}
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
									label={t('input:description.label')}
									control={control}
									name={`lang.${lng}.description`}
									defaultValue={''}
								>
									{(row) => (
										<TextField
											type="text"
											placeholder={t('input:description.placeholder')}
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
							</LanguageWrapperPanel>
						))}
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
export default ProductsOptionsForm;
