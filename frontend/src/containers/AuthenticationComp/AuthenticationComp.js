import React, { Component } from "react";

import axios from "axios";
import { saveDataFromDatabase } from "../../redux";
import { connect } from "react-redux";

class AuthenticationComp extends Component {
  componentDidMount() {
    const { token } = this.props;

    // const jwt = localStorage.getItem("JWT");
    if (token) {
      axios
        .get("/api/getUserData", {
          headers: { Authorization: token },
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

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDataFromDatabase: (userData) =>
      dispatch(saveDataFromDatabase(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationComp);
