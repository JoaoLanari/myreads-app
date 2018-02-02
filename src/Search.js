import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Debounce } from 'react-throttle'
import Book from './Book'

/**
 * @description: Contém todos os livros da aplicação, sem estante definida. Pode alterar o esdo com updateBookStatus
 * @param: books. updateBookStatus e possue query como estado.
 * @returns:Lista de libros que existem na aplicação.
*/
class Search extends Component {

  state = {
    booksSearch: [],
    query: ''
  }


  /**
   * @description: Muda o estado 'query' conforme valor do input
   * @param: input.value
   * @returns: Novo estado
   */
  updateQuery = (query) => {
    this.setState({ query: query })
    this.searchBook(query)
  }

  /**
   * @description: Buscar os livros na BookApi e seta o estado do componente
   * @param: query
   * @returns: Novo estado
   */
  searchBook(query) {
    this.setState({
      booksSearch: [],
    });
    if (query.length > 0) {
      // Fiquei com uma dúvida. A pesquisa na API é feita por palavra-chave?
      BooksAPI.search(query).then((books) => {
        if (books.length > 0) {
          books.map(book => {
            let bookMatched = this.isSelected(book)
            this.setState(state => ({
              booksSearch: state.booksSearch.concat([bookMatched])
            }))            
          })
        }
      })
    }
  }

  /**
   * @description: Verifica se o book já estado no estado passado por prop
   * @param: book
   * @returns: bbok da Api ou do estado
   */
  isSelected(book) {
    this.props.books.map(bookSelected => {
      if (book.id === bookSelected.id) {
        book = bookSelected        
      }
      return true
    })
    return book
  }

  render() {
    const { updateBookStatus } = this.props
    const { booksSearch } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input
                onChange={(event) => this.updateQuery(event.target.value)}
                type="text"
                placeholder="Search search"
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              booksSearch !== [] && (
                booksSearch.map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    updateBookStatus={updateBookStatus}
                  />
                ))
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search