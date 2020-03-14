import React, { Component } from "react";
import { Link } from "react-router-dom";

const formBg = {
  background: "white",
  borderRadius: "18px",
  boxShadow: "4px 5px 4px gray"
};

const inputSty = {
  outline: "none",
  display: "block",
  background: "rgba(220,220,220, 0.75)",
  margin: "7px auto",
  width: "100%",
  border: "0",
  borderRadius: "8px",
  padding: "5px 7px",
  color: "gray",
  fontFamily: "Montserrat-BlackItalic",
  fontSize: "inherit",
  fontWeight: "500",
  lineHeight: "inherit",
  transition: "0.3s ease"
};

const labelSty = {
  display: "block",
  margin: "0 0 10px",
  color: "gray",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "1",
  textTransform: "uppercase",
  letterSpacing: ".2em"
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div
          className="col-10 col-md-8 col-lg-6 mr-auto ml-auto mt-4"
          style={formBg}
        >
          <div className="col-12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col-12">
              <input
                style={inputSty}
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
              />
              <label style={labelSty} htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-field col-12">
              <input
                style={inputSty}
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
              />
              <label style={labelSty} htmlFor="password">
                Password
              </label>
            </div>
            <div className="col-12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
