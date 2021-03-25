import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/login";
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
        <Route exact path="/" component={Home} />
        <Route exact path="/catalogue" component={Catalog} />
        <Route
          exact
          path="/login"
          render={(props) => <Login setLoggedUser={setUser} {...props} />}
        />
        <Route
          exact
          path="/catalogueItem"
          render={(props) => <CatalogueItem {...props} />}
        />
        <Route
          exact
          path="/quoteRequests"
          render={(props) => <QuoteRequestList {...props} />}
        />
        <Route
          exact
          path="/quotes"
          render={(props) => <QuotesList {...props} />}
        />
      </Switch>
    </div>
  );
}
