import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Dialog, Form, Section } from '../../ui';
import { MenuItemsItemProps } from '../../../types/App';
import { string } from '../../../../../libs/utils';
import config from '../../../config';
import { useSettings, useTranslations } from '../../../hooks/App';
import TextField from '@material-ui/core/TextField';
import Language from '../../Language';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Picker from '../../Picker';

interface MenuItemDetailProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onDelete?: (id: number | string) => void;
	onSubmit?: (data: any) => void;
	onClose?: () => void;
	detailData: MenuItemsItemProps;
	menuId: number | string;
}

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

const MenuItemDetail: React.FC<MenuItemDetailProps> = ({
	open,
	onToggle,
	detailData,
	onDelete,
	onSubmit,
	onClose,
	menuId,
}) => {
	const { t } = useTranslation(['common', 'message', 'component', 'types']);
	const [isOpen, setOpen] = useState(open);
	const [lang, setLang] = useState<string>(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const { Settings } = useSettings();
	const { Translations } = useTranslations();

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

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	useEffect(() => {
		console.log('detailData:', detailData);
	}, [detailData]);

	return (
		<>
			<Dialog.Blank
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				size={'md'}
				onClose={() => {
					onClose();
					setOpen(false);
				}}
			>
				<DialogTitle>
					{detailData.id == 'new' ? t('btn_new.MenuItems') : detailData.name}
				</DialogTitle>
				<DialogContent dividers>
					<Form.Base name="MenuItemDetailForm">
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
										onChange={(e) => {
											row.onChange(e.target.value);
										}}
										onBlur={(e) => {
											row.onBlur(e.target.value);
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
								defaultValue={detailData.type || 'default'}
							>
								{(row) => (
									<Form.Select
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										onBlur={row.onBlur}
										placeholder={t('input:type.placeholder')}
									>
										{config.OPTIONS.model.MenuItems.type_list.map((opt) => (
											<MenuItem key={opt} value={opt}>
												{t(`types:${opt}`)}
											</MenuItem>
										))}
									</Form.Select>
								)}
							</Form.RowController>
						</Section>
						<Section withBorder>
							{/*
							<Form.RowController
								label={t('input:page.label')}
								name={'page'}
								control={control}
								defaultValue={''}
							>
								{(row) => (
									<Picker.Pages
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										onBlur={row.onBlur}
									/>
								)}
							</Form.RowController>
							*/}
							<Form.RowController
								label={t('input:parent.label')}
								name={'parent'}
								control={control}
								defaultValue={detailData.parent || ''}
							>
								{(row) => (
									<Picker.MenuItems
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										onBlur={row.onBlur}
										ignoredId={detailData.id !== 'new' && [detailData.id]}
										menuId={menuId}
									/>
								)}
							</Form.RowController>
							<Form.RowController
								label={t('input:link.label')}
								name={'link'}
								control={control}
								rules={{ required: true }}
								required
								defaultValue={detailData.link || ''}
							>
								{(row) => (
									<TextField
										type="text"
										placeholder={t('input:link.placeholder')}
										id={row.id}
										value={row.value}
										onChange={(e) => {
											row.onChange(e.target.value);
										}}
										onBlur={(e) => {
											row.onBlur(e.target.value);
										}}
										style={{ width: '75%' }}
										variant="outlined"
										size="small"
									/>
								)}
							</Form.RowController>
							<Form.RowController
								label={t('input:order.label')}
								name={'item_order'}
								control={control}
								rules={{ required: true }}
								required
								defaultValue={detailData.item_order || 0}
							>
								{(row) => (
									<TextField
										type="number"
										placeholder={t('input:order.placeholder')}
										id={row.id}
										value={row.value}
										onChange={(e) => {
											row.onChange(e.target.value);
										}}
										onBlur={(e) => {
											row.onBlur(e.target.value);
										}}
										style={{ width: '50%' }}
										variant="outlined"
										size="small"
									/>
								)}
							</Form.RowController>
						</Section>
						<Section title={t('common:title.languageContent')} withBorder>
							{langList.length > 1 && (
								<Language.Tabs
									langList={langList}
									onChange={onLanguageChange}
								/>
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
					<Button onClick={() => onToggle(false)}>{t('btn.cancel')}</Button>
					{detailData.id !== 'new' && (
						<Button onClick={() => onDelete(detailData.id)} color="secondary">
							{t('btn.delete')}
						</Button>
					)}
					<Button onClick={handleSubmit(onSubmitHandler)} color="primary">
						{detailData.id == 'new' ? t('btn.create') : t('btn.update')}
					</Button>
				</DialogActions>
			</Dialog.Blank>
		</>
	);
};

export default MenuItemDetail;
