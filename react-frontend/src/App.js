import logo from './logo.svg';
import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom' ;
import './App.css';
import Catalogue from './Pages/Catalog'
import Login from './components/login';
import Catalog from './Pages/Catalog';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

 
  return (
    <div className="App">
   { /*  <header className="App-header">
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
      </header>*/}
     <BrowserRouter>{/*}
        <Route
        render = {props => ( <Login {...props} />)}
        >
     </Route>*/}

        <Route exact path="/catalogue"><Catalog/></Route>
        
        
        
      </BrowserRouter>
    </div>
  );

}

export default App;
