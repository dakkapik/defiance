import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router";
import "./navbar.styles.scss";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "100%",
    justifyContent: "center",
    backgroundColor: "#202225",
    color: "white",
  },
});
let directory = {
  "/missioncontrol": 0,
  "/": 1,
  "/signin": 2,
};
export const NavBar = ({ history }) => {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = React.useState(directory[`${location.pathname}`]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="navbar">
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          data-test="dateTabs"
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="icon label tabs example"
        >
          <Tab
            data-test="dateTab1"
            onClick={() => history.push("/missioncontrol")}
            label="MAP"
          />
          <Tab
            data-test="dateTab2"
            onClick={() => history.push("/")}
            label="HOME"
          />
          <Tab
            data-test="dateTab3"
            style={{ width: "20vh" }}
            onClick={() => history.push("/signin")}
            label="signin"
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default withRouter(NavBar);
