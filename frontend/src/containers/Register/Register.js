import React, { Component } from "react";
import "./Register.css";
import Icon from "../../components/Icon/Icon";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { errorNotification, successNotification } from "../../redux";
class Register extends Component {
  state = {
    person: {
      username: "",
      password: "",
      age: "",
      height: "",
      weight: ""
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

    console.log(`Sending to BACKEND the following person:
            username - ${person.username},
            password - ${person.password},
            age - ${person.age},
            height - ${person.height},
            weight - ${person.weight}
        `);

    axios
      .post("/api/register", person)
      .then(res => {
        console.log(res.data);
        this.props.successNotification();
      })
      .catch(err => {
        console.log(err);
        this.props.errorNotification();
      });
  };

  render() {
    return (
      <div className="Register">
        <Icon iconName="register" />
        {/* <button onClick={this.props.errorNotification}>XXX</button> */}
        <div className="description">
          <Title dynamicStyle={{ marginTop: "15px" }}>
            Welcome to Nutrition App
          </Title>
          <p>Sign up form</p>
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
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            min="0"
            max="99"
            id="age"
            value={this.state.person.age}
            onChange={this.handleInputChange}
          />

          <Label htmlFor="height">Height (M)</Label>
          <Input
            type="number"
            min={1}
            max={3}
            step={0.01}
            id="height"
            value={this.state.person.height}
            onChange={this.handleInputChange}
          />

          <Label htmlFor="weight">Weight (KG)</Label>
          <Input
            type="number"
            min={1}
            max={999}
            step={0.1}
            id="weight"
            value={this.state.person.weight}
            onChange={this.handleInputChange}
          />

          <Button
            type="submit"
            dynamicstyle={{ marginTop: "30px", marginBottom: "15px" }}
          >
            SIGN IN
          </Button>
        </form>

        <p className="Signup">
          <Link to="/login">SIGN IN</Link> FOR AN ACCOUNT
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    errorNotification: () => errorNotification(),
    successNotification: () => successNotification()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
