const falcor = require('falcor')

const model = new falcor.Model({
  cache: {
    user: {
      name: 'Frank',
      surname: 'Underwood',
      address: '1600 Pennsylvania Avenue, Washington, DC'
    },
    todosById: {
        "44": {
            name: "get milk from corner store",
            done: false,
            prerequisites: [{ $type: "ref", value: ["todosById", 54] }]
        },
        "54": {
            name: "withdraw money from ATM",
            done: false,
            prerequisites: []
        }
    },
    todos: [
        { $type: "ref", value: ["todosById", 44] },
        { $type: "ref", value: ["todosById", 54] }
    ],
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

model.getValue('books.length').then((value) => {
  console.log('getBookBy length', value)
  // -> 2
})

model.get(['books', { from: 0, 'to': 2 }, ['name', 'isbn']]).then((value) => {
  console.log('getBookBy Name', JSON.stringify(value))
  // -> { name: 'Book 1' }
})

model.get('books[0...1]["name", "isbn"]').then((value) => {
  console.log('getByRange', JSON.stringify(value, null, 4))
})
// Fail because no fields are specified
model.get('todosById["44"]').then((value) => {
  console.log('getTodosById', JSON.stringify(value, null, 4))
})
model.get(['todosById', '44', 'name']).then((value) => {
  console.log('getTodosById', JSON.stringify(value, null, 4))
})
model.getValue(['todosById', '44', 'name']).then((value) => {
  console.log('getTodosById', JSON.stringify(value, null, 4))
})
model.get('books[0..1].name', ['Book 1', '1234'], ['name']).then((value) => {
  console.log('getBooksById', JSON.stringify(value, null, 4))
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

console.log('create one')
model.call(['books', 'push'], [{
  $type: 'ref',
  value: ['hello', '1234']
}], 
// Fields to retrieve from created item
[['name', 'isbn']]
).then((response) => {
  console.log('created a new instance', response)
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