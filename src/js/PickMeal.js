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
			mealChosen: false,
			recipes: [],
			value: "",
			image: "",
			cookingTimeLeft: Math.floor(Math.random() * 15) + 10,
			nutrients: {},
			amount: 1
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
		if (this.state.value.length >= 5) {
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
		var nutrients = suggestion.nutrition;
		if (nutrients.calories == undefined) {
			nutrients.calories = 0;
		}
		if (nutrients.CHOCDF == undefined){
			nutrients.CHOCDF = new Object();
			nutrients.CHOCDF.quantity = 0;
		}
		if (nutrients.SUGAR == undefined){
			nutrients.SUGAR = new Object();
			nutrients.SUGAR.quantity = 0;
		}
		if (nutrients.PROCNT == undefined){
			nutrients.PROCNT = new Object();
			nutrients.PROCNT.quantity = 0;
		}
		if (nutrients.FASAT == undefined){
			nutrients.FASAT = new Object();
			nutrients.FASAT.quantity = 0;
		}
		if (nutrients.CHOLE == undefined){
			nutrients.CHOLE = new Object();
			nutrients.CHOLE.quantity = 0;
		}
		if (nutrients.FIBTG == undefined){
			nutrients.FIBTG = new Object();
			nutrients.FIBTG.quantity = 0;
		}
		if (nutrients.FAT == undefined){
			nutrients.FAT = new Object();
			nutrients.FAT.quantity = 0;
		}
		if (nutrients.NA == undefined){
			nutrients.NA = new Object();
			nutrients.NA.quantity = 0;
		}
		this.setState({mealChosen: true, image: suggestion.pic, value: suggestion.label, nutrients: nutrients});
	}

	//called to cook
	cook() {
		var choice = Math.floor(Math.random() * 2);
		var animation = "shake";
		if (choice % 2 == 0) {
			animation = "jello";
		}
	    $('#pan').removeClass().addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	      	$(this).removeClass();
    	});

		if (this.state.cookingTimeLeft == 1) {
			var meal = new Object();
			meal.amount = parseFloat($("#quantity").text());
			meal.recipe = this.state.value;
			meal.nutrients = this.state.nutrients;
			this.props.chooseMeal(meal);
		} else {
			this.setState({cookingTimeLeft: this.state.cookingTimeLeft - 1});
		}
	}

	//called to modify the quantity of the portion
	modifyQuantity(val) {
		var quantity = parseFloat($('#quantity').html());
		quantity = quantity + val;
		quantity = quantity.toFixed(2);
		if (quantity <= 0) {
			quantity = 0.2;
		} else if (quantity > 5) {
			quantity = 5;
		}
		$('#quantity').text(quantity);
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
			<div>
			<img src="backgroundimages/spam.jpg" id="celebbackground" />
			<div class="meal">
				<h2> {this.props.mealName} {this.state.mealChosen ? (": " + this.state.value) : ("")}</h2>
				{ this.state.mealChosen ? (
				<div class="meal-info">
					<div class="meal-pic">
							<img src={ this.state.image } alt="Meal"></img>
					</div>
					<div class="meal-ingredients">
						<h5>Nutrition Facts per Recipe</h5>
						<p>Calories: { Math.floor(this.state.nutrients.calories) }</p>
						<p>Fat: { Math.floor(this.state.nutrients.FAT.quantity) }g</p>
						<p>Carbohydrates: { Math.floor(this.state.nutrients.CHOCDF.quantity) }g</p>
						<p>Sugar: { Math.floor(this.state.nutrients.SUGAR.quantity)}g</p>
						<p>Protein: {Math.floor(this.state.nutrients.PROCNT.quantity)}g</p>
						<div id="clicker">
							<div class = "portionslabel"> Portions: </div>
							<button onClick={ () => this.modifyQuantity(0.2) }><span class="fui-triangle-up"></span></button>
							<span id="quantity" class = "portionamount">1</span>
							<button onClick={ () => this.modifyQuantity(-0.2) }><span class="fui-triangle-down"></span></button>
						</div>
					</div>
				</div>
				): (<br />) }
				<div class="meal-choose">
					{ !this.state.mealChosen ? (
					<Autosuggest
				        suggestions={suggestions}
				        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				        getSuggestionValue={getSuggestionValue}
				        renderSuggestion={renderSuggestion}
				        inputProps={inputProps}
				        onSuggestionSelected={this.onMealSelected}
				      />
				      ) : (<br />)}
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
			</div>
		)
	}
}