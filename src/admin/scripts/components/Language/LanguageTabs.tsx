import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

import config from '../../config';

const Wrapper = styled.div`
	padding-bottom: 0.75rem;
`;

interface LanguageTabsProps {
	langList: string[];
	onChange: (lang: string) => void;
}

const LanguageTabs = ({ langList, onChange }: LanguageTabsProps) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Wrapper>
			<Tabs
				value={value}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleChange}
				aria-label="language content tabs"
				scrollButtons="auto"
			>
				{langList.map((lng) => (
					<Tab
						key={lng}
						label={config.LOCALES_LIST[lng].label}
						onClick={() => onChange(lng)}
					/>
				))}
			</Tabs>
		</Wrapper>
	);
};

export default LanguageTabs;
