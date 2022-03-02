import React, { Component } from 'react';
import HomePage from './components/HomePage';
import CreateForm from './components/CreateForm';
import MyForms from './components/MyForms';
import EditForm from './components/EditForm';
import FormFiller from './components/FormFiller';
import PublicForms from './components/PublicForms';
import ViewPublic from './components/ViewPublic';
import logoutUser from './components/logoutUser';
import ViewResponse from './components/ViewResponse';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/hyforms' component={HomePage}/>
            <Route exact path='/hyforms/myforms' component={MyForms}/>
            <Route exact path='/hyforms/create' component={CreateForm}/>
            <Route exact path='/hyforms/myforms/:slug' component={EditForm}/>
            <Route exact path='/hyforms/fill/:slug' component={FormFiller}/>
            <Route exact path='/hyforms/publicforms' component={PublicForms}/>
            <Route exact path='/hyforms/publicforms/:slug' component={ViewPublic}/>
            <Route exact path='/hyforms/viewresponse/:slug' component={ViewResponse}/>
            <Route exact path='/logoutUser' component={logoutUser}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;