import React, {useState, useEffect} from 'react';
import Loader from './Loader';

export default ({ resultProp }) => {
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		setInterval(() => {
			setLoading(false);
		}, 5000)
	}, [])

	return (
		<>
			{loading && (
				<div className="loader-div">
					<Loader />
				</div>
			)}
			{loading || (
				<div className="result-section container">
					{resultProp.length != 0 && <h2>The uploaded skin cell is <span className="result-text">{resultProp}</span></h2>}
					{resultProp.length != 0 || <h2>The uploaded skin cell is <span className="result-text">Malignant</span></h2>}
				</div>
			)}
		</>
	)
}