import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { Tabs } from '../ui';

interface SettingsFormProps {}

const SettingsForm = ({}: SettingsFormProps) => {
	const params: any = useParams();
	const history: any = useHistory();
	const [panelIndex, setPanelIndex] = useState(0);

	const tabList = [
		{
			name: 'tab-1',
			label: 'Tab 1',
		},
		{
			name: 'tab-2',
			label: 'Tab 2',
		},
		{
			name: 'tab-3',
			label: 'Tab 3',
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
				ariaLabel="Form Settings"
			>
				<Tabs.Panel>tab 1</Tabs.Panel>
				<Tabs.Panel>tab 2</Tabs.Panel>
				<Tabs.Panel>tab 3</Tabs.Panel>
			</Tabs.Wrapper>
		</>
	);
};

export default SettingsForm;
