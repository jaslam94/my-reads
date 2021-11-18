import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { httpService } from "../services/httpService";

const initialState = {
  wantToRead: [],
  read: [],
  error: "",
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getRead() {
    try {
      const response = await httpService.get("/api/v1/getRead");
      const { data } = response.data;
      dispatch({ type: "GET_Read", payload: data });
    } catch (err) {
      const { error } = err.response.data;
      dispatch({ type: "API_ERROR", payload: error });
    }
  }
  async function getWantToRead() {
    try {
      const response = await httpService.get("/api/v1/getWantToRead");
      const { data } = response.data;
      dispatch({ type: "GET_WantToRead", payload: data });
    } catch (err) {
      const { error } = err.response.data;
      dispatch({ type: "API_ERROR", payload: error });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        wantToRead: state.wantToRead,
        read: state.read,
        loading: state.loading,
        error: state.error,
        getWantToRead,
        getRead,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
