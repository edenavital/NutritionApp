import React, { Component } from "react";
import "./Home.css";
import Icon from "../../components/Icon/Icon";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../redux";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { resetStateApp, resetStateUser } from "../../redux";
import Pie from "../../components/Pie/Pie";
import Foodtable from "../../components/Foodtable/Foodtable";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Breakpoint } from "react-socks";
import { optionsDefault, optionsMobile } from "../../components/Pie/pieOptions";
class Home extends Component {
  logout = () => {
    const { resetStateUser, resetStateApp, history } = this.props;
    localStorage.removeItem("JWT");
    resetStateUser();
    resetStateApp();
    history.push("/login");
  };

  render() {
    const { name, food, toggleSideDrawer, token } = this.props;

    return (
      <div className="Home">
        <div className="d-flex justify-content-between align-items-center mx-5 m-2">
          <SideDrawer />

          <Icon
            iconName="menu"
            width="40px"
            height="40px"
            cursor="pointer"
            onClick={toggleSideDrawer}
          />
          <Icon iconName="smile" width="100px" height="100px" />

          <IconButton
            style={{
              outline: "none",
              color: "red",
              cursor: "pointer",
            }}
            onClick={this.logout}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <h4>Welcome {name && name}</h4>

        <main>
          <div className="app pie-container">
            <div className="row pie-row">
              <div className="mixed-chart">
                <Breakpoint medium up>
                  {food && food.length > 0 && <Pie options={optionsDefault} />}
                </Breakpoint>

                <Breakpoint small down>
                  {food && food.length > 0 && <Pie options={optionsMobile} />}
                </Breakpoint>
              </div>
            </div>
          </div>

          <div>Your total BMR calculation is X Calories</div>

          <Foodtable food={food} token={token} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    food: state.user.food,
    name:
      state.user && state.user.credentials[0] && state.user.credentials[0].name,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideDrawer: () => dispatch(toggleSideDrawer()),
    resetStateUser: () => dispatch(resetStateUser()),
    resetStateApp: () => dispatch(resetStateApp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
