import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <div>
      <IconButton aria-label="delete">
        <CloseRoundedIcon />
      </IconButton>
    </div>
  );
};
export default HomePage;
