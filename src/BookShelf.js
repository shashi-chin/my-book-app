import React , { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
    
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.book_list.map((book,i) => (
                <li key={i}>
                  <Book
                    book={book}
                    moveBook={this.props.moveBook}
                  />
                </li>
              ))
            } 
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf