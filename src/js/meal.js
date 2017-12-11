//TODO:
//autocomplete
//add search things like gluten free...
//pictures of food

import React from "react";

export default class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lunchChosen: true,
			dinnerChosen: true,
			breakfastChosen: true,
			nutrients: {calories: 0, fats: 0, saturated: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, cholesterol: 0}
		}
	}


	cookClicked() {
		var breakfast = {recipeName: $('#breakfast').val(), amount: parseInt($('#breakfast-amount').val())};
		var lunch = {recipeName: $('#lunch').val(), amount: parseInt($('#lunch-amount').val())};
		var dinner = {recipeName: $('#dinner').val(), amount: parseInt($('#dinner-amount').val())};

		var fn = this.storeNutrients.bind(this);
		var process = this.sendData.bind(this);

		var url = "https://api.edamam.com/search";
		var api_key = "75e18472c4a3e6bfc9fac10d5ce607c7";
		var app_id = "b387bdfd";

		var nutrients = new Object();

		console.log(this.state.nutrients);

		$.get(url, {q: breakfast.recipeName, app_key: api_key, app_id: app_id, from: 0, to: 1}, function(data){
			fn(data, breakfast.amount);

			$.get(url, {q: lunch.recipeName, app_key: api_key, app_id: app_id, from: 0, to: 1}, function(data){
				fn(data, lunch.amount);

				$.get(url, {q: dinner.recipeName, app_key: api_key, app_id: app_id, from: 0, to: 1}, function(data){
					fn(data, dinner.amount);

					process();
				});
			});
		});
	}

	sendData() {
		//all meals have been processed
		console.log(this.state.nutrients);
		this.props.feed(this.state.nutrients);
	}

	storeNutrients(result, quantity){
		var nutrients = new Object();

		if (result.hits.length == 0){
			console.log("error");
		} else {
			var food_item = result.hits[0].recipe;
			nutrients.calories = food_item.calories * quantity;
			nutrients.fats = food_item.totalNutrients.FAT.quantity * quantity;
			nutrients.saturated = food_item.totalNutrients.FASAT.quantity * quantity;
			nutrients.carbs = food_item.totalNutrients.CHOCDF.quantity * quantity;
			nutrients.fiber = food_item.totalNutrients.FIBTG.quantity * quantity;
			nutrients.sugar = food_item.totalNutrients.SUGAR.quantity * quantity;
			nutrients.protein = food_item.totalNutrients.PROCNT.quantity * quantity;
			nutrients.cholesterol = food_item.totalNutrients.CHOLE.quantity * quantity;

			this.setState({nutrients: {
				calories: this.state.nutrients.calories + nutrients.calories,
				fats: this.state.nutrients.fats + nutrients.fats,
				saturated: this.state.nutrients.saturated + nutrients.saturated,
				carbs: this.state.nutrients.carbs + nutrients.carbs,
				fiber: this.state.nutrients.fiber + nutrients.fiber,
				sugar: this.state.nutrients.sugar + nutrients.sugar,
				protein: this.state.nutrients.protein + nutrients.protein,
				cholesterol: this.state.nutrients.cholesterol + nutrients.cholesterol
			}});
		}
	}
	

	render () {
		return (
			<div>
			<h2>Choose your meals!</h2>
			<label for="breakfast">Breakfast: </label><input id="breakfast" />
			{ this.state.breakfastChosen ? 
					(<div><label for="breakfast-amount">Number of portions: </label><input id="breakfast-amount" type="range" min="1" max="5" /></div>) 
					: (<p>Not selected</p>)
			}

			<label for="lunch">Lunch: </label><input id="lunch" />
			{ this.state.lunchChosen ? 
					(<div><label for="lunch-amount">Number of portions: </label><input id="lunch-amount" type="range" min="1" max="5" /></div>) 
					: (<p>Not selected</p>)
			}

			<label for="dinner">Dinner: </label><input id="dinner" />
			{ this.state.dinnerChosen ? 
					(<div><label for="dinner-amount">Number of portions: </label><input id="dinner-amount" type="range" min="1" max="5" /></div>) 
					: (<p>Not selected</p>)
			}

			<button onClick={this.cookClicked.bind(this)}>Cook!</button>
			</div>
		);
	}
}

