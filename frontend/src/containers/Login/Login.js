import React, { Component } from "react";
import "./Login.css";
import Icon from "../../components/Icon/Icon";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  errorNot_WrongCredentials,
  successNot_RightCredentials,
  saveDataFromDatabase,
  resetStateApp,
  resetStateUser
} from "../../redux";

import { connect } from "react-redux";

//LINE 40 LOGIN.JS, LINE 91 SERVER.JS - continue the login functionality from the backend and frontend!

class Login extends Component {
  componentDidMount() {
    this.props.resetStateApp();
    this.props.resetStateUser();
  }

  state = {
    person: {
      username: "",
      password: ""
    }
  };

  handleInputChange = e => {
    const key = e.target.id;
    const value = e.target.value;

    const updatedPerson = this.state.person;
    updatedPerson[key] = value;
    this.setState({ person: updatedPerson });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const person = this.state.person;

    axios
      .post("/api/login", person)
      .then(res => {
        //FETCH THE ARRAY OF OBJECT OF THE USER SO YOU WILL HAVE THE DATA OF HIM! FETCH IT INTO REDUX!
        this.props.successNot_RightCredentials();
        this.props.saveDataFromDatabase(res.data.userData);
        this.props.history.push("/home");
      })
      .catch(() => {
        console.log("Credentials not match ...");
        this.props.errorNot_WrongCredentials();
      });
  };

  render() {
    return (
      <div className="Login">
        <Icon iconName="diet" width="100px" height="100px" />

        <div className="description">
          <Title>Welcome to Nutrition App</Title>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={this.onSubmitForm}>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={this.state.person.username}
            onChange={this.handleInputChange}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={this.state.person.password}
            onChange={this.handleInputChange}
            required
          />

          <Button
            type="submit"
            dynamicstyle={{ marginTop: "30px", marginBottom: "15px" }}
          >
            SIGN UP
          </Button>
        </form>

        <p className="Signin">
          <Link to="/register">SIGN UP</Link> FOR AN ACCOUNT
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    errorNot_WrongCredentials: () => errorNot_WrongCredentials(),
    successNot_RightCredentials: () => successNot_RightCredentials(),
    saveDataFromDatabase: userData => dispatch(saveDataFromDatabase(userData)),
    resetStateApp: () => dispatch(resetStateApp()),
    resetStateUser: () => dispatch(resetStateUser())
  };
};

export default connect(null, mapDispatchToProps)(Login);
