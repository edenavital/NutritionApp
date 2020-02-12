import React from "react";
import "./App.css";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <Redirect exact from="/" to="login" /> */}
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
