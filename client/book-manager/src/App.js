import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';

function App() {
  return (
    <div>
      <h1>Book Management System</h1>
      <BookList />
      <AddBook />
      <UpdateBook />
      <DeleteBook />
    </div>
  );
}

export default App;
