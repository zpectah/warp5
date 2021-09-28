import React, { useState, useCallback, useEffect, useRef } from 'react';
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

import { array } from '../../../../../libs/utils';
import config from '../../../config';
import { Form, Section, Tabs, Wysiwyg, FileIcon } from '../../ui';
import { UploadsItemProps } from '../../../types/App';
import Language from '../../Language';
import { useSettings, useUploads } from '../../../hooks/App';
import Picker from '../../Picker';
import Uploader from '../../Uploader';
import checkDuplicates from '../checkDuplicates';
import { string } from '../../../../../libs/utils';

const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

const MediaContainer = styled.div`
	height: 250px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(250, 250, 250, 0.9);
`;
const StyledImage = styled.img`
	width: auto;
	max-height: 100%;
`;
const MediaTemporary = styled.div`
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface UploadsFormProps {
	detailData: UploadsItemProps;
	onDelete: (ids: any[]) => void;
	onSubmit: (data: UploadsItemProps, response?: any) => void;
	onCancel: () => void;
	allowDelete: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
}

const UploadsForm = ({
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	allowDelete,
	processing,
	loading,
	languageContent,
	authorId,
}: UploadsFormProps) => {
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
	const [uploading, setUploading] = useState(false);
	const [tmp_blob, setTmp_Blob] = useState<any>(null);
	const [tmp_meta, setTmp_meta] = useState({
		ext: '',
		name: '',
		mime: '',
		size: 0,
		type: 'undefined',
	});
	const { Settings } = useSettings();
	const { Uploads, updateUploads, createUploads } = useUploads();

	const inputName = useRef(null);

	// Static variables
	const langList: string[] = Settings?.language_active;

	// Form controller
	const { control, handleSubmit, formState, register, watch, setValue } =
		useForm({
			mode: 'all',
			defaultValues: {
				...detailData,
			},
		});

	// Submit handler
	const onSubmitHandler = (data) => {
		let master = {
			...detailData,
			...data,
		};

		setUploading(true);

		if (detailData.id == 'new') {
			master = {
				...data,
				name: string.replaceSpaces(data.name),
				fileBase64: tmp_blob,
				fileBase64Cropped: null, // TODO
				extension: tmp_meta.ext,
				file_name: string.replaceSpaces(tmp_meta.name),
				file_mime: tmp_meta.mime,
				file_size: tmp_meta.size,
				type: tmp_meta.type,
			};
		}

		setUploading(false);
		onSubmit(master);
		onCancel();
	};

	// When language on content changed
	const onLanguageChange = (lang: string) => {
		setLang(lang);
	};

	// Check duplicates
	const checkDupes = (name: string) =>
		setDuplicates(checkDuplicates(Uploads, name, detailData.id));

	const uploaderHandler = (blob, name, ext, mime, size, type) => {
		setDuplicates(false);
		setTmp_Blob(blob);
		setTmp_meta({
			ext: ext,
			name: name,
			mime: mime,
			size: size,
			type: type,
		});

		inputName.current.focus();

		return setValue('name', name.split('.').slice(0, -1).join('.'));
	};

	const onUploadReset = () => {
		setTmp_Blob(null);
		setTmp_meta({
			ext: '',
			name: '',
			mime: '',
			size: 0,
			type: 'undefined',
		});
	};

	return (
		<>
			<DialogTitle>
				{detailData.id == 'new' ? t('btn_new.Uploads') : detailData.file_name}
			</DialogTitle>
			<DialogContent dividers>
				<Form.Base name="UploadsForm">
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
					</div>
					<Section withBorder>
						{detailData.id == 'new' ? (
							<>
								<Uploader onChange={uploaderHandler} onReset={onUploadReset} />
							</>
						) : (
							<>
								<MediaContainer>
									{detailData.type == 'image' ? (
										<StyledImage
											src={
												config.UPLOADS_PATH.image.default + detailData.file_name
											}
											alt={detailData.name}
										/>
									) : (
										<MediaTemporary>
											<FileIcon type={detailData.type} />
											&nbsp;&nbsp;
											{detailData.file_name}
										</MediaTemporary>
									)}
								</MediaContainer>
							</>
						)}
					</Section>
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
									disabled={!(detailData.id == 'new')}
									// readOnly={!(detailData.id == 'new')}
									ref={inputName}
								/>
							)}
						</Form.RowController>
					</Section>
					<Section title={t('common:title.taxonomy')} withBorder>
						<Form.RowController
							label={t('input:gallery.label')}
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
									mode="gallery"
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
export default UploadsForm;
