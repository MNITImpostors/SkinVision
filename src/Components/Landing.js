import React from 'react';
import Navbar from './Navbar';
import Result from './Result';
import Login from './Login';
import { FaDownload } from "react-icons/fa";
import { firestore } from '../services/firebase';

class Landing extends React.Component {
	fileUpload = require('fuctbase64')

	constructor() {
		super()

		this.state ={
			showResults: false,
			result: "",
			loggedIn: false,
			getUserDetails: false,
			username: "",
			phoneNumber: "", 
			imageb64String: ""
		}

		this.handleSignIn = this.handleSignIn.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
		this.addUser = this.addUser.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.reuploadImage = this.reuploadImage.bind(this)
	}

	handleNav = () => {
		this.setState(() => ({
			showResults: false
		}))
	}

	handleClick = () => {
		var fileInput = document.getElementById('file-upload');
		fileInput.click()
	}
	handleChange = (e) => {
		this.fileUpload(e)
		.then((data) => {
			firestore.collection('users').where("phonenumber", "==", this.state.phoneNumber).get()
				.then((query) => {
					query.forEach((doc) => {
						firestore.collection('users').doc(doc.id).update({
							image: data.base64
						})
					})
				})
		})

		e.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		fetch('/upload', {
			method: 'POST',
			body: data
		}).then((response) => {
			response.json().then((body) => {
				let nums = body.y.split("[[");
				let str1 = nums[1];
				let scores = str1.split(" ");
				
				let benign = parseFloat(scores[0]);
				let malignant = parseFloat(scores[1]);

				if(benign > malignant) {
					this.setState(() => ({result: "Benign"}))
				} else {
					this.setState(() => ({result: "Malignant"}))
				}
				
				firestore.collection('users').where("phonenumber", "==", this.state.phoneNumber).get()
				.then((query) => {
					query.forEach((doc) => {
						firestore.collection('users').doc(doc.id).update({
							result: this.state.result,
						})
					})
				})

			});
		}).catch((error) => {
			console.error(error);
		});
		this.setState(() => ({showResults: true}))
	}

	handleSignIn() {
		this.setState(() => ({loggedIn: true}))
	}

	reuploadImage() {
		this.setState(() =>({showResults: false}))
	}

	handleUsernameChange(e) {
		const { target } = e;
		this.setState(preState => ({
			...preState,
			username: target.value
		}));
	}

	handlePhoneNumberChange(e) {
		const { target } = e;
		this.setState(preState => ({
			...preState,
			phoneNumber: target.value
		}));
	}

	addUser() {
		firestore.collection('users').where("phonenumber", "==", this.state.phoneNumber).get()
		.then((querySnapshot) => {
			if(!querySnapshot.empty) {
				querySnapshot.forEach((doc) => {
					this.setState(() => ({getUserDetails: true}))
					this.setState(() => ({showResults: true}))
				})	
			} else {
				firestore.collection('users').add({
					name: this.state.username,
					phonenumber: this.state.phoneNumber
				})
				this.setState(() => ({getUserDetails: true}))
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render(){
		return (
			<>
				<Navbar handleNav={this.handleNav} />
				{this.state.loggedIn || (
					<Login handleSignIn={this.handleSignIn}/>
				)}
				{this.state.loggedIn && (
					<>	
						{this.state.getUserDetails || (
							<>
								<div className="login-div">
									<div className="login-form">
										<h2>User Details</h2>
										<div className="login-form__item">
                                			<input className="login-form__input" name="username" value={this.state.username} placeholder="Name" onChange={this.handleUsernameChange}/>
                            			</div>
										<div className="login-form__item">
                                			<input className="login-form__input" name="phonenumber" value={this.state.phoneNumber} placeholder="Phone Number" onChange={this.handlePhoneNumberChange}/>
                            			</div>
										<span id="file-upload-btn" className="btn" onClick={this.addUser}>Submit</span>
									</div>
								</div>
							</>
						)}
						{this.state.getUserDetails && (
							<>
								{this.state.showResults || (
									<div style={{"marginTop": "10%"}}>	
										<h2 className="uploader-title">Upload Skin Image</h2>
										<form className="uploader" id="file-upload-form">
											<div className="upload-div">
												<input type="file" name="resume" ref={(ref) => { this.uploadInput = ref; }} accept=".jpg, .jpeg" id="file-upload" onChange={this.handleChange}/>
												<label id="file-label"  className="landing-label">
													<div id="start">
														<div id="icons">
															<FaDownload size={60} className="icon"/>
														</div>
														<div>Select a file</div>
														<span id="file-upload-btn" className="btn" onClick={this.handleClick}>Upload</span>
													</div>
												</label>
											</div>
											<p></p>
										</form>
									</div>
								)}
								{this.state.showResults && (
									<Result resultProp = {this.state.result} phonenumber = {this.state.phoneNumber} reuploadImage={this.reuploadImage}/>
								)}
							</>
						)}

					</>
				)}
			</>
		)
	}
};

export default Landing;