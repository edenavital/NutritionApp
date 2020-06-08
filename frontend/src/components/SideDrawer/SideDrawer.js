import React from "react";
import { connect } from "react-redux";
import "./SideDrawer.css";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";
import { toggleSideDrawer } from "../../redux";
import { Link } from "react-router-dom";

const SideDrawer = (props) => {
  const menu = (
    <div className="SideDrawer">
      <h3>Menu</h3>

      <ul>
        <li>
          <Link to="/home" onClick={props.toggleSideDrawer}>
            Home
          </Link>
        </li>
        <Link to="/food" onClick={props.toggleSideDrawer}>
          Add Food
        </Link>
        <li>
          <Link to="/profile" onClick={props.toggleSideDrawer}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={props.toggleSideDrawer}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <CSSTransition
        in={props.isDrawerVisible}
        classNames={"Backdrop"}
        timeout={550}
        unmountOnExit
        appear
      >
        <Backdrop toggleSideDrawer={props.toggleSideDrawer} />
      </CSSTransition>

      <CSSTransition
        in={props.isDrawerVisible}
        classNames={"SideDrawer"}
        timeout={550}
        unmountOnExit
        appear
      >
        {menu}
      </CSSTransition>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerVisible: state.app.isDrawerVisible,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideDrawer: () => dispatch(toggleSideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
