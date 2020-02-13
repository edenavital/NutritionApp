import React from "react";
import "./Backdrop.css";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../redux";
//props: isModalVisible, clicked()

const Backdrop = props => (
  <div className={"Backdrop"} onClick={props.toggleSideDrawer}></div>
);

const mapDispatchToProps = dispatch => {
  return {
    toggleSideDrawer: () => dispatch(toggleSideDrawer())
  };
};
export default connect(null, mapDispatchToProps)(Backdrop);
