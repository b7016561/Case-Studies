import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom' ;
import './App.scss';
import Login from './components/login';
import Home from './Pages/Home';
import Catalog from './Pages/Catalog';
import CatalogueItem from './Pages/CatalogueItem'
import Nav from './components/Nav'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

 
  return (
    <div className="App">
      <Nav/>
      <BrowserRouter>
        <Route exact path="/home"><Home/></Route>
        <Route exact path="/login"
        render = {props => ( <Login {...props} />)}
        >
     </Route>

        <Route exact path="/catalogue"><Catalog/></Route>
        
        <Route exact path="/catalogueItem"
        render = {props => ( <CatalogueItem {...props} />)}
        >
     </Route>        
        
      </BrowserRouter>
    </div>
  );

}

export default App;
