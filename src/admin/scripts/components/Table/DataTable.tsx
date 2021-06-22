import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';

import { appProps } from '../../types/types';
import { getComparator, stableSort, Order } from './utils';
import TableHead from './TableHead';
import { Button } from '@material-ui/core';

const ItemLink = styled.span`
	cursor: pointer;
`;

interface DataProps {
	id: number;
	calories: number;
	carbs: number;
	fat: number;
	name: string;
	protein: number;
}

function createData(
	id: number,
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
): DataProps {
	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
	createData(2, 'Donut', 452, 25.0, 51, 4.9),
	createData(3, 'Eclair', 262, 16.0, 24, 6.0),
	createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
	createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
	createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
	createData(9, 'KitKat', 518, 26.0, 65, 7.0),
	createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
	createData(11, 'Marshmallow', 318, 0, 81, 2.0),
	createData(12, 'Nougat', 360, 19.0, 9, 37.0),
	createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

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
		calories?: boolean;
		fat?: boolean;
		carbs?: boolean;
		protein?: boolean;
	};
	onRowDetailCallback: (id: number) => void;
	onRowToggleCallback: (id: number) => void;
	onRowDeleteCallback: (id: number) => void;
	onSelect: (ids: string[] | number[]) => void;
	allowSelect?: boolean;
	allowDetail?: boolean;
	prefix?: string;
	ariaLabel?: string;
	//
	authorId?: number;
	languageContent?: boolean;
}

const DataTable = ({
	// model,
	data,
	columnsLayout,
	onRowDetailCallback,
	onRowToggleCallback,
	onRowDeleteCallback,
	onSelect,
	allowSelect = false,
	allowDetail = false,
	prefix = 'data-table',
	ariaLabel = 'data table',
	//
	authorId,
	languageContent = false,
}: DataTableProps) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof DataProps>('id');
	const [selected, setSelected] = React.useState<any[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof DataProps,
	) => {
		const isAsc = orderBy === property && order === 'asc';

		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (allowSelect && event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
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

	const isSelected = (id: any) => selected.indexOf(id) !== -1;

	useEffect(() => {
		if (onSelect && allowSelect) onSelect(selected);
	}, [selected]);

	const getColumns = () => {
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
		if (columnsLayout.title_lang) {
		}
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
		//
		if (columnsLayout.calories)
			columns.push({
				id: 'calories',
				numeric: true,
				disablePadding: false,
				label: 'Calories',
			});
		if (columnsLayout.fat)
			columns.push({
				id: 'fat',
				numeric: true,
				disablePadding: false,
				label: 'Fat (g)',
			});
		if (columnsLayout.carbs)
			columns.push({
				id: 'carbs',
				numeric: true,
				disablePadding: false,
				label: 'Carbs (g)',
			});
		if (columnsLayout.protein)
			columns.push({
				id: 'protein',
				numeric: true,
				disablePadding: false,
				label: 'Protein (g)',
			});

		return columns;
	};

	const onDetailHandler = (id) => {
		if (allowDetail) {
			onRowDetailCallback(id);
		}
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
						<ItemLink onClick={() => onDetailHandler(row.id)}>
							{row.name}
						</ItemLink>
					</TableCell>
				)}
				{/* !!! */}
				{columnsLayout.email && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemLink onClick={() => onDetailHandler(row.id)}>
							{row.email}
						</ItemLink>
					</TableCell>
				)}
				{columnsLayout.title && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemLink onClick={() => onDetailHandler(row.id)}>
							{row.title}
						</ItemLink>
					</TableCell>
				)}
				{columnsLayout.title_lang && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemLink onClick={() => onDetailHandler(row.id)}>
							{' '}
							... lang title ...
						</ItemLink>
					</TableCell>
				)}
				{columnsLayout.sender && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemLink onClick={() => onDetailHandler(row.id)}>
							{row.sender}
						</ItemLink>
					</TableCell>
				)}
				{columnsLayout.file_name && (
					<TableCell component="th" id={labelId} scope="row">
						<ItemLink onClick={() => onDetailHandler(row.id)}>
							{row.file_name}
						</ItemLink>
					</TableCell>
				)}
				{columnsLayout.file_size && (
					<TableCell align="right">{row.file_size}</TableCell>
				)}
				{columnsLayout.active && (
					<TableCell align="right">{row.active}</TableCell>
				)}
				{columnsLayout.tags && <TableCell align="right">{row.tags}</TableCell>}
				{columnsLayout.category && (
					<TableCell align="right">{row.category}</TableCell>
				)}
				{columnsLayout.user_group && (
					<TableCell align="right">{row.user_group}</TableCell>
				)}
				{columnsLayout.member_group && (
					<TableCell align="right">{row.member_group}</TableCell>
				)}
				{columnsLayout.t_value && (
					<TableCell align="right">{row.t_value}</TableCell>
				)}
				{columnsLayout.r_value && (
					<TableCell align="right">{row.r_value}</TableCell>
				)}
				{columnsLayout.context && (
					<TableCell align="right">{row.context}</TableCell>
				)}
				{columnsLayout.authorized && (
					<TableCell align="right">{row.authorized}</TableCell>
				)}
				{/* !!! */}
				{columnsLayout.calories && (
					<TableCell align="right">{row.calories}</TableCell>
				)}
				{columnsLayout.fat && <TableCell align="right">{row.fat}</TableCell>}
				{columnsLayout.carbs && (
					<TableCell align="right">{row.carbs}</TableCell>
				)}
				{columnsLayout.protein && (
					<TableCell align="right">{row.protein}</TableCell>
				)}
				{allowDetail && (
					<TableCell align="right">
						<Button type="button" onClick={() => onRowDetailCallback(row.id)}>
							Detail
						</Button>
						<Button type="button" onClick={() => onRowToggleCallback(row.id)}>
							Toggle
						</Button>
						<Button type="button" onClick={() => onRowDeleteCallback(row.id)}>
							Delete
						</Button>
					</TableCell>
				)}
			</TableRow>
		);
	};
	return (
		<div className={classes.root}>
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
							rowCount={rows.length}
							headCells={getColumns()}
							allowSelect={allowSelect}
							allowDetail={allowDetail}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => renderTableRow(row, index))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default DataTable;
