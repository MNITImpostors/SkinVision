import React, {useState, useEffect} from 'react';
import Loader from './Loader';

export default ({ resultProp }) => {
	const [loading, setLoading] = useState(true)
	const [result, setResult] = useState(resultProp)
	
	useEffect(() => {
		if(result) {
			setResult("Malignant")
		}

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
					<h2>The uploaded skin cell is <span className="result-text">{resultProp}</span></h2>
				</div>
			)}
		</>
	)
}