export const INITIAL_FILTER_STATE = {
  "A-Z": false,
  "Z-A": false,
  "Last Inserted": false,
  "Last Updated": false,
  searchQuery: "",
  searchQueryBase: "",
};

export const filterReducer = (state, action) => {
  const { type, payload } = action;
  const initialBooleanState = {
    "A-Z": false,
    "Z-A": false,
    "Last Inserted": false,
    "Last Updated": false,
  };
  const booleanFields = ["A-Z", "Z-A", "Last Inserted", "Last Updated"];

  if (booleanFields.includes(type)) {
    return { ...state, ...initialBooleanState, [type]: true };
  }

  if (type === "SEARCH_QUERY") {
    return {
      ...state,
      searchQuery: payload.searchQuery,
    };
  }

  if (type === "SEARCH_QUERY_BASE") {
    return {
      ...state,
      searchQueryBase: payload.searchQueryBase,
    };
  }

  if (type === "CLEAR") {
    return {
      ...initialBooleanState,
      searchQuery: "",
      searchQueryBase: "",
    };
  }

  return state;
};
