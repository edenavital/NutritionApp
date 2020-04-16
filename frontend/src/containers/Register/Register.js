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
import { errorNot_UserExists, successNot_UserCreated } from "../../redux";

class Register extends Component {
  state = {
    person: {
      username: "",
      password: "",
      gender: "",
      age: "",
      height: "",
      weight: "",
    },
  };

  handleInputChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    console.log("key and values are: ", key, value);
    const updatedPerson = { ...this.state.person };
    updatedPerson[key] = value;
    this.setState({ person: updatedPerson });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const person = { ...this.state.person };

    console.log(`Sending to BACKEND the following person:
            username - ${person.username},
            password - ${person.password},
            gender - ${person.gender},
            age - ${person.age},
            height - ${person.height},
            weight - ${person.weight}
        `);

    axios
      .post("/api/register", person)
      .then((res) => {
        console.log(res.data);
        this.props.successNot_UserCreated();
        this.clearForm();
      })
      .catch((err) => {
        console.log(err);
        this.props.errorNot_UserExists();
      });
    this.props.history.push("/home");
  };

  clearForm = () => {
    this.setState({
      person: {
        username: "",
        password: "",
        gender: "",
        age: "",
        height: "",
        weight: "",
      },
    });
  };

  render() {
    return (
      <div className="Register">
        <Icon iconName="register" width="100px" height="100px" />

        <div className="description">
          <Title>Welcome to Nutrition App</Title>
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
          <div className="gender">
            <Label htmlFor="male">
              Male
              <Input
                type="radio"
                value="Male"
                id="gender"
                name="gender"
                onChange={this.handleInputChange}
                required
              />
            </Label>

            <Label htmlFor="female">
              Female
              <Input
                type="radio"
                value="Female"
                id="gender"
                name="gender"
                onChange={this.handleInputChange}
                required
              />
            </Label>
          </div>

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
            SIGN UP
          </Button>
        </form>

        <p className="Signup">
          <Link to="/login">SIGN IN</Link> FOR AN ACCOUNT
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorNot_UserExists: () => errorNot_UserExists(),
    successNot_UserCreated: () => successNot_UserCreated(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
