import React from "react";
import ReactDOM from "react-dom";
import Meal from "./Meal";

// Need to pass Ronnie a Function that allows for calloric data
const app = document.getElementById('app');

export default class Celebrity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// score: 0,
			// imageLink: "",
			// age: 0,
			// height: 0,
			// weight: 0,
			// name: "",
			// gender: "",
			// isVegan: false,
			// isVegetarian: false,
			// isGlutenFree: false,
			// exerciseLevel: "",
			// partyLevel: ""
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
			currentState: true
		}
	}
// variable that keeps track of showing celebrity or our meal component

	setCharacteristics() {
		this.setState({
				score: this.props.score,
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
// Set variables, assume what charlie passes. Render as HTML, include styles in index 
	generateScore(nutrients) {
		var bmr;
		if (this.state.gender == "Male") {
			bmr = 66 + ( 6.23 * this.state.weight) + ( 12.7 * this.state.height) - ( 6.8 * this.state.age);
		}
		else if (this.state.gender == "Female") {
			bmr = 655 + ( 4.35 * this.state.weight) + ( 4.7 * this.state.height) - ( 4.7 * this.state.age);
		}
		if (this.state.exerciseLevel == "Sedentary") {
			bmr = bmr * 1.2;
		}
		else if (this.state.exerciseLevel == "Lightly Active") {
			bmr = bmr * 1.375;
		}
		else if (this.state.exerciseLevel == "Moderately Active") {
			bmr = bmr * 1.55;
		}
		else if (this.state.exerciseLevel == "Very Active") {
			bmr = bmr * 1.725;
		}
		else if (this.state.exerciseLevel == "Extra Active") {
			bmr = bmr * 1.9;
		}
		score += ((bmr - Math.abs(bmr - nutrients.calories))/(bmr) * 25);
		// Calculate score
		// send score back to charlie
		this.setState({score});
	}


	render() {
		var exerciseState;
		if (this.state.exerciseLevel == "Sedentary") {
			exerciseState = "Sofft boi";
		}
		else if (this.state.exerciseLevel == "Lightly Active") {
			exerciseState = "Harddd boi";
		}
		else if (this.state.exerciseLevel == "Moderately Active") {
			exerciseState = "Harddd boi";
		}
		else if (this.state.exerciseLevel == "Very Active") {
			exerciseState = "Harddd boi";
		}
		else if (this.state.exerciseLevel == "Extra Active") {
			exerciseState = "Harddd boi";
		}

		var partyState;
		if (this.state.partyLevel == "Low") {
			partyState = "Sofft boi";
		}
		else if (this.state.partyLevel == "Medium") {
			partyState = "Harddd boi";
		}
		else if (this.state.partyLevel == "High") {
			partyState = "Harddd boi";
		}

		return (
			<div>
			<h1>Your Celebrity is: {this.state.name}</h1>
			<div>{this.state.age} years old</div>
			<div>{Math.floor(this.state.height / 12)}&rsquo; {this.state.height % 12}&quot; </div>
			<div>{this.state.weight} lbs</div>
			<div>{this.state.gender}</div>
			<div>{this.state.age} years old</div>
			{this.state.isVegan ? 
					(<div>Vegan</div>) 
					: (<div></div>)
			}
			{this.state.isVegetarian ? 
					(<div>Vegitarian</div>) 
					: (<div></div>)
			}
			{this.state.isGlutenFree ? 
					(<div>Gluten Free</div>) 
					: (<div></div>)
			}
			<div>{exerciseState}</div>			
			<div>{partyState}</div>

			<img class="centered" src={this.state.imageLink}></img>

			</div>
			//<Meal feed={this.generateScore.bind(this)}/>
		);
	}

}

// add the button


ReactDOM.render(<Celebrity/>, app);