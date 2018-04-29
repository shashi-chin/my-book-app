import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class SearchPage extends Component {

  state = {
    query : '',
    books_list: []
  }

  showSearch = () => {
    const {query , books_list} = this.state
    if (query === '') {
      console.log('query is empty')
      return (
        <div>
          <strong>
          Please enter a query to search.
          </strong>
        </div>
      )
    } 
    else if (!books_list.length) {
      return (
        <div>
          <strong>
            Please enter a valid search query.
          </strong>
        </div>
      )
    } 
    else  {
 
      return (
        books_list.map((book, i) => (
     
          <li key={i}>
            <Book
              book={book}
              moveBook={this.props.moveBook}
            />
          </li>
        ))
      )
    }
  }
  
  fetchbooks = (query) => {
    if(query) {
    BooksAPI.search(query,20).then(books => {
      if (!books || books.hasOwnProperty('error')) {
        this.setState({books_list: []})
      }
      else {
        let temp_books = books.map((book)=> {
        
          book.shelf = "none"
          for(let i =0 ; i < this.props.temp_list.length ; i++) {
            if(book.id === this.props.temp_list[i].id) {
              book.shelf = this.props.temp_list[i].shelf
              console.log(book.shelf)
              break;
            }
          }
          return book
        })
        console.log(temp_books)
        this.setState({books_list: temp_books})
      }
    }).catch(err => console.log(err,'error occured'))
  }}

  updateQuery = (query) => {
    this.setState({query: query})
    this.fetchbooks(query)
  }
  
  render () {
    console.log('render',this.state.query)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'>
            Close
          </Link>
          <div  className="search-books-input-wrapper">
             <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              id='input'
              onChange={(event => this.updateQuery(event.target.value))}
            />            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.showSearch()
            }  
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage