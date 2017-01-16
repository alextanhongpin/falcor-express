const falcor = require('falcor')

const model = new falcor.Model({
  cache: {
    users: [
      {
        name: 'John Doe',
        id: '1',
        dob: 2017,
        address: 'Petaling Jaya'
      },
      {
        name: 'Jane Doe',
        id: '2',
        address: 'Petaling Jaya'
      }
    ]
  }
})

function prettyLog () {
  return console.log(JSON.stringify(arguments, null, 2))
}

function getUserByField1 (field) {
  const range = {
    from: 0,
    to: 2
  }
  return model.get(['users', range, field])
}

getUserByField1('name').then(prettyLog)
getUserByField1(['name', 'id']).then(prettyLog)

function getUsersByField2 (fields) {
  return model.get('users[0..1]["' + fields.join('","') + '"]')
}

getUsersByField2(['name']).then(prettyLog)
getUsersByField2(['name', 'id']).then(prettyLog)

function getUsersLength () {
  return model.getValue('users.length')
}

getUsersLength().then(console.log)

function getFirstUser (field) {
  if (!field) {
    throw new Error('getFirstUserError: field is mandatory')
  }
  // Same as model.get('users[0]')
  return model.get(['users', 0, field])
}

getFirstUser('name').then(prettyLog)
