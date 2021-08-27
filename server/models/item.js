/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 23 Aug 2021
 * Title: item.js
*/
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let itemSchema = new mongoose.Schema({
  text: { type: String }
});

module.exports = itemSchema; //return schema
