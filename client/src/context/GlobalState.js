import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { httpService } from "../services/httpService";

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
      const response = await httpService.get(`/api/v1/books?type=${type}`);

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

      const response = await httpService.post("/api/v1/books", book, config);

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
      await httpService.delete(`/api/v1/books/${id}`);

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
        wantToRead: state.wantToRead,
        read: state.read,
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
