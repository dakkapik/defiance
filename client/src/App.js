import React from "react";

import { withRouter } from "react-router-dom";

import { Switch, Route } from "react-router-dom";

import MissionControl from "./pages/MissionControl";
import HomePage from "./pages/home/home.component";

import NavBar from "./components/material-ui/nav-bar/nav-bar.component";

import "./App.styles.scss";
// const styles = () => ({
//   root: {
//     //centerizing the nav bar to the middle
//     "& div": {
//       justifyContent: "center",
//     },
//   },
// });

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route path="/MissionControl" component={MissionControl} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}
//Wrapping it to make props within component
export default withRouter(App);
