import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'

/**
 * @description: Contém todos os livros da aplicação, sem estante definida. Pode alterar o esdo com updateBookStatus
 * @param: books. updateBookStatus e possue query como estado.
 * @returns:Lista de libros que existem na aplicação.
*/
class Search extends Component{

  state = {
    query: ''
  }

  /**
   * @description: Muda o estado 'query' conforme valor do input
   * @param: input.value
   * @returns: Novo estado
  */
  updateQuery = (query) => {
    this.setState({ query: query })
  }

  render(){

    const { books, updateBookStatus } = this.props
    const { query } = this.state

    /**
     * @description: Filtra os livros conforme valor da query
     * @param: Query e books
     * @returns: Books filtrados
    */
    let showingBooks
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors) )
    } else{
      showingBooks = books
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              showingBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  updateBookStatus={updateBookStatus}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search