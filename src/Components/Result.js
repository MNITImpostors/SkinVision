import React from 'react';
import {FaFileCsv, FaFileExcel} from 'react-icons/fa';
import { GoDesktopDownload } from 'react-icons/go';

const Result = (props) => (
	<div className="center-div">
		<h2>Your files are ready!</h2>
		<div id="outer">
			<div>
				<GoDesktopDownload size={100}/>
			</div>
			<div className="inner">
				<button className="btn" onClick={props.downloadCsv}>
					<FaFileCsv size={20}/>
					Get CSV
				</button>
			</div>
			<div className="inner">
				<button className="btn" onClick={props.downloadXls}>
					<FaFileExcel size={20}/>
					Get Excel
				</button>
			</div>
		</div>
	</div>
);

export default Result;