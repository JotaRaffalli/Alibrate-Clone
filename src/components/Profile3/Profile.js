import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Avatar } from "react-native-elements";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white"
  },
  userRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6
  },
  userImage: {
    marginRight: 12
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#ECECEC"
  }
});

class SettingsScreen extends Component {
  render() {
    const { avatar, name, country, birthdate } = this.props;
    console.log("Esta es la edad ", birthdate);
    const age = birthdate
      ? Math.floor(
          (new Date() - new Date(birthdate.toString()).getTime()) / 3.15576e10
        )
      : 24;
    return (
      <View style={styles.userRow}>
        <View style={styles.userImage}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: avatar
            }}
          />
          <Image
            style={{ height: 15, width: 20, marginLeft: 28, marginTop: 5 }}
            source={{ uri: country.img.toString() }}
          ></Image>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{name}</Text>
          <Text
            style={{
              color: "gray",
              fontSize: 16
            }}
          >
            {age} años
          </Text>
        </View>
      </View>
    );
  }
}

export default SettingsScreen;
