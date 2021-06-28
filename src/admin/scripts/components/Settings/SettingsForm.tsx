import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';

import { ROUTES, SETTINGS_PANEL } from '../../constants';
import { Tabs, Form, Section } from '../ui';
import { useSettings } from '../../hooks/App';

const ActionRow = styled.div`
	padding-top: 1rem;
`;
const PanelContent = styled.div``;

interface SettingsFormProps {}

const SettingsForm = ({}: SettingsFormProps) => {
	const { t } = useTranslation(['common', 'input', 'types', 'component']);
	const params: any = useParams();
	const history: any = useHistory();
	const { Settings } = useSettings();
	const [panelIndex, setPanelIndex] = useState(0);
	const [tabList, setTabList] = useState([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...Settings,
		},
	});

	const getTabList = () => {
		const tabs = [];

		SETTINGS_PANEL.map((panel) => {
			tabs.push({
				name: panel,
				label: t(`types:${panel}`),
			});
		});

		return tabs;
	};

	const panelChangeHandler = (index) => {
		if (tabList[index].name)
			history.replace(ROUTES.app.settings.path + '/' + tabList[index].name);
	};

	const onSubmitHandler = (data) => {
		console.log('onSubmit', data);
	};

	useEffect(() => {
		setTabList(getTabList());
	}, [SETTINGS_PANEL]);

	useEffect(() => {
		if (params.panel) {
			tabList.map((item, index) => {
				if (item.name == params.panel) setPanelIndex(index);
			});
		}

		return () => {};
	}, []);

	return (
		<>
			<Tabs.Wrapper
				tabList={tabList}
				name="form-settings-tab"
				activeIndex={panelIndex}
				onChange={panelChangeHandler}
				ariaLabel="settings form"
			>
				<Tabs.Panel>
					<PanelContent>
						<Section
							title={t('component:Settings.global.title.project')}
							withBorder
						>
							{/*
							<Form.RowController
								label={t('input:name.label')}
								name={'project_name'}
								control={control}
								rules={{ required: true }}
								helpText={t('component:Settings.global.help.projectName')}
								required
								defaultValue={''}
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
							*/}
							...project
						</Section>
						<Section title={t('component:Settings.global.title.company')}>
							...company
						</Section>
					</PanelContent>
				</Tabs.Panel>
				<Tabs.Panel>
					<PanelContent>
						<Section title={t('component:Settings.web.title.meta')} withBorder>
							...meta
						</Section>
						<Section title={t('component:Settings.web.title.mode')} withBorder>
							...mode
						</Section>
						<Section title={t('component:Settings.web.title.forms')} withBorder>
							...forms
						</Section>
						<Section title={t('component:Settings.web.title.comments')}>
							...comments
						</Section>
					</PanelContent>
				</Tabs.Panel>
				<Tabs.Panel>
					<PanelContent>
						<Section
							title={t('component:Settings.content.title.language')}
							withBorder
						>
							...language
						</Section>
						<Section title={t('component:Settings.content.title.approval')}>
							...approval
						</Section>
					</PanelContent>
				</Tabs.Panel>
				<Tabs.Panel>
					<PanelContent>Module</PanelContent>
				</Tabs.Panel>
				<Tabs.Panel>
					<PanelContent>Maintenance</PanelContent>
				</Tabs.Panel>
			</Tabs.Wrapper>
			<ActionRow>
				<Button
					onClick={handleSubmit(onSubmitHandler)}
					variant="contained"
					color="primary"
					disabled={!formState.isValid}
				>
					{t('btn.updateChanges')}
				</Button>
			</ActionRow>
		</>
	);
};

export default SettingsForm;
