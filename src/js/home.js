import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');

class Main extends React.Component {

	render() {
		return (
			<div>
			<h1>Hello</h1>
			</div>
		);
	}
}

ReactDOM.render(<Main/>, app);