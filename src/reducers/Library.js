import {
  FETCH_DATA_ERROR,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS
} from "../constants/ActionTypes";

const initialState = {
  books: [],
  isLoading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        books: action.payload.data
      };
    }
    case FETCH_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        books: []
      };
    }
    case FETCH_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};
