const CustomerController = {

  getCustomersByID () {
    return {
      '1': { name: 'john.doe', id: 1 },
      '2': { name: 'jane.doe', id: 2 },
      '3': { name: 'baby.doe', id: 3 }
    }
  },
  getCustomers () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customers = [
           { name: 'john.doe', id: 1 },
           { name: 'jane.doe', id: 2 },
           { name: 'baby.doe', id: 3 }
        ]
        resolve(customers)
      }, 150)
    })
  }
}

module.exports = CustomerController
