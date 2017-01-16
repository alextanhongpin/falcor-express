const falcor = require('falcor')

const model = new falcor.Model({
  cache: {
    // Simple Object
    user: {
      name: 'John Doe',
      surname: 'j.doe',
      address: 'Petaling Jaya, Malaysia'
    }
  }
})

// CRUD
// Description: get user by a particular field
function getUserField (field) {
  return model.getValue(['user', field])
}

getUserField('name').then(console.log)
getUserField('surname').then(console.log)
getUserField('address').then(console.log)

// Description: Returns the object with the selected fields
function getUserFieldsJSON (field) {
  return model.get(['user', field])
}

getUserFieldsJSON('name').then(console.log)
getUserFieldsJSON(['name', 'surname']).then(console.log)
