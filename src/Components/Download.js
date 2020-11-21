import React from 'react';
import Loader from './Loader';
import Result from './Result';
import { v4 as uuidv4 } from 'uuid';

class Download extends React.Component {
	state = {
		loading: true
	}
	downloadCsv() {
		const id = uuidv4();
		window.open(`http://localhost:5000/csv/${id}`, '_blank');
	};

	downloadXls () {
		const id = uuidv4();
		window.open(`http://localhost:5000/xls/${id}`, '_blank');
	};

	render() {
		setTimeout(() => {
			this.setState(() => ({loading: false}))
		}, 4000);
		return (
			<div>
				{this.state.loading && <Loader />}
				{this.state.loading || <Result downloadCsv={this.downloadCsv} downloadXls={this.downloadXls}/>}
			</div>
		)
	}
}

export default Download; 