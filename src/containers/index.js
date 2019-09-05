import React, { Component } from 'react';
import { Router, Scene } from "react-native-router-flux";
import { connect } from "react-redux";
import { AsyncStorage, Text } from "react-native";
import Loader from './../components/Loader';
import LoginActions from "./../actions/Login";
import jwt from 'jwt-decode'

import Login from './../scenes/Login';
import Main from '../scenes/Main';

const RouterWithRedux = connect()(Router);

class Root extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: null,
            isStorageLoaded: false,
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
                token: token !== null,
                isStorageLoaded: true
            })
            if(token !== null)
            {
                
                const user = jwt(token)
                this.props.isLogged(true, user )
            }

        });


    }

    render(){
        let { isLogged, userData } = this.props.login;
        let { token, isStorageLoaded } = this.state;
        if(!isStorageLoaded){
            return (
                <Loader loading={true} />
            )
        }else{
            return(
                <RouterWithRedux>
                    <Scene key='root'>
                        <Scene
                            component={Login}
                            initial={!token && Object.getOwnPropertyNames(userData).length === 0}
                            hideNavBar={true}
                            key='Login'
                            title='Login'
                        />
                        <Scene
                            component={Main}
                            initial={token && Object.getOwnPropertyNames(userData).length !== 0}
                            hideNavBar={true}
                            key='Main'
                            title='Main'
                        />
                    </Scene>
                </RouterWithRedux>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};
const mapDispatchToProps = dispatch => {
    return {
      isLogged: (bool, userData) => dispatch(LoginActions.isLogged(bool, userData))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Root)
