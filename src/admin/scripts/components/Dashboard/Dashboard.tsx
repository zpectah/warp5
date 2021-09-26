import React from 'react';
import Grid from '@material-ui/core/Grid';

// import DefaultBlock from './blocks/DefaultBlock';
import UserBlock from './blocks/UserBlock';
import LastMessagesBlock from "./blocks/LastMessagesBlock";
import LastRequestsBlock from "./blocks/LastRequestsBlock";
import LastUploadsBlock from "./blocks/LastUploadsBlock";
import UserPostsBlock from "./blocks/UserPostsBlock";
import PublishPostsBlock from "./blocks/PublishPostsBlock";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<UserBlock />
				</Grid>
				<Grid item xs>
					<PublishPostsBlock />
				</Grid>
				<Grid item xs>
					<UserPostsBlock />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs>
					<LastUploadsBlock />
				</Grid>
				<Grid item xs>
					<LastMessagesBlock />
				</Grid>
				<Grid item xs>
					<LastRequestsBlock />
				</Grid>
			</Grid>
		</>
	);
};

export default Dashboard;
