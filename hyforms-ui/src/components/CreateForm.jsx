import React, { Component } from 'react';
import './styleSheets/CreateForm.css';
import './styleSheets/semantic.css';
import './javaScript/semantic.js';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


const sessionCookie = "undefined";


const radioText = {
    position: 'relative',
    left: '18%',
    top: '-2vh',
};


const viewRadioStyle = {
  width: 'fit-content',
  left: '3vh'
}

const radioStyle = {
  width: 'fit-content',
  position: 'relative',
  right: '12%',
}

const save = {
  position: 'relative',
  top: '-3vh'
}

const bannerStyle = {
  
}

const singleLineStyle = {
  position: 'relative',
  left: '-4%',
}

const multiLineStyle = {
  position: 'relative',
  left: '-4%',
}

const hideArea = {

  display: 'none'
};

const labelSize = {
  fontSize: 'x-large'
};

class CreateForm extends Component {
  
  state = {
    view: false,
    title:"demo",
    titleClicked: false,
    questionCount: 0,
    selectedComponent: "",
    focusedQuestion: 0,
    componentSet:[

    ],
      viewSet:[
      
    ],
    formStoreArray: [

    ],
    currentUser: "initial",
    publicFlag: false
  }

  saveForm = () => {
    //api to be implemented later
  }

  savePublic = (publicData) => {

    //public form api implementation to be done later.

  }

  onEnterPress = (e) => {
    if (e.key === "Enter"){
      this.titleClicked();
    }
  }
  updateComponentValue = (e) => {

    if (e.target.name === "formTitle"){
      var title = e.target.value;
      this.setState({ title });
    }
    else{
    var componentId = e.target.id;
    var componentSet = [...this.state.componentSet];
    var index = componentSet.map(function(e) { return e.id; }).indexOf(parseFloat(componentId));
    (componentSet[index].type)[2] = e.target.value;
    this.setState ({ componentSet });
  }
}

  viewForm = (e) => {
    // Add view form functionality later
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
    if (componentType === "Question"){
      questionCount = questionCount + 1;
      var component = <React.Fragment key = { this.state.questionCount }>
                        <br />
                        <div className="ui input" id="questionComp">
                        <label class="container" id = "qRadio">
                          <input type="radio" name="questionRadio" id = { questionCount } />
                          <span class="checkmark"></span>
                        </label>
                          <input autoComplete = "off" onChange = { this.updateComponentValue } id = { questionCount } size="80" type="text" placeholder="Enter Question" onFocus = {this.changeQuestionFocus} onChange = { this.updateComponentValue }/>
                          &nbsp;&nbsp;<button className="ui secondary button" onClick={  () => this.removeComponent( questionCount ) }>X</button><br/><br/>
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
                    &nbsp;&nbsp;<button id="componentRemove" className="mini ui white button" onClick={  () => this.removeComponent( componentQuestionId ) }>X</button>
                    </div>
        }
        if (this.state.selectedComponent === "singleLine"){
          component =
                      <div style = {singleLineStyle} key = {componentQuestionId}>
                        <div className="ui input">            
                          <input autoComplete = "off" onChange = { this.updateComponentValue } id = {componentQuestionId} size="50" type="text" placeholder="Your answer"/>
                          <button className="ui secondary button" onClick={  () => this.removeComponent( componentQuestionId ) }>X</button><br/><br/>
                        </div><br/><br/><br/>
                      </div>
          }
          if (this.state.selectedComponent === "multiLine"){
          component =
                      <div style = {multiLineStyle} key = {componentQuestionId}>
                        <div className="field">            
                          <textarea autoComplete = "off" onChange = { this.updateComponentValue } id = {componentQuestionId} size="50" type="text" placeholder="Your answer"/>
                          <button className="ui secondary button" onClick={  () => this.removeComponent( componentQuestionId ) }>X</button><br/><br/>
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

  removeComponent = (componentId) =>{
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
    //Probably view feature will need a flag, will keep this here.
  }

  makePublic = () => {
    // Planning on adding a public form feature.
  }
  render() { 
    console.log(this.state.currentUser.username)
    return (
      <React.Fragment>
      <div id="gradientSet" >
        <center>
          <div id={ this.state.titleClicked === true ? "titleClicked" : "title" }>
            <div className="ui input">
              <input autoComplete = "off" name="formTitle" onChange = { this.updateComponentValue } type="text" onKeyPress={this.onEnterPress} placeholder="Enter Title" id={ this.state.titleClicked === true ? "titleInputClicked" : null }/>
            </div>&nbsp;
            <button className="ui secondary button" onClick = {this.titleClicked} id={ this.state.titleClicked === true ? "titleInputButtonClicked" : null }>Go!</button>
          </div>
          <div id={ this.state.titleClicked === true ? "formControlsVisible" : "formControlsHidden" }>
            <label><h4>Form Controls</h4></label><br/><br/><br/>
            <label>Current question: { this.state.focusedQuestion} </label><br/><br/>
            <button className="ui secondary button" onClick={  () => this.addComponent("Question") }> New Question </button><br/><br/>
            <select onChange = { this.changeComponent } value = {this.state.selectedComponent} className="ui selection dropdown">
              <option value="">Components</option>
              <option value="radio">Radio</option>
              <option value="singleLine">Single Line</option>
              <option value="multiLine">Multi Line</option>
            </select><br/><br/>
            <button className="ui secondary button" onClick={  () => this.addComponent("subComponent") }> Add Component </button><br/><br/>
            <button className="ui secondary button">View Form</button><br/><br/>
            <div class="ui checkbox">
              <input type="checkbox" id = "save" name="save" onChange = { this.makePublic } />
              <label for="save"><font color="white">Make this a public template</font></label>
            </div>
            <br/><br/><button style = {save} className="ui secondary button" onClick={ this.saveForm }> Save Form</button><br/><br/>
          </div>
            <div id = "formAreaa" style = { this.state.view === false ? null : hideArea }>
              <div>
              {
                this.state.componentSet.map
                (
                  eachComponent => eachComponent.inputComponent
                )
              }
              </div>
            </div>
            </center>
      </div>
      </React.Fragment>
    );
  }
}

export default CreateForm;