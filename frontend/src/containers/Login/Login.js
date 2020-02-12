import React, { Component } from "react";
import "./Login.css";
import Icon from "../../components/Icon/Icon";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";

class Login extends Component {
  state = {
    person: {
      username: "",
      password: ""
    }
  };

  handleInputChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    console.log("KEY:", key + " VALUE: ", value);

    const updatedPerson = this.state.person;
    updatedPerson[key] = value;
    this.setState({ person: updatedPerson });
  };

  clearForm = () => {
    const updatedPerson = {
      username: "",
      password: ""
    };
    this.setState({ person: updatedPerson });
  };

  //Should check some things from the backend - database...
  onSubmitForm = e => {
    e.preventDefault();
    const person = this.state.person;

    console.log(`Sending to BACKEND the following person:
        username - ${person.username},
        password - ${person.password}
    `);
  };

  render() {
    return (
      <div className="Login">
        <Icon iconName="diet" />

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

          <div className="LoginOptions">
            <Button type="submit">SIGN IN</Button>

            <p>
              <a href="#">SIGN UP</a> FOR AN ACCOUNT
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
