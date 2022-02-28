import React, { Component } from 'react';
class Logout extends Component {
	
	componentDidMount (){
		window.location.reload();
	}
	render(){
		return(<h1>Logging Out</h1>)
	}
}

export default Logout