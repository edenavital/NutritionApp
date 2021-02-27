import React, { Component } from "react";
import { ROUTERPATHS } from "../../constants/constants";
import axios from "axios";
import { connect } from "react-redux";
import { calculateBmr, calculateDailyCalories } from '../../redux';

class AuthenticationComp extends Component {
  async componentDidMount() {
    const { token, history, saveDataLogin, calculateBmr } = this.props;

    if (token) {
      try {
        const res = await axios.get("/api/getUserData", { headers: { Authorization: token } });
        //FETCH THE ARRAY OF OBJECT OF THE USER SO YOU WILL HAVE THE DATA OF HIM! FETCH IT INTO REDUX!
        saveDataLogin(res.data.userData, token);
        calculateBmr(res.data.userData.credentials);
        calculateDailyCalories();
        console.log("FROM AUTHENTICATIONCOMP - JWT WAS FOUND - MOVING TO HOME");
        history.push(
          history.location.state
            ? history.location.state.from.pathname
            : ROUTERPATHS.HOME
        );
      } catch (e) {
        console.log("SERVER ISSUE");
      }
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

const mapDispatchToProps = (dispatch) => ({
  calculateBmr: (credentials) => dispatch(calculateBmr(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationComp);
