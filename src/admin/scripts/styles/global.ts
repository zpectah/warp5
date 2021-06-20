import { createGlobalStyle } from 'styled-components';

export const GLOBAL = createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: ${(props) => props.theme.fontSizeBase};
	}
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-family: 'Roboto', Verdana, Arial, Helvetica, sans-serif;
		font-size: 1rem;
		color: ${(props) => props.theme.view.color};
		background-color: ${(props) => props.theme.view.bg};
	}

	.app {
		width: 100%;
		height: auto;
		min-height: 100%;
		display: flex;
	}

`;
