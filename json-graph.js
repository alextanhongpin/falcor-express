const falcor = require('falcor')

const model = new falcor.Model({
  cache: {
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
        },
        "123": {
          name: "a new item",
          done: false
        }
    },
    todos: [
        { $type: "ref", value: ["todosById", 44] },
        { $type: "ref", value: ["todosById", 54] }
    ]
  }
})

model.getValue(['todos', 0, 'prerequisites', 0, 'name']).then((data) => {
  console.log(data)
  // -> 'withdraw money from ATM'
}) 

model.get(['todos', 0, ['name', 'done']]).then((data) => {
  console.log(data.json.todos[0])
  // -> { name: 'get milk from corner store', done: false }
}) 

const dataSource = model.asDataSource()
const response = dataSource.get([
  ['todos', 0, ['name', 'done']],
  ['todos', 0, 'prerequisites', { from: 0, to: 1 }, ['name', 'done']]
])
response.subscribe((jsonGraphEnvelope) => {
  // console.log('subscribe', jsonGraphEnvelope)
  // console.log(JSON.stringify(jsonGraphEnvelope, null, 4))
})

// dataSource.call(
//   ['todos', 'push'], 
//   [{ $type: 'ref', value: ['todosById', 123]}], 
//   [['name']], 
//   [['length']]
// ).subscribe((jsonGraphEnvelope) => {
//   console.log('created', JSON.stringify(jsonGraphEnvelope))
// })