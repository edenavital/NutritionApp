import React, { Component } from "react";

import axios from "axios";
import {
  saveDataFromDatabase,
  resetStateApp,
  resetStateUser,
} from "../../redux";
import { connect } from "react-redux";

class AuthenticationComp extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      axios
        .get("/api/getUserData", {
          headers: { Authorization: jwt },
        })
        .then((res) => {
          //FETCH THE ARRAY OF OBJECT OF THE USER SO YOU WILL HAVE THE DATA OF HIM! FETCH IT INTO REDUX!
          this.props.saveDataFromDatabase(res.data.userData);
          console.log(
            "FROM AUTHENTICATIONCOMP - JWT WAS FOUND - MOVING TO HOME"
          );
          this.props.history.push("/home");
        })
        .catch(() => {
          console.log("SERVER ISSUE");
        });
    } else {
      console.log(
        "FROM AUTHENTICATIONCOMP - JWT WAS NOT FOUND - MOVING TO LOGIN"
      );
      this.props.history.push("/login");
    }
  }

  render() {
    return <div style={{ visibility: "hidden" }}>AUTH</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDataFromDatabase: (userData) =>
      dispatch(saveDataFromDatabase(userData)),
    resetStateApp: () => dispatch(resetStateApp()),
    resetStateUser: () => dispatch(resetStateUser()),
  };
};

export default connect(null, mapDispatchToProps)(AuthenticationComp);
