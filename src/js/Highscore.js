import React from "react";

var post_ten = "https://feedtherock.herokuapp.com/api/addhighscore";
var get_ten = "https://feedtherock.herokuapp.com/api/getTopTen";

export default class Highscore extends React.Component {
	constructor(props){
		super();
		this.state = {
			gamestate : 1,
			Highscores : undefined,
			sending_score : props.score
		}
	}

	submitScore() {
		var sending = new Object();
		sending.score = this.state.sending_score;
		sending.username = $( "#nameform" ).name;
		$.ajax({
  			type: "POST",
  			url: post_ten,
  			data: JSON.stringify(sending),
  			dataType: "json",
  			contentType: "application/json"
		});
		console.log("made it here");
		console.log("here");
		$.get(get_ten, function(obj, err){
			if(!err){
				setState({Highscores : obj})
				setState({gamestate : 2})
			}
		}.bind(this));
	}

	render() {
		if(this.state.gamestate == 1){
			return (
				<div>
				<img src="backgroundimages/homebackground.jpg" id="homebackground" />
				<h2 class="textcenter"> High Scores </h2>
				<h4 class="textcenter_italic">  What is your name? </h4>
				<form id="nameform"><input type="text" name="name"></input></form>
				<button class="gobuttoncenter btn-info btn-hg" onClick={this.submitScore.bind(this)}> Start </button>
				</div>
			)
		}

		if(this.state.gamestate == 2){
			return(
				<div>
				{console.log("suh")}
				</div>
			);
		}
	}
}

