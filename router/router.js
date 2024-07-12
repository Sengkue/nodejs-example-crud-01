const route = require('express').Router();
const category = require('./category.routes');
const product = require('./product.routes');
const user = require('./user.routes');

route.use('/category', category);
route.use('/product', product);
route.use('/user', user);

module.exports = route;
