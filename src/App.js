import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
