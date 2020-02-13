import React from "react";
import { connect } from "react-redux";
import "./SideDrawer.css";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";
import { toggleSideDrawer } from "../../redux";
import { Link } from "react-router-dom";

const SideDrawer = props => {
  const child = (
    <div className="SideDrawer">
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
  );

  return (
    <>
      <CSSTransition
        in={props.isDrawerVisible}
        classNames={"Backdrop"}
        timeout={750}
        unmountOnExit
        appear
      >
        <Backdrop toggleSideDrawer={props.toggleSideDrawer} />
      </CSSTransition>

      <CSSTransition
        in={props.isDrawerVisible}
        classNames={"SideDrawer"}
        timeout={750}
        unmountOnExit
        appear
      >
        {child}
      </CSSTransition>
    </>
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
