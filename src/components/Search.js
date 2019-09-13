import React from 'react';

export default class Search extends React.Component{

    state = {
        text:''
    }


    onTextChange = (event) => {
        this.setState({
            text: event.target.value
        });        
        this.props.onSearch(event.target.value);
    }

    clearInput = () => {
        this.setState({text:''});
        this.props.onSearch('');
    }

    render(){
        return(
            <div className='row justify-content-center'>
                <div className='col-12'>
                        <div className='form-group'>
                                <input
                                className='form-control form-control-lg' 
                                type='text' 
                                placeholder='Search by title or author'
                                value={this.state.text}
                                onChange={this.onTextChange} 
                                />
                        </div>
                </div>   

                <div className='col-12 mt-2 text-center'>
                                {this.state.text && (
                                        <button 
                                        className='btn btn-sm btn-secondary form-text text-center' 
                                        onClick={this.clearInput}> Clear Inputs </button>
                                )}
                </div>
            </div>
        );
    }

}