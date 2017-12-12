//PickMeal
//Used for selecting individual meal

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
  <div class="suggestion-container">
  	<div class="suggestion-half">
  		<img src={suggestion.pic} alt="" />
  	</div>
  	<div class="suggestion-half">
	  	<h5>
	    {suggestion.label}</h5>
	    <p>
	    {suggestion.dietaryRestrictions}</p>
	</div>
  </div>
);

export default class PickMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mealChosen: true,
			recipes: [],
			value: "",
			image: "",
			cookingTimeLeft: Math.floor(Math.random() * 20) + 10,
			nutrients: {}
		}
	}

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue,
			mealChosen: false
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		if (this.state.value.length == 5 || this.state.value[this.state.value.length - 1] == " ") {
			$.get(url, {q: this.state.value, app_key: api_key, app_id: app_id, from: 0, to: 100}, function(data){
				var result = data.hits;
				var meals;
				meals = result.map(function(val, index, array){
					var meal = new Object();
					meal.label = val.recipe.label;
					meal.dietaryRestrictions = val.recipe.dietLabels.map(function(value){
						return " " + value
					}) + val.recipe.healthLabels.map(function(value){
						return " " + value
					});
					meal.pic = val.recipe.image;
					meal.nutrition = val.recipe.totalNutrients;
					meal.nutrition.calories = val.recipe.calories
					return meal;
				});
				this.setState({
					recipes: meals
				});
			}.bind(this));
		} else {
			this.setState({
				recipes: this.state.recipes
			});
		}
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
	  		recipes: []
		});
	};

	//called when breakfast is chosen
	onMealSelected = (event, { suggestion, suggestionValue }) => {
		this.setState({mealChosen: true, image: suggestion.pic, value: suggestion.label, nutrients: suggestion.nutrition});
	}

	//called to cook
	cook() {
	    $('#pan').removeClass().addClass('shake' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	      	$(this).removeClass();
    	});

		if (this.state.cookingTimeLeft == 0) {
			var meal = new Object();
			meal.amount = parseInt($("#meal-amount").val());
			meal.recipe = this.state.value;
			meal.nutrients = this.state.nutrients;
			this.props.chooseMeal(meal);
		} else {
			this.setState({cookingTimeLeft: this.state.cookingTimeLeft - 1});
		}
	}

	render () {
		const suggestions = this.state.recipes;
		const value = this.state.value;
		const placeholder = this.props.mealName;

		// Autosuggest will pass through all these props to the input.
	    const inputProps = {
	      placeholder: placeholder,
	      value,
	      onChange: this.onChange
	    };

		return (
			<div class="meal">
				<h2> {this.props.mealName} {this.state.mealChosen ? (": " + this.state.value) : ("")}</h2>
				<div class="meal-info">
					<div class="meal-pic">
						{ this.state.mealChosen ?
							( <img src={ this.state.image } alt="Meal"></img>) 
								: (<br />)
						}
					</div>
					<div class="meal-ingredients">
						<h5>Nutrition Facts per Recipe</h5>
						<p>Calories: { this.state.nutrients.calories }</p>
						<p>Fat: { this.state.nutrients.FAT.quantity }g</p>
						<p>Carbohydrates: { this.state.nutrients.CHOCDF.quantity }g</p>
						<p>Sugar: {this.state.nutrients.SUGAR.quantity}g</p>
						<p>Protein: {this.state.nutrients.PROCNT.quantity}g</p>
					</div>
				</div>
				<div class="meal-choose">
					<Autosuggest
				        suggestions={suggestions}
				        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				        getSuggestionValue={getSuggestionValue}
				        renderSuggestion={renderSuggestion}
				        inputProps={inputProps}
				        onSuggestionSelected={this.onMealSelected}
				      />
					{ this.state.mealChosen ? 
							(<div id="slider"><label for="meal-amount">Number of portions: </label><input id="meal-amount" type="range" min="0.1" max="5" /></div>) 
							: (<br />)
					}
				</div>

				{this.state.mealChosen ? 
					(
						<div>
							<button id="pan-btn" onClick={this.cook.bind(this)}><span id="pan"><img src="images/pan.png" alt="cook"/></span></button>
							<p>{ this.state.cookingTimeLeft } minutes to cook!</p>
						</div>
					) : (
						<p>Food is fuel!</p>
					)
				}
			</div>
		)
	}
}