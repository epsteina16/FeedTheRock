import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementByID('app');

class Main extends React.Component {
	render() {
		return (
			<h1>Hello</h1>
		);
	}
}

ReactDOM.render(<Main/>, app);