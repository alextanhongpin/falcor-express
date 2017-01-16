const falcor = require('falcor')

const model = new falcor.Model({
  cache: {
    user: {
      name: 'Frank',
      surname: 'Underwood',
      address: '1600 Pennsylvania Avenue, Washington, DC'
    },
    books: [
      {
        name: 'Book 1',
        isbn: '1234'
      },
      {
        name: 'Book 2',
        isbn: '2345'
      }
    ]
  }
})
// prints "Underwood" eventually
model.
  getValue('user.surname').
  then((surname) => {
    console.log(surname);
  })

model.get('books[0].name').then((value) => {
  console.log('getBook', value)
  // -> { json: { books: { '0': [object] }}}
  console.log(value.json.books[0])
  // -> { name: 'Book 1' }
})
model.getValue('books[0].name').then((value) => {
  console.log('getBook', value)
  // -> Book 1
})
model.getValue(['books', 0, 'name']).then((value) => {
  console.log('getBook', value)
  // -> Book 1
})
model.getValue('books[0].name', 'books[0].isbn').then((value) => {
  console.log('getBook', value)
  // -> Book 1
})

// NOTE: .getValue() method doesn't work here
model.get('books[0]["name", "isbn"]').then((value) => {
  console.log('getBook', value)
  // -> { json: { books: { '0': [object] }}}
  console.log(value.json.books[0])
  // -> { name: 'Book 1', isbn: '1234' }
})
model.get('books[0..1]["name", "isbn"]').then((value) => {
  console.log('getBook', value)
  // -> { json: { books: { '0': [object] }}}
  console.log(value.json.books[0])
  // -> { name: 'Book 1', isbn: '1234' }
  console.log(value.json.books[1])
  // -> { name: 'Book 2', isbn: '2345' }
})