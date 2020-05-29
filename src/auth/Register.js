import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from "reactstrap";
// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
// The react Phone
import "react-phone-number-input/style.css";
import theApi from "../api";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const formBg = {
  fontSize: "0.75em",
  background: "white",
  borderRadius: "18px",
  boxShadow: "4px 5px 4px rgba(60,60,60,1)",
  paddingTop: "60px",
  paddingBottom: "60px",
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
  fontFamily: "Montserrat-Bold",
  fontSize: "inherit",
  fontWeight: "500",
  lineHeight: "inherit",
  transition: "0.3s ease",
};

const labelSty = {
  display: "block",
  margin: "0 0 10px",
  color: "gray",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "1",
  textTransform: "uppercase",
  letterSpacing: ".2em",
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
      identification: "",
      subject: "",
      courses: [],
      errors: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    console.log("here Register 68");

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    theApi
      .getCourses()
      .then((res) => {
        console.log(res.data);
        console.log(`len: ${res.data.length}`);
        this.setState({ courses: res.data });
        // let course = [];
        // let courseID = [];
        // res.data.map((item) => {
        //   course.push(item.courseName);
        //   courseID.push(item._id);
        // });
        // this.setState({ courses: course });
        // this.setState({ coursesID: courseID });
      })
      .catch((err) => console.log(`GET - ERROR: ${err}`));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      const newUser = {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        identification: this.state.identification,
        subject: this.state.subject,
      };
      await this.props.registerUser(newUser, this.props.history);
    } catch (err) {
      this.setState({ isLoading: false }); 
    }
    this.setState({ isLoading: false });
  };

  renderSubjects = () => {
    console.log(this.state.courses);
    let option = this.state.courses.map((item, k) => {
      console.log(item.courseName);
      return <option key={k}>{item.courseName}</option>;
    });

    return option;
  };
  inputChange = (e) => {
    e.preventDefault();

    const value = e.target.value;
    console.log(`value: ${value}`);

    this.state.courses.map((item) => {
      if (item.courseName === value) {
        this.setState({ subject: item._id });
      }
      return null;
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div
        className="container"
        style={{
          height: "100%",
          paddingTop: "12%",
          paddingBottom: "130px",
          marginBottom: "30px",
          fontSize: "0.75em",
        }}
      >
        {this.state.isLoading && <LoadingSpinner asOverlay />}
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
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" style={{ color: "rgb(116, 35, 153)" }}>
                  Log in
                </Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="col-12 mr-auto ml-auto">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastName}
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastName,
                  })}
                />
                <label style={labelSty} htmlFor="lastname">
                  Apellido
                </label>
                <span
                  className={classnames("", { printError: errors.lastName })}
                >
                  {errors.lastName}
                </span>
              </div>
              <div className="col-12 mr-auto ml-auto">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstName}
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstName,
                  })}
                />
                <label style={labelSty} htmlFor="firstname">
                  Nombre
                </label>
                <span
                  className={classnames("", { printError: errors.firstName })}
                >
                  {errors.firstName}
                </span>
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
                    invalid: errors.email,
                  })}
                />
                <label style={labelSty} htmlFor="email">
                  Email
                </label>
                <span className={classnames("", { printError: errors.email })}>
                  {errors.email}
                </span>
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
                    invalid: errors.password,
                  })}
                />
                <label style={labelSty} htmlFor="password">
                  Password
                </label>
                <span
                  className={classnames("", { printError: errors.password })}
                >
                  {errors.password}
                </span>
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
                    invalid: errors.password2,
                  })}
                />
                <label style={labelSty} htmlFor="password2">
                  Confirma el password
                </label>
                <span
                  className={classnames("", { printError: errors.password2 })}
                >
                  {errors.password2}
                </span>
              </div>
              <div className="input-field col-12">
                <input
                  style={inputSty}
                  onChange={this.onChange}
                  value={this.state.identification}
                  id="identification"
                  error={errors.identification}
                  // type="text"
                  className={classnames("", {
                    invalid: errors.identification,
                  })}
                />
                <span
                  className={classnames("", {
                    printError: errors.identification,
                  })}
                >
                  {errors.identification}
                </span>
                <label style={labelSty}>Cedula</label>
              </div>
              <div className="col-12">
                <Input
                  onChange={(event) => this.inputChange(event)}
                  type="select"
                  style={inputSty}
                  name="subject"
                  id="subject"
                >
                  <option defaultValue="selected">
                    {"Elija su asignatura"}
                  </option>
                  {this.renderSubjects()}
                </Input>
              </div>
              <label style={labelSty} htmlFor="subject">
                Asignatura
              </label>
              <div className="col-12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
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
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
