import React from 'react';
import Grid from '@material-ui/core/Grid';

import DefaultBlock from './blocks/DefaultBlock';

interface MarketDashboardProps {}

const MarketDashboard: React.FC<MarketDashboardProps> = ({}) => {
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs>
					<DefaultBlock>DefaultBlock</DefaultBlock>
				</Grid>
				<Grid item xs={6}>
					<DefaultBlock>DefaultBlock</DefaultBlock>
				</Grid>
				<Grid item xs>
					<DefaultBlock>DefaultBlock</DefaultBlock>
				</Grid>
			</Grid>
		</>
	);
};

export default MarketDashboard;
