import React from "react";
import * as BooksAPI from "../BooksAPI";
export default class BookList extends React.Component {
  
  onShelfChange = (selectedShelf, book) => {
    this.update(selectedShelf, book);
  };

  update = async (selectedShelf, book) => {
    // update the book object
    const response = await BooksAPI.update(book, selectedShelf);
    if (response && response.error) {
      alert(response.error);
    } else {
      alert(`${book.title} has been updated`);
      this.props.onRefreshData();
    }
  };

  render() {
    return (
      <div className="row justify-content-center">
        {this.props.books.map((book, index) => (
          <div className="col-sm-4 col-6 mt-4" key={book.id}>
            <div className="card">
              {book.imageLinks && (
                    <div
                    className="card-img-top"
                    style={{
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}
                    ></div>
              )}

              {!book.imageLinks && (
                  <img alt={book.title} src={`https://via.placeholder.com/250/FFFFFF/000000/?text=${book.title}`} className='card-img-top' />     
              )}
             

              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted">
                  <small>Publisher: {book.publisher}</small>
                  <br />
                  <small>Language: {book.language.toUpperCase()}</small>
                  <br />
                  <small>
                    Authors:
                    {book.authors && book.authors.length > 0 && (
                      <span>{book.authors.join(" , ")}</span>
                    )}
                  </small>
                </p>
              </div>
              <div className="card-footer">
                <select
                  className="form-control"
                  onChange={event =>
                    this.onShelfChange(event.target.value, book)
                  }
                  value={book.shelf ? book.shelf : "none"}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
