const falcorExpress = require('falcor-express')
const jsonGraph = require('falcor-json-graph')
const Router = require('falcor-router')
const express = require('express')
const app = express()
const CustomerController = require('./controller.js')

const db = require('./db.js')
// var jsonGraph = require('falcor-json-graph');

// var atom = jsonGraph.atom("a string wrapped in an atom"); // creates { $type: "atom", value: "a string wrapped in an atom" }
// var ref = jsonGraph.ref("todos[0].name"); // creates { $type: "ref", value: ["todos", 0, "name"] }
// var error = jsonGraph.error("something bad happened."); // creates { $type: "error", value: "something bad happened." }


app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  // Create a Virtual JSON resource with a single key ("greeting")
  return new Router([
    {
      route: 'customers.length',
      get (pathSet) {
        const request = CustomerController.getCustomers()
        return request.then((customers) => {
          const attributes = pathSet[1]
          return {
            path: ['customers', 'length'],
            value: customers.length
          }
        })
      }
    }, {
      route: 'customers[{integers:ids}][{keys:attributes}]',
      get (pathSet) {
        const attributes = pathSet.attributes
        const request = CustomerController.getCustomers()
        return request.then((customers) => {
          let output = {
            customers: {}
          }

          pathSet.ids.map((id) => {
            const customer = customers[id]
            if (!customers) {
              output.customers[id] = jsonGraph.atom(id)
            } else {
              output.customers[id] = {}
              attributes.forEach((attr) => {
                output.customers[id][attr] = jsonGraph.atom(customer[attr])
              })
            }
          })
          return { jsonGraph: output }
        })
      }
    }
  ])
}))

app.use(express.static(__dirname + '/'))

const server = app.listen(3000, () => {
  console.log('Listening to port*:3000')
})
