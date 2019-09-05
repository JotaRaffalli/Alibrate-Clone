import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import jwt from 'jwt-decode'

const isLogged = (bool, user) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool,
        userData: user
    }
};

const loginHasError = (bool) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: bool
    }
};

const loginIsLoading = (bool) => {
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};

const removeToken = () => {
    return {
        type: ActionTypes.LOGOUT
    }
}

const login = (username, password) => {
     console.log('user', username);
     console.log('pass', password);
    return (dispatch) => {

        dispatch(loginIsLoading(true));

        if(!username || !password){

            dispatch(loginHasError("Error. Verifica el formulario"));
            dispatch(loginIsLoading(false));

            return;
        }

        fetch('https://api.alibrate.com/v1/auth/local', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then((res) => res.json())
            .then(res => {
                dispatch(loginIsLoading(false));

                console.log("Esta es la Data ", res.access_token);
                if(res.access_token){
                    dispatch(loginHasError(false));
                    let user = jwt(res.access_token)
                    dispatch(isLogged(true, user));
                    AsyncStorage.setItem('token', res.access_token);

                    Actions.Main();
                }
                if(res.message)
                dispatch(loginHasError(`Error ${res.message}`));
            })
            .catch((e) => {
                console.warn(e);
                dispatch(loginHasError(`Error ${res.code}`));
            });
    }
};

const logout = () => dispatch => {
    AsyncStorage.removeItem('token')
    .then( () => {
        //dispatch(loading(false));
        dispatch(removeToken());
        Actions.Login();
    })
    .catch((err) => {
        //dispatch(loading(false));
        //dispatch(error(err.message || 'ERROR'));
        console.log("Hubo un error ", err)
    })
};

export default {
    removeToken,
    isLogged,
    loginHasError,
    loginIsLoading,
    login,
    logout
}
