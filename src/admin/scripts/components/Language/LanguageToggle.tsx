import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import config from '../../config';

interface LanguageToggleProps {
	langDefault: string;
	langList: string[];
	onChange: (lang: string) => void;
}

const LanguageToggle = ({
	langDefault,
	langList = [],
	onChange,
}: LanguageToggleProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState(langDefault);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onSelect = (lang: string) => {
		setLang(lang);
		onChange(lang);
		handleClose();
	};

	useEffect(() => setLang(langDefault), [langDefault]);

	return (
		<>
			{lang && (
				<>
					<Button
						aria-controls="languageToggle"
						aria-haspopup="true"
						onClick={handleClick}
						variant="outlined"
						disabled={langList.length < 2}
					>
						{config.LOCALES_LIST[lang].label}
					</Button>
					<Menu
						id="languageToggle"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{langList?.map((lng) => (
							<MenuItem key={lng} onClick={() => onSelect(lng)}>
								{config.LOCALES_LIST[lng].label}
							</MenuItem>
						))}
					</Menu>
				</>
			)}
		</>
	);
};

export default LanguageToggle;
