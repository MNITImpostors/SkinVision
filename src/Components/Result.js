import React, {useState, useEffect} from 'react';
import Loader from './Loader';
import { firestore } from '../services/firebase';
 
export default ({ resultProp, phonenumber, reuploadImage }) => {
	const [loading, setLoading] = useState(true)
	const [result, setResult] = useState("")
	
	useEffect(() => {
		firestore.collection('users').where("phonenumber", "==", phonenumber).get()
		.then((query) => {
			query.forEach((doc) => {
				setResult(doc.data().result)
			})
		})

		setInterval(() => {
			setLoading(false);
		}, 5000)
	}, [])

	const handleBenignChange = () => {
		firestore.collection('users').where("phonenumber", "==", phonenumber).get()
			.then((query) => {
				query.forEach((doc) => {
					firestore.collection('users').doc(doc.id).update({
						result: "Benign"
					})
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleMalignnantChange = () => {
		firestore.collection('users').where("phonenumber", "==", phonenumber).get()
			.then((query) => {
				query.forEach((doc) => {
					firestore.collection('users').doc(doc.id).update({
						result: "Malignant"
					})
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<>
			{loading && (
				<div className="loader-div">
					<Loader />
				</div>
			)}
			{loading || (
				<div className="result-section container">
					{resultProp.length !== 0 && <h2>The uploaded skin cell is <div className="result-text">{resultProp}</div></h2>}
					{resultProp.length !== 0 || <h2>The uploaded skin cell is <div className="result-text">{result}</div></h2>}
					<div className="login-form__signup" style={{marginTop: "25px"}}>
						<button className="signup-button" style={{color: "#fec503"}} onClick={() => {reuploadImage()}}>Reupload Image of User</button>
					</div>
					<div className="login-form__signup" style={{marginTop: "25px"}}>
						<span style={{color: "#00000"}}>Submit Actual Test Result</span> 	
					</div>
					<div className="result__div">
						<button className="btn" onClick={handleBenignChange}>Benign</button>
						<button className="btn" onClick={handleMalignnantChange}>Malignant</button>
					</div>
				</div>


			)}
		</>
	)
}