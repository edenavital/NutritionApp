import React, { Component } from "react";
import "./Home.css";
import Icon from "../../components/Icon/Icon";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../redux";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
class Home extends Component {
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

const mapStateToProps = state => {
  return {
    credentials: state.user.credentials,
    food: state.user.food
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideDrawer: () => dispatch(toggleSideDrawer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
