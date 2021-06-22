import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import LanguageService from '../../service/LanguageService';

interface LocalesDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onCancel?: Function;
}

const LocalesDialog = ({ open, onToggle, onCancel }: LocalesDialogProps) => {
	const { i18n, t } = useTranslation(['common', 'components']);
	const [isOpen, setOpen] = useState<boolean>(open);
	const [lang, setLang] = useState<string>(i18n.language);
	const [langList, setLangList] = useState<string[]>(
		config.GLOBAL.CMS.LANG_LIST,
	);

	const changeHandler = (language: string) => {
		setLang(language);
		LanguageService.set(language);
		i18n.changeLanguage(language);
		closeHandler();
	};

	const closeHandler = () => {
		setOpen(false);
		if (onCancel) onCancel();
	};

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<Dialog
			maxWidth="xs"
			aria-labelledby="locales-dialog-title"
			open={open}
			onClose={closeHandler}
			fullWidth
		>
			<DialogTitle id="locales-dialog-title">
				{t('components:LocalesDialog.title')}
			</DialogTitle>
			<DialogContent dividers>
				<List component="nav">
					{langList.map((lng) => (
						<ListItem
							key={lng}
							button
							onClick={() => changeHandler(lng)}
							selected={lng == lang}
						>
							<ListItemText
								primary={config.LOCALES_LIST[lng].label}
								secondary={lng}
							/>
						</ListItem>
					))}
				</List>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={closeHandler} color="primary">
					{t('btn.cancel')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LocalesDialog;
