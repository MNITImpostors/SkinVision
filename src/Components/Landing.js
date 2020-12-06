import React from 'react';
import Navbar from './Navbar';
import Result from './Result';
import Login from './Login';
import { FaDownload } from "react-icons/fa";

class Landing extends React.Component {
	state ={
		showResults: false,
		result: "",
		loggedIn: false
	}

	constructor() {
		super()
		this.handleSignIn = this.handleSignIn.bind(this);
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
			});
		}).catch((error) => {
			console.error(error);
		});
		this.setState(() => ({showResults: true}))
	}

	handleSignIn() {
		this.setState(() => ({loggedIn: true}))
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
							<Result resultProp = {this.state.result}/>
						)}
					</>
				)}
			</>
		)
	}
};

export default Landing;