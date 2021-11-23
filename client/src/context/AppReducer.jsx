// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "Get_Books":
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case "Add_Book":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "Del_Book":
      return {
        ...state,
        books: state.books.filter((m) => m._id !== action.payload),
      };
    case "API_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
