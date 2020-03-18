import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
// The react Phone
import Phone from "react-phone-number-input";
import "react-phone-number-input/style.css";

const formBg = {
  background: "white",
  borderRadius: "18px",
  boxShadow: "4px 5px 4px rgba(60,60,60,1)",
  paddingTop: "60px",
  paddingBottom: "60px"
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

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password2: this.state.password2
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container"
      style={{ height: "100vh", paddingTop: "12%" }}>
        <div className="row">
          <div
            className="col-10 col-md-8 col-lg-6 mr-auto ml-auto mt-4"
            style={formBg}
          >
            <div
              className="col-12 mr-auto ml-auto"
              style={{ textAlign: "center" }}
            >
              <h4>
                <b className="theTitle">Regístrate</b>
              </h4>
              <p className="grey-text text-darken-1">
              ¿Ya tienes cuenta? <Link to="/login" style={{ color: "rgb(116, 35, 153)" }}>Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="col-12 mr-auto ml-auto">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label style={labelSty} htmlFor="name">
                  Nombre
                </label>
                <span className={classnames('', {printError: errors.name})}>{errors.name}</span>
              </div>
              <div className="input-field col-12">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label style={labelSty} htmlFor="email">
                  Email
                </label>
                <span className={classnames('', {printError: errors.email})}>{errors.email}</span>
              </div>
              <div className="input-field col-12">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label style={labelSty} htmlFor="password">
                  Password
                </label>
                <span className={classnames('', {printError: errors.password})}>{errors.password}</span>
              </div>
              <div className="input-field col-12">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label style={labelSty} htmlFor="password2">
                  Confirma el password
                </label>
                <span className={classnames('', {printError: errors.password})}>{errors.password2}</span>
              </div>
              <div className="col-12" style={inputSty}>
                <Phone
                  countrySelectProps={{ unicodeFlags: true }}
                  defaultCountry={"PA"}
                  value={this.state.phone}
                  onChange={phone => this.setState({ phone: phone })}
                  // placeholder="Enter phone number"
                ></Phone>
              </div>
              <label style={labelSty} htmlFor="birthdate">
                Telefono
              </label>
              <span className={classnames('', {printError: errors.phone})}>{errors.phone}</span>
              <div className="col-12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large nextBtn col-10 mt-5"
                >
                  Enviar{" "}
                  <span role="img" aria-label="rocket">
                    {" "}
                    🚀
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
