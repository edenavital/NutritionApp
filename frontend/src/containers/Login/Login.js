import React, { Component } from "react";
import Icon from "../../components/Icon/Icon";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  saveDataLogin,
  resetStateApp,
  resetStateUser,
  showNotification,
} from "../../redux";
import { connect } from "react-redux";
import { NOTIFICATION_TYPES } from "../../constants/constants";

import TextField from '@material-ui/core/TextField';

class Login extends Component {
  state = {
    person: {
      username: "",
      password: "",
    },
  };

  handleInputChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    const updatedPerson = this.state.person;
    updatedPerson[key] = value;
    this.setState({ person: updatedPerson });
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    const person = this.state.person;

    axios
      .post("/api/login", person)
      .then((res) => {
        //FETCH THE ARRAY OF OBJECT OF THE USER SO YOU WILL HAVE THE DATA OF HIM! FETCH IT INTO REDUX!
        showNotification(NOTIFICATION_TYPES.SUCCESS, "SUCCESS LOGIN");
        this.props.saveDataLogin(res.data.userData);
        localStorage.setItem("JWT", res.data.userData.token);
        this.props.history.push("/home");
      })
      .catch(() => {
        console.log("Credentials not match ...");
        showNotification(NOTIFICATION_TYPES.ERROR, "ERROR");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="Login">
          <Icon iconName="diet" width="100px" height="100px" />
          <div className="description pt-4">
            <h4 className="text-success">Welcome to Nutrition App</h4>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={this.onSubmitForm}>
            <div className="float-input-box pt-1">
              <input
                className={
                  this.state.person.username.length !== 0 ? "input-filled" : ""
                }
                type="text"
                id="username"
                value={this.state.person.username}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="float-input-box">
              <input
                className={
                  this.state.person.username.length !== 0 ? "input-filled" : ""
                }
                type="password"
                id="password"
                value={this.state.person.password}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <Button
              type="submit"
              dynamicstyle={{ marginTop: "30px", marginBottom: "15px" }}
            >
              SIGN IN
            </Button>
          </form>

          <p className="Signin">
            <Link to="/register">SIGN UP</Link> FOR AN ACCOUNT
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDataLogin: (userData) => dispatch(saveDataLogin(userData)),
    resetStateApp: () => dispatch(resetStateApp()),
    resetStateUser: () => dispatch(resetStateUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
