//TODO:
//pan animation
//show nutrition for meal

import React from "react";
import PickMeal from "./PickMeal";

const url = "https://api.edamam.com/search";
const api_key = "75e18472c4a3e6bfc9fac10d5ce607c7";
const app_id = "b387bdfd";


export default class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lunchChosen: false,
			lunchEntered: false,
			dinnerChosen: false,
			dinnerEntered: false,
			breakfastChosen: false,
			breakfastEntered: false,
			nutrients: {calories: 0, fats: 0, saturated: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, cholesterol: 0, sodium: 0},
			breakfast: "",
			breakfastAmount: 0,
			lunch: "",
			lunchAmount: 0,
			dinner: "",
			dinnerAmount: 0
		}
	}

	//called on cook
	cookClicked() {
		var breakfast = {recipeName: this.state.breakfast, amount: this.state.breakfastAmount};
		var lunch = {recipeName: this.state.lunch, amount: this.state.lunchAmount};
		var dinner = {recipeName: this.state.dinner, amount: this.state.dinnerAmount};

		var fn = this.storeNutrients.bind(this);
		var process = this.sendData.bind(this);

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
		this.props.feed(this.state.nutrients);
	}

	//
	storeNutrients(result, quantity){
		var nutrients = new Object();

		if (result.hits.length == 0){
			console.log("error");
		} else {
			var food_item = result;
			nutrients.calories = food_item.calories * quantity;
			nutrients.fats = food_item.totalNutrients.FAT.quantity * quantity;
			nutrients.saturated = food_item.totalNutrients.FASAT.quantity * quantity;
			nutrients.carbs = food_item.totalNutrients.CHOCDF.quantity * quantity;
			nutrients.fiber = food_item.totalNutrients.FIBTG.quantity * quantity;
			nutrients.sugar = food_item.totalNutrients.SUGAR.quantity * quantity;
			nutrients.protein = food_item.totalNutrients.PROCNT.quantity * quantity;
			nutrients.cholesterol = food_item.totalNutrients.CHOLE.quantity * quantity;
			nutrients.sodium = food_item.totalNutrients.NA.quantity * quantity;

			this.setState({nutrients: {
				calories: this.state.nutrients.calories + nutrients.calories,
				fats: this.state.nutrients.fats + nutrients.fats,
				saturated: this.state.nutrients.saturated + nutrients.saturated,
				carbs: this.state.nutrients.carbs + nutrients.carbs,
				fiber: this.state.nutrients.fiber + nutrients.fiber,
				sugar: this.state.nutrients.sugar + nutrients.sugar,
				protein: this.state.nutrients.protein + nutrients.protein,
				cholesterol: this.state.nutrients.cholesterol + nutrients.cholesterol,
				sodium: this.state.nutrients.sodium + nutrients.sodium
			}});
		}
	}

	//called when breakfast added
	addBreakfast(breakfast) {
		storeNutrients(breakfast.nutrients, breakfast.amount).bind(this);
		this.setState({"breakfastEntered": false, "breakfast": breakfast.recipe, "breakfastAmount": breakfast.amount, "breakfastChosen": true});
	}

	makeBreakfast() {
		this.setState({"breakfastEntered": true});
	}

	//called when lunch added
	addLunch(lunch) {
		storeNutrients(lunch.nutrients, lunch.amount).bind(this);
		this.setState({"lunchEntered": false, "lunch": lunch.recipe, "lunchAmount": lunch.amount, "lunchChosen": true});
	}

	makeLunch() {
		this.setState({"lunchEntered": true});
	}

	//called when dinner added
	addDinner(dinner) {
		storeNutrients(dinner.nutrients, dinner.amount).bind(this);
		this.setState({"dinnerEntered": false, "dinner": dinner.recipe, "dinnerAmount": dinner.amount, "dinnerChosen": true});
	}

	makeDinner() {
		this.setState({"dinnerEntered": true});
	}



	

	render () {

		if (this.state.breakfastEntered) {
			return (
				<PickMeal mealName = {"Breakfast"} chooseMeal = {this.addBreakfast.bind(this)} />
			);
		}
		else if (this.state.lunchEntered) {
			return (
				<PickMeal mealName = {"Lunch"} chooseMeal = {this.addLunch.bind(this)} />
			);
		}
		else if (this.state.dinnerEntered) {
			return (
				<PickMeal mealName = {"Dinner"} chooseMeal = {this.addDinner.bind(this)} />
			);
		}
		else {
			return (
				<div class="meal-container">
				<h2>Pick Your Meals</h2>

				{this.state.breakfastChosen ? (
					<p> { this.state.breakfast } </p>
				) : (
					<div>
					<button onClick={ this.makeBreakfast.bind(this) }>Make Breakfast</button>
					<br />
					</div>
				)}

				{this.state.lunchChosen ? (
					<p> { this.state.lunch } </p>
				) : (
					<div>
					<button onClick={ this.makeLunch.bind(this) }>Make Lunch</button>
					<br />
					</div>
				)}

				{this.state.dinnerChosen ? (
					<p> { this.state.dinner } </p>
				) : (
					<div>
					<button onClick={ this.makeDinner.bind(this) }>Make Dinner</button>
					<br />
					</div>
				)}


				<button onClick={this.cookClicked.bind(this)} disabled={!this.state.breakfastChosen || !this.state.lunchChosen || !this.state.dinnerChosen}>Cook!</button>
				</div>
			);
		}
	}
}

