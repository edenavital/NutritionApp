import React, { Component } from "react";
import { ROUTERPATHS } from "../../constants/constants";
import axios from "axios";
import { saveDataFromDatabase } from "../../redux";
import { connect } from "react-redux";

class AuthenticationComp extends Component {
  componentDidMount() {
    const { token, history, saveDataFromDatabase } = this.props;

    if (token) {
      axios
        .get("/api/getUserData", {
          headers: { Authorization: token },
        })
        .then((res) => {
          //FETCH THE ARRAY OF OBJECT OF THE USER SO YOU WILL HAVE THE DATA OF HIM! FETCH IT INTO REDUX!
          saveDataFromDatabase(res.data.userData);
          console.log(
            "FROM AUTHENTICATIONCOMP - JWT WAS FOUND - MOVING TO HOME"
          );
          history.push(
            history.location.state
              ? history.location.state.from.pathname
              : ROUTERPATHS.HOME
          );
        })
        .catch(() => {
          console.log("SERVER ISSUE");
        });
    } else {
      console.log(
        "FROM AUTHENTICATIONCOMP - JWT WAS NOT FOUND - MOVING TO LOGIN"
      );
      history.push(ROUTERPATHS.LOGIN);
    }
  }

  render() {
    return <></>;
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
