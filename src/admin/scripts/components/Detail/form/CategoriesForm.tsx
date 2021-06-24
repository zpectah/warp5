import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import config from '../../../config';
import { Form, Section } from '../../ui';
import { CategoriesItemProps } from '../../../types/App';
import { useSettings } from '../../../hooks/App';
import Language from '../../Language';

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
	const { t } = useTranslation(['common', 'component', 'model']);
	const { Settings } = useSettings();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	// Static variables
	const langDefault: string = Settings?.language_default;
	const langList: string[] = Settings?.language_active;

	useEffect(() => {
		if (langDefault) setLang(langDefault);
	}, [langDefault]);

	const onSubmitHandler = (data) => onSubmit(data);

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
						<Form.Row>
							<Language.Toggle
								langDefault={lang}
								langList={langList}
								onChange={(lng) => setLang(lng)}
							/>
						</Form.Row>
					</Section>
					<Section>... {JSON.stringify(detailData)} ...</Section>
					<Section>
						<LanguageWrapper>
							{langList?.map((lng) => (
								<LanguageWrapperPanel key={lng} isActive={lng == lang}>
									<Form.Row>lang content {lang} : title ...</Form.Row>
									<Form.Row>lang content {lang} : description ...</Form.Row>
								</LanguageWrapperPanel>
							))}
						</LanguageWrapper>
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
