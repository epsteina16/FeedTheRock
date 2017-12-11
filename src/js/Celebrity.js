import React from "react";
import ReactDOM from "react-dom";

import Meal from "./Meal";

// Need to pass Ronnie a Function that allows for calloric data
const app = document.getElementById('app');

class Celebrity extends React.Component {
	constructor() {
		super();
		this.state = {
			score: 0,

		}
	}
// variable that keeps track of showing celebrity or our meal component

// Set variables, assume what charlie passes. Render as HTML, include styles in index 
	generateScore(score) {
		this.setState({score});
	}
	render() {
		return (
			<Meal generateScore={this.generateScore.bind(this)} score={this.state.score} />
		);
	}

}


ReactDOM.render(<Celebrity/>, app);