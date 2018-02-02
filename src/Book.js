import React from 'react'

/**
 * @description: Cria os books
 * @param: book e updateBookStatus
 * @returns: Elemento Dom que representa um livro.
*/
const Book = ({book, updateBookStatus}) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div 
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}
        >
        </div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={(e) => updateBookStatus(e.target, book)}>
            <option value="none" disabled>Move to...</option>
            <option value="none">None</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  </li>
)

export default Book