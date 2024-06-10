const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

let books = {}
let nextId = 1

// Check if all fields are valid
const validateInput = (book) => {
  if (!book.title || !book.description) {
    return {
      isValid: false,
      error: 'Please define the title and description. '
    }
  }

  return {isValid: true}
}

// Create a new book
app.post('/books', (req, res) => { 
  const valid = validateInput(req.body)
  if (!valid.isValid) { 
    return res.status(400).json({
      error: valid.error
    })
  }

  const book = { id: nextId++, ...req.body }
  books[book.id] = book
  console.log('Created book: ', book)
  res.status(201).json(book)
})

// Read a book by ID
app.get('/books/:id', (req, res) => { 
  const book = books[req.params.id]
  if (book) {
    res.json(book)
  } else { 
    res.status(404).json({ error: 'Book not found' })
  }
})

// Update a book by ID
app.put('/books/:id', (req, res) => { 
  const book = books[req.params.id]
  if (!book) { 
    return res.status(404).json({error: 'Book not found'})
  }

  const valid = validateInput(req.body)
  if (!valid.isValid) { 
    return res.status(400).json({error: valid.error})
  }

  books[req.params.id] = { ...book, ...req.body }
  console.log('Updated book:', books[req.params.id])
  res.json(books[req.params.id])
})

// Delete a book
app.delete('/books/:id', (req, res) => { 
  const book = books[req.params.id]
  if (book) {
    delete books[req.params.id]
    res.json(book)
  } else { 
    res.status(404).json({ error: 'Book not found' })
  }
})

if (process.env.NODE_ENV !== 'test') { 
  app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}`)
  })
}

module.exports = app
