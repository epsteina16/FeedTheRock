//PickMeal
//Used for selecting individual meal

import React from "react";

export default class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mealChosen: false,
			recipes: [],
			value: ""
		}
	}

	render () {
		const suggestions = this.state.recipes;
		const value = this.state.value;

		return (

		)
	}
}