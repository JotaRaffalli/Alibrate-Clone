import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";
import Images from "../constants/Images";
import { Block, Button as GaButton, theme, Text } from "galio-framework";
import { argonTheme } from "../constants/";
import { Button, Input } from "../components/";
import LoginActions from "./../actions/Login";
import Loader from "./../components/Loader";

const { height, width } = Dimensions.get("screen");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      pass: null
    };
  }

  doLogin() {
    let { user, pass } = this.state;
    this.props.login(user, pass);
  }

  render() {
    let { hasError, isLogged, isLoading } = this.props;
    return (
      <ImageBackground
        source={Images.Onboarding}
        style={{ height, width, zIndex: 0 }}
      >
        <Block center flex style={styles.group}>
          <Block flex middle>
            <Image
              style={{ width: 300, height: 75, padding: 10 }}
              source={require("./../images/AlibrateLogoMedium.png")}
            ></Image>
            <Text bold size={18} style={styles.title}>
              Iniciar Sesión
            </Text>
            <Block width={width * 0.8}>
              <Input
                returnKeyType={"next"}
                autoCapitalize={"none"}
                style={styles.input}
                onChangeText={user => this.setState({ user })}
                placeholder={"Ingresa usuario o email"}
                right
                iconContent={<Block />}
              />
            </Block>
            <Block width={width * 0.8}>
              <Input
                placeholder={"Ingresa tu contraseña"}
                viewPass={false}
                password={true}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                style={styles.input}
                onChangeText={pass => this.setState({ pass })}
                right
                iconContent={<Block />}
              />
            </Block>
            <Block middle width={width * 0.8}>
              <Button
                color="primary"
                style={styles.button}
                onPress={() => {
                  this.doLogin();
                }}
              >
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  Iniciar sesión
                </Text>
              </Button>
            </Block>
          </Block>
          <Loader loading={isLoading} />
          <Text style={{ marginTop: 10 }}>{hasError ? hasError : ""}</Text>
          <Text style={{ marginTop: 10 }}>
            {isLogged ? "Debugger: Estas ONLINE" : "Debugger: Estas OFFLINE"}
          </Text>
        </Block>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.login.isLogged,
    hasError: state.login.hasError,
    isLoading: state.login.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) =>
      dispatch(LoginActions.login(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
    color: "#FFFFFF"
  },
  group: {
    paddingTop: 0,
    elevation: 1
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width * 0.8
  }
});
