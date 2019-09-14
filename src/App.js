import React from "react";
import "./App.css";
import BookList from "./components/BookList";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";

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

  update = async (selectedShelf, book) => {
    // update the book object
    const response = await BooksAPI.update(book, selectedShelf);
    if (response && response.error) {
      alert(response.error);
    } else {
      alert(`${book.title} has been updated`);
      this.clearSearch();
      this.loadData();
    }
  };

  loadData = async () => {
    const books = await BooksAPI.getAll();
    this.setBooks("books", books);
    this.filters();
  };

  // Life cycles component:Now your component has been mounted and ready
  componentDidMount() {
    this.loadData();
  }
  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <div className="container-fluid bg-secondary">
        <div className="row justify-content-center">
          <div className="col-8 pb-5 pt-5 bg-white ">
            <div className="col-12">
              <h2 className="text-center">MyReads App</h2>
            </div>

            <Link to="/search" >Search</Link>

            <Route 
              path="/search"
              component={() => 
                <Search books={this.state.books} />
              }
              
              />

            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <div className="col-12 mt-5">
                    <h4>Currently Reading</h4>
                    <BookList
                      books={this.state.currentlyReadBooks}
                      onUpdate={this.update}
                    />
                  </div>
                    
                  <div className="col-12 mt-5">
                                          <h4>Want to Read</h4>
                                          
                    <BookList
                      books={this.state.wantToReadBooks}
                      onUpdate={this.update}
                    />
                                    
                  </div>
                   
                  <div className="col-12 mt-5">
                                       <h4>Read</h4>
                                       
                    <BookList
                      books={this.state.readBooks}
                      onUpdate={this.update}
                    />
                                     
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
