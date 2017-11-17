const r = require('../lib/request');
const when = require('when');
const mongoose = require('mongoose');
const Products = mongoose.model('Products');

exports.getProducts = r.request(params => {
  var params = {};
  return when(Products.find(params).exec());
});

exports.createProduct = r.request(201, (args, res) => {
  /**
   * parameters expected in the args:
   * token (String)
   * body (Body)
   **/
    return when(Products.create({
      name: args.body.value.productname
    }));
});
