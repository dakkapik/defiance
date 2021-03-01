import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { connect } from "react-redux";
import { managerNameSocketStart } from "../../redux/socket/socket.action";
import Button from "@material-ui/core/Button";

const Manager = ({ managerNameSocketStart }) => {
  const [Name, setCredentials] = useState({
    managerName: "",
  });
  const { managerName } = Name;
  const handleSubmit = async (event) => {
    event.preventDefault();

    managerNameSocketStart(managerName);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...Name, [name]: value });
  };

  return (
    <div
      style={{
        paddingTop: "30px",
        margin: "auto",
        width: "50%",
        textAlign: "center",
      }}
    >
      <h2>Hello, and welcome to Defiance. Please enter your name</h2>
      <span>Name</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="managerName"
          type="managerName"
          handleChange={handleChange}
          value={managerName}
          placeholder="missioncontrol"
          // label="managerName"
          required
        />
        <Button variant="outlined" color="inherit" type="submit">
          Enter
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  managerNameSocketStart: (managerName) =>
    dispatch(managerNameSocketStart(managerName)),
});

export default connect(null, mapDispatchToProps)(Manager);
