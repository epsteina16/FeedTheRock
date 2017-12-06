import React from "react";

export default class Meal extends React.Component {
	constructor() {
		super();
		this.state = {
			lunchChosen: false;
			dinnerChosen: false;
			breakfastChosen: false;
		}
	}


	$("#cook").click(function(){

	});

	$("#breakfast").onKeyUp(function(){
		this.setState({breakfastChosen: true});
	});

	$("#lunch").onKeyUp(function(){
		this.setState({lunchChosen: true});
	});

	$("#dinner").onKeyUp(function(){
		this.setState({dinnerChosen: true});
	});

	render () {
		return (
			<h2>Choose your meals!</h2>
			<label for="breakfast">Breakfast: </label><input id="breakfast">
			{ if (this.breakfastChosen == true) {
				  <label for="breakfast-amount">Number of portions: </label><input id="breakfast-amount" type="range" min="1" max="5">
			  }
			}

			<label for="lunch">Lunch: </label><input id="lunch">
			{ if (this.lunchChosen == true) {
				  <label for="lunch-amount">Number of portions: </label><input id="lunch-amount" type="range" min="1" max="5">
			  }
			}
			<label for="dinner">Dinner: </dinner><input id="dinner">
			{ if (this.dinnerChosen == true) {
				  <label for="dinner-amount">Number of portions: </label><input id="dinner-amount" type="range" min="1" max="5">
			  }
			}

			<button onClick="this."
		)
	}
}

