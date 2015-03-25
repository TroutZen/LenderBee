var db         = require('../db/db.js');
var Sequelize  = require('sequelize')
var User       = global.db.User;
var Item       = global.db.Item;
var Message    = global.db.Message;

var controller = {};

// creates a new user if they don't already exist
controller.create = function(req, res, next){
  User.find({ 
    where: {
      id: req.params.userId
    }
  }).then(function(user){
    console.log('user.id', user);
    req.body.lender_id = user.id;
    req.body.country = user.country;
    req.body.state = user.state;
    req.body.street = user.street;
    req.body.city = user.city;
    Item.create(req.body)
      .then(function(item){
        res.send(item);
      })
      .catch(function(error){
        ('inside error of items create controller ', error);
      })
  }).catch(function(error){
    ('inside error of items create controller ', error);
  })
};


// returns list of all items give a users city
controller.searchItemByCity = function(req, res, next){
  var city = '';
  User.find({
    where: { id: req.params.userId },
    attributes: ['city']
  })
  .then(function(user) {
    city = user.dataValues.city;
    Item.findAll({
      where: { city: city, title: req.params.title },
      include: [{ model: User, as: 'lender' }]
    })
    .then(function(items) {
      res.json(items);
    })
    .catch(function(err) {
      console.error('\nsearchItemByCity error:', err);
    })    
  })
};

// returns list of all items give a users city
controller.getItemByCity = function(req, res, next){
  var city = '';
  User.find({
    where: { id: req.params.userId },
    attributes: ['city']
  })
  .then(function(user) {
    city = user.dataValues.city;
    Item.findAll({
      where: { city: city },
      include: [{ model: User, as: 'lender' }]
    })
    .then(function(items) {
      res.json(items);
    })
    .catch(function(err) {
      console.error('\nsearchItemByCity error:', err);
    })    
  })
};

// fetches information for a single item using the userId
controller.getOneByUser = function(req, res, next){
  var userId = req.params.userId;

  Item.findAll({
    where: Sequelize.or(
      { lender_id: userId },
      { borrower_id: userId }
    ),
    include: [ 
      {model: User, as: 'borrower'},
      {model: User, as: 'lender'},
    ]
  }).
  then(function(items){
    console.log('test test test', items);
    res.json(items);
  }).
  catch(function(err){
    console.log('error attempting to get items for a user', err);
    res.status(500).end();
  });
};


// return item updates the item to not be borrowed and removes the borrower_id
controller.returnItem = function(req, res, next){
  var itemId = req.params.itemsId;
  Item.update(
    {borrowed: false, borrower_id: null},
    {where: {id: itemId}}
  ).then(function(){
    res.send('Item has been returned!');
  })
}

module.exports = controller;
