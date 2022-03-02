import React, { Component } from 'react';
import './styleSheets/CreateForm.css';
import './styleSheets/semantic.css';
import './javaScript/semantic.js';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

const sessionCookie = cookie.load('csrftoken');


const radioText = {

    position: 'relative',
    left: '18%',
    top: '-2vh',
};

const save = {
  position: 'relative',
  top: '-8%'
  
}
const saveInput = {
  position: 'relative',
  top: '15%'
}
const saveL = {
  position: 'relative',
  top: '-15%'
}

const radioStyle = {
  width: 'fit-content',
  position: 'relative',
  right: '12%',
}

const viewRadioStyle = {
  width: 'fit-content',
  left: '3vh'
}

const singleLineStyle = {
  position: 'relative',
  left: '-1%',
}

const hideArea = {

  display: 'none'
};

const componentRemove = {
  position: 'relative',
  left: '15%',
  top: '-2vh',
}

const labelSize = {
  fontSize: 'x-large'
};

class ViewPublic extends Component {

  constructor(props){
    super(props)
    this.saveLink = React.createRef()
  }
  
  state = {
    view: false,
    renderFlag: true,
    title: "",
    titleClicked: false,
    questionCount: 0,
    selectedComponent: "",
    focusedQuestion: "None, yet",
    componentSet:[
      
    ],
      viewSet:[
      
    ],
    formBuildProp: null,
    currentUser:""
  }

  componentDidMount (){
    const script = document.createElement("script");
  script.src = "https://kit.fontawesome.com/0467bd4fc9.js";
  script.async = true;
    if (this.props.match){
      const {slug} = this.props.match.params
      this.setState({
        slug: slug

      })
    this.getFormState(slug);
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
  }
  getFormState = (slug) =>{

    const endpoint = `/viewpublic/${slug}`;
    let thisComp = this;
    var temp = [];
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
      thisComp.setState ({ formBuildProp: responseData })
    }).catch(function(error){
      console.log("error", error)
    })
    
  }

  formStateSetter = () => {
    if (this.state.formBuildProp !== null){
      var title = this.state.formBuildProp.title;
      this.setState({
        title
      })
      var thisComp = this;
      var componentBuildArray = this.state.formBuildProp.formData.split("--:--")
      var componentSet = [...this.state.componentSet];
      var iterator = 0;
      var valueUniformer;
      var buildSet;
      for (iterator; iterator < componentBuildArray.length; iterator++){
        buildSet = componentBuildArray[iterator].split("----")
        valueUniformer = parseFloat(buildSet[1], 10)
      if (buildSet[0] === "question"){
        console.log("Entering question")
        var component = <React.Fragment key = { buildSet[1] }>
                          <div className="ui input" id="questionComp">
                          <label class="container" id = "qRadio">
                            <input type="radio" name="questionRadio" id = { buildSet[1] } />
                            <span class="checkmark"></span>
                          </label>
                            <input disabled autoComplete = "off" defaultValue = {buildSet[2]} onChange = { this.updateComponentValue } id = { buildSet[1] } size="80" type="text" placeholder="Enter Question" onFocus = {this.changeQuestionFocus} onChange = { this.updateComponentValue }/>
                            &nbsp;&nbsp;
                          </div>
                          <br/>
                          <br/>
                        </React.Fragment>;
        var insertedComponentType = [buildSet[0] , parseFloat(buildSet[1], 10) , buildSet[2]];
        componentSet.push({id: parseFloat(buildSet[1], 10), inputComponent: component, type: insertedComponentType});
        }
       if (buildSet[0] === "radio"){
         console.log("Entering radio")
         component =
                      <div style = {radioStyle} key = {buildSet[1]}>
                        <br/>            
                      <label class="container" id="cRadio" id = {buildSet[1]}>
                          <input type="radio" checked="checked" name={this.state.focusedQuestion}/>
                          <span class="checkmark"></span>
                      </label>
                      <div className="ui input">
                        <input disabled autoComplete = "off" defaultValue = {buildSet[2]} id = {buildSet[1]} style = {radioText} size="20" type="text" placeholder="Option Text" onChange = { this.updateComponentValue }/>
                      </div>
                      &nbsp;&nbsp;
                      </div>;
        var insertedComponentType = [buildSet[0] , parseFloat(buildSet[1], 10) , buildSet[2]];
        componentSet.push({id: parseFloat(buildSet[1], 10), inputComponent: component, type: insertedComponentType});
       }
       if (buildSet[0] === "singleLine"){
         console.log("Entering singleLine")
         var component =  <div key = {buildSet[1]}>
                            <div style = {singleLineStyle} className="ui input">            
                              <input disabled autoComplete = "off" defaultValue = {buildSet[2]} onChange = { this.updateComponentValue } id = { buildSet[1] } size="50" type="text" placeholder="Your answer"/>
                              
                            </div><br/><br/><br/>
                          </div>;
        var insertedComponentType = [buildSet[0] , parseFloat(buildSet[1], 10) , buildSet[2]];
        componentSet.push({id: parseFloat(buildSet[1], 10), inputComponent: component, type: insertedComponentType});
     }
    }
    this.setState({componentSet: componentSet});
    this.setState({renderFlag: false})
    this.setState({ focusedQuestion: parseInt(buildSet[1], 10) })
    this.setState({ questionCount: parseInt(buildSet[1], 10) })
    buildSet = null;
  }
}

  copyForm = () => {
    const endpoint = `/create/`;
    const csrfToken = cookie.load('csrftoken');
    let thisComp = this;
    var formStoreArray;
    var slug = "";
    var owner = this.state.currentUser
    if (csrfToken !== undefined ){ 
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 30; i++ ) {
          slug += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       formStoreArray = this.state.formBuildProp;
       formStoreArray.slug = slug;
       formStoreArray.owner = owner.username
      let lookupOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formStoreArray),
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

      const endpoint1 = `/fillform/`;

      let lookupOptions1 = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formStoreArray),
            credentials: 'include'
      }
      fetch ( endpoint1, lookupOptions1 )
      .then(function(response){
        return response.json()
      }).then(function(responseData){
         return responseData
      }).catch(function(error){
        console.log("error", error)
      })
    }
    alert("Form has been copied to your account. Access it from \"Your Forms\"");
  }

  render() {
    if (this.state.renderFlag === true){
      this.formStateSetter()
      console.log(this.state.componentSet)
    }
    return (
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
        <div id="banner">
        </div>
        <center>
          <div id="titleClicked">
            <div className="ui input">
              <input autoComplete = "off" disabled defaultValue = {this.state.title} type="text" id="titleInputClicked"/>
            </div>&nbsp;
            <button className="ui secondary button" onClick = {this.titleClicked} id="titleInputButtonClicked" >Go!</button>
          </div>
            <div id = "formAreaa" style = { this.state.view === false ? null : hideArea }>
            {
              this.state.componentSet.map
              (
                eachComponent => eachComponent.inputComponent
              )
            }
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <button className="ui secondary button" onClick={ this.copyForm }> Copy Form</button><br/><br/>
            </center>
      </React.Fragment>
    );
  }
}

export default ViewPublic;