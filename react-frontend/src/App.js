import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/login";
import SignUp from "./components/SignUp";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import CatalogueItem from "./Pages/CatalogueItem";
import Nav from "./components/Nav";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuoteRequestList from "./Pages/QuoteRequestList";
import QuotesList from "./Pages/QuotesList";

export default function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Route render={(props) => <Nav user={user} {...props} />}></Route>
      <Switch>
        {/* anonymous Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/login"
          render={(props) => <Login setLoggedUser={setUser} {...props} />}
        />
        {/* User Routes */}
        <Route exact path="/catalogue" component={Catalog} />
        <Route exact path="/quotes" component={QuotesList} />
        <Route
          exact
          path="/catalogueItem"
          component={CatalogueItem}
        />
        {/* Employee Routes */}
        <Route
          exact
          path="/quoteRequests"
          component={QuoteRequestList}
        />

      </Switch>
    </div>
  );
}
