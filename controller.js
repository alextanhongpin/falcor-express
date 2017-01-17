
const Customer = require('./model.js')

const CustomerController = {

  getCustomersByID () {
    return {
      '1': { name: 'john.doe', id: 1 },
      '2': { name: 'jane.doe', id: 2 },
      '3': { name: 'baby.doe', id: 3 }
    }
  },
  getCustomers () {
    return Customer.find({})
  }
}

module.exports = CustomerController
