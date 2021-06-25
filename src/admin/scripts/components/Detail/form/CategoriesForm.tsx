import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
// import styled from 'styled-components';

import config from '../../../config';
import { Form, Section, Tabs } from '../../ui';
import { CategoriesItemProps } from '../../../types/App';
import Language from '../../Language';

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
	const { t } = useTranslation(['common', 'component', 'model']);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	const onSubmitHandler = (data) => onSubmit(data);

	const onLanguageChange = (lang: string, langList: string[]) => {
		setLang(lang);
		setLangList(langList);
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
					</Section>
					<Section>... {JSON.stringify(detailData)} ...</Section>
					<Section>
						<Language.Tabs
							name="form-detail-language-content-tab"
							onChange={onLanguageChange}
							ariaLabel="language content form"
						>
							{langList.map((lng) => (
								<Tabs.Panel key={lng}>
									<Form.Row>lang content {lang} : title ...</Form.Row>
									<Form.Row>lang content {lang} : description ...</Form.Row>
								</Tabs.Panel>
							))}
						</Language.Tabs>
					</Section>
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
