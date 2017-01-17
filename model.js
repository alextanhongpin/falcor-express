const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  id:  Number,
  name: String,
  device:   String,
  platform: String,
  company: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean
})

module.exports = mongoose.model('Customer', CustomerSchema)
