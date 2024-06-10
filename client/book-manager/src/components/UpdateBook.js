import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/books/${bookId}`, { title, description })
      .then(response => {
        console.log('Book updated:', response.data);
        setBookId('');
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
