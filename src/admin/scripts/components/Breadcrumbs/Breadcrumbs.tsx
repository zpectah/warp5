import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { appProps, routeProps } from '../../types/types';

interface BreadcrumbsProps {
	route: routeProps;
	app: appProps['app'];
}

const HeaderBreadcrumbs: React.FC<BreadcrumbsProps> = ({ route, app }) => {
	const { t, i18n } = useTranslation(['common', 'page', 'types']);
	const params: any = useParams();

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Warp5</Typography>
				{config.GLOBAL.CMS.LANG_LIST.length > 1 && (
					<Typography color="textPrimary">
						{config.LOCALES_LIST[i18n.language].label}
					</Typography>
				)}
				<Typography color="textPrimary">{app}</Typography>
				<Typography color="textPrimary">{t(`page:${route.label}`)}</Typography>
				{params.id && (
					<Typography color="textPrimary">
						{params.id == 'new' ? t('common:btn.newItem') : `#${params.id}`}
					</Typography>
				)}
				{params.panel && (
					<Typography color="textPrimary">
						{t(`types:${params.panel}`)}
					</Typography>
				)}
			</Breadcrumbs>
		</>
	);
};

export default HeaderBreadcrumbs;
