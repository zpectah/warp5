import React from 'react';

interface PreloaderBaseProps {
	width?: string;
	height?: string;
}

const PreloaderBase: React.FC<PreloaderBaseProps> = ({
	width = '150px',
	height = '150px',
}) => {
	return (
		<svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={width}
			height={height}
			viewBox="0 0 150 150"
			enableBackground="new 0 0 150 150"
		>
			<circle opacity="0.75" fill="rgb(194,24,91)" cx="75" cy="75" r="12.404">
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="translate"
					dur=".7s"
					values="50,0;0,0;50,0;"
					repeatCount="indefinite"
				/>
			</circle>
			<circle opacity="0.75" fill="rgb(81,45,168)" cx="75" cy="75" r="12.404">
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="translate"
					dur=".7s"
					values="-50,0;0,0;-50,0;"
					repeatCount="indefinite"
				/>
			</circle>
		</svg>
	);
};

export default PreloaderBase;
