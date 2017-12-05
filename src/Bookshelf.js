import React from 'react'
import Book from './Book'

/**
 * @description: 3 estantes onde são redenrizadps os livros. O estado do livro pode ser currentlyReading, wantToRead e read. Conforme o estado do livro ele será renderizado na estante certa.
 * @param: title, shelf, books e updateBookStatus
 * @returns: Elemento Dom que representa os livros.
*/
const Bookshelf = ({title, shelf, books = [], updateBookStatus}) => {
  
  const currentBooks = books.filter(_ => _.shelf === shelf)

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {currentBooks.map(book => (
              <Book
                key={book.title}
                book={book}
                updateBookStatus={updateBookStatus}
              />
            ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf