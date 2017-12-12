//TODO:
//autocomplete
//add search things like gluten free...
//pictures of food

import React from "react";
import Autosuggest from 'react-autosuggest';

const url = "https://api.edamam.com/search";
const api_key = "75e18472c4a3e6bfc9fac10d5ce607c7";
const app_id = "b387bdfd";

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.label;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.label}
    <br />
    {suggestion.dietaryRestrictions}
  </div>
);


export default class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lunchChosen: true,
			dinnerChosen: true,
			breakfastChosen: false,
			nutrients: {calories: 0, fats: 0, saturated: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, cholesterol: 0, sodium: 0},
			breakfast: "",
			lunch: "",
			dinner: "",
			recipes: []
		}
	}

	//called on cook
	cookClicked() {
		var breakfast = {recipeName: $('#breakfast').val(), amount: parseInt($('#breakfast-amount').val())};
		var lunch = {recipeName: $('#lunch').val(), amount: parseInt($('#lunch-amount').val())};
		var dinner = {recipeName: $('#dinner').val(), amount: parseInt($('#dinner-amount').val())};

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
		//all meals have been processed
		console.log(this.state.nutrients);
		this.props.feed(this.state.nutrients);
	}

	//
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


	onChangeBreakfast = (event, { newValue }) => {
		this.setState({
			breakfast: newValue
		});
	};

	onChangeLunch = (event, { newValue }) => {
		this.setState({
			lunch: newValue
		});
	};

	onChangeDinner = (event, { newValue }) => {
		this.setState({
			dinner: newValue
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		if (this.state.breakfast.length % 3 == 0) {
			$.get(url, {q: value, app_key: api_key, app_id: app_id, from: 0, to: 50}, function(data){
				var result = data.hits;
				var meals;
				meals = result.map(function(val, index, array){
					var meal = new Object();
					meal.label = val.recipe.label;
					meal.dietaryRestrictions = val.recipe.dietLabels.map(function(value){
						return value + " "
					}) + val.recipe.healthLabels.map(function(value){
						return value + " "
					});
					meal.pic = val.recipe.image;
					return meal;
				});
				this.setState({
					recipes: meals
				});
			}.bind(this));
		}
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
	  		recipes: []
		});
	};

	//called when breakfast is chosen
	onBreakfastSelected = (event, { suggestion, suggestionValue }) => {
		console.log(suggestion);
		console.log(suggestionValue);
		this.setState({breakfastChosen: true, breakfastImage: suggestion.pic, breakfast: suggestion.label});
	}

	//called when lunch is chosen
	onLunchSelected = (event, { suggestion, suggestionValue }) => {
		this.setState({lunchChosen: true, lunchImage: suggestion.pic, lunch: suggestion.label});
	}

	//called when dinner is chosen
	onBreakfastSelected = (event, { suggestion, suggestionValue }) => {
		this.setState({dinnerChosen: true, dinnerImage: suggestion.pic, dinner: suggestion.label});
	}


	

	render () {
		const suggestions = this.state.recipes;
		const breakfast = this.state.breakfast;
		const lunch = this.state.lunch;
		const dinner = this.state.dinner;

		// Autosuggest will pass through all these props to the input.
	    const inputPropsBreakfast = {
	      placeholder: 'Breakfast',
	      value: breakfast,
	      onChange: this.onChangeBreakfast
	    };

	    const inputPropsLunch = {
	      placeholder: 'Lunch',
	      value: lunch,
	      onChange: this.onChangeLunch
	    };

	    const inputPropsDinner = {
	      placeholder: 'Dinner',
	      value: dinner,
	      onChange: this.onChangeDinner
	    };



		return (
			<div class="meal-container">
			<h2>Choose your meals!</h2>

			<div class="meal">
				<div class="meal-pic">
					{ this.state.breakfastChosen ?
						( <img id="breakfastImg" src={ this.state.breakfastImage } alt="Breakfast"></img>) 
							: (<p>Breakfast is a good way to start the day!</p>)
					}
				</div>
				<div class="meal-choose">
					<Autosuggest
				        suggestions={suggestions}
				        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				        getSuggestionValue={getSuggestionValue}
				        renderSuggestion={renderSuggestion}
				        inputProps={inputPropsBreakfast}
				        onSuggestionSelected={this.onBreakfastSelected}
				      />
					{ this.state.breakfastChosen ? 
							(<div><label for="breakfast-amount">Number of portions: </label><input id="breakfast-amount" type="range" min="1" max="5" /></div>) 
							: (<p>Not selected</p>)
					}
				</div>
			</div>

			<div class="meal">
				<div class="meal-pic">
					{ this.state.lunchChosen ?
						( <img id="lunchImg" src={ this.state.lunchImage } alt="Lunch"></img>) 
							: (<p>Lunch is a good way to break up the day!</p>)
					}
				</div>
				<div class="meal-choose">
					<Autosuggest
				        suggestions={suggestions}
				        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				        getSuggestionValue={getSuggestionValue}
				        renderSuggestion={renderSuggestion}
				        inputProps={inputPropsLunch}
				        onSuggestionSelected={this.onLunchSelected}
				      />
					{ this.state.lunchChosen ? 
							(<div><label for="lunch-amount">Number of portions: </label><input id="lunch-amount" type="range" min="1" max="5" /></div>) 
							: (<p>Not selected</p>)
					}
				</div>
			</div>

			<div class="meal">
				<div class="meal-pic">
					{ this.state.dinnerChosen ?
						( <img id="dinnerImg" src={ this.state.dinnerImage } alt="Dinner"></img>) 
							: (<p>Dinner is a good way to end the day!</p>)
					}
				</div>
				<div class="meal-choose">
					<Autosuggest
				        suggestions={suggestions}
				        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				        getSuggestionValue={getSuggestionValue}
				        renderSuggestion={renderSuggestion}
				        inputProps={inputPropsDinner}
				        onSuggestionSelected={this.onDinnerSelected}
				      />
					{ this.state.dinnerChosen ? 
							(<div><label for="dinner-amount">Number of portions: </label><input id="dinner-amount" type="range" min="1" max="5" /></div>) 
							: (<p>Not selected</p>)
					}
				</div>
			</div>

			<button onClick={this.cookClicked.bind(this)} disabled={this.state.breakfastChosen && this.state.lunchChosen && this.state.dinnerChosen}>Cook!</button>
			</div>
		);
	}
}

