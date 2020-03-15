import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// The Redux
import { Provider } from "react-redux";
import store from "./store";

// Auth
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Components
import NavBar from "./components/layout/Navbar";
import FooterComponent from "./components/layout/Footer";
import HomeComponent from "./components/layout/Home";
import Landing from "./components/layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
// Private Routes
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CoursesComponent from "./components/Courses/CoursesComponent";
import MathTwoComponent from "./components/Courses/MathB/MathTwoComponent";
import StatisticsComponent from "./components/Courses/Estadistica/EstadisticaComponent";
import Taller1 from "./components/Courses/Estadistica/EstadisticaTaller-1";
import Taller2 from "./components/Courses/Estadistica/EstadisticaTaller-2";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div
        className="App"
        style={{
          height: "150vh",
          backgroundColor: "rgba(200,10,10,0.1)",
          textAlign: "center"
        }}
      >
        <Router>
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/resources" component={CoursesComponent} />
            <Route exact path="/resources/a" component={Login} />
            <Route path="/landing" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/courses" component={CoursesComponent} />
            <PrivateRoute
              exact
              path="/courses/mat2"
              component={MathTwoComponent}
            />
            <PrivateRoute
              exact
              path="/courses/estadistica"
              component={StatisticsComponent}
            />
            <PrivateRoute
              exact
              path="/courses/estadistica/taller1"
              component={Taller1}
            />
            <PrivateRoute
            exact
            path="/courses/estadistica/taller2"
            component={Taller2}
          />
          </Switch>
        </Router>
        <FooterComponent></FooterComponent>
      </div>
    </Provider>
  );
}

export default App;
