import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import config from '../../../config';
import { Form, Section, Tabs } from '../../ui';
import { CategoriesItemProps } from '../../../types/App';
import Language from '../../Language';
import { useSettings } from '../../../hooks/App';
import LanguageTabs from '../../Language/LanguageTabs';

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
	const { t } = useTranslation(['common', 'component', 'model', 'input']);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { Settings } = useSettings();

	// Static variables
	const langDefault: string = Settings?.language_default;
	const langList: string[] = Settings?.language_active;

	const onSubmitHandler = (data) => onSubmit(data);

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
					<Section>... Categories Form elements ...</Section>
					<Section>
						<Form.Row>...</Form.Row>
						<Form.RowController
							label={t('input:name.label')}
							name={'name'}
							control={control}
							defaultValue={detailData.name || ''}
						>
							{(row) => (
								<TextField
									type="text"
									placeholder={t('input:name.placeholder')}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									style={{ width: '75%' }}
									variant="outlined"
									size="small"
								/>
							)}
						</Form.RowController>
					</Section>
					<Section>... {JSON.stringify(detailData)} ...</Section>
					<Section>
						{langList.length > 1 && (
							<Language.Tabs langList={langList} onChange={onLanguageChange} />
						)}
						{langList.map((lng) => (
							<LanguageWrapperPanel key={lng} isActive={lng == lang}>
								<Form.RowController
									label={t('input:title.label')}
									control={control}
									name={`lang.${lng}.title`}
									defaultValue={detailData?.lang[lng].title || ''}
								>
									{(row) => (
										<TextField
											type="text"
											placeholder={t('input:title.placeholder')}
											id={row.id}
											value={row.value}
											onChange={row.onChange}
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
									defaultValue={detailData?.lang[lng].description || ''}
								>
									{(row) => (
										<TextField
											type="text"
											placeholder={t('input:description.placeholder')}
											id={row.id}
											value={row.value}
											onChange={row.onChange}
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
					<Section>...</Section>
					<Section>...</Section>
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
