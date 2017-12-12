import React from "react";
import ReactDOM from "react-dom";
import Meal from "./Meal";

// Need to pass Ronnie a Function that allows for calloric data
const app = document.getElementById('app');

export default class Celebrity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			imageLink: this.props.imageLink,
			age: this.props.age,
			height: this.props.height,
			weight: this.props.weight,
			name: this.props.name,
			gender: this.props.gender,
			isVegan: this.props.isVegan,
			isVegetarian: this.props.isVegetarian,
			isGlutenFree: this.props.isGlutenFree,
			exerciseLevel: this.props.exerciseLevel,
			partyLevel: this.props.partyLevel,
			difficulty: this.props.difficulty,
			currentDisplay: true

		}                   
	}
// variable that keeps track of showing celebrity or our meal component

	setCharacteristics() {
		this.setState({
				score: 0,
				imageLink: this.props.imageLink,
				age: this.props.age,
				height: this.props.height,
				weight: this.props.weight,
				name: this.props.name,
				gender: this.props.gender,
				isVegan: this.props.isVegan,
				isVegetarian: this.props.isVegetarian,
				isGlutenFree: this.props.isGlutenFree,
				exerciseLevel: this.props.exerciseLevel,
				partyLevel: this.props.partyLevel
			});
	}
	generateScore(nutrients) {
		console.log(nutrients);
		// Calculate score
		var inversescore = 0;
		var bmr = 0;
		if (this.state.gender == "Male") {
			bmr = 66 + ( 6.23 * this.state.weight) + ( 12.7 * this.state.height) - ( 6.8 * this.state.age);
		}
		else if (this.state.gender == "Female") {
			bmr = 655 + ( 4.35 * this.state.weight) + ( 4.7 * this.state.height) - ( 4.7 * this.state.age);
		}
		var consumptioncoeff;
		if (this.state.exerciseLevel == "Sedentary") {
			bmr = bmr * 1.2;
			consumptioncoeff = 1.05;
		}
		else if (this.state.exerciseLevel == "Lightly Active") {
			bmr = bmr * 1.375;
			consumptioncoeff = 1.134;
		}
		else if (this.state.exerciseLevel == "Moderately Active") {
			bmr = bmr * 1.55;
			consumptioncoeff = 1.198;
		}
		else if (this.state.exerciseLevel == "Very Active") {
			bmr = bmr * 1.725;
			consumptioncoeff = 1.27;
		}
		else if (this.state.exerciseLevel == "Extra Active") {
			bmr = bmr * 1.9;
			consumptioncoeff = 1.36;
		}

				//console.log(score);
				console.log(nutrients);
		inversescore += ((Math.abs(bmr - nutrients.calories)/(bmr)) * 200);
		consumptioncoeff = consumptioncoeff * (bmr/2000);
				console.log(inversescore);
		var recfats = 70 * consumptioncoeff;
		inversescore += ((Math.abs(recfats - nutrients.fats)/(recfats)) * 100);
				console.log(inversescore);
		var recsaturated = 24 * consumptioncoeff;
		inversescore += ((Math.abs(recsaturated - nutrients.saturated)/(recsaturated)) * 100);
				console.log(inversescore);
		var reccarbs = 310 * consumptioncoeff;
		inversescore += ((Math.abs(reccarbs - nutrients.carbs)/(reccarbs)) * 100);
				console.log(inversescore);
		var recfiber = 28 * consumptioncoeff;
		inversescore += ((Math.abs(recfiber - nutrients.fiber)/(recfiber)) * 100);
				console.log(inversescore);
		var recsugar = 90 * consumptioncoeff;
		inversescore += ((Math.abs(recsugar - nutrients.sugar)/(recsugar)) * 100);
				console.log(inversescore);
		var recprotein = 50 * consumptioncoeff;
		inversescore += ((Math.abs(recprotein - nutrients.protein)/(recprotein)) * 100);
				console.log(inversescore);
		var reccholesterol = 70 * consumptioncoeff;
		inversescore += ((Math.abs(reccholesterol - nutrients.cholesterol)/(reccholesterol)) * 100);
		var recsodium = 2300 * consumptioncoeff;
		inversescore += ((Math.abs(recsodium - nutrients.sodium)/(recsodium)) * 100);


		console.log(inversescore);

		// console.log(score);
		console.log("setting state");

		var posscore = 1000 - inversescore;
		console.log(posscore);

		this.props.setScore(posscore);
		this.setState({currentDisplay : true});

	}

	toggleDisplay() {
		console.log(this.state.currentDisplay);
		this.setState({currentDisplay : false});
	}


	render() {
		var exerciseState;
		if (this.props.exerciseLevel == "Sedentary") {
			exerciseState = "Sedentary";
		}
			else if (this.props.exerciseLevel == "Lightly Active") {
			exerciseState = "Lightly Active";
		}
		else if (this.props.exerciseLevel == "Moderately Active") {
			exerciseState = "Moderately Active";
		}
		else if (this.props.exerciseLevel == "Very Active") {
			exerciseState = "Very Active";
		}
		else if (this.props.exerciseLevel == "Extra Active") {
			exerciseState = "Extremely Active";
		}

		var partyState;
		if (this.props.partyLevel == "Low") {
			partyState = "Doesn't party";
		}
		else if (this.props.partyLevel == "Medium") {
			partyState = "Parties some";
		}
		else if (this.props.partyLevel == "High") {
			partyState = "Parties hard";
		}
		var level;
		if (this.props.difficulty == "Easy") {
			level = "Easy";
		}
		else if (this.props.difficulty == "Medium") {
			level = "Medium";
		}
		else if (this.props.difficulty == "Hard") {
			level = "Hard";
		}
		
		if (level == "Easy") {
			return (
			<div>
		{this.state.currentDisplay ?
			(
				<div>
				<img src="backgroundimages/pickcelebritybackground.jpg" id="celebbackground" />
				<h2 class = "textcenter">Your Celebrity is: {this.props.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
						<h6 class = "sideattribute">{this.props.age} years old</h6>
						<h6 class = "sideattribute">{Math.floor(this.props.height / 12)}&rsquo; {this.props.height % 12}&quot; </h6>
						<h6 class = "sideattribute">{this.props.weight} lbs</h6>
						{this.props.isGlutenFree ? 
								(<h6 class = "sideattribute">Gluten Free</h6>) 
								: (<h6 class = "sideattribute">Eats Gluten</h6>)
						}
						<h6 class = "sideattribute">{exerciseState}</h6>	
					</div>
					<div class = "rattribute-data rcontainer">
						<h6 class = "sideattribute">{this.props.gender}</h6>
						{this.props.isVegan ? 
								(<h6 class = "sideattribute">Vegan</h6>) 
								: (<h6 class = "sideattribute">Not Vegan</h6>)
						}
						{this.props.isVegetarian ? 
								(<h6 class = "sideattribute">Vegetarian</h6>) 
								: (<h6 class = "sideattribute">Not Vegetarian</h6>)
						}
						<h6 class = "sideattribute">{partyState}</h6>
					</div>

					<img class="img-rounded celebrityphoto" src={this.props.imageLink}alt="Celebrity image"></img>
				</div>

				<button class = "gobuttoncenter btn-info btn-hg" onClick={this.toggleDisplay.bind(this)}>LETS GO!</button>
				</div>
				
			) 
		:
			(
				<Meal feed={this.generateScore.bind(this)}/>
			)
		}
		</div>
		);
		}
		else if (level == "Medium") {
			return (
			<div>
		{this.state.currentDisplay ?
			(
				<div>
				<img src="backgroundimages/pickcelebritybackground.jpg" id="celebbackground" />
				<h2 class = "textcenter">Your Celebrity is: {this.props.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
						{this.props.isGlutenFree ? 
								(<h6 class = "sideattribute">Gluten Free</h6>) 
								: (<h6 class = "sideattribute">Eats Gluten</h6>)
						}
						<h6 class = "sideattribute">{exerciseState}</h6>	
					</div>
					<div class = "rattribute-data rcontainer">
						{this.props.isVegan ? 
								(<h6 class = "sideattribute">Vegan</h6>) 
								: (<h6 class = "sideattribute">Not Vegan</h6>)
						}
						{this.props.isVegetarian ? 
								(<h6 class = "sideattribute">Vegetarian</h6>) 
								: (<h6 class = "sideattribute">Not Vegetarian</h6>)
						}
					</div>

					<img class="img-rounded celebrityphoto" src={this.props.imageLink}alt="Celebrity image"></img>
				</div>

				<button class = "gobuttoncenter btn-info btn-hg" onClick={this.toggleDisplay.bind(this)}>LETS GO!</button>
				</div>
				
			) 
		:
			(
				<Meal feed={this.generateScore.bind(this)}/>
			)
		}
		</div>
		);
		}
		else if (level == "Hard") {
			return (
			<div>
		{this.state.currentDisplay ?
			(
				<div>
				<img src="backgroundimages/pickcelebritybackground.jpg" id="celebbackground" />
				<h2 class = "textcenter">Your Celebrity is: {this.props.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
					</div>
					<div class = "rattribute-data rcontainer">
					</div>

					<img class="img-rounded celebrityphoto" src={this.props.imageLink}alt="Celebrity image"></img>
				</div>

				<button class = "gobuttoncenter btn-info btn-hg" onClick={this.toggleDisplay.bind(this)}>LETS GO!</button>
				</div>
				
			) 
		:
			(
				<Meal feed={this.generateScore.bind(this)}/>
			)
		}
		</div>
		);
		}
		else {
			return (
			<div>
		{this.state.currentDisplay ?
			(
				<div>
				<img src="backgroundimages/pickcelebritybackground.jpg" id="celebbackground" />
				<h2 class = "textcenter">Your Celebrity is: {this.props.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
						<h6 class = "sideattribute">{this.props.age} years old</h6>
						<h6 class = "sideattribute">{Math.floor(this.props.height / 12)}&rsquo; {this.props.height % 12}&quot; </h6>
						<h6 class = "sideattribute">{this.props.weight} lbs</h6>
						{this.props.isGlutenFree ? 
								(<h6 class = "sideattribute">Gluten Free</h6>) 
								: (<h6 class = "sideattribute">Eats Gluten</h6>)
						}
						<h6 class = "sideattribute">{exerciseState}</h6>	
					</div>
					<div class = "rattribute-data rcontainer">
						<h6 class = "sideattribute">{this.props.gender}</h6>
						{this.props.isVegan ? 
								(<h6 class = "sideattribute">Vegan</h6>) 
								: (<h6 class = "sideattribute">Not Vegan</h6>)
						}
						{this.props.isVegetarian ? 
								(<h6 class = "sideattribute">Vegetarian</h6>) 
								: (<h6 class = "sideattribute">Not Vegetarian</h6>)
						}
						<h6 class = "sideattribute">{partyState}</h6>
					</div>

					<img class="img-rounded celebrityphoto" src={this.props.imageLink}alt="Celebrity image"></img>
				</div>

				<button class = "gobuttoncenter btn-info btn-hg" onClick={this.toggleDisplay.bind(this)}>LETS GO!</button>
				</div>
				
			) 
		:
			(
				<Meal feed={this.generateScore.bind(this)}/>
			)
		}
		</div>
		);
		}
	}

}


ReactDOM.render(<Celebrity/>, app);