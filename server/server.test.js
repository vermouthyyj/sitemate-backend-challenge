const request = require('supertest')
const app = require('./server')

describe('Book Management API', () => {
  let bookId

  it('Success: should create a new book by filling all fields', async () => { 
    const response = await request(app)
      .post('/books')
      .send({ title: 'Test Book', description: 'Test description' })
    
    expect(response.status).toBe(201)
    expect(response.body.title).toBe('Test Book')
    expect(response.body.description).toBe('Test description')
    bookId = response.body.id
  })

  it('Fail: should fail to create a new book without one of the required field', async () => { 
    const response = await request(app)
      .post('/books')
      .send({ title: 'Test Book' })
    
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Please define the title and description. ')
  })

  it('Success: should read a book by ID', async () => { 
    const response = await request(app).get(`/books/${bookId}`)
    
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('Test Book')
    expect(response.body.description).toBe('Test description')
  })

  it('Fail: should return not found for non-existent book', async () => { 
    const response = await request(app).get(`/books/100`)
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Book not found')
  })

  it('Success: should update a book by ID', async () => { 
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send({ title: 'New Test Book', description: 'New Test description' })
    
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('New Test Book')
    expect(response.body.description).toBe('New Test description')
  })

  it('Fail: should fail to update a book without all the required field', async () => { 
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send({ title: 'New Test Book' })
    
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Please define the title and description. ')
  })

  it('Success: should read a book by ID', async () => { 
    const response = await request(app).delete(`/books/${bookId}`)
    
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('New Test Book')
    expect(response.body.description).toBe('New Test description')
  })

  it('Fail: should return 404 when deleting a non-existent book', async () => { 
    const response = await request(app).delete(`/books/${bookId}`)
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Book not found')
  })
})