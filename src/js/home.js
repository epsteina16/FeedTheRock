import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');
import Celebrity from "./Celebrity"

var celeb_url = "https://feedtherock.herokuapp.com/api/getThreeCelebrities";

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			value : 0,
			celebs : undefined,
			gamestate : 1,
			celeb_to_pass : undefined,
			difficulty : undefined,
			currentDisplay : true,
		}
	}

	
	processScore(score){
		this.setState({score : this.state.score + score});
		console.log(score);
		this.setState({round_check : this.state.round_check + 1});
		this.setState({value : this.state.value + 1});
		console.log(this.state.celebs[this.state.value].name);
		this.setState({celeb_to_pass : this.state.celebs[this.state.value]});
		if(this.state.round_check == 3){
			this.state.gamestate = 3;
		}
	}

	render() {
		if(this.state.gamestate == 1){
			return (
				<div>
				<h2 class="textcenter"> Feed the Rock </h2>
				<h3 class="textcenter"> The game of portion control </h3>
				<h4 class="textcenter_italic">  Can you restrain yourself? </h4>
					<select class="gobuttoncenter btn-hg textcenter" required id="selected"> 
						<option value="Easy" class="textcenter"> Easy </option>
						<option value="Medium" class = "textcenter"> Medium </option>
						<option value="Hard" class="textcenter"> Hard </option> 
					</select>
				<button class="gobuttoncenter btn-info btn-hg" onClick={function(){

					var x = document.getElementById(selected.value);
					this.setState({difficulty : selected.value});
					$.get(celeb_url, function(obj, err){
							console.log(obj[0].exerciseLevel);
							console.log(obj[0].partyLevel);
							this.setState({celebs : obj});
							this.setState({value : this.state.value + 1});
							this.setState({celeb_to_pass : this.state.celebs[this.state.value]});
							console.log("difficulty is" + this.state.difficulty);
							this.setState({gamestate : 2});
					}.bind(this));
				}.bind(this)} > Start </button>
				</div>
			);
		}
		if(this.state.gamestate == 2){
			return (
				<div>
				<audio autoPlay>
						<source src="audio/cooking.mp3" type="audio/mpeg"></source>
					</audio>
				<Celebrity setScore = {this.processScore.bind(this)} imageLink = {this.state.celeb_to_pass.imageLink} age = {this.state.celeb_to_pass.age}
				height = {this.state.celeb_to_pass.height} weight = {this.state.celeb_to_pass.weight}
				name = {this.state.celeb_to_pass.name} gender = {this.state.celeb_to_pass.gender}
				isVegan = {this.state.celeb_to_pass.isVegan} isVegetarian = {this.state.celeb_to_pass.isVegetarian}
				isGlutenFree = {this.state.celeb_to_pass.isGlutenFree} partyLevel = {this.state.celeb_to_pass.partyLevel}
				exerciseLevel = {this.state.celeb_to_pass.exerciseLevel} difficulty = {this.state.difficulty}/>
				</div>
			);
		}
		if(this.state.gamestate == 3){
			return (
				<div>
				<Highscore score = {this.state.score}/>
				</div>
			)
		}
	}
}

ReactDOM.render(<Main/>, app);