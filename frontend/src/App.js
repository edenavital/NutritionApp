import React from "react";
import "./App.css";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import Home from "./containers/Home/Home";
import Food from "./components/Food/Food";
const App = () => {
  return (
    <div className="App">
      <NotificationContainer />
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/food" component={Food} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
