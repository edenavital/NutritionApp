import React from "react";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Food from "./components/Food/Food";
import AuthenticationComp from "./containers/AuthenticationComp/AuthenticationComp";
import { ROUTERPATHS } from "./constants/constants";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { BreakpointProvider } from "react-socks";

const App = () => {
  return (
    <div className="App">
      <BreakpointProvider>
        <Router>
          <Switch>
            <ProtectedRoute exact path={ROUTERPATHS.FOOD} component={Food} />
            <ProtectedRoute exact path={ROUTERPATHS.HOME} component={Home} />
            <Route path={ROUTERPATHS.REGISTER} component={Register} />
            <Route path={ROUTERPATHS.LOGIN} component={Login} />
            <Route path={ROUTERPATHS.ROOT} component={AuthenticationComp} />
          </Switch>
        </Router>
      </BreakpointProvider>
    </div>
  );
};

export default App;
