import React, { Component } from 'react';
import './styleSheets/FormFiller.css';
import './styleSheets/semantic.css';
import './javaScript/semantic.js';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import  { Redirect } from 'react-router-dom'


const labelSize = {

  fontSize: 'x-large',
  position: 'relative',
  left: '41%',
};

const radioLabel = {
	fontSize: 'x-large',
    position: 'relative',
    left: '1%',
    top: '-1vh',
}

const radioStyle = {
	position: 'relative',
    left: '17%',
    top: '3vh',
};

const singleLineStyle = {
	position: 'relative',
	top: '3vh',
    right: '40%',
};

const titleLabel = {

	fontSize: 'xxx',
};

class FormFiller extends Component {

	state = {
		
		formFillerBuilder: null,
		viewForm:null,
		slug: "",
		renderFlag: true,
	}
	
	loadFormProps = (slug) => {
	  	const endpoint = `/fillform/${slug}/`;
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
	        formFillerBuilder: [responseData]
	      }, thisComp.formBuilder())
	    }).catch(function(error){
	      console.log("error", error)
	    })
  	}
  	handleChange = (event) => {
  		this.setState ({
  			[event.target.name]: event.target.value
  		})
  	}
  	saveData = () =>{
  		var dataFilled = ""
  		Object.entries(this.state).forEach(([key, value]) => {
    		if (key !== "formFillerBuilder" && key !== "viewForm" && key !== "slug" && key !== "renderFlag"){
    			dataFilled = dataFilled + key + ":" + value + ","
    		}
		})
		var pushData = {title: this.state.formFillerBuilder[0].title, slug: this.state.slug, filledData: dataFilled}
		const endpoint = `/formpush/`;
	    let thisComp = this;
	    const csrfToken = cookie.load('csrftoken');
	    let lookupOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(pushData),
            credentials: 'include'
      	}
	    fetch ( endpoint, lookupOptions )
	    .then(function(response){
	      return response.json()
	    }).then(function(responseData){
	      return responseData
	    }).catch(function(error){
	      console.log("error", error)
	    })
	    alert("Thank you! Your response has been submitted");
	    return <Redirect to='/hyforms'/>

  	}
  	formBuilder = () =>{
  		var thisComp = this;
  		if (this.state.formFillerBuilder !== null){
  			var view = true;
		    var currentComponents = (this.state.formFillerBuilder[0].formData);
		    currentComponents = currentComponents.split("--:--")
		    var viewForm = [];
		    var iterator = 0;
		    var component;
		    var componentType = "";
		    var componentID = "";
		    var componentValue = "";
		    var subComponentQuestion = ""
		    for (iterator; iterator < currentComponents.length; iterator++){
		      var interpreter = currentComponents[iterator].split("----");
		      componentType = interpreter[0];
		      if (componentType === "question"){
		      	componentID = interpreter[1];
		      	subComponentQuestion = interpreter[2]
		  	  }
		      componentValue = interpreter[2];
		      if (componentType === "question"){
		        component=
		        <React.Fragment>
		          <br /><br /><br /><label style = { labelSize } id = "viewQuestion"> { componentValue } </label><br/>
		        </React.Fragment>;
		      }
		      if (componentType === "radio"){
		        component = 
		        <React.Fragment>
		         <label className="container viewRadio" style = {radioStyle} id = { componentID }>
		            <input name = { subComponentQuestion} onChange = {this.handleChange} type="radio" value = { componentValue } />
		            <label style = { radioLabel }> { componentValue } </label>
		            <span class="checkmark"></span>
		          </label>
		        </React.Fragment>;
		      }
		      if (componentType === "singleLine"){
		        component =
		        <React.Fragment key = {componentID}>
		                        <div className="ui input viewInput">            
		                          <input name = { subComponentQuestion } onChange = { thisComp.handleChange } style = { singleLineStyle } id = {componentID} size="50" type="text" placeholder="Your answer"/>
		                        </div><br/><br/><br/>
		                      </React.Fragment>;
		      }
		      viewForm.push({ displayComponent:  component });
    }
    this.setState ({ viewForm });
    this.setState ({ renderFlag: false })
  		}
	}
	componentDidMount () {
		var thisComp = this;
		if (thisComp.props.match){
		    const {slug} = thisComp.props.match.params
		    thisComp.setState({
			    slug: slug
		    }, thisComp.loadFormProps(slug))
		}
	}
    render(){
    	if (this.state.renderFlag === true){
    		this.formBuilder()
    	}
		return(
			<div id="formBody">
				<center>
				<div className = "banner">
		           <font color="white">
		             <center>
		                <label id = "formTitle" name="formTitle">{(this.state.formFillerBuilder !== null ? this.state.formFillerBuilder[0].title : "")}</label>
		             </center>
		           </font>
		        </div>
				</center>
            	<div>
				{(  this.state.viewForm !== null ?
					this.state.viewForm.map
					(
						temp => temp.displayComponent
					):<h1>Loading</h1>
				)}
				</div>
				<center>
					<br/><br/><br/><br/>
				<button className="ui secondary button" onClick={this.saveData}>Submit</button>
				</center>
			</div>
		);
	}
}
export default FormFiller;