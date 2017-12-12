import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');

import Meal from "./Meal";

class Main extends React.Component {
	feed(stuff) {
		console.log(stuff);
	}

	render() {
		return (
			<div>
			<h1>Hello</h1>
			<Meal feed={this.feed.bind(this)} />
			</div>
		);
	}
}

ReactDOM.render(<Main/>, app);