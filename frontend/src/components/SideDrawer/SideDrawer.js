import React from "react";
import "./SideDrawer.css";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../redux";
import { Link } from "react-router-dom";

const SideDrawer = props => {
  return (
    props.isDrawerVisible && (
      <div className="SideDrawer">
        <div className="backdrop" onClick={props.toggleSideDrawer}></div>
        <div className="drawer">
          <h3>Menu</h3>

          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>Add Food</li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

const mapStateToProps = state => {
  return {
    isDrawerVisible: state.app.isDrawerVisible
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleSideDrawer: () => dispatch(toggleSideDrawer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
