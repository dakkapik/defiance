import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, users, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            users !== true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

PrivateRoute.propTypes = {
    users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    users: state.users
});
//PrivateRoute
export default connect(mapStateToProps)(PrivateRoute);