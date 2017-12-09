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


	this.cookClicked = function() {
		breakfastNutrients = calculateNutritional($('#breakfast').val, $('#breakfast-amount').val);
		var meals = [
			new Object({
				meal: "Breakfast",
				recipe: $('#breakfast').val
				amount: $('#breakfast-amount').val

			}),
			new Object({

			})
		];
	}

	//remove API KEY
	this.calculateNutritional = function(recipeName, amount) {
		url = "https://api.edamam.com/search";
		api_key = "75e18472c4a3e6bfc9fac10d5ce607c7";
		app_id = "b387bdfd"

		var nutrients = new Object();

		$.get(url, {q: recipeName, app_key: api_key, app_id: app_id, from: 0, to: 1}, function(data){
			result = JSON.parse(data);
			food_item = result.hits[0];
			nutrients.calories = food_item.calories;
			nutrients.fats = food_item.totalNutrients.FAT.quantity;
			nutrients.saturated = food_item.totalNutrients.FASAT.quantity;
			nutrients.carbs = food_item.totalNutrients.CHOCDF.quantity;
			nutrients.fiber = food_item.totalNutrients.FIBTG.quantity;

		});
	}

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

			<button onClick="this.cookClicked()"></button>
		);
	}
}

