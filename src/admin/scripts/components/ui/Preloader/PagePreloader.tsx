import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

interface PagePreloaderProps {}

const PagePreloader = ({}: PagePreloaderProps) => {
	return (
		<Backdrop open>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default PagePreloader;
