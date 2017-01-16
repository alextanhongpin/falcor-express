const falcorExpress = require('falcor-express')
const Router = require('falcor-router')
const falcor = require('falcor')
const express = require('express')
const app = express()

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  // Create a Virtual JSON resource with a single key ("greeting")
  return new Router([
    {
      // Match a request for the key "greeting"
      route: 'greeting',
      get () {
        return {
          path: ['greeting'],
          value: 'Hello World'
        }
      }
    }, {
      route: 'index',
      get () {
        return {
          path: ['index'],
          value: 'You are at the index'
        }
      }
      // route: "user['name', 'surname', 'address']",
      // get(pathSet) {

      // }
    }
  ])
}))

const model = new falcor.Model({
  cache: {
    user: {
      name: 'Frank',
      surname: 'Underwood',
      address: '1600 Pennsylvania Avenue, Washington, DC'
    }
  }
})
// prints "Underwood" eventually
model.
  getValue('user.surname').
  then((surname) => {
    console.log(surname);
  })
app.use(express.static(__dirname + '/'))
const server = app.listen(3000, () => {
  console.log('Listening to port*:3000')
})