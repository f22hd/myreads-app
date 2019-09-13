import React from "react";
import "./App.css";
import BookList from "./components/BookList";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";

export default class App extends React.Component {
  state = {
    books: [],
    currentlyReadBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchResult: [],
    isShowingSearchResult: false,
    text: ""
  };

  setBooks = (objName, values) => {
    this.setState({
      [objName]: values // using brackets surround key of object in dynamic key case.
    });
  };

  filters = () => {
    const currentlyReadBooks = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = this.state.books.filter(
      book => book.shelf === "wantToRead"
    );
    const readBooks = this.state.books.filter(book => book.shelf === "read");

    this.setBooks("currentlyReadBooks", currentlyReadBooks);
    this.setBooks("wantToReadBooks", wantToReadBooks);
    this.setBooks("readBooks", readBooks);
  };
  onSearch = async text => {
    // do something
    if (text) {
      const result = await BooksAPI.search(text);
      if (result.length > 0) {
        this.updateSearchResult(result);
      } else {
        this.clearSearchResult();
      }
    } else {
      this.clearSearch();
    }
  };

  updateSearchResult = result => {
    this.setState({
      isShowingSearchResult: true,
      searchResult: result
    });
  };
  clearSearchResult = () => {
    this.setState({
      searchResult: []
    });
  };

  clearSearch = () => {
    this.setState({
      isShowingSearchResult: false,
      searchResult: []
    });
  };

  update = async (selectedShelf,book) => {
    // update the book object
    const response = await BooksAPI.update(book,selectedShelf);
    if(response && response.error){
      alert(response.error);
    }else{
      alert(`${book.title} has been updated`);
      this.clearSearch();
      this.loadData();
    }
  };

  loadData = async () => {
    const books = await BooksAPI.getAll();
    this.setBooks("books", books);
    this.filters();
  }

  // Life cycles component
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="container-fluid bg-secondary">
        <div className="row justify-content-center">
          <div className="col-8 pb-5 pt-5 bg-white ">
          
          <div className='col-12'>
            <h2 className='text-center'>MyReads App</h2>  
          </div>

            <div className="col-12 mt-5">
              <Search onSearch={this.onSearch} />
            </div>

            {this.state.isShowingSearchResult && (
              <div className="col-12 mt-5">
                <h4>Search Result:</h4>
                <BookList
                  books={this.state.searchResult}
                  onUpdate={this.update}
                />
              </div>
            )}

            <div className="col-12 mt-5">
              <h4>Currently Reading</h4>
              <BookList
                books={this.state.currentlyReadBooks}
                onUpdate={this.update}
              />
            </div>

            <div className="col-12 mt-5">
              <h4>Want to Read</h4>
              <BookList
                books={this.state.wantToReadBooks}
                onUpdate={this.update}
              />
            </div>

            <div className="col-12 mt-5">
              <h4>Read</h4>
              <BookList books={this.state.readBooks} onUpdate={this.update} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
