import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { removeToast } from '../../store/actions';
import { toastItemProps } from '../../types/types';
import ToastItem from './ToastItem';

const Wrapper = styled.div`
	width: 300px;
	height: 0;
	position: fixed;
	overflow: visible;
	top: 0.35rem;
	right: 0.35rem;
	z-index: ${(props) => props.theme.toasts.zIndex};
`;
const FloatingList = styled.div``;

interface ToastsListProps {}

const ToastsList = ({}: ToastsListProps) => {
	const store = useSelector((store: any) => store);
	const dispatch = useDispatch();
	const [itemsList, setItemsList] = useState<toastItemProps[]>(store.ui.toasts);

	useEffect(() => setItemsList(store.ui.toasts), [store.ui.toasts]);

	const removeHandler = (data) => {
		dispatch(removeToast(data));
	};

	return (
		<Wrapper>
			<FloatingList>
				{itemsList.map((item) => (
					<ToastItem onRemove={removeHandler} data={item} key={item.id} />
				))}
			</FloatingList>
		</Wrapper>
	);
};

export default ToastsList;
