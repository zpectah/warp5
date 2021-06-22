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
import { useDispatch, useSelector } from 'react-redux';

import { THEMES } from '../../constants';
import { themeToggle } from '../../store/actions';

interface ThemesDialogProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onCancel?: Function;
}

const ThemesDialog = ({ open, onToggle, onCancel }: ThemesDialogProps) => {
	const { t } = useTranslation(['common', 'types', 'components']);
	const store = useSelector((store: any) => store);
	const [isOpen, setOpen] = useState<boolean>(open);
	const [theme, setTheme] = useState<string>(store.ui.theme);
	const dispatch = useDispatch();

	const changeHandler = (theme: string) => {
		closeHandler();
		setTheme(theme);
		dispatch(themeToggle(theme));
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
			aria-labelledby="themes-dialog-title"
			open={open}
			onClose={closeHandler}
			fullWidth
		>
			<DialogTitle id="themes-dialog-title">
				{t('components:ThemeDialog.title')}
			</DialogTitle>
			<DialogContent dividers>
				<List component="nav">
					{THEMES.map((item) => (
						<ListItem
							key={item}
							button
							onClick={() => changeHandler(item)}
							selected={theme == item}
						>
							<ListItemText primary={t(`types:${item}`)} />
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

export default ThemesDialog;
