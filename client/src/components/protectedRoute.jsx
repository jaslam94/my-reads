import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Navigate
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
