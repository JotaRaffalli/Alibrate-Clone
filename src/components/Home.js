import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Block, theme } from "galio-framework";
import { connect } from "react-redux";
import LibraryActions from "./../actions/Library";
import { Card } from "../components";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { booksToRead: [], page: 1, hasMore: true };
  }

  componentWillMount() {
    this.fecthBooksToRead();
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  };
  getListMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1
      }),
      () => {
        this.fecthBooksToRead();
      }
    );
  };

  fecthBooksToRead = async () => {
    const pageNumber = await this.state.page;
    await this.props.fetchData("libraryToRead", { pageNumber });
    this.setState({
      hasMore: this.props.books.page <= this.props.books.pages,
      booksToRead: [...this.state.booksToRead, ...this.props.books.docs]
    });
    console.log(
      "[Home Component] Estos son los libros a leer ",
      this.state.booksToRead
    );
  };

  render() {
    let { booksToRead } = this.state;
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
              this.getListMore();
            }
          }}
        >
          <Block flex>
            {this.props.isLoading && (
              <ActivityIndicator animating={true} size="large" />
            )}
            {booksToRead.map(item => (
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

const mapStateToProps = state => {
  return {
    books: state.library.books,
    isLoading: state.library.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (type, params) =>
      dispatch(LibraryActions.fetchData(type, params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
