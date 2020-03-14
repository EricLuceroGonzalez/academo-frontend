import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/Navbar";
import FooterComponent from "./components/layout/Footer";
import HomeComponent from "./components/layout/Home";
import Landing from "./components/layout/Landing";

function App() {
  return (
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
        <Route path="/landing" component={Landing} />
      </Router>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
