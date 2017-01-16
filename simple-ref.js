const falcor = require('falcor')

const model = new falcor.Model({
  cache: {
    // Simple Object with nested id
    phonesById: {
      '1': {
        name: 'iPhone',
        sold: false,
        relatedTo: []
      },
      '2': {
        name: 'Android',
        sold: false,
        relatedTo: []
      },
      '3': {
        name: 'Windows Phone',
        sold: false,
        relatedTo: []
      },
      '4': {
        name: 'iPhone 7',
        sold: true,
        relatedTo: { $type: 'ref', value: ['phonesById', 1] }
      }
    },
    // Simple reference
    phones: [
        { $type: 'ref', value: ['phonesById', 1] },
        { $type: 'ref', value: ['phonesById', 2] },
        { $type: 'ref', value: ['phonesById', 3] }
    ]
  }
})

function getPhoneById (id, field) {
  return model.get(['phonesById', id.toString(), field])
}
function prettyLog () {
  return console.log(JSON.stringify(arguments, null, 2))
}

getPhoneById(1, ['name']).then(prettyLog)
