import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import { Tabs } from '../ui';

interface SettingsFormProps {}

const SettingsForm = ({}: SettingsFormProps) => {
	const { t } = useTranslation(['common', 'types']);
	const params: any = useParams();
	const history: any = useHistory();
	const [panelIndex, setPanelIndex] = useState(0);

	const tabList = [
		{
			name: 'global',
			label: t('types:global'),
		},
		{
			name: 'web',
			label: t('types:web'),
		},
		{
			name: 'content',
			label: t('types:content'),
		},
		{
			name: 'module',
			label: t('types:module'),
		},
		{
			name: 'maintenance',
			label: t('types:maintenance'),
		},
	];

	useEffect(() => {
		if (params.panel) {
			tabList.map((item, index) => {
				if (item.name == params.panel) setPanelIndex(index);
			});
		}
	}, [params.panel]);

	const panelChangeHandler = (index) => {
		if (tabList[index].name)
			history.replace(ROUTES.app.settings.path + '/' + tabList[index].name);
	};

	return (
		<>
			<Tabs.Wrapper
				tabList={tabList}
				name="form-settings-tab"
				activeIndex={panelIndex}
				onChange={panelChangeHandler}
				ariaLabel="settings form"
			>
				<Tabs.Panel>Global</Tabs.Panel>
				<Tabs.Panel>Web</Tabs.Panel>
				<Tabs.Panel>Content</Tabs.Panel>
				<Tabs.Panel>Module</Tabs.Panel>
				<Tabs.Panel>Maintenance</Tabs.Panel>
			</Tabs.Wrapper>
		</>
	);
};

export default SettingsForm;
