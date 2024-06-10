import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/books', { title, description })
      .then(response => {
        console.log('Book added:', response.data);
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
