import React from "react";

import { withRouter } from "react-router-dom";

import { Switch, Route } from "react-router-dom";

import MissionControl from "./pages/MissionControl";
import Home from "./pages/Home";

//Material Ui for the Top Tabs

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MapIcon from "@material-ui/icons/Map";
import HomeIcon from "@material-ui/icons/Home";
class App extends React.Component {
  state = {
    value: 0,
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    return (
      <div>
        <div className="body">
          <div className="Tabs-container">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                onClick={() => this.props.history.push("/missionControl")}
                label="MAP"
                icon={<MapIcon />}
              />
              <Tab
                onClick={() => this.props.history.push("/")}
                label="HOME"
                icon={<HomeIcon />}
              />
            </Tabs>
          </div>

          <Switch>
            <Route path="/MissionControl" component={MissionControl} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
