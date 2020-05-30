import React, { Component, useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Input, Spinner } from "reactstrap";
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

const Register = (props) => {
  // constructor() {
  //   super();
  //   this.state = {
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     phone: "",
  //     password: "",
  //     password2: "",
  //     identification: "",
  //     subject: "",
  //     courses: [],
  //     errors: {},
  //     isLoading: false,
  //   };
  // }
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState();

  const [lastname, setLastname] = useState();
  const [firstname, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [identification, setIdentification] = useState();
  const [subject, setSubject] = useState();

  const history = useHistory();

  useEffect(() => {
    setErrors(props.errors);
    const checkLogget = async () => {
      (await props.auth.isAuthenticated)
        ? setIsLogged(true)
        : setIsLogged(false);
    };

    const loadData = async () => {
      try {
        const courseData = await theApi.getCourses();
        setCourses(courseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    loadData();
    checkLogget();
    if (isLogged) {
      history.push("/dashboard");
    }

    // isLogged ? history.push('/dashboard') : history.push('/login')
  }, [props, isLogged, history]);

  // componentDidMount() {
  //   console.log("here Register 68");

  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  //   theApi
  //     .getCourses()
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log(`len: ${res.data.length}`);
  //       this.setState({ courses: res.data });
  //     })
  //     .catch((err) => console.log(`GET - ERROR: ${err}`));
  // }

  // concomponentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }
  const onChange = (e) => {
    switch (e.target.id) {
      case "lastname":
        setLastname(e.target.value);
        break;
      case "firstname":
        setFirstName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      case "identification":
        setIdentification(e.target.value);
        break;
      case "subject":
        setSubject(e.target.value);
        break;
      default:
        break;
    }
    // this.setState({ [e.target.id]: e.target.value });
    // console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newUser = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        password2: password2,
        identification: identification,
        subject: subject,
      };
      await props.registerUser(newUser, props.history);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const renderSubjects = () => {
    if (courses) {
      // console.log(courses);
      let option = courses.map((item, k) => {
        // console.log(item.courseName);
        return <option key={k}>{item.courseName}</option>;
      });
      return option;
    }
  };

  const inputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    courses.map((item) => {
      if (item.courseName === value) {
        setSubject(item._id);
      }
      return null;
    });
  };

  // const { errors } = this.state;
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
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
        {isLoading && <LoadingSpinner asOverlay />}
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
            <form noValidate onSubmit={onSubmit}>
              <div className="col-12 mr-auto ml-auto">
                <input
                  style={inputSty}
                  onChange={onChange}
                  //value={lastname}
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
                  onChange={onChange}
                  //value={firstname}
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
                  onChange={onChange}
                  //value={email}
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
                  onChange={onChange}
                  //value={password}
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
                  onChange={onChange}
                  //value={password2}
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
                  onChange={onChange}
                  //value={identification}
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
                  onChange={(event) => inputChange(event)}
                  type="select"
                  style={inputSty}
                  name="subject"
                  id="subject"
                >
                  <option defaultValue="selected">
                    {"Elija su asignatura"}
                  </option>
                  {renderSubjects()}
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
                  </span>{" "}
                  {!isLoading ? "" : <Spinner type="grow" color="warning" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

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
