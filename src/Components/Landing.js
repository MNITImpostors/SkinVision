import React from 'react';
import Download from './Download';
import { FaDownload } from "react-icons/fa";

class Landing extends React.Component {
	state = {
		showResults: false
	}
	handleClick = () => {
		var fileInput = document.getElementById('file-upload');
		fileInput.click()
	}
	handleChange = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		fetch('http://localhost:5000/upload', {
			method: 'POST',
			body: data
		}).then((response) => {
			response.json().then((body) => {
				console.log(body);
			});
		}).catch((error) => {
			console.error(error);
		});
		this.setState(() => ({showResults: true}))
	}
	render(){
		return (
			<div>
				{this.state.showResults && <Download />}
				{this.state.showResults || 
					<div>	
						<h2>Upload Resume (PDF or Doc)</h2>
						<p></p>
						<form className="uploader" id="file-upload-form">
							<div>
								<input type="file" name="resume" ref={(ref) => { this.uploadInput = ref; }} accept=".jpg, .jpeg" id="file-upload" onChange={this.handleChange}/>
								<label id="file-label" >
									<div id="start">
										<div id="icons">
											<FaDownload size={60} className="icon"/>
										</div>
										<div>Select a file</div>
										<span id="file-upload-btn" className="btn btn-primary" onClick={this.handleClick}>Upload</span>
									</div>
								</label>
							</div>
					 		<p></p>
						</form>
					</div>
				}
			</div>
		)
	}
};

export default Landing;