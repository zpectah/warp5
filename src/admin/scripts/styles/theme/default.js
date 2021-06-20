import palette from '../palette';

export default {
	color: palette,
	fontSizeBase: '16px',
	spacer: '2rem',
	view: {
		color: 'rgb(25,25,25)',
		bg: 'rgb(250,250,250)',
	},
	sidebar: {
		zIndex: 99,
		transitionDuration: '.125s',
		color: 'rgb(25,25,25)',
		bg: 'rgb(225,225,225)',
		bar: {
			width: '50px',
		},
		panel: {
			width: '200px',
		},
	},
	messages: {
		zIndex: 200,
		default: {
			color: palette.white,
			bg: palette.grey,
		},
	},
	toasts: {
		zIndex: 250,
		default: {
			color: palette.white,
			bg: palette.grey,
		},
		success: {
			color: palette.white,
			bg: palette.green,
		},
		error: {
			color: palette.white,
			bg: palette.red,
		},
	},
};
