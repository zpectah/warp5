import React, { useCallback, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SettingsIcon from '@material-ui/icons/Settings';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import config from '../../config';
import { DATA_TABLE_ROWS_BY_PAGE } from '../../constants';
import { appProps, routeProps } from '../../types/types';
import { getComparator, stableSort, Order } from './utils';
import TableHead from './TableHead';
import { useProfile, useSettings } from '../../hooks/App';

const columnBase = css`
	display: flex;
	flex-direction: column;
`;

const ItemRowLink = styled.span`
	${columnBase}

	cursor: pointer;
`;
const ItemRowText = styled.span`
	${columnBase}
`;
const TableHeading = styled.div`
	padding-bottom: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const TableHeadingBlock = styled.div``;
const TableOptionsContainer = styled.div`
	width: 100%;
	padding: 1rem;
`;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	}),
);

interface DataTableProps {
	model:
		| appProps['modelApp']
		| appProps['modelMembers']
		| appProps['modelMarket'];
	selectedRows: any[];
	data: any[];
	columnsLayout?: {
		name?: boolean;
		email?: boolean;
		title?: boolean;
		title_lang?: boolean;
		sender?: boolean;
		file_name?: boolean;
		file_size?: boolean;
		active?: boolean;
		tags?: boolean;
		category?: boolean;
		type?: boolean;
		user_group?: boolean;
		member_group?: boolean;
		t_value?: boolean;
		r_value?: boolean;
		context?: boolean;
		authorized?: boolean;
		// TODO: new columns
	};
	onRowDetailCallback?: (id: number) => void;
	onToggleCallback?: (ids: number[]) => void;
	onDeleteCallback?: (ids: number[]) => void;
	onSelect: (ids: string[] | number[]) => void;
	allowSelect?: boolean;
	allowDetail?: boolean;
	prefix?: string;
	ariaLabel?: string;
	//
	languageContent?: boolean;
}

const DataTable = ({
	data = [],
	selectedRows,
	columnsLayout,
	onRowDetailCallback,
	onToggleCallback,
	onDeleteCallback,
	onSelect,
	allowSelect = false,
	allowDetail = false,
	prefix = 'data-table',
	ariaLabel = 'data table',
	model,
	languageContent = false, // TODO ???
}: DataTableProps) => {
	const { t } = useTranslation(['common', 'component']);
	const { Profile } = useProfile();
	const { Settings } = useSettings();
	const classes = useStyles();
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<'id' | 'name'>('id');
	const [selected, setSelected] = useState<any[]>(selectedRows);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [items, setItems] = useState<any[]>(data);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [optionsOpen, setOptionsOpen] = useState<boolean>(false); // TODO

	const authorId: number = Profile?.id; // TODO
	const langList: string[] = Settings?.language_active; // TODO

	useEffect(() => {
		if (onSelect && allowSelect) onSelect(selected);
	}, [selected]);

	useEffect(() => {
		setItems(data);
	}, [data]);

	useEffect(() => setSelected(selectedRows), [selectedRows]);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: any, // TODO ?
	) => {
		const isAsc = orderBy === property && order === 'asc';

		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (allowSelect && event.target.checked) {
			const newSelecteds = items.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}

		if (allowSelect) setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (allowSelect) {
			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selected, id);
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selected.slice(1));
			} else if (selectedIndex === selected.length - 1) {
				newSelected = newSelected.concat(selected.slice(0, -1));
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(
					selected.slice(0, selectedIndex),
					selected.slice(selectedIndex + 1),
				);
			}
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const onDetailHandler = (id) => {
		if (allowDetail) {
			onRowDetailCallback(id);
		}
	};

	const getColumns = useCallback(() => {
		const columns = [];

		if (columnsLayout.name)
			columns.push({
				id: 'name',
				numeric: false,
				disablePadding: true,
				label: 'Name',
			});
		if (columnsLayout.email)
			columns.push({
				id: 'email',
				numeric: false,
				disablePadding: true,
				label: 'E-mail',
			});
		if (columnsLayout.title)
			columns.push({
				id: 'title',
				numeric: false,
				disablePadding: true,
				label: 'Title',
			});
		if (columnsLayout.title_lang)
			columns.push({
				id: `lang[${lang}].title`,
				numeric: false,
				disablePadding: true,
				label: 'Title',
			});
		if (columnsLayout.sender)
			columns.push({
				id: 'sender',
				numeric: false,
				disablePadding: true,
				label: 'Sender',
			});
		if (columnsLayout.file_name)
			columns.push({
				id: 'file_name',
				numeric: false,
				disablePadding: true,
				label: 'File name',
			});
		if (columnsLayout.file_size)
			columns.push({
				id: 'file_size',
				numeric: true,
				disablePadding: true,
				label: 'Size',
			});
		if (columnsLayout.active)
			columns.push({
				id: 'active',
				numeric: false,
				disablePadding: true,
				label: 'Active',
			});
		if (columnsLayout.tags)
			columns.push({
				id: 'tags',
				numeric: false,
				disablePadding: true,
				label: 'Tags',
			});
		if (columnsLayout.category)
			columns.push({
				id: 'category',
				numeric: false,
				disablePadding: true,
				label: 'Category',
			});
		if (columnsLayout.user_group)
			columns.push({
				id: 'user_group',
				numeric: false,
				disablePadding: true,
				label: 'Group',
			});
		if (columnsLayout.member_group)
			columns.push({
				id: 'member_group',
				numeric: false,
				disablePadding: true,
				label: 'Group',
			});
		if (columnsLayout.t_value)
			columns.push({
				id: 't_value',
				numeric: false,
				disablePadding: true,
				label: 'Value',
			});
		if (columnsLayout.r_value)
			columns.push({
				id: 'r_value',
				numeric: false,
				disablePadding: true,
				label: 'Value',
			});
		if (columnsLayout.context)
			columns.push({
				id: 'context',
				numeric: false,
				disablePadding: true,
				label: 'Context',
			});
		if (columnsLayout.authorized)
			columns.push({
				id: 'authorized',
				numeric: false,
				disablePadding: true,
				label: 'Authorized',
			});

		return columns;
	}, []);

	const isSelected = (id: any) => selected.indexOf(id) !== -1;

	const onDetail = (id: number) => {
		onRowDetailCallback(id);
	};

	const onToggle = (ids: number[]) => {
		onToggleCallback(ids);
	};

	const onDelete = (ids: number[]) => {
		onDeleteCallback(ids);
	};

	const renderTableRow = (row, index) => {
		const isItemSelected = isSelected(row.id);
		const labelId = `${prefix}-checkbox-${index}`;

		return (
			<TableRow
				hover
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				key={row.name}
				selected={isItemSelected}
				onDoubleClick={(event) => handleClick(event, row.id)}
			>
				{allowSelect && (
					<TableCell padding="checkbox">
						<Checkbox
							checked={isItemSelected}
							inputProps={{ 'aria-labelledby': labelId }}
							onClick={(event) => handleClick(event, row.id)}
						/>
					</TableCell>
				)}
				{columnsLayout.name && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetailHandler(row.id)}>
							{row.name}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.email && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetailHandler(row.id)}>
							{row.email}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.title && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetailHandler(row.id)}>
							{row.title}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.title_lang && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetailHandler(row.id)}>
							{row.lang[lang].title}
							{row.name && <small>{row.name}</small>}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.sender && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetailHandler(row.id)}>
							{row.sender}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.file_name && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetailHandler(row.id)}>
							{row.file_name}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.file_size && (
					<TableCell>
						<ItemRowText>{row.file_size}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.active && (
					<TableCell>
						<ItemRowText>{row.active}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.tags && (
					<TableCell>
						<ItemRowText>{row.tags}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.category && (
					<TableCell>
						<ItemRowText>{row.category}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.user_group && (
					<TableCell>
						<ItemRowText>{row.user_group}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.member_group && (
					<TableCell>
						<ItemRowText>{row.member_group}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.t_value && (
					<TableCell>
						<ItemRowText>{row.t_value}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.r_value && (
					<TableCell>
						<ItemRowText>{row.r_value}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.context && (
					<TableCell>
						<ItemRowText>{row.context}</ItemRowText>
					</TableCell>
				)}
				{columnsLayout.authorized && (
					<TableCell>
						<ItemRowText>{row.authorized}</ItemRowText>
					</TableCell>
				)}
				{allowDetail && (
					<TableCell align="right">
						{(row.active == 1 || row.active == 0) && (
							<IconButton
								onClick={() => onToggle([row.id])}
								title={row.active == 1 ? t('btn.disable') : t('btn.active')}
							>
								{row.active == 1 ? (
									<NotInterestedIcon fontSize="small" />
								) : (
									<CheckIcon fontSize="small" />
								)}
							</IconButton>
						)}
						<IconButton
							onClick={() => onDelete([row.id])}
							title={t('btn.delete')}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
						<IconButton
							onClick={() => onDetail(row.id)}
							title={t('btn.detail')}
							color="primary"
						>
							<EditIcon fontSize="small" />
						</IconButton>
					</TableCell>
				)}
			</TableRow>
		);
	};

	return (
		<>
			<div className={classes.root}>
				<TableHeading>
					<TableHeadingBlock>
						<ButtonGroup>
							<Button
								disabled={selected.length == 0}
								onClick={() => onToggle(selected)}
								startIcon={<NotInterestedIcon />}
								title={t('btn.toggle')}
							>
								{selected.length}
							</Button>
							<Button
								disabled={selected.length == 0}
								onClick={() => onDelete(selected)}
								startIcon={<DeleteIcon />}
								title={t('btn.delete')}
							>
								{selected.length}
							</Button>
						</ButtonGroup>
					</TableHeadingBlock>
					<TableHeadingBlock>
						<IconButton onClick={() => setOptionsOpen(!optionsOpen)}>
							<SettingsIcon />
						</IconButton>
					</TableHeadingBlock>
				</TableHeading>
				{optionsOpen && (
					<Paper className={classes.paper}>
						<TableOptionsContainer>Table options</TableOptionsContainer>
					</Paper>
				)}
				<Paper className={classes.paper}>
					<TableContainer>
						<Table
							className={classes.table}
							aria-labelledby={prefix}
							aria-label={ariaLabel}
						>
							<TableHead
								classes={classes}
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={items.length}
								headCells={getColumns()}
								allowSelect={allowSelect}
								allowDetail={allowDetail}
							/>
							<TableBody>
								{stableSort(items, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => renderTableRow(row, index))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={DATA_TABLE_ROWS_BY_PAGE}
						component="div"
						count={items.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		</>
	);
};

export default DataTable;
