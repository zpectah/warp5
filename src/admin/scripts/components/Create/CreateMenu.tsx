import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

import { ROUTE_PATH_SUFFIX_DETAIL, NAV_ITEMS } from '../../constants';
import { buttonTrigger } from '../../styles/mixins';
import { useHistory } from 'react-router-dom';
import { useProfile } from '../../hooks/App';

const Outer = styled.div``;
const Button = styled.button`
	${buttonTrigger}
`;

interface CreateMenuProps {
	id?: string;
	afterClick?: () => void;
}

const CreateMenu = ({ id = 'createMenu', afterClick }: CreateMenuProps) => {
	const { t } = useTranslation(['common']);
	const [anchorEl, setAnchorEl] = useState(null);
	const h = useHistory();
	const { userShouldShow } = useProfile();

	const openHandler = (e) => setAnchorEl(e.currentTarget);

	const closeHandler = () => setAnchorEl(null);

	const onClickHandler = (path) => {
		setAnchorEl(null);
		h.push(path + ROUTE_PATH_SUFFIX_DETAIL + '/new');
		if (afterClick) afterClick();
	};

	return (
		<>
			<Outer>
				<Button
					aria-controls={id}
					aria-haspopup="true"
					onClick={openHandler}
					type="button"
				>
					<AddIcon />
				</Button>
				<Menu
					id={id}
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={closeHandler}
					PaperProps={{
						style: {
							maxHeight: 300,
						},
					}}
				>
					{NAV_ITEMS.add.map((item) => {
						if (item.active && userShouldShow(item.auth))
							return (
								<MenuItem
									key={item.key}
									onClick={() => onClickHandler(item.path)}
								>
									{t(item.label)}
								</MenuItem>
							);
					})}
				</Menu>
			</Outer>
		</>
	);
};

export default CreateMenu;
