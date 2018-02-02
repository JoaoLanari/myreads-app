import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelfs from './Bookshelfs'
import Search from './Search'
import './App.css'

/**
 * @description: Contêm o estado principal da aplicão, a função de manipulação do estado e a configuração das rotas.
 * @param: props
 * @returns: Dom principal
*/

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
    this.updateBookStatus = this.updateBookStatus.bind(this)
  }

  /**
   * @description: Chama a API dos Books e setState da applicação com o retorno.
   * @returns: books
  */
  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
   * @description: Modifica o estado da aplicação com base no item selecionado
   * @param: select > options = target.value (currentlyReading, currentlyReading ou read) e book
   * @returns: setState do book e update no servidor
  */
  updateBookStatus(target, book) {
    if(this.state.books.includes(book)){
      this.setState(function () {
        book.shelf = target.value
      })
    } else {
      this.setState(state => ({
        books: state.books.concat(book)
      }))
    }
    BooksAPI.update(book, target.value)
  }


  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Bookshelfs
            books={books}
            updateBookStatus={this.updateBookStatus}
          />
        )} />
        <Route path='/search' render={() => (
          <Search
            books={books}
            updateBookStatus={this.updateBookStatus}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp