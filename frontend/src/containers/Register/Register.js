import React, { Component } from "react";
// import "./Register.css";
import { motion } from "framer-motion";
import Icon from "../../components/Icon/Icon";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { showNotification } from "../../redux";
import { NOTIFICATION_TYPES } from "../../constants/constants";

class Register extends Component {
  state = {
    person: {
      username: "",
      name: "",
      password: "",
      gender: "male",
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
    const { person } = this.state;
    const { history } = this.props;

    console.log(`Sending to BACKEND the following person:
            username - ${person.username},
            password - ${person.password},
            gender - ${person.gender},
            age - ${person.age},
            height - ${person.height},
            weight - ${person.weight},
            name - ${person.name},
        `);

    axios
      .post("/api/register", person)
      .then((res) => {
        console.log(res.data);
        showNotification(
          NOTIFICATION_TYPES.SUCCESS,
          "Registration completed successfully"
        );
        this.clearForm();
      })
      .catch((err) => {
        console.log(err);
        showNotification(NOTIFICATION_TYPES.ERROR, "User is already exists");
      });

    history.push("/home");
  };

  clearForm = () => {
    this.setState({
      person: {
        username: "",
        name: "",
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
      <div className="d-flex min-vh-100 justify-content-center align-items-center">
        <div className="col-md-7 col-lg-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <div className="Register">
              <Icon iconName="register" width="100px" height="100px" />

              <div className="description">
                <h4 className="text-success mt-3">Welcome to Nutrition App</h4>
                <p>Sign up form</p>
              </div>

              <form onSubmit={this.onSubmitForm}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="float-input-box">
                      <input
                        type="text"
                        className={
                          this.state.person.username.length !== 0
                            ? "input-filled"
                            : ""
                        }
                        id="username"
                        value={this.state.person.username}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label htmlFor="username">Username</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="float-input-box">
                      <input
                        type="text"
                        id="name"
                        className={
                          this.state.person.name.length !== 0
                            ? "input-filled"
                            : ""
                        }
                        value={this.state.person.name}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label htmlFor="name">Full Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="float-input-box">
                      <input
                        type="password"
                        id="password"
                        value={this.state.person.password}
                        className={
                          this.state.person.password.length !== 0
                            ? "input-filled"
                            : ""
                        }
                        onChange={this.handleInputChange}
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex position-relative align-items-center justify-content-around p-2 bg-light-2 rounded w-100 h-100">
                      <div
                        className={
                          (this.state.person.gender === ""
                            ? "opacity-0"
                            : this.state.person.gender === "male"
                            ? ""
                            : "segment-second-active") +
                          " position-absolute transition-base top-0 left-0 fh-1 hw-2 bg-white y-center rounded"
                        }
                      />
                      <button
                        onClick={this.handleInputChange}
                        id="gender"
                        type="button"
                        value="male"
                        className="btn btn-focus-none col-6 px-0 z-1"
                      >
                        Male
                      </button>
                      <button
                        onClick={this.handleInputChange}
                        id="gender"
                        type="button"
                        value="female"
                        className="btn btn-focus-none col-6 px-0 z-1"
                      >
                        Female
                      </button>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="gender">
                      <Label htmlFor="male">
                        Male
                        <Input
                          type="radio"
                          value="Male"
                          id="male"
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
                          id="female"
                          name="gender"
                          onChange={this.handleInputChange}
                          required
                        />
                      </Label>
                    </div>
                  </div> */}
                  <div className="col-md-4">
                    <div className="float-input-box">
                      <input
                        type="number"
                        min="0"
                        className={
                          this.state.person.age.length !== 0
                            ? "input-filled"
                            : ""
                        }
                        max="99"
                        id="age"
                        value={this.state.person.age}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="age">Age</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="float-input-box">
                      <input
                        type="number"
                        min={1}
                        max={3}
                        className={
                          this.state.person.height.length !== 0
                            ? "input-filled"
                            : ""
                        }
                        step={0.01}
                        id="height"
                        value={this.state.person.height}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="height">Height</label>
                      <small>In Meters</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="float-input-box">
                      <input
                        type="number"
                        min={1}
                        max={999}
                        className={
                          this.state.person.weight.length !== 0
                            ? "input-filled"
                            : ""
                        }
                        step={0.1}
                        id="weight"
                        value={this.state.person.weight}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="weight">Weight</label>
                      <small>In Kilograms</small>
                    </div>
                  </div>
                  <div className="p-3 col-12">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-success text-left mb-3 mt-2"
                      type="submit"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                </div>
              </form>

              <p className="Signup">
                <Link to="/login">SIGN IN</Link> FOR AN ACCOUNT
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
