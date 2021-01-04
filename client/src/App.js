import React from "react";
import { Switch, Route } from "react-router-dom";
import MissionControl from "./pages/missioncontrol/mission-control.component";
import HomePage from "./pages/home/home.component";

import NavBar from "./components-materialui/navbar/navbar.component";
import Header from "./components-materialui/header/header.component";
import "./App.styles.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route path="/MissionControl" component={MissionControl} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};
export default App;
