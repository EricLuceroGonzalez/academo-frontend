import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const formBg = {
  background: "white",
  borderRadius: "18px",
  boxShadow: "4px 5px 4px rgba(60,60,60,1)",
  paddingTop: "60px",
  paddingBottom: "60px",
  // marginTop: '2150px'
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

const Login = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  // constructor() {
  //   super();
  //   state = {
  //     email: "",
  //     password: "",
  //     errors: {},
  //     isLoading: false,
  //   };
  // }

  useEffect(() => {
    setErrors(props.errors);
    // If logged in and user navigates to Login page, should redirect them to dashboard
    const checkLogget = async () => {
      (await props.auth.isAuthenticated)
        ? setIsLogged(true)
        : setIsLogged(false);
    };
    if (isLogged) {
      history.push("/dashboard");
    }
    checkLogget();
    // isLogged ? history.push('/dashboard') : history.push('/login')
  }, [props, isLogged, history]);

  // componentDidMount() {
  //   // If logged in and user navigates to Login page, should redirect them to dashboard
  //   if (props.auth.isAuthenticated) {
  //     props.history.push("/dashboard");
  //   }
  //   console.log(props);

  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     props.history.push("/dashboard");
  // push user to dashboard when they login
  //   }
  //   if (nextProps.errors) {
  //     setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }

  const onChange = (e) => {
    console.log(`id: ${e.target.id}`);
    setErrors(props.errors);
    // console.log(`pass: ${password}`);
    // console.log(`email: ${email}`);

    e.target.id === "password"
      ? setPassword(e.target.value)
      : setEmail(e.target.value);
    // setState({ [e.target.id]: e.target.value });
    // console.log(props);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = {
        email: email,
        password: password,
      };
      props.loginUser(userData);
      // since we handle the redirect within our component, we don't need to pass in props.history as a parameter
      setIsLoading(false);
      setIsLogged(true);
    } catch (err) {
      setIsLoading(false);
    }
    history.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          height: "100vh",
          paddingTop: "66px",
          paddingBottom: "150px",
          fontSize: "0.8em",
        }}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <div
          className="col-10 col-md-8 col-lg-6 mr-auto ml-auto mt-4"
          style={formBg}
        >
          <div className="col-12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b className="theTitle">Login</b>
            </h4>
            <p className="grey-text text-darken-1">
              ¿No tienes cuenta?{" "}
              <Link to="/register" style={{ color: "rgb(116, 35, 153)" }}>
                Regístrate
              </Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col-12">
              <input
                style={inputSty}
                onChange={onChange}
                // value={email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <label style={labelSty} htmlFor="email">
                Email
              </label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col-12">
              <input
                style={inputSty}
                onChange={onChange}
                // value={password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <label style={labelSty} htmlFor="password">
                Password
              </label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
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
                Login{" "}
                <span role="img" aria-label="star-dust">
                  {" "}
                  🚀
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
