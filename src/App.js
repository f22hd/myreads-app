import React from "react";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";

export default class App extends React.Component {
  state = {
    books: []
  };

  loadData = async () => {
    const books = await BooksAPI.getAll();
    this.setState({books});
  };

  // Life cycles component:Now your component has been mounted and ready
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="container-fluid bg-secondary">
        <div className="row justify-content-center">
          <div className="col-8 pb-5 pt-5 bg-white ">
            <div className="col-12">
              <h2 className="text-center">MyReads App</h2>
            </div>

            {/* {this.props.location.pathname} */}
            <Route 
              exact
              path="/search"
              component={() => 
                <Search 
                books={this.state.books}
                onLoadData={this.loadData}
                />
              }
              
              />

            <Route
              exact
              path="/"
              component={() => 
                <Home
                books={this.state.books}
                onLoadData={this.loadData}
                />
              }
            />


          </div>
        </div>
      </div>
    );
  }
}
