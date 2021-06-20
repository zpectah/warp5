import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Menu from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';

import { buttonTrigger } from '../../styles/mixins';
import { sidebarToggle as storeSidebarToggle } from '../../store/actions';

const Button = styled.button`
	${buttonTrigger}
`;

interface SidebarToggleProps {}

const SidebarToggle: React.FC<SidebarToggleProps> = ({}) => {
	const store = useSelector((store: any) => store);
	const dispatch = useDispatch();
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(store.ui.sideBarOpen);

	const toggleSidebar = () => {
		let ns = !sidebarOpen;
		setSidebarOpen(ns);
		dispatch(storeSidebarToggle(ns));
	};

	return (
		<Button type="button" onClick={toggleSidebar}>
			{sidebarOpen ? <MenuOpen /> : <Menu />}
		</Button>
	);
};
export default SidebarToggle;
