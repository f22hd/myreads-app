import React from "react";
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import BookList from './BookList';
import SearchForm from "./SearchForm";

export default class Search extends React.Component {
  state = {
    searchResult: [],
    isShowingSearchResult: false,
    searchResultText:'',
    text: ""
  };
  onSearch = async text => {
    // do something
    if (text) {
      const result = await BooksAPI.search(text);
      this.clearSearch();
      
      if(result.error){
        this.setState({searchResultText:result.error});
      }else{
        this.mappingShelf(result);
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

  mappingShelf = (result) => {
      const mapped = result.map(book => {
      const sameBook = this.props.books.find(b => b.id === book.id);
      if(sameBook){
        book.shelf = sameBook.shelf;
      }
        return book;
      });

      // update
      this.updateSearchResult(mapped);
  }
  clearSearchResult = () => {
    this.setState({
      searchResult: [],
      searchResultText:''
    });
  };

  clearSearch = () => {
    this.setState({
      isShowingSearchResult: false,
      searchResult: [],
      searchResultText:''
    });
  };

  componentDidMount(){
    console.log('search componentDidMount',this.props.books);
  }

  componentWillUnmount(){
    console.log('search componentWillUnmount',this.props);
    
  }

  render() {
    return ( 
        <div className='row'>
                <div className='col-12 mt-3'>
                        <Link to='/' className='btn btn-link'>
                          <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                          Back
                        </Link>
                </div>
               
                <div className='col-12 mt-5'>

                        <SearchForm onSearch={this.onSearch} />

                        {this.state.searchResultText && (
                          <h4 className='text-center text-danger p-3'>{this.state.searchResultText}</h4>
                        )}

                        {this.state.isShowingSearchResult && (
                            <div className="col-12 mt-5">
                                <h4>Search Result ({this.state.searchResult.length})</h4>
                                <BookList
                                    books={this.state.searchResult}
                                    onRefreshData={this.props.onLoadData}
                                />
                            </div>
                        )}

                </div>
                
        </div>
    );
  }
}
