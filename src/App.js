import React from "react";
import "./App.css";
import Home from "./pages/home";
import Charts from "./pages/charts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/charts" exact component={Charts} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
