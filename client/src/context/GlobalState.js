import React, { createContext, useReducer } from "react";
import httpService from "../services/httpService";
import AppReducer from "./AppReducer";
import { apiUrl } from "../config.json";

const initialState = {
  books: [],
  error: "",
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getBooks(type) {
    try {
      const response = await httpService.get(`${apiUrl}/books/my/${type}`);

      const { data } = response.data;

      dispatch({
        type: "Get_Books",
        payload: data,
      });
    } catch (err) {
      const { error } = err.response.data;

      dispatch({
        type: "API_ERROR",
        payload: error,
      });
    }
  }

  async function addBook(book) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await httpService.post(`${apiUrl}/books`, book, config);

      const { data } = response.data;

      dispatch({
        type: "Add_Book",
        payload: data,
      });
    } catch (err) {
      const { error } = err.response.data;

      dispatch({
        type: "API_ERROR",
        payload: error,
      });
    }
  }

  async function deleteBook(id) {
    try {
      await httpService.delete(`${apiUrl}/books/${id}`);

      dispatch({
        type: "Del_Book",
        payload: id,
      });
    } catch (err) {
      const { error } = err.response.data;

      dispatch({
        type: "API_ERROR",
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        books: state.books,
        loading: state.loading,
        error: state.error,
        getBooks,
        addBook,
        deleteBook,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
