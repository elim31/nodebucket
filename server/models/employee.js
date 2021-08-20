/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 17 Aug 2021
 * Title: employee.js
 * Mongoose model
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Mongoose data model */

let employeeSchema = new Schema({
  empId: { type: String, unique: true},
  firstName: { type: String},
  lastName: { type: String}
}, {collection: 'employees'})

module.exports= mongoose.model('Employee', employeeSchema);
