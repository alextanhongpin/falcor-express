const falcorExpress = require('falcor-express')
const jsong = require('falcor-json-graph')
const Router = require('falcor-router')
const express = require('express')
const app = express()
const CustomerController = require('./controller.js')

console.log(CustomerController)

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  // Create a Virtual JSON resource with a single key ("greeting")
  return new Router([
    {
      route: 'customers.length',
      get (pathSet) {
        const customers = CustomerController.getCustomers()
        const attributes = pathSet[1]
        return {
          path: ['customers', 'length'],
          value: customers.length
        }
      }
    }, {
      route: 'customers[{integers:ids}][{keys:attributes}]',
      get (pathSet) {
        const attributes = pathSet.attributes
        const customers = CustomerController.getCustomers()
        let jsonGraph = {
          customers: {}
        }

        pathSet.ids.map((id) => {
          const customer = customers[id]
          if (!customers) {
            jsonGraph.customers[id] = jsong.atom(customer)
          } else {
            let prop = jsonGraph.customers[id] = {}
            attributes.forEach((attr) => {
              prop[attr] = jsong.atom(customer[attr])
            })
          }
        })
        return { jsonGraph }
      }
    }
  ])
}))

app.use(express.static(__dirname + '/'))

const server = app.listen(3000, () => {
  console.log('Listening to port*:3000')
})
