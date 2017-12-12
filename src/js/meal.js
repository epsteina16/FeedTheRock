//TODO:
//add edamam to db
//pan animation
//button styling
//text styling
//background images

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
		var process = this.sendData.bind(this);

		process();
	}

	sendData() {
		this.props.feed(this.state.nutrients);
	}

	//store nutrients
	storeNutrients(result, quantity){
		var nutrients = new Object();

		if (result.length == 0){
			console.log("error");
		} else {
			var food_item = result;
			nutrients.calories = food_item.calories * quantity;
			nutrients.fats = food_item.FAT.quantity * quantity;
			nutrients.saturated = food_item.FASAT.quantity * quantity;
			nutrients.carbs = food_item.CHOCDF.quantity * quantity;
			nutrients.fiber = food_item.FIBTG.quantity * quantity;
			nutrients.sugar = food_item.SUGAR.quantity * quantity;
			nutrients.protein = food_item.PROCNT.quantity * quantity;
			nutrients.cholesterol = food_item.CHOLE.quantity * quantity;
			nutrients.sodium = food_item.NA.quantity * quantity;

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
		var fn = this.storeNutrients.bind(this);
		fn(breakfast.nutrients, breakfast.amount);
		this.setState({"breakfastEntered": false, "breakfast": breakfast.recipe, "breakfastAmount": breakfast.amount, "breakfastChosen": true});
	}

	makeBreakfast() {
		this.setState({"breakfastEntered": true});
	}

	//called when lunch added
	addLunch(lunch) {
		var fn = this.storeNutrients.bind(this);
		fn(lunch.nutrients, lunch.amount);
		this.setState({"lunchEntered": false, "lunch": lunch.recipe, "lunchAmount": lunch.amount, "lunchChosen": true});
	}

	makeLunch() {
		this.setState({"lunchEntered": true});
	}

	//called when dinner added
	addDinner(dinner) {
		var fn = this.storeNutrients.bind(this);
		fn(dinner.nutrients, dinner.amount);
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

