import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import styled from 'styled-components';

import config from '../../config';
import { useUploads } from '../../hooks/App';
import { Dialog } from '../ui';
import getFileTypeFromFilename from '../../utils/getFileTypeFromFilename';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		gridList: {
			width: '100%',
			height: '100%',
		},
		gridListInline: {
			flexWrap: 'nowrap',
			transform: 'translateZ(0)',
		},
		gridListItem: {
			cursor: 'pointer',
		},
	}),
);

const ActionsWrapper = styled.div``;
const SelectedWrapper = styled.div`
	padding-bottom: 0.5rem;
`;
const GridOuterWrapper = styled.div`
	width: 100%;
	height: 50vh;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	overflow: hidden;
`;
const GridListTileInner = styled.div<{ selected?: boolean }>`
	width: calc(100% - 10px);
	height: calc(100% - 10px);
	position: absolute;
	top: 0;
	left: 0;
	border: 5px solid ${(props) => (props.selected ? 'red' : 'transparent')};
`;

interface UploadsPickerProps {
	id: string;
	value: string | string[];
	onChange: (value: string | string[]) => void;
	multiple?: boolean;
	ignoredId?: any[];
	mode?: 'all' | 'image' | 'audio' | 'video' | 'document' | 'archive';
	placeholder?: string;
}

const UploadsPicker = ({
	id,
	value,
	onChange,
	multiple,
	ignoredId,
	mode = 'all',
	placeholder,
}: UploadsPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [items, setItems] = useState<any[]>([]);
	const [itemsSelected, setItemsSelected] = useState<any[]>([]);
	const [tmpItemsSelected, setTmpItemsSelected] = useState<any[]>([]);
	const { Uploads } = useUploads();

	const classes = useStyles();

	const setInitialItems = () => {
		let tmp_items = [];

		Uploads?.map((item) => {
			switch (mode) {
				case 'image':
					if (item.type == 'image') tmp_items.push(item);
					break;

				case 'audio':
					if (item.type == 'audio') tmp_items.push(item);
					break;

				case 'video':
					if (item.type == 'video') tmp_items.push(item);
					break;

				case 'document':
					if (item.type == 'document') tmp_items.push(item);
					break;

				case 'archive':
					if (item.type == 'archive') tmp_items.push(item);
					break;

				default:
				case 'all':
					tmp_items.push(item);
					break;
			}
		});

		setItems(tmp_items);
	};

	const onSelectHandler = (fileName) => {
		let tmp_selected = [...tmpItemsSelected];

		if (tmp_selected.indexOf(fileName) > -1) {
			tmp_selected.splice(tmp_selected.indexOf(fileName), 1);
		} else {
			if (!multiple) tmp_selected = [];
			tmp_selected.push(fileName);
		}

		setTmpItemsSelected(tmp_selected);
	};

	const onConfirmHandler = () => {
		if (onChange) {
			if (!multiple) {
				onChange(tmpItemsSelected[0] || '');
			} else {
				onChange(tmpItemsSelected);
			}
		}
		setItemsSelected(tmpItemsSelected);
		setDialogOpen(false);
	};

	const isItemSelected = (fileName) => tmpItemsSelected.includes(fileName);

	const onDialogClose = () => {
		setDialogOpen(false);
	};

	const onDialogOpen = () => {
		setDialogOpen(true);
	};

	const onResetHandler = () => {
		setItemsSelected([]);
		setTmpItemsSelected([]);
		onChange('');
	};

	const onToggleDialogHandler = (open: boolean) => {
		setDialogOpen(open);
		if (!open) {
			setTmpItemsSelected(itemsSelected);
		}
	};

	useEffect(() => {
		if (Uploads) setInitialItems();
	}, [Uploads]);

	useEffect(() => {
		let tmp_selected = [];

		if (value) {
			if (!multiple) {
				items.map((item) => {
					if (item.file_name == value) tmp_selected.push(item.file_name);
				});
			} else {
				if (Array.isArray(value)) {
					if (value.length > 0)
						items.map((item) => {
							value.map((sel) => {
								if (item.file_name == sel || item.id == sel)
									tmp_selected.push(item.file_name);
							});
						});
				}
			}
		}

		setItemsSelected(tmp_selected);
		setTmpItemsSelected(tmp_selected);
	}, [items, value]);

	return (
		<>
			{value && (
				<SelectedWrapper>
					<GridList
						cols={3.5}
						cellHeight={125}
						className={classes.gridListInline}
					>
						{itemsSelected.map((item) => (
							<GridListTile key={item}>
								{getFileTypeFromFilename(item) == 'image' ? (
									<img
										src={config.UPLOADS_PATH.image.thumbnail + item}
										alt={item}
										className="img"
									/>
								) : (
									<span className="span">{item}</span>
								)}
							</GridListTile>
						))}
					</GridList>
				</SelectedWrapper>
			)}
			<ActionsWrapper>
				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button onClick={onDialogOpen}>{t('btn.select')}</Button>
					<Button
						onClick={onResetHandler}
						disabled={
							(itemsSelected.length == 0 && tmpItemsSelected.length == 0) ||
							!value
						}
						color="secondary"
					>
						{t('btn.clear')}
					</Button>
				</ButtonGroup>
			</ActionsWrapper>
			<Dialog.Base
				open={dialogOpen}
				onToggle={onToggleDialogHandler}
				headerChildren={
					<>
						{placeholder
							? placeholder
							: t('input:select_uploads.placeholder', {
									count: multiple ? 2 : 1,
							  })}
					</>
				}
				size={'sm'}
				footerChildren={
					<>
						<Button onClick={onDialogClose}>{t('btn.cancel')}</Button>
						<Button onClick={onConfirmHandler} color="primary" autoFocus>
							{t('btn.confirm')}
						</Button>
					</>
				}
				customContent={
					<GridOuterWrapper>
						<GridList cols={3} className={classes.gridList}>
							{items.map((item) => (
								<GridListTile
									key={item.id}
									onClick={() => onSelectHandler(item.file_name)}
									className={classes.gridListItem}
								>
									{item.type == 'image' ? (
										<img
											src={config.UPLOADS_PATH.image.thumbnail + item.file_name}
											alt={item.name}
											className="img"
										/>
									) : (
										<span className="span">{item.file_name}</span>
									)}
									<GridListTileBar
										title={item.name}
										subtitle={<span>Size: {item.file_size}</span>}
									/>
									<GridListTileInner
										selected={isItemSelected(item.file_name)}
									/>
								</GridListTile>
							))}
						</GridList>
					</GridOuterWrapper>
				}
			/>
		</>
	);
};

export default UploadsPicker;
