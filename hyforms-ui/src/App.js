import React, { Component } from 'react';
import HomePage from './components/HomePage';
import CreateForm from './components/CreateForm';
import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomePage/>}/>
            <Route path='/create' element={<CreateForm/>} />
          </Routes>
        </BrowserRouter>
    );
  }
}

export default App;