import React, { Component } from 'react';
import HomePage from './components/HomePage';
import CreateForm from './components/CreateForm';
import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Routes>
          <Route path='/hyforms' element={<HomePage/>}/>
            <Route path='/hyforms/create' element={<CreateForm/>} />
          </Routes>
        </BrowserRouter>
    );
  }
}

export default App;