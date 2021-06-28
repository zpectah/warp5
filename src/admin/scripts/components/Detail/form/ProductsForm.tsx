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
import { ProductsItemProps } from '../../../types/Market';
import Language from '../../Language';
import { useSettings } from '../../../hooks/App';
import { useProducts } from '../../../hooks/Market';
import Picker from '../../Picker';
import checkDuplicates from '../checkDuplicates';

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface ProductsFormProps {
	detailData: ProductsItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: ProductsItemProps) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const ProductsForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: ProductsFormProps) => {
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
	const { Products } = useProducts();

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
		setDuplicates(checkDuplicates(Products, name, detailData.id));

	return (
		<>
			<DialogTitle>
				{detailData.id == 'new'
					? t('btn_new.Products')
					: detailData.lang[lang].title}
			</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="ProductsForm">
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
						<input
							type="hidden"
							name="rating"
							ref={register()}
							defaultValue={detailData.rating || 0}
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
								detailData.type || config.OPTIONS.model.Products.type_default
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
									{config.OPTIONS.model.Products.type_list.map((opt) => (
										<MenuItem key={opt} value={opt}>
											{t(`types:${opt}`)}
										</MenuItem>
									))}
								</Form.Select>
							)}
						</Form.RowController>
					</Section>
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
					<Section title={t('common:title.data')} withBorder>
						<Form.RowController
							label={t('input:price.label')}
							name={'item_price'}
							control={control}
							defaultValue={detailData.item_price || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:price.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{DEFAULT_UNITS.price}
											</InputAdornment>
										),
									}}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:discount.label')}
							name={'item_discount'}
							control={control}
							defaultValue={detailData.item_discount || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:discount.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">%</InputAdornment>
										),
									}}
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.dimensions')} withBorder>
						<Form.RowController
							label={t('input:weight.label')}
							name={'item_weight'}
							control={control}
							defaultValue={detailData.item_weight || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:weight.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{DEFAULT_UNITS.weight}
											</InputAdornment>
										),
									}}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:length.label')}
							name={'item_length'}
							control={control}
							defaultValue={detailData.item_length || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:price.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{DEFAULT_UNITS.length}
											</InputAdornment>
										),
									}}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:width.label')}
							name={'item_width'}
							control={control}
							defaultValue={detailData.item_width || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:width.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{DEFAULT_UNITS.length}
											</InputAdornment>
										),
									}}
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:height.label')}
							name={'item_height'}
							control={control}
							defaultValue={detailData.item_height || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:height.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{DEFAULT_UNITS.length}
											</InputAdornment>
										),
									}}
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.store')} withBorder>
						<Form.RowController
							label={t('input:amount.label')}
							name={'item_amount'}
							control={control}
							defaultValue={detailData.item_amount || 0}
						>
							{(row) => (
								<TextField
									type="number"
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									style={{ width: '40%' }}
									variant="outlined"
									size="small"
									placeholder={t('input:amount.placeholder')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">pcs</InputAdornment>
										),
									}}
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
					<Section title={t('common:title.product')} withBorder>
						<Form.RowController
							label={t('input:isNew.label')}
							name={'item_new'}
							control={control}
							defaultValue={detailData.item_new || 1}
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
						<Form.RowController
							label={t('input:isUsed.label')}
							name={'item_used'}
							control={control}
							defaultValue={detailData.item_used || 0}
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
						<Form.RowController
							label={t('input:isUnboxed.label')}
							name={'item_unboxed'}
							control={control}
							defaultValue={detailData.item_unboxed || 0}
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
					<Section title={t('common:title.options')}>
						<Form.RowController
							label={t('input:options.label')}
							name={'products_options'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.products_options || []}
						>
							{(row) => (
								<Picker.ProductsOptions
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									multiple
								/>
							)}
						</Form.RowController>
						<Form.RowController
							label={t('input:relatedProducts.label')}
							name={'items_related'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.items_related || []}
						>
							{(row) => (
								<Picker.Products
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									onBlur={row.onBlur}
									ignoredId={detailData.id !== 'new' && [detailData.id]}
									multiple
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
export default ProductsForm;
