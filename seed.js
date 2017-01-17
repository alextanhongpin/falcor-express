// Populate the database with sample data

const db = require('./db.js')
const Customer = require('./model.js')

const data = [
  {
    id: 1,
    name: 'John Doe',
    device: 'iPhone 7',
    platform: 'iOS',
    company: 'Apple'
  },
  {
    id: 2,
    name: 'Jane Doe',
    device: 'Samsung Galaxy 7',
    platform: 'Android',
    company: 'Samsung'
  },
  {
    id: 3,
    name: 'Baby Doe',
    device: 'Lumia 920',
    platform: 'Windows Phone 8',
    company: 'Nokia'
  }
]


// Customer.create(data, (err) => {
//   console.log(err, arguments)
// })

module.exports = data