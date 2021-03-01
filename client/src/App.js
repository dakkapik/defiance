import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import MissionControl from "./pages/missioncontrol/mission-control.component";
import HomePage from "./pages/home/home.component";
import SignIn from "./pages/sign-in/sign-in.component";
import NavBar from "./components/navbar/navbar.component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import Header from "./components/header/header.component";
import "./App.styles.scss";

const App = ({ history, managername }) => {
  useEffect(() => {
    if (managername.length > 0) {
      history.push("/missioncontrol");
    }
  }, [managername, history]);
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/missioncontrol" component={MissionControl} />
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => ({
  managername: state.socket.managerName,
});
export default withRouter(connect(mapStateToProps, null)(App));
