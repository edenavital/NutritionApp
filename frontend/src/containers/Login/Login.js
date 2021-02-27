import React, { Component } from "react";
import Icon from "../../components/Icon/Icon";
import { Link } from "react-router-dom";
import { Breakpoint } from "react-socks";
import { motion } from "framer-motion";
import axios from "axios";
import {
  resetStateApp,
  resetStateUser,
  showNotification,
  calculateBmr
} from "../../redux";
import { connect } from "react-redux";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_MESSAGES,
} from "../../constants/constants";

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
        const { data: { userData } } = res;
        //FETCH THE ARRAY OF OBJECT OF THE USER SO YOU WILL HAVE THE DATA OF HIM! FETCH IT INTO REDUX!
        showNotification(NOTIFICATION_TYPES.SUCCESS, "SUCCESS LOGIN");
        this.props.saveDataLogin(userData);
        this.props.calculateBmr(userData.credentials);
        localStorage.setItem("JWT", userData.token);
        this.props.history.push("/home");
      })
      .catch((res) => {
        console.log("Credentials not match ...");
        showNotification(
          NOTIFICATION_TYPES.ERROR,
          NOTIFICATION_MESSAGES.BAD_LOGIN
        );
      });
  };

  render() {
    return (
      <>
        <Breakpoint large down>
          <div className="d-flex min-vh-100 bg-white justify-content-center align-items-center">
            <div className="col-md-6 col-lg-7">
              <div className="card-body">
                <Icon iconName="diet" width="100px" height="100px" />
                <div className="description pt-4">
                  <h4 className="text-success">Welcome to Nutrition App</h4>
                  <p>Sign in to continue</p>
                </div>

                <form onSubmit={this.onSubmitForm}>
                  <div className="float-input-box pt-1">
                    <input
                      className={
                        this.state.person.username.length !== 0
                          ? "input-filled"
                          : ""
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
                        this.state.person.password.length !== 0
                          ? "input-filled"
                          : ""
                      }
                      type="password"
                      id="password"
                      value={this.state.person.password}
                      onChange={this.handleInputChange}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-success text-left mb-3 mt-2"
                    type="submit"
                  >
                    Sign in
                  </motion.button>
                </form>

                <p className="Signin">
                  <Link to="/register">Sign up</Link> For an account
                </p>
              </div>
            </div>
          </div>
        </Breakpoint>
        <Breakpoint xlarge up>
          <div className="container">
            <div className="d-flex min-vh-100 justify-content-center align-items-center">
              <div className="col-5">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0.9 },
                  }}
                  transition={{ type: "spring" }}
                >
                  <div className="p-4 bg-white shadow rounded-lg">
                    <Icon iconName="diet" width="100px" height="100px" />
                    <div className="description pt-4">
                      <h4 className="text-success">Welcome to Nutrition App</h4>
                      <p>Sign in to continue</p>
                    </div>

                    <form onSubmit={this.onSubmitForm}>
                      <div className="float-input-box">
                        <input
                          className={
                            this.state.person.username.length !== 0
                              ? "input-filled"
                              : ""
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
                            this.state.person.password.length !== 0
                              ? "input-filled"
                              : ""
                          }
                          type="password"
                          id="password"
                          value={this.state.person.password}
                          onChange={this.handleInputChange}
                          required
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-success text-left mb-3 mt-2"
                        type="submit"
                      >
                        Sign in
                      </motion.button>
                    </form>

                    <p className="Signin">
                      <Link to="/register">Sign up</Link> For an account
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Breakpoint>
      </>
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
    resetStateApp: () => dispatch(resetStateApp()),
    resetStateUser: () => dispatch(resetStateUser()),
    calculateBmr: (credentials) => dispatch(calculateBmr(credentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
