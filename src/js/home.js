import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');

class Main extends React.Component {
	render() {
		return (
			<h1> Hello </h1>
			<button type="button"> Start onClick={() => alert('click')</button>
		);
	}
}

ReactDOM.render(<Main/>, app);