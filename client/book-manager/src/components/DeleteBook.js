import React, { useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [bookId, setBookId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/books/${bookId}`)
      .then(response => {
        console.log('Book deleted:', response.data);
        setBookId('');
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div>
      <h2>Delete Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
        <button type="submit">Delete Book</button>
      </form>
    </div>
  );
};

export default DeleteBook;
