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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import config from '../../config';
import { array } from '../../../../libs/utils';
import { DATA_TABLE_ROWS_BY_PAGE } from '../../constants';
import { appProps, routeProps } from '../../types/types';
import { getComparator, stableSort, Order } from './utils';
import TableHead from './TableHead';
import { useSettings } from '../../hooks/App';
import LanguageToggle from '../Language';
import { Form } from '../ui';

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
const TableHeadingBlock = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	& > div {
		& + div {
			margin-left: 0.5rem;
		}
	}
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
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
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
	languageContent?: boolean;
	authorId: number;
	searchAttrs?: string[];
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
	languageContent = false,
	authorId,
	searchAttrs = [],
}: DataTableProps) => {
	const { t } = useTranslation(['common', 'component']);
	const { Settings } = useSettings();
	const classes = useStyles();
	const [order, setOrder] = useState<Order>('desc');
	const [orderBy, setOrderBy] = useState<string>('id');
	const [selected, setSelected] = useState<any[]>(selectedRows);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [items, setItems] = useState<any[]>(data);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [search, setSearch] = useState<string>('');

	// Static variables
	const langDefault: string = Settings?.language_default; // TODO
	const langList: string[] = Settings?.language_active; // TODO

	// Table columns by options *
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

	// When sort property is triggered
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string,
	) => {
		let nProperty = property.includes('lang[') ? 'id' : property;
		const isAsc = orderBy === nProperty && order === 'asc';
		const nOrder = isAsc ? 'desc' : 'asc';

		setOrder(nOrder);
		setOrderBy(nProperty);
	};

	// When select or deselect all
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (allowSelect && event.target.checked) {
			const newSelecteds = items.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}

		if (allowSelect) setSelected([]);
	};

	// When row is selected
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

	// When next or prev page is triggered
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	// When rows per page is changed
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Is row selected
	const isSelected = (id: any) => selected.indexOf(id) !== -1;

	// When row detail is triggered (to change url parameter in page handler)
	const onDetail = (id: number) => {
		if (allowDetail && onRowDetailCallback) onRowDetailCallback(id);
	};

	// When toggle is triggered
	const onToggle = (ids: number[]) => {
		if (allowDetail && onToggleCallback) onToggleCallback(ids);
	};

	// When delete confirm is triggered
	const onDelete = (ids: number[]) => {
		if (allowDetail && onDeleteCallback) onDeleteCallback(ids);
	};

	// Renderer of table rows by options *
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
						<ItemRowLink onClick={() => onDetail(row.id)}>
							{row.name}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.email && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetail(row.id)}>
							{row.email}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.title && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetail(row.id)}>
							{row.title}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.title_lang && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetail(row.id)}>
							{row.lang[lang].title}
							{row.name && <small>{row.name}</small>}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.sender && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetail(row.id)}>
							{row.sender}
						</ItemRowLink>
					</TableCell>
				)}
				{columnsLayout.file_name && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemRowLink onClick={() => onDetail(row.id)}>
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

	// Returns updated search attributes
	const getSearchAttrs = (attrs) => {
		let na = [];

		attrs.map((attr) => {
			let ni = attr.replace('[lang]', lang);
			na.push(ni);
		});

		return na;
	};

	// Callback to page when selected rows is changed
	useEffect(() => {
		if (onSelect && allowSelect) onSelect(selected);
	}, [selected]);

	// Callback from page
	useEffect(() => setSelected(selectedRows), [selectedRows]);

	// When data from page is loaded to table and do search
	useEffect(() => {
		let tmp = data;

		if (search.length > 3)
			tmp = array.search(data, getSearchAttrs(searchAttrs), search);

		setItems(tmp);
	}, [data, search]);

	return (
		<>
			<div className={classes.root}>
				<TableHeading>
					<TableHeadingBlock>
						<div>
							<Form.Search
								id="TableSearchInput"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								label={''}
							/>
						</div>
					</TableHeadingBlock>
					<TableHeadingBlock>
						<div>
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
						</div>
						{languageContent && (
							<div>
								<LanguageToggle
									langDefault={langDefault}
									langList={langList}
									onChange={(lng) => setLang(lng)}
								/>
							</div>
						)}
					</TableHeadingBlock>
				</TableHeading>
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
