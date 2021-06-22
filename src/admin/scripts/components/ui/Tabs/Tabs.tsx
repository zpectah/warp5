import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

interface TabsProps {
	children: React.ReactElement[];
	tabList: any[];
	activeIndex?: number;
	name?: string;
	ariaLabel?: string;
	onChange?: (index: number) => void;
}

const UiTabs: React.FC<TabsProps> = ({
	children,
	tabList,
	activeIndex = 0,
	name = 'tabs-default',
	ariaLabel = 'Panel tabs',
	onChange,
}) => {
	const [value, setValue] = useState(activeIndex);

	useEffect(() => setValue(activeIndex), [activeIndex]);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		if (onChange) onChange(newValue);
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
			<Tabs
				indicatorColor="primary"
				textColor="primary"
				value={value}
				onChange={handleChange}
				aria-label={ariaLabel}
				variant="scrollable"
				scrollButtons="auto"
			>
				{tabList.map((item, index) => (
					<Tab label={item.label} key={index} {...a11yProps(index)} />
				))}
			</Tabs>
			{children.map((item, index) => (
				<TabPanel value={value} index={index} key={index}>
					{item}
				</TabPanel>
			))}
		</>
	);
};

export default UiTabs;
