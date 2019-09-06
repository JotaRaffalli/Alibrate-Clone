import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme } from "galio-framework";
import { connect } from "react-redux";
import LoginActions from "./../actions/Login";
import LibraryActions from "./../actions/Library";
import { Card } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  state = {
    pageNumber: 1
  };
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  };
  getListMore = async () => {
    await this.setState({ pageNumber: this.state.pageNumber + 1 });
    let pageNumber = await this.state.pageNumber;
    await this.props.fetchData("libraryToRead", { pageNumber });
  };
  renderList = books => {};

  render() {
    let books = this.props.books || [];
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.getListMore();
            }
          }}
        >
          <Block flex>
            {books.map(item => (
              <Card full key={item.book_id} item={item.book} horizontal />
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  }
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (type, params) =>
      dispatch(LibraryActions.fetchData(type, params))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
