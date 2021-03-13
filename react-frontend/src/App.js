import logo from './logo.svg';
import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom' ;
import './App.css';
import Login from './components/login';

function App() {

 
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <BrowserRouter>

        <Route exact path="/login"
        render = {props => ( <Login {...props} />)}
        >
        </Route>

        {/*<Route exact path="/catalogue"
        render = {props => (
          <Catalogue {...props} /> 
        )}
        </Route>
        */}
        
        
      </BrowserRouter>
    </div>
  );

}

export default App;
