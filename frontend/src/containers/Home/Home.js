import React, { Component } from "react";
import "./Home.css";
import Icon from "../../components/Icon/Icon";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../redux";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { resetStateApp, resetStateUser } from "../../redux";
class Home extends Component {
  logout = () => {
    localStorage.removeItem("JWT");
    this.props.resetStateUser();
    this.props.resetStateApp();
    this.props.history.push("/login");
  };

  render() {
    //const { username } = this.props.credentials;
    return (
      <div className="Home">
        <SideDrawer />

        <Icon
          iconName="menu"
          width="40px"
          height="40px"
          position="absolute"
          left="8%"
          top="3%"
          cursor="pointer"
          onClick={this.props.toggleSideDrawer}
        />
        <Icon iconName="smile" width="100px" height="100px" />

        <div
          onClick={this.logout}
          style={{
            color: "red",
            cursor: "pointer",
            position: "absolute",
            top: "10%",
            right: "10%",
          }}
        >
          X
        </div>

        <h4>Welcome USER</h4>

        <main>
          <div>GRAPH</div>

          <div>BMR - AMOUNT OF CALROIES</div>

          <div>FOOD and amount of calories for each...</div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
    food: state.user.food,
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
