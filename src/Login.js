import React, { Component } from "react";
import "./css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "email") this.setState({ email: value, errorMessage: "" });
    else if (name === "password")
      this.setState({ password: value, errorMessage: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      localStorage.setItem("email", this.state.email);
      this.props.history.push({ pathname: "/Home" });
    } else {
      this.setState({ errorMessage: "Please fill all the details to login." });
    }
  }

  render() {
    if (localStorage.getItem("email"))
      this.props.history.push({ pathname: "/Home" });
    return (
      <div id="login">
        <div className="login-container">
          <h1>Login</h1>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          {this.state.errorMessage !== "" ? (
            <span className="error-message">{this.state.errorMessage}</span>
          ) : null}
          <button onClick={this.handleSubmit}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
