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
		// Calculate score
		var score;
		var bmr;
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
		consumptioncoeff = consumptioncoeff * (bmr/2000);

		var recfats = 70 * consumptioncoeff;
		score += ((recfats - Math.abs(recfats - nutrients.fats))/(recfats) * 100);

		var recsaturated = 24 * consumptioncoeff;
		score += ((recsaturated - Math.abs(recsaturated - nutrients.saturated))/(recsaturated) * 100);

		var reccarbs = 310 * consumptioncoeff;
		score += ((reccarbs - Math.abs(reccarbs - nutrients.carbs))/(reccarbs) * 100);

		var recfiber = 28 * consumptioncoeff;
		score += ((recfiber - Math.abs(recfiber - nutrients.fiber))/(recfiber) * 100);

		var recsugar = 90 * consumptioncoeff;
		score += ((recsugar - Math.abs(recsugar - nutrients.sugar))/(recsugar) * 100);

		var recprotein = 50 * consumptioncoeff;
		score += ((recprotein - Math.abs(recprotein - nutrients.protein))/(recprotein) * 100);

		var reccholesterol = 70 * consumptioncoeff;
		score += ((reccholesterol - Math.abs(reccholesterol - nutrients.cholesterol))/(reccholesterol) * 100);

		this.setState({score});
		// send score back to charlie

		var fn = this.sendData.bind(this);
		fn();
	}

	toggleDisplay() {
		console.log(this.state.currentDisplay);
		this.setState({currentDisplay : false});
	}

	sendData() {
		// Score has been created
		console.log(this.state.score);
		this.props.setScore(this.state.score);
	}

	render() {
		var exerciseState;
		if (this.state.exerciseLevel == "Sedentary") {
			exerciseState = "Sedentary";
		}
		else if (this.state.exerciseLevel == "Lightly Active") {
			exerciseState = "Lightly Active";
		}
		else if (this.state.exerciseLevel == "Moderately Active") {
			exerciseState = "Moderately Active";
		}
		else if (this.state.exerciseLevel == "Very Active") {
			exerciseState = "Very Active";
		}
		else if (this.state.exerciseLevel == "Extra Active") {
			exerciseState = "Extremely Active";
		}

		var partyState;
		if (this.state.partyLevel == "Low") {
			partyState = "Doesn't party";
		}
		else if (this.state.partyLevel == "Medium") {
			partyState = "Parties some";
		}
		else if (this.state.partyLevel == "High") {
			partyState = "Parties hard";
		}
		var level;
		if (this.state.difficulty == "Easy") {
			level = "Easy";
		}
		else if (this.state.difficulty == "Medium") {
			level = "Medium";
		}
		else if (this.state.difficulty == "Hard") {
			level = "Hard";
		}
		
		if (level == "Easy") {
			return (
			<div>
		{this.state.currentDisplay ?
			(
				<div>
				<img src="backgroundimages/pickcelebritybackground.jpg" id="celebbackground" />
				<h2 class = "textcenter">Your Celebrity is: {this.state.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
						<h6 class = "sideattribute">{this.state.age} years old</h6>
						<h6 class = "sideattribute">{Math.floor(this.state.height / 12)}&rsquo; {this.state.height % 12}&quot; </h6>
						<h6 class = "sideattribute">{this.state.weight} lbs</h6>
						{this.state.isGlutenFree ? 
								(<h6 class = "sideattribute">Gluten Free</h6>) 
								: (<h6 class = "sideattribute">Eats Gluten</h6>)
						}
						<h6 class = "sideattribute">{exerciseState}</h6>	
					</div>
					<div class = "rattribute-data rcontainer">
						<h6 class = "sideattribute">{this.state.gender}</h6>
						{this.state.isVegan ? 
								(<h6 class = "sideattribute">Vegan</h6>) 
								: (<h6 class = "sideattribute">Not Vegan</h6>)
						}
						{this.state.isVegetarian ? 
								(<h6 class = "sideattribute">Vegetarian</h6>) 
								: (<h6 class = "sideattribute">Not Vegetarian</h6>)
						}
						<h6 class = "sideattribute">{partyState}</h6>
					</div>

					<img class="img-rounded celebrityphoto" src={this.state.imageLink}alt="Celebrity image"></img>
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
				<h2 class = "textcenter">Your Celebrity is: {this.state.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
						{this.state.isGlutenFree ? 
								(<h6 class = "sideattribute">Gluten Free</h6>) 
								: (<h6 class = "sideattribute">Eats Gluten</h6>)
						}
						<h6 class = "sideattribute">{exerciseState}</h6>	
					</div>
					<div class = "rattribute-data rcontainer">
						{this.state.isVegan ? 
								(<h6 class = "sideattribute">Vegan</h6>) 
								: (<h6 class = "sideattribute">Not Vegan</h6>)
						}
						{this.state.isVegetarian ? 
								(<h6 class = "sideattribute">Vegetarian</h6>) 
								: (<h6 class = "sideattribute">Not Vegetarian</h6>)
						}
					</div>

					<img class="img-rounded celebrityphoto" src={this.state.imageLink}alt="Celebrity image"></img>
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
				<h2 class = "textcenter">Your Celebrity is: {this.state.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
					</div>
					<div class = "rattribute-data rcontainer">
					</div>

					<img class="img-rounded celebrityphoto" src={this.state.imageLink}alt="Celebrity image"></img>
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
				<h2 class = "textcenter">Your Celebrity is: {this.state.name}</h2>
				<div class = "container">
					<div class = "lattribute-data lcontainer">
						<h6 class = "sideattribute">{this.state.age} years old</h6>
						<h6 class = "sideattribute">{Math.floor(this.state.height / 12)}&rsquo; {this.state.height % 12}&quot; </h6>
						<h6 class = "sideattribute">{this.state.weight} lbs</h6>
						{this.state.isGlutenFree ? 
								(<h6 class = "sideattribute">Gluten Free</h6>) 
								: (<h6 class = "sideattribute">Eats Gluten</h6>)
						}
						<h6 class = "sideattribute">{exerciseState}</h6>	
					</div>
					<div class = "rattribute-data rcontainer">
						<h6 class = "sideattribute">{this.state.gender}</h6>
						{this.state.isVegan ? 
								(<h6 class = "sideattribute">Vegan</h6>) 
								: (<h6 class = "sideattribute">Not Vegan</h6>)
						}
						{this.state.isVegetarian ? 
								(<h6 class = "sideattribute">Vegetarian</h6>) 
								: (<h6 class = "sideattribute">Not Vegetarian</h6>)
						}
						<h6 class = "sideattribute">{partyState}</h6>
					</div>

					<img class="img-rounded celebrityphoto" src={this.state.imageLink}alt="Celebrity image"></img>
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