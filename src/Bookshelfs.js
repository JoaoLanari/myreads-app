import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

/**
 * @description: Página principal da aplicação. Itera sobre o estado para construir as estantes
 * @param: books, updateBookStatus
 * @returns: Dom com layout das estantes de livro.
*/
class Bookshelfs extends Component {

  render() {
    const { books, updateBookStatus } = this.props

    const bookshelf = [
      { title: 'Currently Reading', shelf:'currentlyReading', books },
      { title: 'Want to Read', shelf:'wantToRead', books },
      { title: 'Read', shelf:'read', books }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {bookshelf.map(bookshelf => (
          <Bookshelf
            key={bookshelf.title}
            title={bookshelf.title}
            shelf={bookshelf.shelf}
            books={bookshelf.books}
            updateBookStatus={updateBookStatus}
          />
        ))}
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelfs