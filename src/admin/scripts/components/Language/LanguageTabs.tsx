import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import config from '../../config';
import { useSettings } from '../../hooks/App';

const NavigationContainer = styled.div`
	padding-bottom: 0.5rem;
`;
const PanelContainer = styled.div``;

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

interface LanguageTabsProps {
	children: React.ReactElement[];
	activeIndex?: number;
	name?: string;
	ariaLabel?: string;
	onChange?: (lang: string, langList: string[]) => void;
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({
	children,
	activeIndex = 0,
	name = 'tabs-language',
	ariaLabel = 'Panel tabs',
	onChange,
}) => {
	const { Settings } = useSettings();
	const [value, setValue] = useState(activeIndex);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);

	// Static variables
	const langDefault: string = Settings?.language_default;
	const langList: string[] = Settings?.language_active;

	useEffect(() => {
		if (langDefault) setLang(langDefault);
	}, [langDefault]);

	useEffect(() => setValue(activeIndex), [activeIndex]);

	useEffect(() => {
		onChange(lang, langList);
	}, [lang, langList]);

	const getTabList = () => {
		let na = [];

		langList?.map((lng) => {
			na.push({
				name: lng,
				label: config.LOCALES_LIST[lng].label,
			});
		});

		return na;
	};

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		setLang(langList[newValue]);
	};

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`${name}-${index}`}
				aria-labelledby={`${name}-tab-${index}`}
				{...other}
			>
				{value === index && <>{children}</>}
			</div>
		);
	}

	function a11yProps(index: any) {
		return {
			id: `${name}-tab-${index}`,
			'aria-controls': `${name}-${index}`,
		};
	}

	return (
		<>
			<NavigationContainer>
				<Tabs
					indicatorColor="primary"
					textColor="primary"
					value={value}
					onChange={handleChange}
					aria-label={ariaLabel}
					variant="scrollable"
					scrollButtons="auto"
				>
					{getTabList().map((item, index) => (
						<Tab label={item.label} key={index} {...a11yProps(index)} />
					))}
				</Tabs>
			</NavigationContainer>
			<PanelContainer>
				{children?.map((item, index) => (
					<TabPanel value={value} index={index} key={index}>
						{item}
					</TabPanel>
				))}
			</PanelContainer>
		</>
	);
};

export default LanguageTabs;
