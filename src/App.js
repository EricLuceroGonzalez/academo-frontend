import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// The Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import NavBar from "./components/layout/Navbar";
import FooterComponent from "./components/layout/Footer";
import HomeComponent from "./components/layout/Home";
import Landing from "./components/layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";

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
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/landing" component={Landing} />
      </Router>
      <FooterComponent></FooterComponent>
    </div>
    </Provider>
  );
}

export default App;
