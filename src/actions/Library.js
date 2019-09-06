import * as ActionTypes from "../constants/ActionTypes";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import jwt from "jwt-decode";
import * as config from "../constants/config";

const fetchDataSuccess = data => ({
  type: ActionTypes.FETCH_DATA_SUCCESS,
  payload: { data }
});

const fetchDataRequest = () => ({
  type: ActionTypes.FETCH_DATA_REQUEST,
  payload: { isLoading: true }
});

const fetchDataError = () => ({
  type: ActionTypes.FETCH_DATA_ERROR,
  payload: { error: true }
});

const fetchLiraryToRead = async params => {
  const token = await AsyncStorage.getItem("token");
  const { user } = await jwt(token);
  if (token && params.pageNumber <= 2)
    return fetch(
      `${config.API_URL}/library/user/${user}?page=${params.pageNumber}&limit=10`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(data => data.docs)
      .catch(err => err);
};

const fetchData = (type, params) => dispatch => {
  dispatch(fetchDataRequest());
  switch (type) {
    case "libraryToRead": {
      return fetchLiraryToRead(params)
        .then(booksToRead => {
          dispatch(fetchDataSuccess(booksToRead));
        })
        .catch(err => {
          dispatch(fetchDataError());
          console.log("Hubo un error en el fetch", err);
        });
    }
  }
};
export default {
  fetchData,
  fetchDataError,
  fetchDataRequest,
  fetchDataSuccess
};
