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

class EditForm extends Component {

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

  onEnterPress = (e) => {
    if (e.key === "Enter"){
      this.titleClicked();
    }
  }
  updateComponentValue = (e) => {

    var componentId = e.target.id;
    if (componentId === "titleInputClicked")
      {
        console.log(componentId)
        this.setState({ title: e.target.value })
        
      }
    else
    {var componentSet = [...this.state.componentSet];
        var index = componentSet.map(function(e) { return e.id; }).indexOf(parseFloat(componentId));
        (componentSet[index].type)[2] = e.target.value;
        this.setState ({ componentSet });}

  }

  viewForm = (e) => {
    var view = true;
    var currentComponents = [...this.state.componentSet];
    var viewSet = [];
    var iterator = 0;
    var component;
    for (iterator; iterator < currentComponents.length; iterator++){
      var interpreter = currentComponents[iterator].type;
      var componentType = interpreter[0];
      var componentID = interpreter[1];
      var componentValue = interpreter[2];
      if (componentType === "question"){
        component=
        <React.Fragment>
          <br /><br /><br /><label style = { labelSize } id = "viewQuestion">{ componentValue } </label><br/>
        </React.Fragment>;
      }
      if (componentType === "radio"){
        component = 
        <React.Fragment>
         <label style = { viewRadioStyle } className="container viewRadio" id = { componentID }>
            <input type="radio" name= "sdfasd" value = { componentValue } />
            <label style = { labelSize }> { componentValue } </label>
            <span class="checkmark"></span>
          </label>
        </React.Fragment>;
      }
      if (componentType === "singleLine"){
        component =
        <div style = {singleLineStyle} key = {componentID}>
                        <div className="ui input viewInput">            
                          <input onChange = { this.updateComponentValue } id = {componentID} size="50" type="text" placeholder="Your answer"/>
                        </div><br/><br/><br/>
                      </div>;
      }
      viewSet.push({ displayComponent:  component });
    }
    this.setState ({ viewSet, view });
  }

  titleClicked = () => {
    var titleClicked = true;
    this.setState ({ titleClicked });
  }

  changeQuestionFocus = (e) =>{
    var focusedQuestion = this.state.focusedQuestion;
    focusedQuestion = parseInt(e.target.id, 10);
    this.setState({ focusedQuestion });
  }

  addComponent = (componentType) => {
    var componentSet = [...this.state.componentSet];
    var questionCount = this.state.questionCount;
    if (componentType === "question"){
      questionCount = questionCount + 1;
      var component = <React.Fragment key = { this.state.questionCount }>
                        <br />
                        <div className="ui input" id="questionComp">
                        <label class="container" id = "qRadio">
                          <input type="radio" name="questionRadio" id = { questionCount } />
                          <span class="checkmark"></span>
                        </label>
                          <input autoComplete = "off" onChange = { this.updateComponentValue } id = { questionCount } size="80" type="text" placeholder="Enter Question" onFocus = {this.changeQuestionFocus} onChange = { this.updateComponentValue }/>
                          &nbsp;&nbsp;<button className="ui secondary button" onClick={ (e) => {this.removeComponent(e, questionCount)} } name = "manualBuilt">X</button><br/><br/>
                        </div>
                        <br/>
                        <br/>
                      </React.Fragment>;
      var focusedQuestion = questionCount;
      var insertedComponentType = ["question" , questionCount , "value"];
      componentSet.push({id: questionCount, inputComponent: component, type: insertedComponentType});
    }
      if (componentType === "subComponent"){
        var componentQuestionId = this.state.focusedQuestion;
        componentQuestionId = componentQuestionId;
        var tempLength = ([...this.state.componentSet]).length;
        var count = 0;
        var i = componentSet.map(function(e) { return e.id; }).indexOf(componentQuestionId);
        for (i ; i < tempLength; i++){
          if (componentSet[i].id < this.state.focusedQuestion + 1){
            count++;
          }
        }
        componentQuestionId = (count/1000) + this.state.focusedQuestion;
        i = componentSet.map(function(e) { return e.id; }).indexOf(this.state.focusedQuestion);
        while (typeof componentSet[i+1] !== 'undefined'){
          
          if (componentSet[i].id === componentQuestionId){
            count++;
            break;
          }
          i++;
        }
        componentQuestionId = (count/1000) + parseInt(this.state.focusedQuestion, 10);
        var component;
        if (this.state.selectedComponent === "radio"){
        component =
                    <div style = {radioStyle} key = {componentQuestionId}>
                      <br/>            
                    <label class="container" id="cRadio" id = {componentQuestionId}>
                        <input type="radio" checked="checked" name={this.state.focusedQuestion}/>
                        <span class="checkmark"></span>
                    </label>
                    <div className="ui input">
                      <input autoComplete = "off" id = {componentQuestionId} style = {radioText} size="20" type="text" placeholder="Option Text" onChange = { this.updateComponentValue }/>
                    </div>
                    &nbsp;&nbsp;<button id="componentRemove" className="mini ui white button" onClick={ (e) => {this.removeComponent(e, componentQuestionId)} } name = "manualBuilt">X</button>
                    </div>
        }
        if (this.state.selectedComponent === "singleLine"){
          component =
                      <div style = {singleLineStyle} key = {componentQuestionId}>
                        <div className="ui input">            
                          <input autoComplete = "off" onChange = { this.updateComponentValue } id = {componentQuestionId} size="50" type="text" placeholder="Your answer"/>
                          <button className="ui secondary button" onClick={ (e) => {this.removeComponent(e, componentQuestionId)} } name = "manualBuilt">X</button><br/><br/>
                        </div><br/><br/><br/>
                      </div>
          }
        var index = componentSet.map(function(e) { return e.id; }).indexOf(this.state.focusedQuestion);
        if(typeof componentSet[index+1] !== 'undefined' && !Number.isInteger(componentSet[index+1].id)) {
          index++;
        }
        while (typeof componentSet[index+1] !== 'undefined' && !Number.isInteger(componentSet[index+1].id)){
          console.log("component id is:" + componentSet[index].id);
          index = index + 1;
        }
        index = index + 1;
        var insertedComponentType = [this.state.selectedComponent , componentQuestionId , "value"];
        componentSet.splice(index, 0, {id: componentQuestionId, inputComponent: component, type: insertedComponentType});
      }
      if (componentType === "Question"){
        this.setState({ componentSet, questionCount, focusedQuestion });
      }
      else{
        this.setState({ componentSet, questionCount});
      }
    }
  changeComponent = (e) => {
    var selectedComponent = e.target.value; 
    this.setState ({selectedComponent});
  }

  removeComponent = (event, componentId) =>{
    if (event.target.name === "autoBuilt"){
      componentId = parseFloat(event.target.id, 10);
    }
    var componentSet;
    if (Number.isInteger(componentId)){
      var focusedQuestion = 0;
      componentSet = [...this.state.componentSet];
      var count = 0;
      var i = componentSet.map(function(e) { return e.id; }).indexOf(componentId);
      var j = i;
      count++;
      if (componentSet.length !== 1 ){
        j++;
      }
      if ( j === componentSet.length){
        j--;
      }
      
      while (!Number.isInteger(componentSet[j].id)){
        count++;
        if (j < componentSet.length-1){
          j++;
        }
        else{
          break;
        }
      }
      componentSet.splice(i, count);
      i--;
    }
    
    else{
      componentSet = this.state.componentSet.filter ( c => c.id !== componentId );
    }
    this.setState ({ componentSet });
  }

  viewDecide = () =>{
    var view = this.state.view;
    if (view === false ){
      this.viewForm();
    }
    else{
      view = false;
      this.setState ({ view });
    }
    
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

  saveForm = () => {
    var slug = this.state.slug
    const endpoint = `/api/${slug}/`;
    const csrfToken = cookie.load('csrftoken');
    let thisComp = this;
    if (csrfToken !== undefined ){
      var formStoreArray = [];
      var formData = "";
      var iterator = 0;
      for (iterator; iterator < thisComp.state.componentSet.length; iterator++){
        var typeArray = thisComp.state.componentSet[iterator].type
        if ( iterator !== thisComp.state.componentSet.length-1 ){
          formData = formData + typeArray[0] + "----" + typeArray[1] + "----" + typeArray[2] + "--:--";
        }
        else{
          formData = formData + typeArray[0] + "----" + typeArray[1] + "----" + typeArray[2];
        }
        formStoreArray.push ({ title: thisComp.state.title, slug:thisComp.state.slug, formData: formData, owner: thisComp.state.currentUser.username })
        thisComp.setState({ formStoreArray }, console.log(formStoreArray));
      }
      console.log(formStoreArray[formStoreArray.length-1]);
      let lookupOptions = {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formStoreArray[formStoreArray.length-1]),
            credentials: 'include'
      }
      console.log(thisComp.state.componentSet)
      fetch ( endpoint, lookupOptions )
      .then(function(response){
        return response.json()
      }).then(function(responseData){
         return responseData
      }).catch(function(error){
        console.log("error", error)
      })

      const endpoint1 = `/fillform/${slug}/`;
      let lookupOptions1 = {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formStoreArray[formStoreArray.length-1]),
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
  }

  getFormState = (slug) =>{

    const endpoint = `/api/${slug}`;
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
                            <input autoComplete = "off" defaultValue = {buildSet[2]} onChange = { this.updateComponentValue } id = { buildSet[1] } size="80" type="text" placeholder="Enter Question" onFocus = {this.changeQuestionFocus} onChange = { this.updateComponentValue }/>
                            &nbsp;&nbsp;<button id = { buildSet[1] } name = "autoBuilt" className="ui secondary button" onClick={ (e) => {this.removeComponent(e, valueUniformer)} }>X</button><br/><br/>
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
                        <input autoComplete = "off" defaultValue = {buildSet[2]} id = {buildSet[1]} style = {radioText} size="20" type="text" placeholder="Option Text" onChange = { this.updateComponentValue }/>
                      </div>
                      &nbsp;&nbsp;<button style = {componentRemove} id = { buildSet[1] } name = "autoBuilt" style = {componentRemove} className="mini ui white button" onClick={ (e) => {this.removeComponent(e, valueUniformer)} }>X</button>
                      </div>;
        var insertedComponentType = [buildSet[0] , parseFloat(buildSet[1], 10) , buildSet[2]];
        componentSet.push({id: parseFloat(buildSet[1], 10), inputComponent: component, type: insertedComponentType});
       }
       if (buildSet[0] === "singleLine"){
         console.log("Entering singleLine")
         var component =  <div key = {buildSet[1]}>
                            <div style = {singleLineStyle} className="ui input">            
                              <input autoComplete = "off" defaultValue = {buildSet[2]} onChange = { this.updateComponentValue } id = { buildSet[1] } size="50" type="text" placeholder="Your answer"/>
                              <button id = { buildSet[1] } name = "autoBuilt" className="ui secondary button" onClick={ (e) => {this.removeComponent(e, valueUniformer)} }>X</button><br/><br/>
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

  copyLink = () => {
    this.saveLink.current.select();
    document.execCommand('copy'); 
  }

  render() {
    if (this.state.renderFlag === true){
      this.formStateSetter()
      console.log(this.state.componentSet)
    }
    return (
      <React.Fragment>
        <div id="banner">
        </div>
        <center>
          <div id="titleClicked">
            <div className="ui input">
              <input autoComplete = "off" defaultValue = {this.state.title} onChange = {this.updateComponentValue} type="text" onKeyPress={this.onEnterPress} placeholder="Enter Title" id="titleInputClicked"/>
            </div>&nbsp;
            <button className="ui secondary button" onClick = {this.titleClicked} id="titleInputButtonClicked" >Go!</button>
          </div>
          <div id="formControlsVisible">
            <label><h4>Form Controls</h4></label><br/><br/><br/>
            <label>Current question: { this.state.focusedQuestion} </label><br/><br/>
            <button className="ui secondary button" onClick={  () => this.addComponent("question") }> New Question </button><br/><br/>
            <select onChange = { this.changeComponent } value = {this.state.selectedComponent} className="ui selection dropdown">
              <option value="">Components</option>
              <option value="radio">Radio</option>
              <option value="singleLine">Single Line</option>
            </select><br/><br/>
            <button className="ui secondary button" onClick={  () => this.addComponent("subComponent") }> Add Component </button><br/><br/>
            <button className="ui secondary button" onClick={ this.viewDecide }> { this.state.view === false ? "View Form" : "Edit Form" } </button><br/><br/>
            <br/><br/><button style = {save} className="ui secondary button" onClick={ this.saveForm }> Save Form</button><br/><br/>
            
            <input style = {saveInput} ref={this.saveLink} className = "ui input" defaultValue = {"127.0.0.1:8000/hyforms/fill/" + this.props.match.params.slug} />
            <button style = {saveL} className="ui secondary button" onClick={ this.copyLink }> Copy Form Link</button><br/><br/>
          </div>
            <div id = "formAreaa" style = { this.state.view === false ? null : hideArea }>
            {
              this.state.componentSet.map
              (
                eachComponent => eachComponent.inputComponent
              )
            }
            </div>
            </center>
            <div id = "viewArea" style = { this.state.view === false ? hideArea :  null }>
            {
              this.state.viewSet.map
              (
                eachComponent => eachComponent.displayComponent
              )
            }
            </div>
      </React.Fragment>
    );
  }
}

export default EditForm;