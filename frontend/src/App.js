import React, {useState} from "react";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { withRouter, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Food from "./components/Food/Food";
import AuthenticationComp from "./containers/AuthenticationComp/AuthenticationComp";
import { ROUTERPATHS } from "./constants/constants";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { BreakpointProvider } from "react-socks";


import { connect } from "react-redux";
import Loader from "./components/Loader/Loader";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Header from './components/Header/Header';
import { toggleSideDrawer, resetStateApp, resetStateUser, saveDataLogin } from "./redux";
import FoodList from "./containers/FoodList/FoodList";

const App = ({ loading, toggleSideDrawer, resetStateUser, resetStateApp, history, connected, saveDataLogin }) => {

  const [displayedPage, setDisplayedPage] = useState("Dashboard");

  const logout = () => {
    localStorage.removeItem("JWT");
    resetStateUser();
    resetStateApp();
    history.push(ROUTERPATHS.LOGIN);
  };

  return (
    <React.Fragment>
      {connected && <Header toggleSideDrawer={toggleSideDrawer} logout={logout} displayedPage={displayedPage} />}
      {loading && <Loader />}
      <SideDrawer
        toggleSideDrawer={toggleSideDrawer}
        logout={logout}
        setDisplayedPage={setDisplayedPage}
      />
      
      <div className="App">
        <BreakpointProvider>
            <Switch>
              <ProtectedRoute exact path={ROUTERPATHS.HOME} component={Home} />
              <ProtectedRoute exact path={ROUTERPATHS.FOOD} component={Food} />
              <ProtectedRoute exact path={ROUTERPATHS.FOOD_LIST} component={FoodList} />

              <Route path={ROUTERPATHS.REGISTER} component={Register} />
              <Route
                  path={ROUTERPATHS.LOGIN}
                  render={routeProps => (
                    <Login saveDataLogin={saveDataLogin} {...routeProps} />
                  )}
              />
              <Route
                path={ROUTERPATHS.ROOT}
                render={routeProps => (
                  <AuthenticationComp saveDataLogin={saveDataLogin} {...routeProps} />
                )}
              />

            </Switch>    
        </BreakpointProvider>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({app, user}) => {
  return {
    loading: app.loading,
    connected: user.connected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideDrawer: () => dispatch(toggleSideDrawer()),
    resetStateUser: () => dispatch(resetStateUser()),
    resetStateApp: () => dispatch(resetStateApp()),
    saveDataLogin: (userData, token) => dispatch(saveDataLogin(userData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
