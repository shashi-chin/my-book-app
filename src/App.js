import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './BookSearchPage'
import * as BooksAPI from './BooksAPI'
import Shelf from './BookShelf'

class BooksApp extends React.Component {

  state = {
      books_list : []
  }  

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({books_list: books})
      
    })  
  }

  moveBook = (newBook, newShelf) => {
    if (this.state.books_list.includes(newBook)){
      console.log('yes it exists')
      let temp_list = this.state.books_list
    
      temp_list[temp_list.indexOf(newBook)].shelf = newShelf
      BooksAPI.update(newBook, newShelf).then(response =>{ 
        console.log(response)
      })
      this.setState({books_list:temp_list})
    } else {
      BooksAPI.update(newBook, newShelf).then(response =>{
      console.log(newBook)
        BooksAPI.getAll().then((books) => {
          this.setState({books_list: books})
        })
      })
    }
  }

render() {

let wantToRead =[]
var read = []
let currentlyReading = []
this.state.books_list.map((book) => {
  if( book.shelf === 'wantToRead') {
    wantToRead.push(book)
  } else if ( book.shelf === 'read') {
      read.push(book)
  } else if ( book.shelf === 'currentlyReading'){
      currentlyReading.push(book)   
 }
 return true
})

  return (   
      <div className="app">

        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div> 
                <Shelf shelfName="Want to Read" book_list={wantToRead} moveBook={this.moveBook}/>
                <Shelf shelfName="Read" book_list={read} moveBook={this.moveBook}/>
                <Shelf shelfName="Currently Reading" book_list={currentlyReading} moveBook={this.moveBook}/>
              </div>
            </div>
            <div className='open-search'>
              <Link
                to='/search'>
                Search BooksAPI
              </Link>
            </div>
          </div>
        )}/>
         
        <Route path='/search' render={ () => (
          <SearchPage
            temp_list={this.state.books_list}
            moveBook={this.moveBook}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
