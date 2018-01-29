'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
    title: String,
    description: String,
    service: {type: Schema.ObjectId, ref: 'Service'},
    image: String
});

module.exports = mongoose.model('Category', CategorySchema);