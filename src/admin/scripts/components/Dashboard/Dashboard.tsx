import React from 'react';
import Grid from '@material-ui/core/Grid';

import DefaultBlock from './blocks/DefaultBlock';
import UserBlock from './blocks/UserBlock';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs>
					<UserBlock />
				</Grid>
				<Grid item xs>
					<DefaultBlock>DefaultBlock</DefaultBlock>
				</Grid>
				<Grid item xs>
					<DefaultBlock>DefaultBlock</DefaultBlock>
				</Grid>
			</Grid>
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

export default Dashboard;
