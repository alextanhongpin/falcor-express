const CustomerController = {

  getCustomersByID () {
    return {
      '1': { name: 'john.doe', id: 1 },
      '2': { name: 'jane.doe', id: 2 },
      '3': { name: 'baby.doe', id: 3 }
    }
  },
  getCustomers () {
    return [
     { name: 'john.doe', id: 1 },
     { name: 'jane.doe', id: 2 },
     { name: 'baby.doe', id: 3 }
    ]
  }
}

module.exports = CustomerController
