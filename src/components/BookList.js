import React from 'react';

export default class BookList extends React.Component{

    onShelfChange = (selectedShelf,book) => {
        console.log(selectedShelf,book)        
        this.props.onUpdate(selectedShelf,book);
    }

    render(){
        return(
            <div className='row justify-content-center'>
                {this.props.books.map((book,index) => (

                        <div className='col-sm-4 col-6 mt-4' key={index}>
                            <div className='card'>
                                <div 
                                 className="card-img-top"
                                 style = {{
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}
                                ></div>
                                
                                <div className='card-body'>
                                    <h5 className='card-title'>{book.title}</h5>   
                                    <p className='card-text text-muted'>
                                        <small>
                                            Publisher: {book.publisher} 
                                        </small>
                                        <br />
                                        <small>
                                            Language: {book.language.toUpperCase()}
                                        </small>
                                        <br />                                    
                                        <small>
                                            Authors: {book.authors.join(' , ')}
                                        </small>
                                    </p>   
                                </div>
                                <div className='card-footer'>
                                    <select className='form-control' onChange={event => this.onShelfChange(event.target.value,book)} value={book.shelf ? book.shelf : 'move'}>
                                        <option value="move" disabled>Move to...</option>
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