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
import Profile from "./containers/Profile/Profile";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
//TODO: Create a loader component and any inline styles => make css classes inside main.scss
const App = ({ loading }) => {
  let loader = loading && (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#80808099",
        position: "absolute",
        zIndex: 99999,
      }}
    >
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "none",
          zIndex: 999,
        }}
      />
    </div>
  );

  return (
    <React.Fragment>
      {loader}
      <div className="App">
        <BreakpointProvider>
          <Router>
            <Switch>
              <ProtectedRoute exact path={ROUTERPATHS.FOOD} component={Food} />
              <ProtectedRoute exact path={ROUTERPATHS.HOME} component={Home} />
              <Route path={ROUTERPATHS.PROFILE} component={Profile} />
              <Route path={ROUTERPATHS.REGISTER} component={Register} />
              <Route path={ROUTERPATHS.LOGIN} component={Login} />
              <Route path={ROUTERPATHS.ROOT} component={AuthenticationComp} />
            </Switch>
          </Router>
        </BreakpointProvider>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
  };
};

export default connect(mapStateToProps, null)(App);
