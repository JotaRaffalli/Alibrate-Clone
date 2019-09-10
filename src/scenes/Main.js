import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, StyleSheet } from "react-native";
import LoginActions from "./../actions/Login";

import Profile from "./../components/Profile3/Profile";
import Home from "../components/Home";
import { Header } from "../components/";

import { Block, theme } from "galio-framework";
import tabs from "../constants/tabs";
class Main extends Component {
  componentDidMount() {
    console.log("[Main Component] User Data es: ", this.props.userData);
  }
  render() {
    const {
      displayName,
      picture,
      country,
      birthday
    } = this.props.userData.userInfo.profile;

    return (
      <View style={styles.container}>
        <Block style={{ marginBottom: theme.SIZES.BASE }}>
          <Header tabs={tabs.categories} search title="Mi Librería" />
        </Block>
        <Profile
          name={displayName}
          avatar={picture}
          country={country}
          birthday={birthday}
        ></Profile>
        <Home />
        <Button
          onPress={() => {
            this.props.logout();
          }}
          title={"Salir"}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(LoginActions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  input: {
    marginBottom: 10,
    borderBottomColor: "#36ada4",
    borderBottomWidth: 1
  },

  button: {
    padding: 10,
    backgroundColor: "#36ada4"
  }
});
