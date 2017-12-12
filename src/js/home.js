import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');
import Celebrity from "./Celebrity"

var celeb_url = "https://feedtherock.herokuapp.com/api/getThreeCelebrities";

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			value : -1,
			celebs : undefined,
		}
	}

	render() {
		return (
			<button onClick={function(){
				$.get(celeb_url, function(obj, err){
						console.log(obj[0].name);
						this.state.celebs[0] = obj[0];
						this.state.celebs[1] = obj[1];
						this.state.celebs[2] = obj[2];
				})
				console.log("ah");
				this.setState({value : value + 1});
				console.log("here!");
			}}> Start </button>
		);
	}
}

ReactDOM.render(<Main/>, app);