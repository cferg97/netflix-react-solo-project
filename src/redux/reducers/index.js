import {
  SET_QUERY,
  SET_IS_LOADING,
  SET_SEARCH_RESULTS,
  SET_REVIEWS,
  POST_MEDIA,
  SET_ID,
} from "../actions";

const initialState = {
  query: "",
  isLoading: false,
  searchResults: [],
  reviews: [],
  id: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.payload,
      };
    }
    case SET_REVIEWS: {
      return {
        ...state,
        reviews: action.payload,
      };
    }
    case SET_ID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
