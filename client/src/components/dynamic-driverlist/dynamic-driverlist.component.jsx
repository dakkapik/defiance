import React from "react";
import "./dynamic-driverlist.styles.scss";
import DynamicDriver from "../dynamic-driver/dynamic-driver.componet";
import { connect } from "react-redux";

/*

 {
      firstName: "Felipe",
      lastName: "Rodas",
      employeeId: 3533,
      position: {
        coords: {
          accuracy: 5,
          altitude: 0,
          latitude: 26.259,
          longitude: -80.27,
        },
        mocked: false,
        timestamp: 5325324523,
      },
    },
    {
      firstName: "George",
      lastName: "Marrone",
      employeeId: 4545,

      position: {
        coords: {
          accuracy: 5,
          altitude: 0,
          latitude: 26.3,
          longitude: -80.27,
        },
        mocked: false,
        timestamp: 5325324523,
      },
    },
*/
/*
 <DynamicDriver
          key={driver.employeeId}
          firstName={driver.firstName}
          employeeId={driver.employeeId}
          position={driver.position}
        />
*/
/*
/*

const getUser = (driverId) => {
  return axios.get(`/api/users/${driverId}`).then((res) => res.data);
};

 let GetUserPromises = [];

        Active_driver.forEach((id) => {
          GetUserPromises.push(getUser(id));
        });

        Promise.all(GetUserPromises).then((users) => {
          emit(AddActiveDriver(users));
        });
*/

const DynamicDriverList = ({ Activedriver }) => {
  return <div className="side-bar">sss</div>;
};

const mapStateToProps = (state) => ({
  Activedriver: state.drivers.currentDrivers,
});

export default connect(mapStateToProps, null)(DynamicDriverList);
