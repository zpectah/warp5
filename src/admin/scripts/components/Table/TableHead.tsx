import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Order } from './utils';

interface HeadCellProps {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

interface EnhancedTableProps {
	classes: any; // TODO
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: any, // TODO
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	headCells: HeadCellProps[];
	allowSelect: boolean;
	allowDetail: boolean;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		headCells,
		allowSelect,
		allowDetail,
	} = props;
	const createSortHandler =
		(property: any) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{allowSelect && (
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{ 'aria-label': 'select all' }}
						/>
					</TableCell>
				)}
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				{allowDetail && (
					<TableCell align="right">
						<>Actions</>
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;
