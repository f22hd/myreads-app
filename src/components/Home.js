import React from 'react';
import BookList from "./BookList";
import { Link } from "react-router-dom";

export default class Home extends React.Component{

    state = {
        currentlyReadBooks:[],
        wantToReadBooks:[],
        readBooks:[]
    }

    setBooks = (objName, values) => {
        this.setState({
        [objName]: values // using brackets surround key of object in dynamic key case.
        });
    };

    filters = (books) => {
        const currentlyReadBooks = books.filter(book => book.shelf === "currentlyReading");
        const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
        const readBooks = books.filter(book => book.shelf === "read");
    
        this.setBooks("currentlyReadBooks", currentlyReadBooks);
        this.setBooks("wantToReadBooks", wantToReadBooks);
        this.setBooks("readBooks", readBooks);
      };

    refreshData = () => {
        this.props.onLoadData();
    }  

    componentDidMount(){
       this.filters(this.props.books);
    }

    render(){
        return (
            <div>
            <Link to="/search" >
              <i className='fa fa-search mr-2'></i>
              Search
            </Link>

                  <div className="col-12 mt-5">
                    <h4>Currently Reading</h4>
                    <BookList
                      books={this.state.currentlyReadBooks}
                      onRefreshData={this.refreshData}
                    />
                  </div>
                    
                  <div className="col-12 mt-5">
                    <h4>Want to Read</h4>
                                          
                    <BookList
                      books={this.state.wantToReadBooks}
                      onRefreshData={this.refreshData}
                    />
                                    
                  </div>
                   
                  <div className="col-12 mt-5">
                    <h4>Read</h4>
                       
                    <BookList
                      books={this.state.readBooks}
                      onRefreshData={this.refreshData}
                    />
                                     
                  </div>
                </div>
        )
    }

}