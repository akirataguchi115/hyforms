import React, { Component } from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import './styleSheets/ViewResponse.css';
import Workbook from 'react-excel-workbook'

const sessionCookie = cookie.load('csrftoken');


class ViewResponse extends Component {


	state = {
		renderFlag: true,
		allData: null,
		relevantData: null,
		title: null,
		excelData: null,
		excelReactComp:null,
		currentUser: "",
	}
	loadResponses = (slug) => {

		const endpoint = '/filleformlist/';
	    let thisComp = this;
	    let lookupOptions = {
	      method: "GET",
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    }
	    fetch ( endpoint, lookupOptions )
	    .then(function(response){
	      return response.json()
	    }).then(function(responseData){
	      thisComp.setState({
	        allData: responseData
	      })
	    }).catch(function(error){
	      console.log("error", error)
	    })

	}
	
	componentDidMount(){
		const script = document.createElement("script");
		script.src = "https://kit.fontawesome.com/0467bd4fc9.js";
		script.async = true;
		document.body.appendChild(script);
		this.loadResponses(this.props.match.params.slug)
		const endpoint = '/current_user/';
    let thisComp = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch ( endpoint, lookupOptions )
    .then(function(response){
      return response.json()
    }).then(function(responseData){
      thisComp.setState({
        currentUser: responseData
      })
    }).catch(function(error){
      console.log("error", error)
    })
	}

	showData = () =>{
		if (this.state.allData !== null){
			var length = this.state.allData.length;
			var relevantData = [];
			var excelData = [];
			var excelReactComp = [];
			var table = [];
			var title;
			for (var i = 0; i < length; i++){
				if (this.state.allData[i].slug ===  this.props.match.params.slug){
					relevantData.push( (this.state.allData[i].filledData).split(",") )
					title = this.state.allData[i].title
				}
			}
			for (var i = 0; i < relevantData.length; i++){
				var tempData = relevantData[i]
				for (var j = 0; j < tempData.length; j++){
					if (((relevantData[i])[j].split(":"))[0] !== "")
					{var key = ((relevantData[i])[j].split(":"))[0];
										var value = ((relevantData[i])[j].split(":"))[1];
										excelData.push({ [key]: value })}
				}
			}
			var flagArray = []
			for (var i = 0; i < excelData.length; i++){
				var excelKey = Object.keys(excelData[i])
				if (excelKey[0] !== "" && !flagArray.includes(excelKey[0])){
					excelReactComp.push ({ excelCol: <Workbook.Column label= {excelKey[0]} value= {excelKey[0]}/>})
					flagArray.push(excelKey[0])
				}
			}
			var temp;
			var max = relevantData[0]
			for (var i = 0; i < relevantData.length; i++){
				if (max.length < relevantData[i].length){
					max = relevantData[i]
				}
			}
			console.log("printing firt", (relevantData[0])[1])
			for (var row = 0; row < max.length; row++){
				temp = temp + <th> { (max[row].split(":"))[0] } </th>
			}
			for (var row = 0; row < relevantData.length; row++){
				for (var col = 0; col < relevantData.length; col++){

				}
			}
			this.setState ({ relevantData })
			this.setState ({ title  })
			this.setState ({ excelData })
			this.setState ({ excelReactComp })
			this.setState ({ renderFlag: false })
		}
	}
	render(){
		if (this.state.renderFlag !== false){
		this.showData()
	}
	console.log(this.state.relevantData)
		return(
			<React.Fragment>
			<nav id="main-nav">
            <div className="row">
              <div className="container">

                <div className="responsive"><i data-icon="m" className="ion-navicon-round"></i></div>
                <ul className="nav-menu list-unstyled">
                  <Link to={"/hyforms"}>
                    <li><a className="smoothScroll">Home</a></li>
                  </Link>
                  <Link to={"/hyforms/create"}>
                    <li><a className="smoothScroll">Create</a></li>
                  </Link>
                  <Link to={"/hyforms/myforms"}>
                    <li><a className="smoothScroll">Your Forms</a></li>
                  </Link>
                  <Link to={"/hyforms/publicforms"}>
                    <li><a className="smoothScroll">Browse Templates</a></li>
                  </Link>
                  <Link to={"/logoutUser"}>
                    <li><a className="smoothScroll">{this.state.currentUser.username}</a></li>
                  </Link>
                </ul>
              </div>
            </div>
        </nav>
	         	<div className = "banner">
		           <font color="white">
		             <center>
		             <h1>{ this.state.title }</h1>
		             </center>
		           </font>
		        </div>
	         	<div className="dataArea">
	         		<Workbook filename={this.state.title + ".xlsx"} element={<button className="btn btn-lg btn-primary">Download</button>}>
	         			<Workbook.Sheet data={this.state.excelData} name="Sheet A">
	         				{
	         					this.state.excelReactComp !== null?
	         					this.state.excelReactComp.map( mapData => mapData.excelCol )
	         					:
	         					""
	         				} 
				      	</Workbook.Sheet>
	         		</Workbook>
	         	</div>
			</React.Fragment>
		);
	}
}

export default ViewResponse;