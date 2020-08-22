import React, { Suspense, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "katex/dist/katex.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
// Components
import NavBar from "./shared/components/layout/Navbar";
import FooterComponent from "./shared/components/layout/Footer";
// import HomeComponent from "./shared/components/layout/Home";
import About from "./shared/components/layout/About";
import NotFound from "./shared/components/layout/NotFount";
import "./App.css";
// import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import Auth from "./auth/Auth";

const Survey = React.lazy(() => import("./shared/components/dashboard/Survey"));
const TallerComponent = React.lazy(() =>
  import("./shared/components/Courses/TallerComponent")
);
const Dashboard = React.lazy(() =>
  import("./shared/components/dashboard/Dashboard")
);

const CheckOut = React.lazy(() =>
  import("./shared/components/dashboard/CheckOut")
);
const CheckError = React.lazy(() =>
  import("./shared/components/dashboard/CheckError")
);
const TableOfGrades = React.lazy(() =>
  import("./shared/components/dashboard/Table")
);

const SurveyResults = React.lazy(() =>
  import("./shared/components/dashboard/SurveyResults")
);

const NewTest = React.lazy(() =>
  import("./shared/components/dashboard/NewTest")
);

// const AllGrades = React.lazy(() =>
//   import("./shared/components/dashboard/AllGrades")
// );

function App() {
  const { userName, userId, token, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        {userId === process.env.REACT_APP_DB_id ? (
            <Route exact path="/survey">
              <SurveyResults />
            </Route>
        ) : (
          ""
        )}

        {userId === process.env.REACT_APP_DB_id ? (
          <Route exact path="/newTest">
          <NewTest />
        </Route>) : ('')
      }

        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/encuesta" component={Survey} />
        <Route exact path="/taller/:Taller/:id" component={TallerComponent} />
        <Route exact path="/checkOut" component={CheckOut}></Route>
        <Route exact path="/checkError" component={CheckError}></Route>
        <Route exact path="/notas" component={TableOfGrades}></Route>
        <Route path="/about" component={About} />
        <Route path="/login" component={Auth} />
        <Route exact path="/" component={About} />

        <Route component={NotFound}></Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/login" component={Auth} />
        <Route path="/about" component={About} />
        <Route component={NotFound}></Route>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userName: userName,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="App-div">
          <NavBar></NavBar>
          <main className="main">
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
          <footer>
            <FooterComponent />
          </footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
