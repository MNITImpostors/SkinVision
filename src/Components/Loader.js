import React from 'react';
import Loader from 'react-loader-spinner';

export default () => {
	return (
		<>
			<Loader
				type="Bars"
				color="#000000"
				height={120}
				width={120}
				timeout={5000} //3 secs
      		/>
		</>
	)
}