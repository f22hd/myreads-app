import React from "react";
import SearchForm from "./SearchForm";
import BookList from './BookList';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';

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
        // have results
        // this.updateSearchResult(result);
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
        const sameBookIndex = this.props.books.findIndex(b => b.id === book.id);
        if(sameBookIndex > -1 && this.props.books[sameBookIndex].shelf){
          book.shelf = this.props.books[sameBookIndex].shelf;
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
    console.log(this.props.books);
  }

  render() {
    return ( 
        <div className='row'>
                <div className='col-12 mt-3'>
                        <Link 
                        to='/'
                        className='btn btn-primary back-link'
                        >Back</Link>
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
                                    onUpdate={this.update}
                                />
                            </div>
                        )}

                </div>
                
        </div>
    );
  }
}
