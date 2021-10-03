import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckIcon from '@material-ui/icons/Check';

import { MenuItemsItemProps } from '../../../types/App';
import palette from '../../../styles/palette';

const Wrapper = styled.li`
	height: auto;
	margin: 0 0 0.5rem 0;
	padding: 0.5rem;
	display: flex;
	flex: none;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: rgba(225, 225, 225, 0.5);
	border-radius: 0.35rem;
	transition: background-color 0.25s ease-in-out 0s;

	&:last-of-type {
		margin-bottom: 0;
	}

	&:hover {
		background-color: rgba(2, 136, 209, 0.5);
	}
	&:hover ul li:hover {
		background-color: rgba(25, 118, 210, 0.35);
	}
`;
const Heading = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	justify-content: space-between;
`;
const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	cursor: pointer;
`;
const TitleLabel = styled.div`
	padding-left: 0.5rem;
`;
const Actions = styled.div``;
const SubWrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	padding-left: 1rem;
`;
const ItemList = styled.ul`
	width: 100%;
	margin: 0;
	padding: 0;
	list-style: none;
`;

interface MenuItemProps {
	item: MenuItemsItemProps;
	onSelect: (item: MenuItemsItemProps) => void;
	onToggle: (id: number | string) => void;
	onDelete: (id: number | string) => void;
	context?: 'select' | 'orphan';
}

const MenuItem: React.FC<MenuItemProps> = ({
	item,
	children,
	onSelect,
	onDelete,
	onToggle,
}) => {
	const { t } = useTranslation(['common']);

	return (
		<Wrapper>
			<Heading>
				<Title onClick={() => onSelect(item)}>
					<Chip label={item.item_order} size="small" />
					<TitleLabel>{item.name}</TitleLabel>
				</Title>
				<Actions>
					<IconButton onClick={() => onToggle(item.id)} title={t('btn.toggle')}>
						{item.active ? (
							<CheckIcon fontSize="small" />
						) : (
							<NotInterestedIcon fontSize="small" />
						)}
					</IconButton>
					<IconButton
						onClick={() => onDelete(item.id)}
						title={t('btn.delete')}
						color="secondary"
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
					<IconButton
						onClick={() => onSelect(item)}
						title={t('btn.detail')}
						color="primary"
					>
						<EditIcon fontSize="small" />
					</IconButton>
				</Actions>
			</Heading>
			{children && (
				<SubWrapper>
					<ItemList>{children}</ItemList>
				</SubWrapper>
			)}
		</Wrapper>
	);
};

export default MenuItem;
