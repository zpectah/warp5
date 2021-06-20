import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import { addToast, addMessage } from '../../store/actions';

const DashboardPage = () => {
	const { t } = useTranslation('page');
	const dispatch = useDispatch();

	return (
		<Layout.Default
			route={ROUTES.app.dashboard}
			titlePage={t('page:Dashboard.page.title')}
			titleMeta={t('page:Dashboard.meta.title')}
		>
			<Section>
				<div>...DashboardPage...</div>
			</Section>
			<Section>
				<div>
					<button
						type="button"
						onClick={() =>
							dispatch(
								addToast({
									title: 'Toast title',
									context: 'default',
								}),
							)
						}
					>
						open default
					</button>
					<br />
					<button
						type="button"
						onClick={() =>
							dispatch(
								addToast({
									title: 'Toast success title',
									context: 'success',
									timeout: 3500,
								}),
							)
						}
					>
						open success
					</button>
					<br />
					<button
						type="button"
						onClick={() =>
							dispatch(
								addToast({
									title: 'Toast error title',
									context: 'error',
									timeout: 3500,
								}),
							)
						}
					>
						open error
					</button>
				</div>
			</Section>
			<Section>
				<div>
					<button
						type="button"
						onClick={() =>
							dispatch(
								addMessage({
									title: 'Toast new title',
									content:
										"Nulla tristique ipsum ac lacus lorem a leo at felis magna magna ac fermentum amet. Vestibulum morbi tincidunt orci luctus mullamcorper vestibulum ut faucibus luctus pellentesque accumsan tristique orci consectetur. Mullamcorper lacus cras venenatis vestibulum posuere ac sit venenatis ipsum tincidunt volutpat jak'tahla aliquam felis. Tellus et curae vestibulum a augue nulla eros felis posuere pellentesque mi adipiscing vel venenatis. ",
									onConfirm: () => {
										console.log('Callback from message');
									},
								}),
							)
						}
					>
						open default message with callback
					</button>
				</div>
			</Section>
		</Layout.Default>
	);
};

export default DashboardPage;
